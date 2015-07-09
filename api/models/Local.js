/**
* Local.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    types: {
        is_location: function (location) {
            return location.A && location.F;
        }
    },

    attributes: {

        name: {
            type: 'string',
            maxLength: 255,
            required: true
        },

        address: {
            type: 'string',
            maxLength: 255
        },

        category: {
            type: 'string',
            required: true
        },

        location: {
            type: 'json',
            required: true,
            is_location: true
        },

        owner: {
            model: 'business'
        },

        reviews: {
            collection: 'review',
            via: 'local'
        }
    }
};

