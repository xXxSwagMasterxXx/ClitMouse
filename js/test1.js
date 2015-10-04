var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
// green 0x00ff00
//red  0xff0000

var plMax= 10;

var plGeoR = new THREE.BoxGeometry( 1, plMax, 1 );
var plMeshR = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: false } );
var plBarR = new THREE.Mesh( plGeoR, plMeshR );
scene.add( plBarR );

var plGeoG = new THREE.BoxGeometry( 1, plMax, 1 );
var plMeshG = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: false } );
var plBarG = new THREE.Mesh( plGeoG, plMeshG );
scene.add( plBarG );

plBarR.position.z = -10;
plBarG.position.z = -10;

plBarR.position.x = 10;
plBarG.position.x = 10;

var pleasure = 0;
function setPleasure( x ){
	x = Math.min( 1, x );
	x = Math.max( 0, x )
	console.log("pleasure:" + x );

	plBarG.scale.set(1,x,1);
	plBarG.position.y = (plMax/2 * x ) - plMax/2;
	//plBarR.scale.set(1,(1-x),1);
}
setPleasure( 0 );
//cube.velocity = new THREE.Vector3( 0, 0, 0 );

camera.position.z = 5;
/*var vz = new THREE.Vector3( 0, 0, 1 );
//vz.applyEuler( cube.rotation );
var vy = new THREE.Vector3( 0, 1, 0 );
//vy.applyEuler( cube.rotation );
var vx = new THREE.Vector3( 1, 0, 0 );
//vx.applyEuler( cube.rotation );

var grav = new THREE.Vector3( 0, 0, 0 );
grav.copy( vy );
grav.multiplyScalar( -0.005 );*/
var zero = new THREE.Vector3(0,0,0);
var kept = 10;
var posArray = [];

var swegA = new Audio('audio/sweg.wav');

var whiteNoize = new Audio('audio/whiteNoize.wav');
var ohYes = new Audio('audio/ohYes.wav');
var yessQuiet = new Audio('audio/yessQuiet.wav');
var YESSSSS = new Audio('audio/YESSSSS.wav');
var ohhhYessss = new Audio('audio/ohhhYessss.wav');


function pushAr( item ){
	posArray.push( item );
	while( posArray.length > kept){
		posArray.shift();
	}
}
function getDisplacement(){
	var net = 0;// =  new THREE.Vector3( 0, 0, 0 );
	for( var i = 0; i < posArray.length -1; i +=1){
		net += (posArray[i]).angleTo( posArray[i+1] );
		//console.log( "going through array " + posArray[i]);
	}
	return net;
}

function getTotalRot(){
	var f = 0;
	var s = 1;
	var net = 0;
	while (s < posArray.length){
		if( posArray[f].equals( zero ) ){
			f += 1;
			s += 1;
			continue;
		}
		if( posArray[s].equals( zero ) ){
			s += 1;
			continue;
		}
		net += (posArray[f]).angleTo( posArray[s] );
		f = s;
		s += 1;
	}
	return net / posArray.length;
}

var render = function () { 
   requestAnimationFrame( render );   
	//console.log( "idle time: " + mouse.tIdle );
	
	var d = new Date();
	var n = d.getTime();
	mouse.tIdle += n - mouse.tTime;
	mouse.tTime = n;
	//console.log( " mousedx=" + mouse.dx + " mouse dy=" + mouse.dy);
	var MV = new THREE.Vector3(  mouse.dx, mouse.dy, 0 );
	pushAr( MV );
	var totalRot = getTotalRot();
	console.log( "total rotation: " + totalRot);// + ", " + total.y);
	/*if( !MV.equals( zero )){
		dist =  positive(MV.dot( mouse.prevMV ) );
		//var dist = Math.sqrt( mouse.dx * mouse.dx + mouse.dy * mouse.dy );
		mouse.consume();
		//console.log( " dist=" + dist);
		 
		pleasure +=  (1-dist) / 100;
		pleasure = Math.min( 1, pleasure );
		pleasure = Math.max( 0, pleasure )
		
		mouse.prevMV = MV;
   }*/
   pleasure = pleasure * (1 - (1 / 100 )); 
   pleasure += totalRot / 50
   kept = 10 + pleasure * 40;
   setPleasure( pleasure );
   if( pleasure >= 0.8 ){
	swegA.play();
   }
   //setPleasure( 1/(1+ (mouse.tIdle / 1000)) );
   
   /*if( pressed[keys.Right] ){
      cube.rotateOnAxis( vy, -0.1 );      
   }
   if( pressed[keys.Left] ){
      cube.rotateOnAxis( vy, 0.1 );
   }
   if( pressed[keys.Up] ){
      cube.rotateOnAxis( vx, 0.1 );
   }
   if( pressed[keys.Down] ){
      cube.rotateOnAxis( vx, -0.1 );
   }
   if( pressed[keys.Q] ){
      cube.rotateOnAxis( vz, 0.1 );
   }
   if( pressed[keys.E] ){
      cube.rotateOnAxis( vz, -0.1 );
   }*/
   //cube.position.add( b.applyEuler( cube.rotation )  )
   /*var b = new THREE.Vector3(0,0,-0.01);
   b.applyEuler( cube.rotation );
   cube.velocity.multiplyScalar( 0.95 );
   if( pressed[keys.Space] ){
      
      cube.velocity.add( b );
      //cube.position.z -= 0.1;
      console.log( "Rotation:" );
      console.log( " x = " + cube.rotation.x );
      console.log( " y = " + cube.rotation.y );
      console.log( " z = " + cube.rotation.z );
      
   }*/
   //cube.velocity.add( grav );
   //cube.position.add( cube.velocity );
   //cube.rotation.x += 0.01;
   //cube.rotation.y += 0.1;
   //cube.position.z += 0.01;
   /*
   c2.position.copy( cube.position );
   c2.rotation.copy( cube.rotation );
   c2.position.add( b.multiplyScalar(5) );
   */
   renderer.render( scene, camera );
};
render();
