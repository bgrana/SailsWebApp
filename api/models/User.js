/**
 * User
 *
 * @description :: A short summary of how this model works and what it represents.
 * @docs        :: http://sailsjs.org/#!/documentation/models
 */

var bcrypt = require('bcryptjs');


module.exports = {

  attributes: {

    firstName: {
      type: 'string',
      maxLength: 30
    },

    lastName: {
      type: 'string',
      maxLength: 30
    },

    username: {
      type: 'string',
      required: true,
      unique: true
    },

    email: {
      type: 'email',
      required: true,
      unique: true
    },

    password: {
      type: 'string',
      required: true
    },

    is_staff: {
      type: 'boolean',
      defaultsTo: false
    },

    fullName: function () {
      return this.firstName + ' ' + this.lastName;
    },

    checkPassword: function (password, next) {
      bcrypt.compare(password, this.password, next);
    },

    toJSON: function () {
      var obj = this.toObject();

      //delete obj.id;
      //delete obj.password;

      return obj;
    }

  },

  beforeCreate: function (values, next) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }

      bcrypt.hash(values.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }

        values.password = hash;
        next();
      });
    });
  }

};
