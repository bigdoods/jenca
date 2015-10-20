define([ 'jquery',
         'mustache',
         'modules/events',
         'modules/router',
         'modules/templateManager',
         'modules/elements' ],
         function($, Mustache, events, router, templateManager, elements) {

  function SignUp(data) {
    events.add(this);

    var self = this;

    router.on('sign-up', function() {
      self.load();
    });
  }
  events.implement(SignUp);

  SignUp.prototype.load = function(params) {
    this.emit('load', { });
  }

  var signup = new SignUp();

  signup.on('load', function(data) {
    elements.find('#app').innerHTML = Mustache.render(templateManager.get('sign-up'), {

    });

    $('#sign-up').find('.submit').click(function(e) {
      e.preventDefault();
      // console.log($('#sign-up').find('form').serializeArray());
      $.post('/api/users', $('#sign-up').find('form').serialize()).done(function( data ) {
        console.log(data);
      });
    });

  });

  return signup;

});