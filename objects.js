class POINT{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.parent = undefined;
        this.gCost = Infinity;
        this.hCost = Infinity;
        this.fCost = Infinity;
    }
    switchPoints(newPoint) {
        this.parent = newPoint.parent;
        this.gCost = newPoint.gCost;
        this.hCost = newPoint.hCost;
        this.fCost = newPoint.fCost;
    }
    isBetter(newPoint)
    {
        if(this.fCost > newPoint.fCost) return true
        else if(this.fCost == newPoint.fCost)
        {
            if(this.hCost > newPoint.hCost) return true
            else if(this.hCost == newPoint.hCost)
            {
                if(this.gCost < newPoint.gCost) return true
                else  return false;
            }
            else return false;
        }
        else return false;
    }
}

function A_Star(start, goal, h)
{
        openSet = new Array();
        openSet.push(start);
        closeSet = [];
        finalPoint = undefined;
        isFinished = false;
        while(openSet.length>0)
        { 
            counter ++;
            selectedPoint = new POINT(0,0);
            openSet.forEach(point => {
                if(selectedPoint.fCost > point.fCost)
                {
                    selectedPoint = point;
                }
                else if(selectedPoint.fCost == selectedPoint.fCost)
                {
                    if(selectedPoint.hCost > point.hCost)
                    {
                        selectedPoint = point;
                    }     
                    else if(selectedPoint.hCost == point.hCost)
                    {
                        if(selectedPoint.gCost < point.gCost)
                        {
                            selectedPoint = point;
                        }
                    }
                }
            });
            for (var i = -1; i <= 1; i++) {
                for (var j = -1; j <= 1; j++) {
                    if(i != 0 || j != 0)
                    {
                        point = new POINT(selectedPoint.x+i, selectedPoint.y+j)
                        point.parent = selectedPoint;
                        point.gCost = selectedPoint.gCost + distance(selectedPoint, point)*h;
                        point.hCost = distance(goal, point)*h;
                        point.fCost = point.gCost + point.hCost;
    
                        if(distance(point, goal) == 0){ 
                            console.log("Vardık"); 
                            return (point);
                        }
    
                        isAvailable = true;
                        openSet.forEach(setPoint => {
                            if(setPoint.x == point.x && setPoint.y == point.y)
                            {
                                if(point.isBetter(setPoint))
                                {
                                    point.switchPoints(setPoint)
                                }
                                isAvailable = false;    
                            }
                        });
                        closeSet.forEach(setPoint => {
                            if(setPoint.parent)
                            {
                                if(setPoint.parent.x == point.parent.x && setPoint.parent.y == point.parent.y)
                                {                                
                                    if(point.parent.gCost < setPoint.parent.gCost)
                                    {
                                        point.parent.switchPoints(setPoint.parent)
                                    }
                                }
                            }
                            if(setPoint.x == point.x && setPoint.y == point.y)
                            {
                                isAvailable = false;
                            }
                        })
                        try{
                            if(walls[point.x][point.y])
                            {
                                isAvailable = false;
                            }
                        }
                        catch(e) {  }

                        if(isAvailable) 
                            openSet.push(point);
                    }
                }
            }
            openSet.splice(openSet.findIndex(item => item.x == selectedPoint.x && item.y == selectedPoint.y ), 1)
            closeSet.push(selectedPoint);
        }
        if(openSet.length == 0)
            return ("Not Available Way To");

    
}


