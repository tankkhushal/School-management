const passport = require("passport");
const jStrategy = require("passport-jwt").Strategy;
const Ejwt = require("passport-jwt").ExtractJwt;

var opts = {
    jwtFromRequest: Ejwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secrateKey"
};

const adminmodel = require("../model/adminmodel");

passport.use(new jStrategy(opts, async function (payload, done) {
    let checkUserData = await adminmodel.findOne({ email: payload.admindata.email });
    if (checkUserData) {
        return done(null, checkUserData);
    } else {
        return done(null, false);
    }
}));

passport.serializeUser((user, done) => {
    return done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    let userData = await adminmodel.findById(id);
    if (userData) {
        return done(null, userData);
    } else {
        return done(null, false);
    }
})
module.exports = passport;