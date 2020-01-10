function marsRover(commands) {
    this.positionY = 0;
    this.positionX = 0;
    this.currPosX = 1;
    this.currPosY = 3;
    this.direction = "N";
    this.currentPos = null;
    this.route = null;
    this.mapGrid = null;
    this.mapGridX = document.getElementById("mapGrid").value.split(".")[0];
    this.mapGridY = document.getElementById("mapGrid").value.split(".")[1];
    this.mapGridX++;
    this.mapGridY++;
    this.travelPath = [];
    this.limitGridAlert = false;
    this.roverLogs;
    this.degree = 0;
    this.roverHeight = 55;
    this.roverWidth = 50;
}

marsRover.prototype.createMap = function () {

    if (!(document.getElementById("mapGrid").value.split(".").length > 1)) {
        alert("Invalid Grid Value  E.g.: 5,6");
    } else {
        var rover = document.getElementById('rover');
        if (rover) {
            var posx = this.positionX;
            var posy = this.positionY;
            rover.style.bottom = (posy + 0.5) * (500 / parseInt(this.mapGridY)) - this.roverHeight / 2 + "px";
            rover.style.left = (posx + 0.5) * (500 / parseInt(this.mapGridX)) - this.roverWidth / 2 + "px";
        }
        document.querySelector(".parent").setAttribute("style", "grid-template-columns: repeat(" + parseInt(this.mapGridX) + ", " + 500 / parseInt(this.mapGridX) + "px);grid-template-rows: repeat(" + parseInt(this.mapGridY) + ", " + 500 / parseInt(this.mapGridY) + "px);");
        this.mapGrid = parseInt(this.mapGridX) * parseInt(this.mapGridY);
        for (var i = 1; i <= this.mapGrid; i++) {
            mapGrid[i] = document.createElement("div");
            mapGrid[i].className = "div" + i;
            document.querySelector(".parent").appendChild(mapGrid[i]);
        }
        if (document.getElementById("mapGrid").addEventListener("focus", () => {
                document.querySelector(".parent").innerHTML = "";
                document.getElementById("mapGrid").value = "";
            }));
    }
}


//Funtion Left
marsRover.prototype.roverTurnLeft = function (delay) {
    console.log('Deg:' + this.degree);
    this.degree -= 90;
    console.log('Deg:' + this.degree);
    var rover = document.getElementById('rover');
    var deg = this.degree;
    setTimeout(function () {
        rover.style.transform = "rotate(" + deg + "deg)";
    }, delay * 1000);
    switch (this.direction) {

        case 'N':
            this.direction = 'W';
            break;
        case 'W':
            this.direction = 'S';
            break;
        case 'S':
            this.direction = 'E';
            break;
        case 'E':
            this.direction = 'N';
            break;
    }
    console.log("roverTurnLeft was called!" + " " + this.direction);
}


//Function Right
marsRover.prototype.roverTurnRight = function (delay) {
    this.degree += 90;
    console.log('Deg:' + this.degree);
    var deg = this.degree;
    var rover = document.getElementById('rover');
    setTimeout(function () {
        rover.style.transform = "rotate(" + deg + "deg)";
    }, delay * 1000);
    switch (this.direction) {

        case 'N':
            this.direction = 'E';
            break;
        case 'E':
            this.direction = 'S';
            break;
        case 'S':
            this.direction = 'W';
            break;
        case 'W':
            this.direction = 'N';
            break;
    }
    console.log("roverTurnRight was called!" + " " + this.direction);
}

marsRover.prototype.roverMove = function (delay) {

    var rover = document.getElementById('rover');

    switch (this.direction) {
        case 'N':
            if (this.positionY < 0 || this.positionY >= parseInt(this.mapGridY - 1)) {
                this.limitGridAlert = true;
            } else {
                this.positionY++;
                console.log(this.mapGridY);
            }
            break;

        case 'E':
            if (this.positionX < 0 || this.positionX >= parseInt(this.mapGridX - 1)) {
                this.limitGridAlert = true;
            } else {
                this.positionX++;
            }
            break;

        case 'S':
            if (this.positionY <= 0 || this.positionY > this.mapGridY) {
                this.limitGridAlert = true;
            } else {
                this.positionY--;
            }
            break;

        case 'W':
            if (this.positionX <= 0 || this.positionX > this.mapGridX) {
                this.limitGridAlert = true;
            } else {
                this.positionX--;
            }
            break;
    }


    var posx = this.positionX;
    var posy = this.positionY;
    setTimeout(() => {
        console.log((500 / parseInt(this.mapGridY)));
        console.log((500 / parseInt(this.mapGridX)));
        rover.style.bottom = (posy + 0.5) * (500 / parseInt(this.mapGridY)) - this.roverHeight / 2 + "px";
        rover.style.left = (posx + 0.5) * (500 / parseInt(this.mapGridX)) - this.roverWidth / 2 + "px";
    }, delay * 1000);
    //console.log("Mars Rover move forward.");
    //console.log("Rover is here: " + [this.positionX, this.positionY]);
}


marsRover.prototype.commandsRover = function () {

    var inputVal = document.getElementById("routePath").value;
    this.route = inputVal;

    if (this.route.indexOf('M') >= 0 || this.route.indexOf('R') >= 0 || this.route.indexOf('L') >= 0) {
        var newRoute = this.route.split("");
        console.log("Rover's route: " + this.route);
        for (var i = 0; i < newRoute.length; i++) {

            switch (this.route[i]) {
                case 'L':
                    this.roverTurnLeft(i);
                    break;
                case 'R':
                    this.roverTurnRight(i);
                    break;
                case 'M':
                    this.roverMove(i);
                    break;
            }

            var position = [this.positionX, this.positionY];
            this.travelPath.push(position);
            // console.log("Rover's current location: " + position);
            // console.log("Rover's route Log: " + this.travelPath[i]);
            // console.log("Rover's current direction: " + this.direction);

            this.roverLogs = document.getElementById("roverLogs");
            if (this.limitGridAlert) {
                this.roverLogs.innerHTML = "ERROR: Rover reached limit grid";
                break;
            } else {
                this.roverLogs.innerHTML += "Step " + [i + 1] + ": <br>" +
                    "Rover's current location: " + position + "<br>" + "Rover's current direction: " + this.direction + "<br> --------- <br>";
            }

        } //End of Forloop

    } else {
        alert("Enter a valid command!!");
        commandsRover(); //prompt poup-up again if input doesnt match.
    } //ifelse
}


enteranceMove = () => {
    document.getElementById("routePath").value += "M";
}

enteranceLeft = () => {
    document.getElementById("routePath").value += "L";
}

enteranceRight = () => {
    document.getElementById("routePath").value += "R";
}


marsRover.prototype.setCommand = function (commands) {
    for (var i = 0; i < Object.keys(commands).length; i++) {
        this[Object.keys(commands)[i]] = commands[Object.keys(commands)[i]];
    }
    this.commandsRover();
}

marsRover.prototype.routeHandler = function (i, route) {
    console.log('1' + route);
    console.log('2' + this.route);
    this.route = route;
    setTimeout(function () {}, 1000);

}