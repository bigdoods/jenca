define(function() {

  function Elements(data) {
    for(var element in data) {
      this[element] = data[element];
    }
  }
  Elements.prototype.get = function(elementName) {
    if(typeof this[elementName] !== 'undefined') {
      return this[elementName];
    } else {
      return null;
    }
  }
  Elements.prototype.find = function(selector) {
    return this['body'].querySelector(selector);
  }
  Elements.prototype.findAll = function(selector) {
    return this['body'].querySelectorAll(selector);
  }

  var elements = new Elements({
    body: document.getElementsByTagName('body')[0],
    app: document.getElementById('eavesdrop'),
    templates: document.querySelectorAll('[data-template]')
  });

  return elements;

});