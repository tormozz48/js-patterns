'use strict';

class Airplane {
    constructor(id) {
        this.id = id;
    }

    linkToTower(tower) {
        this._dispatchTower = tower;
        return this;
    }

    takeOff() {
        this._dispatchTower.notify('takeOf', this);
    }

    landing() {
        this._dispatchTower.notify('landing', this);
    }

    updateInfo(event, id) {
        console.info(`airplane ${this.id} receive info: board ${id} is ${event}`);
    }
}

class DispatchTower {
    constructor(airplanes) {
        this._airplanes = airplanes.map((plane) => plane.linkToTower(this));
    }

    notify(event, airplane) {
        this._airplanes
            .filter((_airplane) => _airplane.id !== airplane.id)
            .forEach((_airplane) => _airplane.updateInfo(event, airplane.id));
    }
}

// demonstration

const airplane1 = new Airplane(1);
const airplane2 = new Airplane(2);
const airplane3 = new Airplane(3);

const dispatchTower = new DispatchTower([airplane1, airplane2, airplane3]);

airplane1.landing();
airplane2.takeOff();
airplane1.takeOff();