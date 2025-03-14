import { getObstacleEvents } from "./computer-vision";

//Types Section
interface AutonomousCarProps {
    isRunning?: boolean;
    steeringControl: Steering;
    speedControl: Speed;
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

interface Speed extends Control {
    pedal: (action: "accelerate" | "decelerate") => void;
}

//Classes Section
class Car implements AutonomousCar {
    isRunning;
    steeringControl: Steering;
    speedControl: Speed;

    constructor(props: AutonomousCarProps) {
        this.isRunning = props.isRunning;
        this.steeringControl = props.steeringControl;
        this.speedControl = props.speedControl;
    }

    respond(events: Events) {
        if (!this.isRunning) {
            console.log("The car is off");
            return;
        }
        let eventKeys = Object.keys(events);
        eventKeys.forEach((eventKey) => {
            if (!events[eventKey]) return;

            switch (eventKey) {
                case "ObstacleLeft":
                    this.steeringControl.turn("right");
                    break;
                case "ObstacleRight":
                    this.steeringControl.turn("left");
                    break;
                case "SpeedUp":
                    this.speedControl.pedal("accelerate");
                    break;
                case "SlowDown":
                    this.speedControl.pedal("decelerate");
                    break;
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

class SpeedControl implements Speed {
    execute(command: string) {
        console.log(`Executing: ${command}`);
    }
    pedal(action: "accelerate" | "decelerate") {
        this.execute(`${action}`);
    }
}

//Execution Section
let steering = new SteeringControl();
let speed = new SpeedControl();

let autonomousCar = new Car({
    isRunning: true,
    steeringControl: steering,
    speedControl: speed,
});
autonomousCar.respond(getObstacleEvents());
