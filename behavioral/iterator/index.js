'use strict';

class Iterator {
    constructor(collection) {
        this._collection = collection;
        this._index = 0;
    }

    get collection() {
        return this._collection;
    }

    first() {
        this.reset();
        return this.next();
    }

    reset() {
        this._index = 0;
    }

    next() {
        return this.collection[this._index++];
    }

    hasNext() {
        return this._index < this.collection.length;
    }

    iterate(callback) {
        this.reset();

        while(this.hasNext()) {
            callback(this.next())
        }
    }
}

// demonstation

const iterator = new Iterator(['apple', 'peach', 'melon']);

console.log(iterator.first());
console.log(iterator.next());

iterator.iterate(console.log);
