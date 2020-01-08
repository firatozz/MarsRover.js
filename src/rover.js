function marsRover(commands) {
    this.positionY = 0;
    this.positionX = 0;
    this.direction = "N";
    this.route = null;
    this.mapX = 5;
    this.mapY = 5;
    this.travelPath = [];
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

    var inputVal = document.getElementById("routePath").value;
    this.route = inputVal;

    if (this.route.indexOf('M') >= 0 || this.route.indexOf('R') >= 0 || this.route.indexOf('L') >= 0) {
        var newRoute = this.route.split("");
        console.log("Rover's route: " + this.route);
        for (var i = 0; i < newRoute.length; i++) {

            switch (this.route[i]) {
                case 'L':
                    this.roverTurnLeft(rover);
                    break;
                case 'R':
                    this.roverTurnRight(rover);
                    break;
                case 'M':
                    this.roverMove(rover);
                    break;
            }

            var position = [this.positionX, this.positionY];
            this.travelPath.push(position);
            console.log("Rover's current location: " + position);
            console.log("Rover's route Log: " + this.travelPath[i]);
            console.log("Rover's current direction: " + this.direction);

            var roverLogs = document.getElementById("roverLogs");
            roverLogs.innerHTML += "Step " + [i+1] + ": <br>" +
                "Rover's current location: " + position + "<br>" + "Rover's current direction: " + this.direction + "<br> --------- <br>";
        } //End of Forloop

    } else {
        alert("Enter a valid command!!");
        commandsRover(rover); //prompt poup-up again if input doesnt match.
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