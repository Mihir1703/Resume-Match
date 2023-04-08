module.exports = function(app, upload, runPythonScript) {
    app.use('/api/user', require('./User'));
    app.use('/api/job', require('./Jobs'));
    app.use('/api/application', require('./Application'));
}