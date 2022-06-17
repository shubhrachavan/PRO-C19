var boy, boyImg;
var ground, groundImg, invisibleground;
var cactus, cactusImg, cactusGroup;
var gameover, gameoverImg, restart, restartImg;
var score;
var gameState="play"

function preload(){
   boyImg = loadImage("boy.png")
   groundImg = loadImage("ground.jpg")
   cactusImg = loadImage("cactus.png")
   gameoverImg = loadImage("gameover.png")
   restartImg = loadImage("restart.png")

}

function setup() {
   createCanvas(windowWidth,windowHeight)

   ground = createSprite(1500, 300)
  
  
   boy = createSprite(60,height-175,20,20)
   boy.addImage("boy",boyImg)
   boy.scale=0.3
   boy.setCollider("rectangle",-50,100,170,550);
   //boy.debug=true
   
   invisibleground = createSprite(width,height-145,2600,20)
   invisibleground.velocityX =-3
   invisibleground.visible = false

   gameover= createSprite(width/2,height/2-60)
   gameover.addImage("gameover",gameoverImg)
   gameover.scale=0.1
   gameover.visible=false

   restart = createSprite(width/2,height/2)
   restart.addImage("restart",restartImg)
   restart.scale = 0.1
   restart.visible=false

   cactusGroup = createGroup()

   score = 0
}

function draw() {
   background(groundImg)
   textSize(15)
   fill(0)
   text("Score : " +score, width/2+400,50)

 boy.collide(invisibleground);
 if(gameState=="play"){
   score = score+Math.round(getFrameRate()/60)
   cactusGroup.setVelocityXEach(-(3+3*score/100));

   if(ground.x<400){
      ground.x=200
   }
   if(keyDown("space")){
      boy.velocityY=-5
   }
   boy.velocityY=boy.velocityY+0.8
    
     if(cactusGroup.isTouching(boy)){
      gameState="end";
     }
   }

   else if(gameState=="end"){
      gameover.visible=true
      restart.visible=true
      cactusGroup.setLifetimeEach(-1)
      cactusGroup.setVelocityXEach(0)
      invisibleground.velocityX=0
      boy.y = height-268
   }

   spawnCactus();
   restartclick();
   drawSprites()
}

function spawnCactus(){
   if (frameCount % 120 === 0){
      cactus = createSprite(width,height-200);
      cactus.addImage("cactus",cactusImg);
      cactus.scale=0.3;
      cactus.velocityX = -3;
      cactus.setCollider("circle",0,50,100)
      //cactus.debug=true
      cactus.lifetime = 500;
      
      cactusGroup.add(cactus)
   }
}

function restartclick(){
   if(mousePressedOver(restart)){
      gameState = "play"

      gameover.visible = false
      restart.visible = false
      
      cactusGroup.destroyEach();

      score = 0
   }
}