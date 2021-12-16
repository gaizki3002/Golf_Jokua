
        var canvas, ctx, container;
         canvas = document.createElement( 'canvas' );
          ctx = canvas.getContext("2d");
         
    var ball;
	var ang = 0;
    var angulo=ang*Math.PI*2/360;
	const keys = [];
    var vx = 0;
    var vy = 0;
    var golpe = 15;
    var gravity = 0.7;  
    var bounce = 0.5; 
    var xFriction = 0.9;
    var clima = Math.random()*(100-1)+1;
    var viento2 = 0;
	var golpeKont=0;
	const mapa = [];
	const fondoa = new Image();
	fondoa.src = 'nivel 1.png';
	console.log("ball.x");

	
	
	
	   window.addEventListener('keydown', function (fletxarenMugimendua) {
	   keys[fletxarenMugimendua.keyCode]=true;});
	 
	   window.addEventListener('keyup', function (fletxarenMugimendua) {
	   keys[fletxarenMugimendua.keyCode] = false;});

   
    function init(){
      setupCanvas();
      climaF();
      ball = {x:10, y:canvas.height-300, radius:10, status: 0, color:"red"}; 
	  
    }
 
    function draw() {
        ctx.clearRect(0,0,canvas.width, canvas.height); 

		ctx.drawImage(fondoa, 0, 0, canvas.width, canvas.height);
		ctx.beginPath();
		ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, false);
		ctx.fillStyle = ball.color;
		ctx.fill();
		ctx.closePath();
		ballMovement();
		if (vx==0&&vy==0){
        ctx.beginPath();
        canvas_arrow(ctx,ball.x,ball.y,ball.x+100*Math.cos(angulo),ball.y-100*Math.sin(angulo));
        ctx.stroke();}
		ballMovement();
		fletxarenMugimendua();
    }
	  setInterval(draw, 1000/35); 
   
   function canvas_arrow(context, fromx, fromy, tox, toy) {
	  var headlen = 10;
	  var dx = tox - fromx;
	  var dy = toy - fromy;
	  var angle = Math.atan2(dy, dx);
	  ctx.strokeStyle = 'black';
	  context.moveTo(fromx, fromy);
	  context.lineTo(tox, toy);
	  context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
	  context.moveTo(tox, toy);
	  context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
	}

    function ballMovement(){
	ball.x += vx+viento2;
        ball.y += vy;
        vy += gravity;
        

        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0){
            vx *= -1;
        } 
        
        if (ball.y + ball.radius >= canvas.height-250){
          
           ball.y = canvas.height - ball.radius-250;
		   
              vy *= -bounce;
			  
              if(vy<0 && vy>-2.1)
                         vy=0;
					 
             if(Math.abs(vx)<1.1)
                 vx=0;
                 viento2=0;

             xF();
        }        
    }
   	
	function golpeo()
	{
	golpe
	vx = golpe * Math.cos(angulo);
	vy = -(golpe * Math.sin(angulo));	
	golpeKont++;      
	viento2 = viento;
	golpe =0;
	}
	
    function xF(){
             if(vx>0)
                 vx = vx - xFriction;
             if(vx<0)
                 vx = vx + xFriction;
    }

  function setupCanvas() {
	container = document.createElement( 'div' );
	container.className = "container";
 
	canvas.width = window.innerWidth-20; 
	canvas.height = window.innerHeight-20; 
	document.body.appendChild( container );
	container.appendChild(canvas);	
 
	ctx.strokeStyle = "#ffffff";
	ctx.lineWidth =2;	
}

 function fletxarenMugimendua(){
        if (vx!=0)return;
		else if (keys[38])
		{
		ang+=8;
		angulo=ang*Math.PI*2/360;
		}
		if (keys[40])
		{
		ang-=8;
		angulo=ang*Math.PI*2/360;
		}
		if (keys [32]){
		golpeo();}
  }

function climaF(){
      if (clima<50 && clima >= 1){
      xFriction = 0.9;
      gravity = 0.7;
      }
      if (clima<80 && clima >= 50){
      xFriction = 0.9;
      viento= Math.random()*(20)-10;
      gravity = 0.7;
      }
      if (clima >=80){
      xFriction=0.7;
      gravity = 1.5;
      bounce = 0.3;
     }
}
	
