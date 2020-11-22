var dog, dogHappy, db, foodS, foodStock;

function preload()
{
  dogImg=loadImage("images/dogImg.png")
 dogHappy=loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  dog=createSprite(250,250,20,20)
  dog.addImage(dogImg)
  dog.scale=0.3
  db=firebase.database()
}


function draw() {  
  background(46, 139, 87)
  foodStock=db.ref("food")
  foodStock.on("value", readStock)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy)
  

  }
   
  
  drawSprites();
  textSize(20);
  fill("white")
  text("Note:Press Up arrow to feed the dog!", 20,50);
  text("Food left:"+ foodS, 200,100)
  

}

function readStock(data){
  foodS=data.val();

}

function writeStock(x){
  if (x<=0){
    x=0;
  }else{
    x=x-1;
  }

  db.ref('/').update({
    food:x
  })

}