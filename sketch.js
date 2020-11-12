//Create variables here
var database;

var dog, dogImg, happyDog;

var foodS, foodStock;

function preload()
{
  //load images here
  dogImg = loadImage("dogImg1.png");
  happyDog = loadImage("dogImg.png");
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();
  
  dog = createSprite(250, 250);
  dog.addImage(dogImg);
  dog.scale = 0.2

  

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {  

  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  

  drawSprites();
  //add styles here

  textSize(20);
  fill("white");
  text("Press the UP key to feed the hungry dog", 75, 100);
  text("Milk bottles left : " + foodS, 175, 375);
  text("NOTE! If you see undefined, do not press the up arrow ", 10, 450);
  text("key. Wait until the number of bottles appear", 60, 480);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x <= 0){
    x = 0;
  } else {
    x = x - 1;
  }

  database.ref('/').update({
    Food : x
  })
}



