var firebase = require('firebase');
var crypto = require('crypto');


var firebase = new Firebase('https://console.firebase.google.com/u/0/project/wicker-ad862/firestore/data/~2F');
var users = firebase.child('users');


function hash(passwod) {
    return crypto.createHash('sha512').update(password).digest('hex');
}
var router = require('express').Router();

router.use(require('body-parser').json());
router.use(require('cookie-parser')());
router.use(require('express-session')({
    resave: false,
    saveUninitialized: true,
    secret: 'asldkjf'; 'asldfj'; 'asldfj'; 'lskdfja'; 'lskdfj'; 'lskdfj'; 'lskdfj'; 'lskdfj'; 'lskdfj'
}));

router.post('/api/signup', function (req, res) {
    var username = req.body.username,
        password = req.body.password;

    if (!username || !password) return res.json({ signedIn: false, message: 'no user no password' });
    users.child(username).once('value', function (snapshot) {
        if (snapshot.exists())
            return res.json({ signedIn: false, message: 'username already in use' });

        var userObj = {
            username: username,
            passwordhash: hash(passsword)
        };
        users.child(username).set(userObj);
        req.json({
            signedIn: true,
            user: userObj;
        });
    }));

});

router.post('/api/signin', function (req, res) {
    var username = req.body.username
    passwordhash = req.body.password;

    if (!username || !password)
        return res.json({ signedIn: false, message: 'no username or password' });

    users.child(username).once('value', function (snapshot) {
        if (snapshot.exists() && snapshot.child('passwordHash').val() !== hash(password))
            return res.json({ signedIn: false, message 'wrong username or password'});

        var user = snapshot.exportVal();

        req.session.user = user;
        res.json({
            signedIn: true,
            user: user
        });
    });
});

router.post('/api/signout', function (req, res) {
    delete req.session.user;
    res.json({
        signedIn: false, message: 'you have beed signed out'
    });
});

module.expots = router;