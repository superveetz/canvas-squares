var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');

var app = module.exports = loopback();

// mount static files first
app.use(loopback.static(path.resolve(__dirname, '../client/src')));

app.set('view engine', 'ejs');
app.set('views', __dirname + '\\views');

app.start = function() {
  // send back index.html for any unrecognized GET request
  // allows for explorer and REST api to work with AngularJS HTML5 Mode
  // don't forget to set <base href="/"> in index.html
  app.all('*', function(req, res, next) {
    var apiSubstring = '/api';
    var expSubstring = '/explorer';

    if (req.url.indexOf(apiSubstring) !== -1 || req.url.indexOf(expSubstring) !== -1) {
      next();
    } else {
      res.setHeader('Content-Type', 'text/html');
      res.render('index');
    }

  });
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
