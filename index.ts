import { getObstacleEvents } from "./computer-vision";

//Types Section
interface AutonomousCarProps {
    isRunning?: boolean;
    steeringControl: Steering;
}

interface Events {
    [event: string]: boolean;
}

interface AutonomousCar {
    isRunning?: boolean;
    respond: (events: Events) => void;
}

interface Control {
    execute: (command: string) => void;
}

interface Steering extends Control {
    turn: (direction: string) => void;
}

//Classes Section
class Car implements AutonomousCar {
    isRunning;
    steeringControl: Steering;

    constructor(props: AutonomousCarProps) {
        this.isRunning = props.isRunning;
        this.steeringControl = props.steeringControl;
    }

    respond(events: Events) {
        if (!this.isRunning) {
            console.log("The car is off");
            return;
        }
        let eventKeys = Object.keys(events);
        eventKeys.forEach((eventKey) => {
            if (!events[eventKey]) {
                return;
            }
            if (eventKey === "ObstacleLeft") {
                this.steeringControl.turn("right");
            }
            if (eventKey === "ObstacleRight") {
                this.steeringControl.turn("left");
            }
        });
    }
}

class SteeringControl implements Steering {
    execute(command: string) {
        console.log(`Executing: ${command}`);
    }

    turn(direction: string) {
        this.execute(`turn ${direction}`);
    }
}

//Execution Section
let steering = new SteeringControl();
steering.turn("left");

let autonomousCar = new Car({ isRunning: true, steeringControl: steering });
autonomousCar.respond(getObstacleEvents());
autonomousCar.respond(getObstacleEvents());
autonomousCar.respond(getObstacleEvents());
autonomousCar.respond(getObstacleEvents());
