'use strict';

class Employee {
    static get TYPE() {return 'EMPLOYEE'}

    get salary() {return 0}

    printSalary() {
        console.log(`${this.constructor.TYPE} ${this.salary}`);
    }
}

class FullTime extends Employee {
    static get TYPE() {return 'FULL_TIME'}

    get salary() {return super.salary + 12}
}

class PartTime extends Employee {
    static get TYPE() {return 'PART_TIME'}

    get salary() {return super.salary + 10}
}

class Temporary extends Employee {
    static get TYPE() {return 'TEMPORARY'}

    get salary() {return super.salary + 6}
}

class Contractor extends Employee {
    static get TYPE() {return 'CONTRACTOR'}

    get salary() {return super.salary + 20}
}

function createEmployee(type) {
    let employee = null;

    switch (type) {
        case FullTime.TYPE:
            employee = new FullTime();
            break;
        case PartTime.TYPE:
            employee = new PartTime();
            break;
        case Temporary.TYPE:
            employee = new Temporary();
            break;
        case Contractor.TYPE:
            employee = new Contractor();
            break;
        default:
            throw new Error('unknown employee type');
    }

    return employee;
}


// demonstration
createEmployee(FullTime.TYPE).printSalary();
createEmployee(Contractor.TYPE).printSalary();
createEmployee(Temporary.TYPE).printSalary();
createEmployee(Contractor.TYPE).printSalary();

