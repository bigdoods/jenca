define([ 'mustache' ], function(Mustache) {

  function TemplateManager() {
    this.elements = document.querySelectorAll('[data-template]');
    this.preload();
  }
  TemplateManager.prototype.preload = function() {
    var i = this.elements.length;
    while(i--) {
      Mustache.parse(this.elements[i].innerHTML);
    }
  }
  TemplateManager.prototype.get = function(templateName) {
    var i = this.elements.length;
    while(i--) {
      if(this.elements[i].getAttribute('data-template') == templateName) {
        return this.elements[i].innerHTML;
      }
    }
    return null;
  }

  var templateManager = new TemplateManager();

  return templateManager;

});