// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );
// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     //successRedirect: "http://localhost:3000/dashboard",
//     failureRedirect: "/",
//   }),
//   function (req, res, next) {
//     // Successful authentication, redirect home.
//     res.redirect("http://localhost:3000/dashboard");
//   }