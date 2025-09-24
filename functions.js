
function createWalls(gridSizeX,gridSizeY,wallPersantage)
{
    this.walls = [];
    for (let i = 0; i < gridSizeX; i++) {
        this.row = [];
        for (let j = 0; j < gridSizeY; j++) {

            if(Math.random()*100 > wallPersantage) this.wall = false;
            else this.wall = true;
            this.row.push(this.wall);

        }
        this.walls.push(this.row);
    }
    return this.walls;
}

function distance(start, goal)
{
    return Math.sqrt( (goal.x-start.x)**2 + (goal.y-start.y)**2 )
}

function drawText(point,text)
{
    c.fillStyle = "rgba(0,0,0,1)"
    c.font = "11px Arial";
    c.fillText(Math.round(text*10)/10, point.x*dX, point.y*dY+15);
}


function drawPoint(point,width,height,color) 
{
    c.beginPath();
    c.fillStyle = color;
    c.fillRect(width*point.x , height*point.y,width , height);
    c.stroke(); 
    c.closePath();
}

function drawGrid(gridSize)
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