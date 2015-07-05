/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'get /': 'AuthController.home',

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/


  /***************************************************************************
  *                               Auth routes                                *
  ***************************************************************************/
  'get /login': 'AuthController.login',
  'get /logout': 'AuthController.logout',
  'get /register': 'AuthController.register',

  'post /auth/local': 'AuthController.callback',
  'post /auth/local/:action': 'AuthController.callback',

  'get /auth/:provider': 'AuthController.provider',
  'get /auth/:provider/callback': 'AuthController.callback',
  'get /auth/:provider/:action': 'AuthController.callback',


  /***************************************************************************
  *                                User routes                               *
  ***************************************************************************/
  'get /user/:userid/profile': 'UserController.getProfile',
  'patch /user/:userid/profile': 'UserController.editProfile',


  /***************************************************************************
  *                               Local routes                               *
  ***************************************************************************/
  'post /local': 'LocalController.create',
  'get /local/:localid/profile': 'LocalController.getProfile',
  'patch /local/:localid/profile': 'LocalController.edit',

  /***************************************************************************
  *                               Review routes                              *
  ***************************************************************************/
  'post /review': 'ReviewController.postReview',
  'get /review': 'ReviewController.getReviews',
  'patch /review/:reviewid': 'ReviewController.edit',

  /***************************************************************************
  *                              Business routes                             *
  ***************************************************************************/
  'post /business/:businessid': 'BusinessController.create',
  'get /business/:businessid/profile': 'BusinessController.getProfile',
  'patch /business/:businessid/profile': 'BusinessController.edit',
  'get /business/:businessid/locals': 'BusinessController.getLocals',

  /***************************************************************************
  *                        Administration Panel routes                       *
  ***************************************************************************/

  //Esto tampoco funciona :(

  'get /admin': 'AdminController.home'


};
