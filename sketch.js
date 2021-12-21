/* Things to do

Set lifetime to the road, cone and fuel

Implement a solution so the car doesn't go offscreen

The road has to stop when the fuel is out

Have it so that if run out of fuel, game over

Make it so that if the car touches cones, game ends

Add sound


*/
var PLAY = 1;
var END = 0;
var car, carImg
var road
var fuel, fuelImg
var cone, coneImg
var gameState = PLAY;
var fuelCount = 1000
var coneGroup,fuelGroup,roadMarkingGroup;

function preload()
{
    carImg = loadImage("car.png")
    fuelImg = loadImage("fuel.png")
    coneImg = loadImage("cone.png")
}

function setup()
{
    createCanvas(windowWidth, windowHeight)

    car = createSprite(windowWidth / 10, windowHeight / 2)
    car.addImage(carImg);
    car.scale = 0.2
    car.rotation = 180

    road = createSprite(windowWidth + 100, windowHeight / 2, 100, 10)
    road.velocityX = -5
   
    road.shapeColor = "white"
    road.depth = car.depth - 1;

    fuelGroup = new Group();
    coneGroup = new Group();
    roadMarkingGroup=new Group();
}

function draw()
{



    background(50)

    textSize(30)
    text("Fuel = "+fuelCount,windowWidth/0.59/2,windowHeight/10);


    if (gameState == PLAY)
    {
       
        if (keyDown("UP_ARROW"))
        {
            car.y = car.y - 6
        }
        if (keyDown("DOWN_ARROW"))
        {
            car.y = car.y + 6
        }
        if (road.x < 0){
            road.x = road.width/2;
          }
        if(frameCount%1==0)
        {
            fuelCount = fuelCount-1
        }
        if(fuelCount==0)
        {
            gameState = END
        }
        spawnFuel();
        spawnCones();
        spawnRoadMarking();

    }
    else if(gameState == END)
    {
        road.velocityX=0;
        fuelGroup.setVelocityXEach(0);
        coneGroup.setVelocityXEach(0);
        roadMarkingGroup.setVelocityXEach(0)
        //set lifetime of the game objects so that they are never destroyed
        fuelGroup.setLifetimeEach(-1);
        coneGroup.setLifetimeEach(-1);
        roadMarkingGroup.setLifetimeEach(-1)
        
        
       
    
    }



    drawSprites()



}
function spawnRoadMarking()
{
    if (frameCount % 50 == 0)
        {
            road = createSprite(windowWidth + 100, windowHeight / 2, 100, 10)
            road.velocityX = -5
            road.shapeColor = "white"
            road.depth = car.depth - 1;

            roadMarkingGroup.add(road)
        }
}
function spawnFuel()
{
    if (frameCount % 200 == 0)
    {
        fuel = createSprite(windowWidth, Math.round(random((0, windowHeight/2))))
        fuel.velocityX = -5
        fuel.addImage(fuelImg)
        fuel.scale = 0.15

        fuel.lifetime = 600;
    
        //adjust the depth
        fuel.depth = car.depth;
        car.depth = car.depth + 1;
        
        
        fuelGroup.add(fuel);
      
    }
}
function spawnCones()
{
    if (frameCount % 200 == 0)
    {
        cone = createSprite(windowWidth, Math.round(random((0, windowHeight))))
        cone.velocityX = -5
        cone.addImage(coneImg)
        cone.scale = 0.175
        cone.lifetime = 600;
        cone.depth = car.depth;
        car.depth +=1;
        //add each obstacle to the group
        coneGroup.add(cone);

    }
}