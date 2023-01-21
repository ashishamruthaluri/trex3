var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacle
var cloud, cloudsGroup, cloudImage;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var obstacleGroup,cloudGroup
var newImage;
var PLAY=1
var END=0
var gameState=PLAY
var score=0
var jumpSound
var dieSound
var chackpointSound
var message="Ashish"
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
obstacle1=loadImage("obstacle1.png")
obstacle2=loadImage("obstacle2.png")
obstacle3=loadImage("obstacle3.png")
obstacle4=loadImage("obstacle4.png")
obstacle5=loadImage("obstacle5.png")
obstacle6=loadImage("obstacle6.png")
restartImage=loadImage("restart.png")
gameOverImage=loadImage("gameOver.png")
jumpSound=loadSound("jump.mp3")
dieSound=loadSound("die.mp3")
checkpointSound=loadSound("checkpoint.mp3")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  
   obstacleGroup= new Group()
   cloudGroup=new Group()

  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
   trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(width/2,height,width,2);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 trex.setCollider("circle",0,0,40)
  trex.debug=false
  restart=createSprite(width/2,height/2)
  restart.addImage(restartImage)
  gameOver=createSprite(width/2,height/2- 50)
  gameOver.addImage(gameOverImage)
  gameOver.scale=0.5
  restart.scale=0.5

 
  invisibleGround = createSprite(width/2,height-10,width,125);
  invisibleGround.visible = false;
  
  console.log("Hello"+ 5)
  
  
}

function draw() {
  background(180);
  console.log(message)

  text("Score: "+score ,500,50)
  score=score+Math.round(getFrameRate()/60)



  if(gameState==PLAY){
    gameOver.visible=false
 restart.visible=false
    if((touches.lenght > 0 || keyDown("space")) && trex.y >= 100) {
      trex.velocityY = -10;
      jumpSound.play()
      trex.velocity = -10
      touches = []  
    }
    trex.velocityY = trex.velocityY + 0.8
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    ground.velocityX = -(4+score/100)
    if(trex.isTouching(obstacleGroup)){
    gameState=END
    dieSound.play()
    
    }
    if(score%100==0&&score>0){
    checkpointSound.play()
    }
    spawnClouds();
    spawnObstacles()
  }
else if(gameState==END){
  gameOver.visible=true
  restart.visible=true
ground.velocityX=0
ground.velocityY=0
trex.changeAnimation("collided",trex_collided)
trex.velocityY=0
obstacleGroup.setLifetimeEach(-1)
cloudGroup.setLifetimeEach(-1)
cloudGroup.setVelocityXEach(0)
obstacleGroup.setVelocityXEach(0)
score=0
trex.collide(invisibleGround);

  
  //spawn the clouds
 if(touches.lenght>0 || mousePressedOver(restart)){
 //console.log("restart game")
 reset()
 touches= []
 }
}
 
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    //assigning lifetime to the variable
    cloud.lifetime = 200
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    cloudGroup.add(cloud)
    }

}
function spawnObstacles () {
if(frameCount % 60 == 0){
obstacle=createSprite(600,165,10,40)
obstacle.velocityX=-(6+score/100)
obstacle.scale=0.5
obstacle.lifetime=100
//generating random obstacles
var rand=Math.round(random(1,6))
switch(rand){
case 1 : obstacle.addImage(obstacle1)
         break;
case 2 : obstacle.addImage(obstacle2)
         break;
case 3 : obstacle.addImage(obstacle3)
         break;
case 4 : obstacle.addImage(obstacle4)
         break;
case 5 : obstacle.addImage(obstacle5)
         break;
case 6 : obstacle.addImage(obstacle6)
         break;
default:break
}
obstacleGroup.add(obstacle)
}
}
function reset(){
gameState=PLAY
obstacleGroup.destroyEach()
cloudGroup.destroyEach()
trex.changeAnimation("running",trex_running)
}















