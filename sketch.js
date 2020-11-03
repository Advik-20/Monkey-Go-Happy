var play = 1;
var end = 0;
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage, bananaGroup;
var ground;
var foodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;

gameState = play;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 400);

  monkey = createSprite(50, 200, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.09;

  ground = createSprite(200, 230, 20000, 5);

  obstacleGroup = new Group();
  foodGroup = new Group();

}


function draw() {
  background("lightblue");

  if (gameState === play) {
    ground.velocityX = -4;
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space") && monkey.y >= 150) {
      monkey.velocityY = -12;
    }

    if (monkey.isTouching(foodGroup)) {
      foodGroup.destroyEach();
      score = score + 1;
    }

    if (monkey.isTouching(obstacleGroup)) {
      gameState = end;
    }

    monkey.velocityY = monkey.velocityY + 0.8;

    banana();
    obstacle();
  }

  if (gameState === end) {
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    ground.velocityX = 0;
  }

  drawSprites();


  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate());
  text("Survival Time: " + survivalTime, 100, 50);
  text("Score:" + score, 300, 50);

  monkey.collide(ground);
}

function banana() {
  if (frameCount % 60 === 0) {
    var banana = createSprite(800, 200, 10, 10);
    banana.y = Math.round(random(50, 180));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;
    banana.lifetime = 200;
    foodGroup.add(banana);
  }
}

function obstacle() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(800, 210, 20, 20);
    obstacle.scale = 0.01;
    obstacle.addImage(obstaceImage);
    obstacle.velocityX = -4;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
}
