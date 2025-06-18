exports.adminAuth = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.isAdmin) {
    next();
  } else {
    res.redirect("/admin/login");
  }
};
