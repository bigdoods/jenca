define([ 'jquery',
         'mustache',
         'modules/events',
         'modules/router',
         'modules/elements',
         'modules/templateManager' ],
         function($, Mustache, events, router, elements, templateManager) {

  function Home(data) {
    events.add(this);

    var self = this;

    router.on('', function() {
      self.load();
    });
  }
  events.implement(Home);

  Home.prototype.load = function(params) {
    this.emit('load', { });
  }

  var home = new Home();

  home.on('load', function(data) {
    elements.find('#app').innerHTML = Mustache.render(templateManager.get('home'), {
      buttons: [{
        link: 'login',
        text: 'Sign In'
      }, {
        link: 'sign-up',
        text: 'Sign Up'
      }]
    });
  });

  return home;

});