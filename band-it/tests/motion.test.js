import test from 'node:test';
import assert from 'node:assert/strict';
import { armPose, UPPER_ARM, FOREARM, motions, torsoPoint } from '../src/motion.js';

const distance = (a, b) => Math.hypot(...a.map((v, i) => v - b[i]));
test('los segmentos y agarres mantienen su longitud durante todo el recorrido', () => {
  for (const motion of motions) for (const sign of [-1, 1]) {
    for (let i = 0; i <= 200; i++) {
      const pose = armPose(motion, sign, i / 200);
      assert.ok(Math.abs(distance(pose.shoulder, pose.elbow) - UPPER_ARM) < 1e-12);
      assert.ok(Math.abs(distance(pose.elbow, pose.hand) - FOREARM) < 1e-12);
      assert.ok(Math.abs(Math.hypot(...pose.grip) - 1) < 1e-12);
      const lower = pose.hand.map((v, j) => v - pose.elbow[j]);
      assert.ok(Math.abs(lower.reduce((sum, v, j) => sum + v * pose.grip[j], 0)) < 1e-12);
      assert.ok(pose.hand[1] <= pose.shoulder[1] + 1e-12);
      assert.deepEqual(pose.anchor, [sign * 0.35, 0.012, 0.04]);
    }
  }
});
test('curl conserva el codo; lateral abre los brazos; frontal avanza sin abrirlos', () => {
  const start = armPose('curl', 1, 0), top = armPose('curl', 1, 1);
  assert.deepEqual(start.elbow, top.elbow);
  assert.ok(top.hand[1] > start.hand[1]);
  const lateral = armPose('lateral', 1, 1), front = armPose('front', 1, 1);
  assert.ok(lateral.hand[0] > 1);
  assert.ok(Math.abs(lateral.hand[2]) < 0.1);
  assert.equal(front.hand[0], front.shoulder[0]);
  assert.ok(front.hand[2] > 0.7);
});
test('trayectorias continuas y simétricas sin saltos entre muestras', () => {
  for (const motion of motions) {
    let previous = armPose(motion, 1, 0);
    for (let i = 1; i <= 1000; i++) {
      const right = armPose(motion, 1, i / 1000), left = armPose(motion, -1, i / 1000);
      assert.ok(distance(previous.hand, right.hand) < 0.002);
      assert.ok(Math.abs(right.hand[0] + left.hand[0]) < 1e-12);
      assert.equal(right.hand[1], left.hand[1]); assert.equal(right.hand[2], left.hand[2]);
      previous = right;
    }
  }
});

test('los nuevos movimientos conservan su apoyo, orientación y recorrido específico', () => {
  const startRow = armPose('row', 1, 0), endRow = armPose('row', 1, 1);
  assert.deepEqual(startRow.shoulder, torsoPoint([0.29, 1.8, 0.03], 'row'));
  assert.ok(endRow.elbow[2] < startRow.elbow[2] - 0.25);
  assert.ok(endRow.hand[1] > startRow.hand[1] + 0.5);
  const startOpen = armPose('pullapart', 1, 0), endOpen = armPose('pullapart', 1, 1);
  assert.ok(endOpen.hand[0] > startOpen.hand[0] + 0.6);
  assert.equal(startOpen.hand[1], endOpen.hand[1]);
  const upright = armPose('upright', 1, 1);
  assert.ok(upright.elbow[0] > upright.hand[0]);
  assert.ok(upright.elbow[1] > upright.hand[1]);
  for (const t of [0, 0.5, 1]) {
    const hammer = armPose('hammer', 1, t), curl = armPose('curl', 1, t);
    assert.deepEqual(hammer.hand, curl.hand); // Variante justificada: cambia el agarre.
    assert.notDeepEqual(hammer.grip, curl.grip);
  }
});
