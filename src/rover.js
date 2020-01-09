function marsRover(commands) {
    this.positionY = 0;
    this.positionX = 0;
    this.direction = "N";
    this.currentPos = null;
    this.route = null;
    this.mapX = 5;
    this.mapY = 5;
    this.travelPath = [];
    this.limitGridAlert = false;
    this.roverLogs;
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
                this.limitGridAlert = true;
            } else {
                this.positionY++;
            }
            break;

        case 'E':
            if (this.positionX < 0 || this.positionX > this.mapX) {
                this.limitGridAlert = true;
            } else {
                this.positionX++;
            }
            break;

        case 'S':
            if (this.positionY <= 0 || this.positionY > this.mapY) {
                this.limitGridAlert = true;
            } else {
                this.positionY--;
            }
            break;

        case 'W':
            if (this.positionX <= 0 || this.positionX > this.mapX) {
                this.limitGridAlert = true;
            } else {
                this.positionX--;
            }
            break;
    }

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
                    this.roverTurnLeft();
                    break;
                case 'R':
                    this.roverTurnRight();
                    break;
                case 'M':
                    this.roverMove();
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