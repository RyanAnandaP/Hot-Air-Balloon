import * as THREE from './three.js-master/build/three.module.js'
import {OrbitControls} from './three.js-master/examples/jsm/controls/OrbitControls.js'
import { TextGeometry } from "./three.js-master/examples/jsm/geometries/TextGeometry.js" 
import { FontLoader } from "./three.js-master/examples/jsm/loaders/FontLoader.js"
import {GLTFLoader} from './three.js-master/examples/jsm/loaders/GLTFLoader.js'

var scene = new THREE.Scene();


//Initialize
const FOV = 50,NEAR = 1,FAR = 5000
const ASPECT = window.innerWidth/window.innerHeight
//Camera
var fixedCam = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR)
var freeCam = new THREE.PerspectiveCamera(FOV,ASPECT,NEAR,FAR)

fixedCam.position.set(-180, 30, 0)
freeCam.position.set(-200,50,0)
fixedCam.lookAt(0,30,0)
freeCam.lookAt(0,0,0)


var currentCam = fixedCam


//Renderer
var renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap


//Orbit Control
var orbitControl = new OrbitControls(freeCam,renderer.domElement)
orbitControl.update()

//Ambient Light
var ambientLight = new THREE.AmbientLight("#404040",1)

//SpotLight 1
var spotLight1 = new THREE.SpotLight("#FFFFFF",1,300)
spotLight1.castShadow = true
spotLight1.position.x = -100
spotLight1.position.z = 100
spotLight1.target.position.set(0,50,0)
spotLight1.target.updateMatrixWorld();
scene.add(spotLight1)

//SpotLight 2
var spotLight2 = new THREE.SpotLight("#FFFFFF",1,300)
spotLight2.castShadow = true
spotLight2.position.x = -100
spotLight2.position.z = 100
spotLight2.target.position.set(0,50,0)
spotLight2.target.updateMatrixWorld();
scene.add(spotLight2)

//SpotLight 3
var spotLight3 = new THREE.SpotLight("#FFFFFF",0.5,300)
spotLight3.castShadow = true
spotLight3.position.y = 200
spotLight3.angle = Math.PI/4 + Math.PI/6
spotLight2.target.position.set(0,0,0)
spotLight3.target.updateMatrixWorld();
scene.add(spotLight3)




//Change Camera
var changeCamera = (e) => {
    
    //Hit Space on Keyboard
    if(e.keyCode == 32){
        if(currentCam == fixedCam) currentCam = freeCam
        else currentCam = fixedCam
    }
}



//Add Objects
scene.add(ambientLight)

//ground
var groundGeometry = new THREE.PlaneGeometry(1000,1000);
var groundMaterial = new THREE.MeshStandardMaterial({
    color: "#8c3b0c"
    });
var groundMesh = new THREE.Mesh(groundGeometry,groundMaterial);
groundMesh.position.set(0,-5,0)
groundMesh.rotateX(-Math.PI/2);
groundMesh.recieveShadow = true;
scene.add(groundMesh);

//hot air balloon
var balloonModel
var balloonLoader = new GLTFLoader()
balloonLoader = balloonLoader.load('./assets/model/scene.gltf',function(model){
    balloonModel = model
    balloonModel.scene.traverse(function(node){
    if(node.isMesh){
        node.castShadow = true
        node.receiveShadow = true
    }
   });
   balloonModel.scene.scale.set(0.1,0.1,0.1)
   balloonModel.scene.position.y = 3
    scene.add(balloonModel.scene)
});



var loader = new THREE.TextureLoader();
//Crate A
let createCrateA = () => {
    let texture = loader.load('./assets/texture/crate1.jpeg')
    let geometry = new THREE.BoxGeometry(10,10,10)
    let material = new THREE.MeshPhongMaterial()
    material.map = texture
    let mesh = new THREE.Mesh(geometry,material)
    mesh.position.set(-30,0,-40)
    //mesh.rotation.y = -Math.PI/4
    mesh.receiveShadow = true;
    scene.add(mesh)

    geometry = new THREE.BoxGeometry(5,5,5)
    mesh = new THREE.Mesh(geometry,material)
    mesh.position.set(-30,-2,-48)
    mesh.rotation.x = Math.PI/6
    mesh.receiveShadow = true;
    scene.add(mesh)

    geometry = new THREE.BoxGeometry(10,15,10)
    mesh = new THREE.Mesh(geometry,material)
    mesh.position.set(-40,-2.5,30)
    mesh.rotation.y = -Math.PI/4
    mesh.receiveShadow = true;
    scene.add(mesh)
}

//Crate B
let createCrateB = () => {
    let texture = loader.load('./assets/texture/crate2.jpeg')
    let geometry = new THREE.BoxGeometry(20,20,20)
    let material = new THREE.MeshPhongMaterial()
    material.map = texture
    let mesh = new THREE.Mesh(geometry,material)
    mesh.position.set(30,5,40)
    mesh.rotation.y = Math.PI/3
    mesh.receiveShadow = true;
    scene.add(mesh)

    geometry = new THREE.BoxGeometry(40,15,30)
    mesh = new THREE.Mesh(geometry,material)
    mesh.position.set(30,2.5,-60)
    mesh.rotation.y = -Math.PI/6
    mesh.receiveShadow = true;
    scene.add(mesh)
}
//Tire
let createTire = () => {
    let geometry = new THREE.TorusGeometry(5,2.5,16,100)
    let material = new THREE.MeshPhongMaterial({
        color: '#3e444c'
    })
    let mesh = new THREE.Mesh(geometry,material)
    mesh.position.set(-70, -5, 0)
    mesh.rotation.y = Math.PI/2
    mesh.castShadow = true;
    scene.add(mesh)

    mesh = new THREE.Mesh(geometry,material)
    mesh.position.set(-65, -5, 20)
    mesh.rotation.y = Math.PI/2 + (Math.PI/9*1)
    mesh.castShadow = true;
    scene.add(mesh)

    mesh = new THREE.Mesh(geometry,material)
    mesh.position.set(-65, -5, -20)
    mesh.rotation.y = -(Math.PI/2 + (Math.PI/9*1))
    mesh.castShadow = true;
    scene.add(mesh)

    mesh = new THREE.Mesh(geometry,material)
    mesh.position.set(-55, -5, 40)
    mesh.rotation.y = Math.PI/2 + (Math.PI/9*2)
    mesh.castShadow = true;
    scene.add(mesh)

    mesh = new THREE.Mesh(geometry,material)
    mesh.position.set(-55, -5, -40)
    mesh.rotation.y = -(Math.PI/2 + (Math.PI/9*2))
    mesh.castShadow = true;
    scene.add(mesh)
}

//Poles 1

var poleGeometry = new THREE.CylinderGeometry(1,1,50,16)
var poleMaterial = new THREE.MeshPhongMaterial({color: "#646FD4"});
var poleMesh1 = new THREE.Mesh(poleGeometry,poleMaterial);
poleMesh1.castShadow = true;
poleMesh1.recieveShadow = true;
poleMesh1.position.set(0,15,35);
poleMesh1.rotation.x = -Math.PI/6;
scene.add(poleMesh1);


var countB = 0

//Poles 2
var poleMesh2 = new THREE.Mesh(poleGeometry,poleMaterial);
poleMesh2.position.set(0,15,-35);
poleMesh2.rotation.x = Math.PI/6;
scene.add(poleMesh2);



var balloonPaused = true

//Mouse Left Clicked
window.onmousedown = (e) => {
    var mouseCoordinate = new THREE.Vector2()
    mouseCoordinate.x = (e.clientX/window.innerWidth) *2 -1
    mouseCoordinate.y = (-e.clientY/window.innerHeight)*2+1

    var raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(mouseCoordinate,currentCam)
    //Return Array
    var intersects = raycaster.intersectObjects(scene.children)
    if(intersects.length > 0){
        if(intersects[0].object.name == "button"){
            if(balloonPaused){
                intersects[0].object.material.color.set("#fada5e")
                if(countB == 0){
                        poleMesh1.rotation.x += 0.5
                        poleMesh2.rotation.x -= 0.5
                        balloonModel.scene.rotation.x += 0.05
                        countB = 1
                        
                    
                }
                balloonPaused = false
            }else{
                intersects[0].object.material.color.set("#dc143c")
                balloonPaused = true 
                countB = 1    
            }
        }
        
    }
    
}

//Animate
var balloonFlying = () => {
    if(!balloonPaused){
        balloonModel.scene.position.y += 1
        balloonModel.scene.rotation.y += 0.05
    }else{
        renderer.render(scene,currentCam)
    }
    requestAnimationFrame(balloonFlying)
}



//Button
let createButton = ()=>{
    var buttonGeometry = new THREE.BoxGeometry(10,16.5,14.5)
    var buttonMaterial = new THREE.MeshPhongMaterial({
        color: "#848482"
    });
    var buttonMesh = new THREE.Mesh(buttonGeometry, buttonMaterial);
    buttonMesh.castShadow = true;
    buttonMesh.receiveShadow = true;
    buttonMesh.position.set(-43,3,65);
    buttonMesh.rotation.y = -Math.PI/6
    scene.add(buttonMesh);

    buttonGeometry = new THREE.SphereGeometry(4.5,32,16)
    buttonMaterial = new THREE.MeshPhongMaterial({
        color: "#dc143c"
    });
    buttonMesh = new THREE.Mesh(buttonGeometry,buttonMaterial);
    buttonMesh.castShadow = true;
    buttonMesh.recieveShadow = true;
    buttonMesh.position.set(-46,3,63);
    buttonMesh.name = "button"
    scene.add(buttonMesh);
    
}

//text
let createText = () =>{
    const textLoader = new FontLoader() 
  textLoader.load("./three.js-master/examples/fonts/helvetiker_bold.typeface.json",font =>{
    const textGeometry = new TextGeometry("Click Me!",{
      font: font,
      size: 10,
      //ketebalan font 
      height:2
      
    })
    const textMaterial1 = new THREE.MeshPhongMaterial({
        side: THREE.FrontSide,
      color: "#FF5B00"
    })
    const textMaterial2 = new THREE.MeshPhongMaterial({
            side: THREE.Side,
          color: "#990000"
        })
    const textMesh = new THREE.Mesh(textGeometry,[textMaterial1,textMaterial2])
    textMesh.receiveShadow = true;
    textMesh.castShadow = true;
    textMesh.position.set(-35, 25, 50)
    textMesh.rotation.y = (Math.PI*3)+1
    scene.add(textMesh)
})
}

//Cube Mapping
var createCubeMapping = () => {
    var cubeGeo = new THREE.BoxGeometry(1000,1000,1000)
    var cubeMaterials = [
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("./assets/skybox/dawn_right.png"), side:THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("./assets/skybox/dawn_left.png"), side:THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("./assets/skybox/dawn_top.png"), side:THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("./assets/skybox/dawn_bottom.png"), side:THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("./assets/skybox/dawn_front.png"), side:THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("./assets/skybox/dawn_back.png"), side:THREE.DoubleSide})
    ]
    var cubeMesh = new THREE.Mesh(cubeGeo,cubeMaterials)
    scene.add(cubeMesh);
}

//Event Listener
window.addEventListener("keydown",changeCamera)

//Render
var render = () => {

    requestAnimationFrame(render)
    orbitControl.update()
    renderer.render(scene, currentCam)
}



createCrateA()
createCrateB()
createTire()
createButton()
createText()
createCubeMapping()
balloonFlying()
render()
