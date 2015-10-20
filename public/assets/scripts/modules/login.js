define([ 'jquery',
         'mustache',
         'modules/events',
         'modules/router',
         'modules/templateManager',
         'modules/elements' ],
         function($, Mustache, events, router, templateManager, elements) {

  function Login(data) {
    events.add(this);

    var self = this;

    router.on('login', function() {
      self.load();
    });
  }
  events.implement(Login);

  Login.prototype.load = function(params) {
    this.emit('load', { });
  }

  var login = new Login();

  login.on('load', function(data) {
    elements.find('#app').innerHTML = Mustache.render(templateManager.get('login'), {

    });

    $('#login').find('.submit').click(function(e) {
      e.preventDefault();
      console.log($('#login').find('form').serializeArray());
    });
  });

  return login;

});