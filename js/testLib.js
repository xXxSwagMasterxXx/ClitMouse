var mouse = {
	x : 0,
	y : 0,
	dx : 0,
	dy : 0,
	tIdle : 0,
	tTime : 0,
	prevMV :  new THREE.Vector3( 0, 0, 0 ),
	consume : function(){ this.dx = 0;
						  this.dy = 0;}
	};
var pressed = new Array(222);
var keys ={
   
   Down : 40,
   Right : 39,
   Up : 38,
   Left : 37,
   
   Space : 32,
   
   E : 69,
   
   Q : 81
};
   
for(var i =0; i < pressed.length; ++i){
   pressed[i] = false;
}
document.body.onkeydown =
   ( function () {
      //console.log( "keydown: " + event.keyCode );
      pressed[ event.keyCode ] = true;
   } );
document.body.onkeyup =
   ( function () {
      pressed[ event.keyCode ] = false;
   } );

function onDocumentMouseMove( event ) {
	mouse.x = event.x;
	mouse.y = event.y;
	mouse.tIdle = 0;
	mouse.dx = event.movementX;
	mouse.dy = event.movementY;
	//console.log( "mouse moved fucker" );
	
}
 document.addEventListener( 'mousemove', onDocumentMouseMove, false );
 
function positive( x ){
	if (x < 0){
		return x;
	}
	return x;
}
/* function min( a, b ){
	if( b < a){
		return b;
	}
	return a;
 }
  function max( a, b ){
	if( b > a){
		return b;
	}
	return a;
 }*/