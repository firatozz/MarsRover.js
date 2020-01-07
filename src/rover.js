function marsRover(commands) {
    this.positionY = 0;
    this.positionX = 0;
    this.direction = "N";
    this.mapX = 5;
    this.mapY = 5;
    this.travelPath = [];
}


marsRover.prototype.marsMap = function () {
    mapSizeX = this.mapX;
    mapSizeY = this.mapY;
    console.log(mapSizeX + " " + mapSizeY);
}

marsRover.prototype.roverTurn = function () {
    //if L => roverTurnLeft(this.direction);
    // if R => roverTurnRight(this.direction);
}



//Funtion Left
marsRover.prototype.roverTurnLeft = function () {
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
marsRover.prototype.roverTurnRight = function () {
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

marsRover.prototype.roverMove = function () {
    switch (this.direction) {
        case 'N':
            if (this.positionY < 0 || this.positionY > this.mapY) {
                console.log("Rover reached limit grid");
            } else {
                this.positionY += 1;
            }
            break;

        case 'E':
            if (this.positionX < 0 || this.positionX > this.mapX) {
                console.log("Rover reached limit grid");
            } else {
                this.positionX += 1;
            }
            break;

        case 'S':
            if (this.positionY < 0 || this.positionY > this.mapY) {
                console.log("Rover reached limit grid");
            } else {
                this.positionY -= 1;
            }
            break;

        case 'W':
            if (this.positionX < 0 || this.positionX > this.mapX) {
                console.log("Rover reached limit grid");
            } else {
                this.positionX += 1;
            }
            break;
    }

    console.log("Mars Rover move forward.");
    console.log("Rover is here: " + [this.positionX, this.positionY]);
}

marsRover.prototype.commandsRover = function (rover) {
    var route = prompt("Insert the commands to move the Rover: f: forward, r: right, l: left");

    if (route.indexOf('f') >= 0 || route.indexOf('r') >= 0 || route.indexOf('l') >= 0) {
        var newRoute = route.split("");
        console.log("Rover's route: " + route);
        for (var i = 0; i < newRoute.length; i++) {

            switch (route[i]) {
                case 'l':
                    this.roverTurnLeft(rover);
                    break;
                case 'r':
                    this.roverTurnRight(rover);
                    break;
                case 'f':
                    this.roverMove(rover);
                    break;
            }

            var position = [this.positionX, this.positionY];
            this.travelPath.push(position);
            console.log("Rover's current location: " + position);
            console.log("Rover's route Log: " + this.travelPath[i]);
            console.log("Rover's current direction: " + this.direction);

        } //End of Forloop

    } else {
        alert("Enter a valid command!!");
        commandsRover(rover1); //prompt poup-up again if input doesnt match.
    } //ifelse
}


marsRover.prototype.setCommand = function (commands) {
    for (var i = 0; i < Object.keys(commands).length; i++) {
        this[Object.keys(commands)[i]] = commands[Object.keys(commands)[i]];
    }
    this.marsMap();
    // this.roverMove(this.direction);
    // this.roverTurnLeft(this.direction);
    // this.roverTurnRight(this.direction);
    this.commandsRover();
}