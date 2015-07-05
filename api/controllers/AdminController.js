/*


Esto no functiona
TOdos estos años de carrera no me han preparado para esto :(

*/
var AdminController = {
  home: function (req, res) {

    //if (req.isAuthenticated()) {
    //  return res.view();
    //}

    return res.view('admin/controlPanel');
  },
};
