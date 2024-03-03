import * as THREE from "three"
//import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/**********
** SETUP **
***********/
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

/**********
** SCENE **
***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.set(9.9, 3.5, 10.5)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/***********
** MESHES **
************/
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('pink'),
    side: THREE.DoubleSide
})

// caveWall
const caveWallGeometry = new THREE.PlaneGeometry(10, 5)
const caveWall = new THREE.Mesh(caveWallGeometry, caveMaterial)
caveWall.rotation.y = Math.PI * 0.5
caveWall.position.set(-5, 0, 0)
caveWall.receiveShadow = true
scene.add(caveWall)

// barrierWall
const barrierWallGeometry = new THREE.PlaneGeometry(10, 2)
const barrierWall = new THREE.Mesh(barrierWallGeometry, caveMaterial)
barrierWall.rotation.y = Math.PI * 0.5
barrierWall.position.set(5, -1.5, 0)
scene.add(barrierWall)

// caveFloor
const caveFloorGeometry = new THREE.PlaneGeometry(10, 10)
const caveFloor = new THREE.Mesh(caveFloorGeometry, caveMaterial)
caveFloor.rotation.x = Math.PI * 0.5
caveFloor.position.set(0, -2.5, 0)
scene.add(caveFloor)

// OBJECTS
// Rectangle
const rectangleGeometry = new THREE.BoxGeometry(1, 4.2, 4)
const rectangleMaterial = new THREE.MeshNormalMaterial()
const rectangle = new THREE.Mesh(rectangleGeometry, rectangleMaterial)
rectangle.position.set(6, 1.5, 8)
rectangle.castShadow = true
scene.add(rectangle)

//Ball
const sphereGeometry = new THREE.SphereGeometry()
const sphereMaterial = new THREE.MeshNormalMaterial()
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.position.set(8, 1.5, 0)
sphere.castShadow = false 
scene.add(sphere)

// SUN
const sunGeometry = new THREE.SphereGeometry()
const sunMaterial = new THREE.MeshLambertMaterial({
    emissive: new THREE.Color ('pink'),
    emissiveIntensity: 200
})
const sun = new THREE.Mesh(sunGeometry, sunMaterial)
scene.add(sun)

/***********
** LIGHTS **
************/
/** 
// Ambient Light
const ambientLight = new THREE.AmbientLight(
    new THREE.Color('white')
)
scene.add(ambientLight)
**/

// Direcional Light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('cornflowerblue'),
    0.5
)
directionalLight.target = caveWall
directionalLight.position.set(13, 2.5, 0)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
scene.add(directionalLight)

// Directional Light Helper
//const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(directionalLightHelper)

/*******
** UI **
********/
//contorls commented out start here
//const ui = new dat.GUI()

//const uiObject = {}

//uiObject.reset = () =>
//{
    //directionalLight.position.set(8.6, 1.7, 0)
//}

// Directional Light
//const lightPositionFolder = ui.addFolder('Directional Light Position')

//lightPositionFolder
    //.add(directionalLight.position, 'x')
    //.min(-10)
    //.max(20)
    //.step(0.1)

//lightPositionFolder
    //.add(directionalLight.position, 'y')
    //.min(-10)
    //.max(10)
    //.step(0.1)

//lightPositionFolder
    //.add(directionalLight.position, 'z')
    //.min(-10)
    //.max(10)
    //.step(0.1)

//lightPositionFolder
    //.add(uiObject, 'reset')
    //.name('Reset position')

/*********************
** DOM INTERACTIONS **
*********************/
//domObject
const domObject = {
    part: 1,
    firstChange: false,
    secondChange: false,
    thirdChange: false, 
    fourthChange: false, 

}
// continue-reading 
document.querySelector('#continue-reading').onclick = function(){
    document.querySelector('#part-two').classList.remove('hidden')
    document.querySelector('#part-one').classList.add('hidden')
    domObject.part = 2
}

// restart
document.querySelector('#restart').onclick = function(){
   document.querySelector('#part-two').classList.add('hidden')
   document.querySelector('#part-one').classList.remove('hidden')
   domObject.part = 1

   // reset domObject chnages 
   domObject.firstChange = false 
   domObject.secondChange = false 
   domObject.thirdChange = false 
   domObject.fourthChange = false 

   // reset shapes 
   rectangle.position.set(6, 1.5, 8)
   sphere.position.set(8, 1.5, 0)
   sphere.castShadow = false 


}

// first change 
document.querySelector('#first-change').onclick = function(){
    domObject.firstChange = true
}

// second change 
document.querySelector('#second-change').onclick = function(){
    domObject.secondChange = true
}

// third change 
document.querySelector('#thrid-change').onclick = function(){
   domObject.thirdChange = true 
}

//fourth change 
document.querySelector('#fourth-change').onclick = function(){
    domObject.fourthChange = true 
}

/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

// Animate
const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Animate Objects
    //rectangle.rotation.y = elapsedTime
    //rectangle.position.z = Math.sin(elapsedTime * 2) * 4
    //sphere.position.z = Math.sin(elapsedTime * 10) * (4, 2)

    // Update directionalLightHelper
    //directionalLightHelper.update()

    // Update sun position to match directionalLight position
    sun.position.copy(directionalLight.position)

    //console.log(camera.position)

    // Controls
    controls.update()



    // DOM INTERACTIONS
    // part 1
    if(domObject.part === 1){
        camera.position.set(5.3, 0.30, -0.28)
        camera.lookAt(-0.8, 0, 1.5)
    }

    // part 2
    if(domObject.part === 2){
        camera.position.set(10, 4.6, 13.1)

    }

    // first-change 
    if(domObject.firstChange){
        rectangle.position.z = Math.sin(elapsedTime * 2) * 4
    }

    // second-change 
    if(domObject.secondChange){
        sphere.position.z = Math.sin(elapsedTime * 10) * (4, 2)
        sphere.castShadow = true
    }

    // third-change 
    if(domObject.thirdChange){
        rectangle.position.z = -2
        sphere.position.z = 3
    }

    // fourth-change 
    if(domObject.fourthChange){
        rectangle.position.y = Math.sin(elapsedTime * 2) * 2
        sphere.position.y = Math.sin(elapsedTime * 10) * (2, 2)
    }

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()