import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import './style.css';

//Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('lightyellow')


//Geometry
const geometry = new THREE.IcosahedronGeometry(6, 64);
const material = new THREE.MeshPhysicalMaterial({
  roughness: 0,
  transmission: 1,
  thickness: 1.5,
  color:'yellow'
 
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Background

const bgTexture = new THREE.TextureLoader().load('./src/material5.jpg');
const bgGeometry = new THREE.PlaneGeometry(20, 20);
const bgMaterial = new THREE.MeshBasicMaterial({ map: bgTexture });
const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
bgMesh.position.set(0, 0, -7);
scene.add(bgMesh);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//Light

const light = new THREE.PointLight(0xffffff, 1.5, 80);
light.position.set(5, 10, 10);

scene.add(light);

//Camera

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
camera.position.z = 30;
scene.add(camera);

//canvas
const canvas = document.querySelector('.webgl');
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;

//renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setClearColor(0x1f1e1c, 1);
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

//resize

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};

loop();

//timeLine

const tl = gsap.timeline({ defaults: { duration: 5 } });
tl.fromTo(camera.position,{z:0},{z:30})

/*gsap.to(bgMesh.rotation, {
  duration: 2000,
  z:360,
  //x:360,
  //y:0.95,
  repeat:-1,
  yoyo:true
});*/