// Coordenadas ilustrativas; +Z es el frente. Longitudes constantes, sin física de carga.
export const UPPER_ARM = 0.4;
export const FOREARM = 0.37;
export function armPose(motion, sign, lift) {
  const shoulder = [sign * 0.29, 1.8, 0.03];
  const t = Math.max(0, Math.min(1, lift));
  let upper, lower, grip;
  if (motion === 'curl') {
    const angle = 0.12 + t * 2.15;
    upper = [0, -1, 0];
    lower = [0, -Math.cos(angle), Math.sin(angle)];
    grip = [1, 0, 0];
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
