import * as THREE from "three"
import { GLTFLoader } from "GLTFLoader"

/**********
** SETUP **
***********/
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

let xDistance = 2
let meshSize = 1

// Mobile
if(sizes.aspectRatio < 1){
    xDistance = 1
    meshSize = 1
}

// Resizing
window.addEventListener('resize', () =>
{
    // Update Sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.aspectRatio = window.innerWidth / window.innerHeight
    
    // Update camera
    camera.aspect = sizes.aspectRatio
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

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
camera.position.set(0, 0, 5)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

/***********
** LIGHTS **
************/
// directionalLight
const directionalLight = new THREE.DirectionalLight(0x404040, 100)
scene.add(directionalLight)

/***********
** MESHES **
************/
// Ring
const octGeometry = new THREE.RingGeometry(0.5, 1.5, 5)
const octMaterial = new THREE.MeshNormalMaterial()
const oct = new THREE.Mesh(octGeometry, octMaterial)

oct.position.set(-xDistance, 0, -3)
scene.add(oct)

// Ring 2
const oct2Geometry = new THREE.RingGeometry(0.5, 1.5, 5)
const oct2Material = new THREE.MeshNormalMaterial()
const oct2 = new THREE.Mesh(oct2Geometry, oct2Material)

oct2.position.set(-4, 1, -5)
scene.add(oct2)

/*****************
** GLTF MODELS **
*****************/
const loader = new GLTFLoader()
let model = null

/*********************
** DOM INTERACTIONS **
**********************/
const domObject = {
    part: 1
}

// Part 1 click
document.querySelector('#click1').onclick = function(){
    document.querySelector('#first').classList.add('hidden')
    document.querySelector('#second').classList.remove('hidden')
    domObject.part = 2
}

// Part 2 click
document.querySelector('#click2').onclick = function(){
    document.querySelector('#second').classList.add('hidden')
    document.querySelector('#third').classList.remove('hidden')
    domObject.part = 3
}

// Part 3 click
document.querySelector('#click3').onclick = function() {
    document.querySelector('#third').classList.add('hidden')
    document.querySelector('#first').classList.remove('hidden')
    domObject.part = 1
}

/***********
** CURSOR **
************/
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', () =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -event.clientY / sizes.height + 0.5
    
})

/*******************
** ANIMATION LOOP **
*******************/
const clock = new THREE.Clock()

// Animate
const animation = () => {
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    
    // DOM INTERACTIONS - Oct
    // Part 2
    if(domObject.part === 2){
        //console.log('play part 2 animation')
        if(oct.rotation.y <= Math.PI * 0.5){
            oct.rotation.y += 0.02
        }
    }
    // Part 3
    if(domObject.part === 3){
        //console.log('play part 3 animation')
        if(oct.rotation.z <= Math.PI * 0.5){
            oct.rotation.z += 0.02
        }
    }

    // Reset
    if(domObject.part == 1){
        //console.log('play reset animation')
        if(oct.rotation.y >= 0 && oct.rotation.z >= 0){
            oct.rotation.y -= 0.02
            oct.rotation.z -= 0.02
        }
    }

    // new obj
    if(domObject.part === 2){
        //console.log('play part 2 animation')
        if(oct2.rotation.y <= Math.PI * 0.5){
            oct2.rotation.y += 0.02
        }
    }
    // Part 3
    if(domObject.part === 3){
        //console.log('play part 3 animation')
        if(oct2.rotation.z <= Math.PI * 0.5){
            oct2.rotation.z += 0.02
        }
    }

    // Reset
    if(domObject.part == 1){
        //console.log('play reset animation')
        if(oct2.rotation.y >= 0 && oct2.rotation.z >= 0){
            oct2.rotation.y -= 0.02
            oct2.rotation.z -= 0.02
        }
    }

    // CURSOR CONTROL - MODEL
    if(model)
    {
        model.rotation.y = cursor.x * 2
        model.rotation.x = cursor.y + .25
    }

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()