const passport = require("passport")
const session = require('express-session');
const cookieSession = require("cookie-session");




router.use(session({
    secret: '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', // Replace with a secure secret key
    resave: true,
    saveUninitialized: true
    // name:'tuto',
    // keys:['key1','key2']
  }));
  require('./passport/passport-setup')
  router.use(passport.initialize())
  router.use(passport.session())
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login'); // Redirect to the login page if not authenticated
  }
  router.get('/success',(req,res)=>{
    res.status(200).send("success");
    
  })
  router.get("/google",passport.authenticate("google",{scope:["profile","email"]}));
  router.get("/google/callback",passport.authenticate("google",{failureRedirect:"/failed"}),
  function(req,res){
  res.redirect('/success')
  })
  router.get("/logout", (req, res) => {
    req.logout(); // Clear the session and log the user out
  
    req.session.destroy((err) => {
      if (err) {
        console.log("Error destroying session:", err);
      }
      res.redirect("/"); // Redirect to the home page or another suitable page after logout
    });
  });
























  









const passport = require("passport");
const { url } = require("./url");
const GoogleStrategy=require("passport-google-oauth20").Strategy

passport.serializeUser(function(user,done){
    done(null,user)
})
passport.deserializeUser(function(user,done){
    done(null,user)
})

passport.use(new GoogleStrategy({
    clientID:"287107085331-i2rfnal24iu0mhr9u5l7eocnt278voec.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:`${url}google/callback`,
    passReqToCallback:true
},function(request,accessToken,refreshToken,profile,done){
    console.log(profile)
    return done(null,profile)
}))