//Create variables here
var dog, dogImg, happyDogImg, database, food, foodStock;

function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/happydogImg.png");
}

function setup() {
	createCanvas(800, 700);
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  foodStock.set(20);
  dog = createSprite(250, 350, 10, 60);
  dog.addImage(dogImg);
  dog.scale = 0.3;
}


function draw() {  
  background("green");
  if(food!== undefined){
    textSide(20);
    fill(255);
    text("Note: Press UP ARROW to feed Drago the milk", 50, 50);
    text("Food Remaining: "+food, 150, 150);

    if(keyWentDown(UP_ARROW)){
      writeStock(food);
      dog.addimage(happyDogImg);
    }
    if(keyWentUp(UP_ARROW)){
      dog.addImage(dogImg);
    }
    if(food === 0){
      food = 20;
    }
  }
  drawSprites();
}
  //add styles here
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    Food:x
  });
}
function readStock(data){
  food=data.val();
}




