import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { armPose } from './motion.js';

// Dimensiones ilustrativas en unidades de escena. No es un modelo biomecánico.
export function createViewer(container, options) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute('aria-hidden', 'true');
  container.append(renderer.domElement);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.minDistance = 3;
  controls.maxDistance = 8;
  controls.minPolarAngle = 0.3;
  controls.maxPolarAngle = Math.PI / 2;
  const view = (name = 'perspective') => {
    const positions = { front: [0, 1.5, 5.4], side: [5.4, 1.5, 0], perspective: [2.8, 2.1, 4.8] };
    camera.position.set(...positions[name]); controls.target.set(0, 1.15, 0); controls.update();
  };
  const reset = () => view();
  reset();
  scene.add(new THREE.HemisphereLight(0xffffff, 0x4d665c, 2.8));
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(3, 5, 4);
  scene.add(light);
  const body = new THREE.MeshStandardMaterial({ color: '#afc2b8', roughness: 0.65 });
  const joints = new THREE.MeshStandardMaterial({ color: '#d8e3da', roughness: 0.6 });
  const dark = new THREE.MeshStandardMaterial({ color: '#263c32', roughness: 0.9 });
  const rubber = new THREE.MeshStandardMaterial({ color: options.color, roughness: 0.65 });
  const sphere = new THREE.SphereGeometry(1, 20, 14);
  const cylinder = new THREE.CylinderGeometry(1, 1, 1, 14);
  function ellipsoid(position, scale, material = body) {
    const mesh = new THREE.Mesh(sphere, material);
    mesh.position.set(...position);
    mesh.scale.set(...scale);
    scene.add(mesh);
    return mesh;
  }
  function segment(radius, material = body) {
    const mesh = new THREE.Mesh(cylinder, material);
    scene.add(mesh);
    mesh.userData.radius = radius;
    return mesh;
  }
  const axis = new THREE.Vector3(0, 1, 0);
  const direction = new THREE.Vector3();
  function connect(mesh, start, end) {
    direction.subVectors(end, start);
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.scale.set(mesh.userData.radius, direction.length(), mesh.userData.radius);
    mesh.quaternion.setFromUnitVectors(axis, direction.normalize());
  }
  ellipsoid([0, 1.58, 0], [0.27, 0.38, 0.15]);
  ellipsoid([0, 1.16, 0], [0.23, 0.18, 0.15], dark);
  ellipsoid([0, 2.11, 0], [0.15, 0.19, 0.15], joints);
  // Nariz y marca frontal para reconocer la orientación desde cualquier cámara.
  ellipsoid([0, 2.1, 0.15], [0.035, 0.04, 0.045], joints);
  ellipsoid([0, 1.68, 0.145], [0.045, 0.08, 0.015], dark);
  ellipsoid([0, 1.9, 0], [0.075, 0.1, 0.075]);
  for (const sign of [-1, 1]) {
    const hip = new THREE.Vector3(sign * 0.14, 1.15, 0);
    const knee = new THREE.Vector3(sign * 0.2, 0.63, 0.025);
    const ankle = new THREE.Vector3(sign * 0.24, 0.13, 0);
    connect(segment(0.105, dark), hip, knee);
    connect(segment(0.075), knee, ankle);
    ellipsoid(knee.toArray(), [0.08, 0.08, 0.08], joints);
    ellipsoid([sign * 0.24, 0.085, 0.08], [0.1, 0.065, 0.19], dark);
  }
  const arms = [-1, 1].map(sign => ({
    sign,
    upper: segment(0.065), lower: segment(0.052),
    shoulder: ellipsoid([sign * 0.29, 1.8, 0.03], [0.075, 0.075, 0.075], joints),
    elbow: ellipsoid([0, 0, 0], [0.067, 0.067, 0.067], joints),
    hand: ellipsoid([0, 0, 0], [0.065, 0.075, 0.06], joints),
    handle: segment(0.022, dark), band: segment(0.009, rubber),
    straps: [segment(0.009, dark), segment(0.009, dark)],
    thumb: ellipsoid([0, 0, 0], [0.025, 0.045, 0.025], joints),
  }));
  // La banda continua pasa bajo ambos pies; cada tramo termina en una agarradera.
  connect(segment(0.009, rubber), new THREE.Vector3(-0.35, 0.012, 0.04), new THREE.Vector3(0.35, 0.012, 0.04));
  const platform = new THREE.Mesh(new THREE.CylinderGeometry(1.28, 1.28, 0.04, 64), dark);
  platform.position.y = -0.035;
  scene.add(platform);
  const grid = new THREE.GridHelper(5, 20, 0x365348, 0x23392f);
  grid.position.y = -0.06;
  scene.add(grid);
  let motion = options.motion;
  let playing = options.playing;
  let speed = 1;
  let elapsed = 0;
  let last = performance.now();
  let disposed = false;
  let contextLost = false;
  const start = new THREE.Vector3();
  const elbow = new THREE.Vector3();
  const hand = new THREE.Vector3();
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const anchor = new THREE.Vector3();
  const attachment = new THREE.Vector3();
  const grip = new THREE.Vector3();
  const forearm = new THREE.Vector3();
  function pose() {
    const lift = (1 - Math.cos(elapsed * Math.PI / 2)) / 2;
    arms.forEach(arm => {
      const p = armPose(motion, arm.sign, lift);
      start.fromArray(p.shoulder); elbow.fromArray(p.elbow); hand.fromArray(p.hand);
      connect(arm.upper, start, elbow);
      connect(arm.lower, elbow, hand);
      arm.elbow.position.copy(elbow);
      arm.hand.position.copy(hand);
      forearm.subVectors(hand, elbow).normalize();
      arm.hand.quaternion.setFromUnitVectors(axis, forearm);
      grip.fromArray(p.grip);
      a.copy(hand).addScaledVector(grip, -0.09);
      b.copy(hand).addScaledVector(grip, 0.09);
      connect(arm.handle, a, b);
      const thumbSign = motion === 'lateral' ? arm.sign : motion === 'curl' ? -arm.sign : 1;
      arm.thumb.position.copy(hand).addScaledVector(grip, 0.075 * thumbSign).addScaledVector(forearm, 0.015);
      direction.copy(grip).multiplyScalar(thumbSign);
      arm.thumb.quaternion.setFromUnitVectors(axis, direction);
      anchor.fromArray(p.anchor);
      attachment.subVectors(anchor, hand).normalize().multiplyScalar(0.14).add(hand);
      connect(arm.straps[0], a, attachment); connect(arm.straps[1], b, attachment);
      connect(arm.band, anchor, attachment);
    });
  }
  function render() { if (!disposed && !contextLost && !document.hidden) { pose(); renderer.render(scene, camera); } }
  const observer = new ResizeObserver(() => {
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    render();
  });
  observer.observe(container);
  const tick = now => {
    const delta = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (playing && !document.hidden) elapsed += delta * speed;
    render();
    options.onProgress?.((elapsed % 4) / 4);
  };
  function syncLoop() {
    renderer.setAnimationLoop(playing && !document.hidden && !contextLost ? tick : null);
    last = performance.now(); render();
  }
  const lost = event => { event.preventDefault(); contextLost = true; renderer.setAnimationLoop(null); options.onUnavailable?.(); };
  const restored = () => { contextLost = false; options.onAvailable?.(); syncLoop(); };
  renderer.domElement.addEventListener('webglcontextlost', lost);
  renderer.domElement.addEventListener('webglcontextrestored', restored);
  document.addEventListener('visibilitychange', syncLoop);
  controls.addEventListener('change', render);
  syncLoop();
  return {
    setExercise(value) { motion = value; elapsed = 0; render(); options.onProgress?.(0); },
    setColor(value) { rubber.color.set(value); render(); },
    setPlaying(value) { playing = value; syncLoop(); },
    setSpeed(value) { speed = value; },
    setProgress(value) { elapsed = value * 4; render(); },
    view,
    reset,
    zoom(factor) {
      const offset = camera.position.clone().sub(controls.target);
      offset.setLength(THREE.MathUtils.clamp(offset.length() * factor, controls.minDistance, controls.maxDistance));
      camera.position.copy(controls.target).add(offset); controls.update();
    },
    dispose() {
      disposed = true;
      document.removeEventListener('visibilitychange', syncLoop);
      renderer.domElement.removeEventListener('webglcontextlost', lost);
      renderer.domElement.removeEventListener('webglcontextrestored', restored);
      observer.disconnect(); controls.dispose(); renderer.setAnimationLoop(null);
      sphere.dispose(); cylinder.dispose(); platform.geometry.dispose(); grid.geometry.dispose();
      for (const material of [body, joints, dark, rubber, grid.material]) material.dispose();
      renderer.dispose(); renderer.domElement.remove();
    },
  };
}
