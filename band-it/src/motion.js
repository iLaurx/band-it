// Coordenadas ilustrativas; +Z es el frente. Longitudes constantes, sin física de carga.
export const UPPER_ARM = 0.4;
export const FOREARM = 0.37;
export const motions = ['curl', 'hammer', 'lateral', 'front', 'row', 'pullapart', 'upright'];
export const torsoTilt = motion => motion === 'row' ? -0.65 : 0;
export function torsoPoint(point, motion) {
  const angle = torsoTilt(motion), y = point[1] - 1.15, z = point[2];
  return [point[0], 1.15 + y * Math.cos(angle) - z * Math.sin(angle), y * Math.sin(angle) + z * Math.cos(angle)];
}
export function armPose(motion, sign, lift) {
  const shoulder = torsoPoint([sign * 0.29, 1.8, 0.03], motion);
  const t = Math.max(0, Math.min(1, lift));
  let upper, lower, grip;
  if (motion === 'curl' || motion === 'hammer') {
    const angle = 0.12 + t * 2.15;
    upper = [0, -1, 0];
    lower = [0, -Math.cos(angle), Math.sin(angle)];
    // La variante martillo comparte flexión de codo, pero conserva agarre neutro.
    grip = motion === 'hammer' ? [0, Math.sin(angle), Math.cos(angle)] : [1, 0, 0];
  } else if (motion === 'row') {
    const upperAngle = t * 0.9, lowerAngle = 0.1 + t * 1.75;
    upper = [0, -Math.cos(upperAngle), -Math.sin(upperAngle)];
    lower = [0, -Math.cos(lowerAngle), Math.sin(lowerAngle)];
    grip = [0, Math.sin(lowerAngle), Math.cos(lowerAngle)];
  } else if (motion === 'pullapart') {
    const angle = t * 1.35;
    upper = [sign * Math.sin(angle), -0.18, Math.cos(angle) * Math.sqrt(1 - 0.18 ** 2)];
    upper[0] *= Math.sqrt(1 - 0.18 ** 2);
    lower = [sign * Math.sin(angle - 0.12) * Math.sqrt(1 - 0.18 ** 2), -0.18, Math.cos(angle - 0.12) * Math.sqrt(1 - 0.18 ** 2)];
    // Eje vertical proyectado sobre el plano perpendicular al antebrazo.
    grip = lower.map((v, i) => ((i === 1 ? 1 : 0) + 0.18 * v) / Math.sqrt(1 - 0.18 ** 2));
  } else if (motion === 'upright') {
    const angle = 0.04 + t * 1.18;
    upper = [sign * Math.sin(angle), -Math.cos(angle), 0];
    const inward = 0.1 + t * 0.72, forward = 0.48;
    lower = [-sign * inward, -Math.sqrt(1 - inward ** 2 - forward ** 2), forward];
    const norm = Math.hypot(lower[0], lower[1]);
    grip = [-lower[1] / norm, lower[0] / norm, 0];
  } else if (motion === 'lateral') {
    const angle = 0.08 + t * (Math.PI / 2 - 0.08);
    upper = [sign * Math.sin(angle), -Math.cos(angle), 0];
    lower = upper.map(v => v * Math.cos(0.14));
    lower[2] = Math.sin(0.14);
    grip = [Math.cos(angle), sign * Math.sin(angle), 0];
  } else if (motion === 'front') {
    const angle = 0.2 + t * (Math.PI / 2 - 0.2);
    upper = [0, -Math.cos(angle), Math.sin(angle)];
    lower = [0, -Math.cos(angle - 0.14), Math.sin(angle - 0.14)];
    grip = [0, Math.sin(angle - 0.14), Math.cos(angle - 0.14)];
  } else throw new Error(`Movimiento desconocido: ${motion}`);
  const elbow = shoulder.map((v, i) => v + upper[i] * UPPER_ARM);
  const hand = elbow.map((v, i) => v + lower[i] * FOREARM);
  return { shoulder, elbow, hand, grip, anchor: [sign * 0.35, 0.012, 0.04] };
}
