var canvas = document.querySelector('canvas');

canvas.width =  window.innerHeight-10;
canvas.height = window.innerHeight-10;

var c = canvas.getContext('2d');


function drawPoint(point,width,height,color) 
{
    c.beginPath();
    c.fillStyle = color;
    c.fillRect(width*point.x , height*point.y,width , height);
    c.stroke(); 
    c.fillStyle = "black";
    c.textAlign = "center";
    c.font = "11px Arial";
    c.closePath();
}

function drawGrid()
{
    for (var y=0; gridSize.y > y; y++) {
        c.beginPath();
        c.moveTo(0, dY*y);
        c.lineTo(canvas.height, dY*y);
        c.stroke();
        c.beginPath();
    }
    for (var x=0; gridSize.x > x; x++) {
        c.beginPath();
        c.moveTo(dX*x, 0);
        c.lineTo(dX*x,canvas.height);
        c.stroke();
        c.beginPath();
    }
}

wallPersantage = 50;
walls = [];
gridSize = { x: 100 , y: 100 };

dY = canvas.height/gridSize.y;
dX = canvas.height/gridSize.x;

goal = new POINT(gridSize.x-1,Math.round(gridSize.y/2-1));
start = new POINT(0,0);
h = 1;


start.gCost = 0;
start.hCost = distance(start, goal)*h;
start.fCost = start.gCost + start.hCost;

goal.gCost = distance(start, goal)*h;
goal.hCost = 0;
goal.fCost = goal.gCost + goal.hCost;


c.clearRect(0, 0, canvas.width, canvas.height);

drawGrid()
walls = createWalls(gridSize.x,gridSize.y,wallPersantage)
walls.forEach( (wallX,i) =>{
    wallX.forEach( (wallY,j) =>{
        if(wallY)
            drawPoint({x:i,y:j},dY,dX,"#000000");
    })
})

counter = 0;

startTime = new Date();
console.log("walls are finished!");
lastPoint = A_Star(start,goal,h);

elapsedTime = new Date() - startTime;

console.log("Time elapsed: " + elapsedTime)

openSet.forEach( pnt =>{
    drawPoint(pnt,dX,dY,"#FF8888");
})

closeSet.forEach( pnt =>{
    drawPoint(pnt,dX,dY,"#888888");
})

console.log(lastPoint , counter)
drawPoint(lastPoint,dX,dY,"#FF0000");

while(lastPoint.parent)
{
    lastPoint = lastPoint.parent;
    drawPoint(lastPoint,dX,dY,"#FF0000");
}