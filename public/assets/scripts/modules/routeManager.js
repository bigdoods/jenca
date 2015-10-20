define([ 'jquery', 'modules/router' ], function($, router) {

  function RouteManager(data) {
    this.router = data.router;
    this.listen();
  }
  RouteManager.prototype.listen = function() {
    var self = this;

    $('body').on('click', '[data-navigate]', function() {
      self.router.navigateTo($(this).data('navigate'));
    });
  }
  RouteManager.prototype.add = function(routes) {
    if(routes instanceof Array) {
      for(var i = 0; i < routes.length; i++) {
        this.router.add(routes[i]);
      }
    } else {
      this.router.add(routes);
    }
  }
  RouteManager.prototype.start = function(routes) {
    this.router.start();
  }

  var routeManager = new RouteManager({
    router: router
  });

  return routeManager;

});