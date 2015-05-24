/**
* Business.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {

        name: {
            type: 'string',
            maxLength: 255,
            required: true
        },

        cif: {
            type: 'string',
            unique: true,
            required: true
        },

        locals: {
            collection: 'local',
            via: 'owner'            
        }
    }
};

