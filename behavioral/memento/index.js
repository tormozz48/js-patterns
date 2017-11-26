'use strict';

class Snapshot {
    constructor(state) {
        this.data = state;
        this.date = Date.now();
    }
}

class Component {
    constructor(state = {}) {
        this._state = state;
    }

    set state(state) {
        this._state = state;
    }

    get state() {
        return this._state;
    }

    backup() {
        return new Snapshot(this.state);
    }

    restore(snapshot) {
        this.state = snapshot.data;
    }
}

class HistoryKeeper {
    constructor(component) {
        this._component = component;
        this._history = [];
    }

    backup() {
        const snapshot = this._component.backup();
        this._history.push(snapshot);
    }

    restoreInitial() {
        const initial = this._history.shift();
        this._history = [initial];
        this._component.restore(initial);
    }

    restoreLatest() {
        const latest = this._history.pop();
        this._component.restore(latest);
    }
}

//Demonstration

const component = new Component();
const history= new HistoryKeeper(component);

component.state = {foo: 1};
console.info(component.state); //{foo: 1}
history.backup();

component.state = {foo: 2};
console.info(component.state); //{foo: 2}
history.backup();

component.state = {foo: 3};
console.info(component.state); //{foo: 3}

history.restoreLatest();
console.info(component.state); //{foo: 2}

history.restoreInitial();
console.info(component.state); //{foo: 1}