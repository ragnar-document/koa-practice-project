const Base = require('./baiscModel');

class Manager extends Base {
    constructor(props = 'manager') {
        super(props)
    }
}

module.exports = new Manager;