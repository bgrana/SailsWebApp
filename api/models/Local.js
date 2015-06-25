/**
* Local.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    types: {
        is_location: function (location) {
            return location.x && location.y;
        }
    },

    attributes: {

        name: {
            type: 'string',
            maxLength: 255
        },

        address: {
            type: 'string',
            maxLength: 255
        },

        location: {
            type: 'json',
            required: true,
            is_location: true
        },

        owner: {
            model: 'business'
        },

        customForms: {
            collection: 'customForm',
            via: 'local'
        },

        reviews: {
            collection: 'review',
            via: 'local'
        }
    }
};

