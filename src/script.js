import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const gui = new GUI();

const canvas = document.querySelector(".webgl");

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, size.width / size.height);
camera.position.y = 1.8;
camera.position.z = 12;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.render(scene, camera);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// DIRECTIONAL LIGHT - START
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.castShadow = true;
directionalLight.shadow.radius = 10;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;

scene.add(directionalLight);

// const directionalLightHelper = new THREE.DirectionalLightHelper(
//   directionalLight
// );

const directionalLightHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
scene.add(directionalLightHelper);

const directionalLightFolder = gui.addFolder("DirectionalLight");
directionalLightFolder.close();

directionalLight.position.x = 0;
directionalLight.position.y = 4;
directionalLight.position.z = 2;

directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.right = 3;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -3;
directionalLight.shadow.camera.near = 2.5;
directionalLight.shadow.camera.far = 6;

directionalLight.shadow.camera.updateProjectionMatrix();
directionalLightHelper.update();

directionalLightFolder.add(directionalLight.position, "x");
directionalLightFolder.add(directionalLight.position, "y");
directionalLightFolder.add(directionalLight.position, "z");

directionalLightFolder
  .add(directionalLight.shadow.camera, "top")
  .onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix();
    directionalLightHelper.update();
  });
directionalLightFolder
  .add(directionalLight.shadow.camera, "right")
  .onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix();
    directionalLightHelper.update();
  });
directionalLightFolder
  .add(directionalLight.shadow.camera, "bottom")
  .onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix();
    directionalLightHelper.update();
  });
directionalLightFolder
  .add(directionalLight.shadow.camera, "left")
  .onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix();
    directionalLightHelper.update();
  });
directionalLightFolder
  .add(directionalLight.shadow.camera, "near")
  .onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix();
    directionalLightHelper.update();
  });
directionalLightFolder
  .add(directionalLight.shadow.camera, "far")
  .onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix();
    directionalLightHelper.update();
  });

directionalLightFolder.add(directionalLightHelper, "visible").name("Helper");
directionalLightFolder.add(directionalLight, "visible").name("Light");

// DIRECTIONAL LIGHT - END

// POINT LIGHT - START

const pointLight = new THREE.PointLight(0xffffff, 2);
const pointLightHelper = new THREE.CameraHelper(pointLight.shadow.camera);

pointLight.castShadow = true;

scene.add(pointLight);
scene.add(pointLightHelper);

pointLight.position.x = -1.2;
pointLight.position.y = 1;
pointLight.position.z = 0;
pointLight.shadow.camera.far = 4;
pointLight.shadow.camera.updateProjectionMatrix();
pointLightHelper.update();

const pointLightFolder = gui.addFolder("PointLight");
pointLightFolder.close();
pointLightHelper.update();

pointLightFolder.add(pointLight.position, "x").step(0.1);
pointLightFolder.add(pointLight.position, "y").step(0.1);
pointLightFolder.add(pointLight.position, "z").step(0.1);

pointLightFolder.add(pointLight.shadow.camera, "near").onChange(() => {
  pointLight.shadow.camera.updateProjectionMatrix();
  pointLightHelper.update();
});
pointLightFolder.add(pointLight.shadow.camera, "far").onChange(() => {
  pointLight.shadow.camera.updateProjectionMatrix();
  pointLightHelper.update();
});

pointLightFolder.add(pointLightHelper, "visible").name("Helper");
pointLightFolder.add(pointLight, "visible").name("Light");

// POINT LIGHT - END

const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
material.side = THREE.DoubleSide;

// PLANE - START
const planeGeometry = new THREE.PlaneGeometry(4, 3.5);
const plane = new THREE.Mesh(planeGeometry, material);
plane.receiveShadow = true;
scene.add(plane);

plane.rotation.x = -Math.PI / 2;
const planeFolder = gui.addFolder("Plane");

planeFolder.add(plane.position, "x").step(0.1);
planeFolder.add(plane.position, "y").step(0.1);
planeFolder.add(plane.position, "z").step(0.1);
planeFolder.add(plane.rotation, "x").step(0.1).name("Rotation x");
planeFolder.add(plane.rotation, "y").step(0.1).name("Rotation y");
planeFolder.add(plane.rotation, "z").step(0.1).name("Rotation z");
// PLANE - END

// SPHERE - START
const sphereGeometry = new THREE.SphereGeometry(0.5);
const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.castShadow = true;
scene.add(sphere);

sphere.position.y = 0.5;

// SPHERE - END

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
controls.enableDamping = true;

const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
