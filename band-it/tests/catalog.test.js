import test from 'node:test';
import assert from 'node:assert/strict';
import { bands, exercises } from '../src/data.js';
import { motions } from '../src/motion.js';

test('conserva las cinco resistencias aportadas por el usuario', () => {
  assert.deepEqual(Object.fromEntries(bands.map(b => [b.name, b.lbs])), {
    Amarilla: 10, Azul: 20, Verde: 30, Negra: 40, Roja: 50,
  });
});

test('el catálogo tiene identificadores únicos y un movimiento disponible por ejercicio', () => {
  assert.equal(new Set(exercises.map(e => e.id)).size, exercises.length);
  const supported = new Set(motions);
  for (const exercise of exercises) {
    assert.ok(supported.has(exercise.motion), `Falta movimiento: ${exercise.id}`);
    assert.ok(exercise.steps.length >= 3);
    assert.ok(exercise.steps.every(step => typeof step === 'string' && step.length > 0));
    assert.equal(exercise.equipment, 'Banda y dos agarraderas');
    assert.match(exercise.support, /fabricante/);
    assert.match(exercise.source.url, /^https:\/\//);
    assert.doesNotMatch(exercise.steps.join(' '), /puerta|tobillera|banco|ancla/i);
  }
});
