module.exports = function(app, passport) {

    app.get('/',passport.isLoggedIn,function(req,res){
      res.render('index.ejs');
    });

    // app.get('/signup',function(req,res){
    //   res.render('signup.ejs');
    // });

    app.get('/login',function(req,res){
      res.render('login.ejs');
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
    }));

    // process the signup form
    // app.post('/signup', passport.authenticate('local-signup', {
    //     successRedirect : '/dashboard', // redirect to the secure profile section
    //     failureRedirect : '/' // redirect back to the signup page if there is an error
    // }));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('*',passport.isLoggedIn,function(req,res){
      res.render('index.ejs');
    });
};
