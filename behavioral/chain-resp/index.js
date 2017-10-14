'use strict';

class Validator {
    constructor(validateFn, message) {
        this._validateFn = validateFn;
        this._errorMessage = message;
        this._next = null;
    }

    validate(target) {
        if(!this._validateFn(target)) {
            this._showError();
            return;
        }

        if (this._next) {
            this._next.validate(target);
        }
    }

    setNext(next) {
        this._next = next;
    }

    _showError() {
        console.log(this._errorMessage);
    }
}

const isValidValue = new Validator((v) => v !== undefined, 'Value does not exists');
const isString = new Validator((v) => typeof v === 'string', 'Value must be string');
const isNotEmpty = new Validator((v) => v.length > 0, 'Value is empty');
const startsWithNumber = new Validator((v) => /^\d/.test(v), 'Value must starts with a number');

isValidValue.setNext(isString);
isString.setNext(isNotEmpty);
isNotEmpty.setNext(startsWithNumber);

// Demonstration
isValidValue.validate(undefined);
isValidValue.validate({});
isValidValue.validate('');
isValidValue.validate('abc');
