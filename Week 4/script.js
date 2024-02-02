import * as THREE from "three" 
import * as dat from 'lil-gui'
import { OrbitControls } from "OrbitControls"


/**********
** SETUP **
**********/
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

/**********
** SCENE **
**********/
// Canvas 
const canvas = document.querySelector('.webgl')

// Scene 
const scene = new THREE.Scene()
scene.background = new THREE.Color('coral')

// Camera 
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)

camera.position.set(2, 2, 4)
scene.add(camera)

// Renderer 
const renderer = new THREE.WebGLRenderer({
    canvas: canvas 
})
renderer.setSize(sizes.width, sizes.height)

// Controls 
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/***********
** MESHES **
***********/
// Plane
const planeGeometry = new THREE.PlaneGeometry(10, 10, 50, 50)
const planeMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('White'),
    side: THREE.DoubleSide,
    wireframe: true
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)

plane.rotation.x = Math.PI * 0.5
scene.add(plane)

// testSphere
const geometry = new THREE.SphereGeometry(1)
const material = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(geometry, material)

//testSphere 2
const geometry2 = new THREE.SphereGeometry(1)
const testSphere2 = new THREE.Mesh(geometry2, material)

testSphere2.position.x = 3

//testSphere 3
const geometry3 = new THREE.SphereGeometry(1)
const testSphere3 = new THREE.Mesh(geometry3, material)

testSphere3.position.x = -3

scene.add(testSphere)
scene.add(testSphere2)
scene.add(testSphere3)

/*******
** UI **
*******/
// UI
const ui = new dat.GUI()

// UI Object
const uiObject = {}
uiObject.play = false

const uiObject2 = {}
uiObject2.play = false

const uiObject3 = {}
uiObject3.play = false

// Plane UI
const planeFolder = ui.addFolder('Plane')

planeFolder.
    add(planeMaterial, 'wireframe')

// Sphere UI
const sphereFolder = ui.addFolder('Sphere')

const animationFolder = ui.addFolder('Sphere Animations')

sphereFolder
    .add(testSphere3.position, 'y')
    .min(-5)
    .max(5)
    .step(0.1)
    .name('Left Height')
sphereFolder 
    .add(testSphere.position, 'y')
    .min(-5)
    .max(5)
    .step(0.1)
    .name('Center Height')
sphereFolder
    .add(testSphere2.position, 'y')
    .min(-5)
    .max(5)
    .step(0.1)
    .name('Right Height')

animationFolder
    .add(uiObject3, 'play')
    .name('Animate Left Sphere')

animationFolder
    .add(uiObject, 'play')
    .name('Animate Center Sphere')

animationFolder
    .add(uiObject2, 'play')
    .name('Animate Right Sphere')

/*******************
** ANIMATION LOOP **
*******************/
const clock = new THREE.Clock()

// Animate 
const animation = () =>
{
    // Return elapsedTime 
    const elapsedTime = clock.getElapsedTime()

    // Animate Sphere
    if(uiObject.play)
    {
        testSphere.position.y = Math.sin(elapsedTime * 2) * 2
    }

    if(uiObject2.play)
    {
        testSphere2.position.y = Math.sin(elapsedTime * 3) * 2
    }

    if(uiObject3.play)
    {
        testSphere3.position.y = Math.sin(elapsedTime * 1) * 2
    }

    // Controls
    controls.update()

    // Renderer 
    renderer.render(scene, camera)

    // Request next frame 
    window.requestAnimationFrame(animation)
}

animation()