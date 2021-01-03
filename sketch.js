//Create variables here
var dog, happyDog;
var Dimg, Dimg2;
var database; 
var foodS, foodStock;


function preload()
{
  //load images here
  Dimg = loadImage("dogImg.png");
  Dimg2 = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();

  dog = createSprite(250, 380, 10, 10);
  dog.addImage("Dog",Dimg);
  dog.scale = 0.2

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {  
    background(46,139,87);

    if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(Dimg2);
    }

  
    if(foodS === 0){
      strokeWeight(2);
      stroke("black");
      fill("yellow");
      textSize(25);
      text("Food is finished.",150,485);
    }
  
    if(foodS === undefined){
      strokeWeight(2);
      stroke("black");
      fill("red");
      textSize(24);
      text("Wait............",150,485);
    }
  
  drawSprites();
  //add styles here
  strokeWeight(2);
  stroke("black");
  fill("gold");
  textSize(24);
  text("Food Remaining: " + foodS,150,150);
  fill("orange");
  textSize(20);
  text("Note: Press UP_ARROW Key to Feed Drago Milk!",20,25);

}

//function to read values in database
function readStock(data){
  foodS = data.val();
}

//function to wite values in database
function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x = x-1;
  }

  database.ref('/').update({
    Food:x
  });
}


