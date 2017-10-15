'use strict';

class Checker {
    set validateFn(validateFn) {
        this._validateFn = validateFn;
    }

    set errorMessage(errorMessage) {
        this._errorMessage = errorMessage;
    }

    set beforeHook(beforeHookFn) {
        this._beforeHookFn = beforeHookFn;
    }

    set afterHook(afterHookFn) {
        this._afterHookFn = afterHookFn;
    }
}

class SimpleCheckerBuilder {
    constructor({validateFn, errorMessage}) {
        this._validateFn = validateFn;
        this._errorMessage = errorMessage;
        this._checker = null;
    }

    build() {
        this._checker = new Checker();
        this._checker.validateFn = this._validateFn;
        this._checker.errorMessage = this._errorMessage;
        return this._checker;
    }
}

class CheckerWithHooksBuilder extends SimpleCheckerBuilder {
    constructor({validateFn, errorMessage, beforeHookFn, afterHookFn}) {
        super({validateFn, errorMessage});
        this._beforeHookFn = beforeHookFn;
        this._afterHookFn = afterHookFn;
    }

    build() {
        this._checker = super.build();
        this._checker.beforeHook = this._beforeHookFn;
        this._checker.afterHook = this._afterHookFn;
        return this._checker;
    }
}

class Validator {
    init() {
        const simpleCheckerBuilder = new SimpleCheckerBuilder({
            validateFn: () => {},
            errorMessage: 'foo'
        });
        const checkerWithHooksBuilder = new CheckerWithHooksBuilder({
            validateFn: () => {},
            errorMessage: 'bar',
            beforeHookFn: () => {},
            afterHookFn: () => {},
        });

        const simpleChecker = this.createChecker(simpleCheckerBuilder);
        const checkerWithHooks = this.createChecker(checkerWithHooksBuilder);
    }

    createChecker(builder) {
        return builder.build();
    }
}
