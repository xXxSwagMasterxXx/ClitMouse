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
var maxMouseAr = 100;
var minMouseAr = 10;
var kept = minMouseAr;
var p50Arousal = 2000;
var posArray = [];
var percentO = 0;
var pleasure = 0;
var arousal = 0;
var fukU = 0;
var dFukU = 2;
var fAvg = 5;
var FUKSCALE = 1/ 100000;
var Tcatastrophic = 15; // 18 sec 

function getFuk(){
	dFukU -=0.001*fukU;
   
   fukU = fukU* (1 - (1 / 10000 ));
   fukU += dFukU * (1+ (Math.random()/2));
   
   fAvg = ( 99*fAvg +  Math.abs(fukU)  )/100;
   if( fAvg < 2){
		dFukU = dFukU*100;
   }
   if( fukU <0){
	return 2* FUKSCALE * fukU;
   }else{
	return FUKSCALE* fukU;
   }
   
}

function setArousal( x ){
	arousal += x;
	arousal = positive( arousal );
}

function setPercentO( x ){
	
	x = Math.min( 1, x );
	x = Math.max( 0.00001, x )
	percentO = x / ( p50Arousal/ ( arousal  + p50Arousal ) );
	console.log("percentO:" + percentO );

	plBarG.scale.set(1,percentO,1);
	plBarG.position.y = (plMax/2 * percentO ) - plMax/2;
	//plBarR.scale.set(1,(1-x),1);
}
setPercentO( 0 );


var swegA = new Audio('audio/sweg.wav');

var whiteNoize = new Audio('audio/whiteNoize.wav');
var ohYes = new Audio('audio/ohYes.wav');
var yessQuiet = new Audio('audio/yessQuiet.wav');
var YESSSSS = new Audio('audio/YESSSSS.wav');
var ohhhYessss = new Audio('audio/ohhhYessss.wav');

whiteNoize.play();
whiteNoize.onended = function(){
	whiteNoize.play();
};

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
	setArousal(-mouse.tIdle/(1000*Tcatastrophic));
	//console.log("stationary");
	//console.log( " mousedx=" + mouse.dx + " mouse dy=" + mouse.dy);
	var MV = new THREE.Vector3(  mouse.dx, mouse.dy, 0 );
	mouse.consume()
	pushAr( MV );
	var totalRot = getTotalRot();
	console.log( "total rotation: " + totalRot);// + ", " + total.y);
	console.log( "arousal: " + arousal);
	if( !MV.equals( zero )){
		/*dist =  positive(MV.dot( mouse.prevMV ) );
		//var dist = Math.sqrt( mouse.dx * mouse.dx + mouse.dy * mouse.dy );
		mouse.consume();
		//console.log( " dist=" + dist);
		 
		pleasure +=  (1-dist) / 100;
		pleasure = Math.min( 1, pleasure );
		pleasure = Math.max( 0, pleasure )
		
		mouse.prevMV = MV;*/
   }else{
		
   }
   var rnd = getFuk();
   console.log("getFuk:" + rnd );
   pleasure = pleasure * (1 - (1 / 100 )); 
   pleasure += totalRot / 100;
   pleasure += rnd;
   arousal += pleasure;
   kept = minMouseAr + positive( pleasure ) * (maxMouseAr - minMouseAr);
   console.log("pleasure:" + pleasure );
   setPercentO( pleasure );
   if( pleasure >= 0.8 ){
	swegA.play();
   }
   
   //setPercentO( 1/(1+ (mouse.tIdle / 1000)) );
   
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
