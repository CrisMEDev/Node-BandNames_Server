const { v4: uuidv4 } = require('uuid');

class Band {

    constructor( bandName = 'No name' ){

        this.id = uuidv4();
        this.name = bandName;
        this.votes = 0;

    }

}

module.exports = Band;


