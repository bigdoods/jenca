requirejs.config({
  urlArgs: 'cache=' + (new Date()).getTime(),
  baseUrl: '/assets/scripts',
  paths: {
    jquery: 'libs/jquery',
    mustache: 'libs/mustache'
  },
});

require([ 'modules/routeManager' ], function(routeManager) {

  routeManager.add([ '', 'login', 'sign-up', 'login' ]);

  require([ 'modules/routeManager', 'modules/home', 'modules/login' , 'modules/signup' ], function(routeManager, home, login, signup) {

    routeManager.start();

  });

});