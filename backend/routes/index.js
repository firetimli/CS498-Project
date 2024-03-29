module.exports = function (app, router) {
    console.log("route index");
    app.use('/api', require('./testroute.js')(router));
    app.use('/api', require('./register.js')(router));
    app.use('/api', require('./is_authenticated.js')(router));
    app.use('/api', require('./login.js')(router));
    app.use('/api', require('./logout.js')(router));
    app.use('/api', require('./job.js')(router));
    app.use('/api', require('./user.js')(router));
    app.use('/api', require('./change_password.js')(router));
    app.use('/api', require('./resume.js')(router));
};
