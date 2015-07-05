var User = {
    // Enforce model schema in the case of schemaless databases
    schema: true,

    attributes: {

        username: {
            type: 'string',
            unique: true,
            required: true
        },

        role: {
            type: 'string',
            enum: ['regular', 'provider', 'admin']
        },

        firstName: {
            type: 'string',
            maxLength: 255
        },

        lastName : {
            type: 'string',
            maxLength: 255
        },

        email: {
            type: 'email',
            unique: true,
            required: true
        },

        reviews: {
            collection: 'review',
            via: 'user'
        },

        passports: {
            collection: 'Passport',
            via: 'user'
        }
    }
};

module.exports = User;
