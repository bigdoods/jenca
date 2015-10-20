define([ 'modules/events' ], function(events) {

  function Router() {
    events.add(this);

    this.routes = [ ];
    this.mode = (typeof history.pushState !== 'undefined') ? 'history' : 'hash';
    this.root = '/';
    this.url = null;

    this.pathNameRegex = /:([\w\d]+)/g;
    this.pathNameReplacement = "([^\/]+)";

    this.splatNameRegex = /\*([\w\d]+)/g;
    this.splatNameReplacement = "(.*)";

    this.nameRegex = /[:|\*]([\w\d]+)/g;

  }
  events.implement(Router);

  Router.prototype.clearSlashes = function(path) {
    return path.toString().replace(/\/$/, '').replace(/^\//, '');
  }
  Router.prototype.watch = function() {
    var self = this;

    this.interval = setInterval(function() {
      if(self.url !== self.getFragment()) {
        self.url = self.getFragment();
        for(var i = 0; i < self.routes.length; i++) {

          self.routes[i].regex.lastIndex = 0;

          var matches = self.routes[i].regex.exec(self.url);

          if(matches) {
            matches.shift();

            var params = { };

            for(var p = 0; p < matches.length; p++) {
              params[self.routes[i].params[p]] = matches[p];
            }

            self.emit('change', { path: self.routes[i].path, params: params });
            self.emit(self.routes[i].path, params);

            for(var f = 0; f < self.routes[i].callbacks.length; f++) {
              self.routes[i].callbacks[f](params);
            }
          }
        }
      }
    }, 200);
  }
  Router.prototype.navigateTo = function(path) {
    if(this.mode === 'history') {
      history.pushState(null, null, this.root + this.clearSlashes(path));
    } else {
      window.location.href.match(/#(.*)$/);
      window.location.href = window.location.href.replace(/#(.*)$/, '') + '#/' + path;
    }
  }
  Router.prototype.add = function(path, callback) {

    if(!this.routeExists(path)) {

      var fn = [ ];

      if(typeof callback === 'function') {
        fn.push(callback);
      }

      this.routes.push({
        path: path,
        regex: this.convertPathToRegExp(path),
        params: this.capturePathParamNames(path),
        callbacks: fn
      });
    } else {
      if(typeof callback === 'function') {
        for(var i = 0; i < this.routes.length; i++) {
          if(this.routes[i].path === path) {
            this.routes[i].callbacks.push(callback);
          }
        }
      }
    }

  }
  Router.prototype.routeExists = function(path) {
    for(var i = 0; i < this.routes.length; i++) {
      if(this.routes[i].path === path) {
        return true;
      }
    }
    return false;
  }
  Router.prototype.remove = function(path) {
    if(this.routes.indexOf(path) !== -1) {
      this.routes.splice(this.routes.indexOf(path), 1);
    }
  }
  Router.prototype.getFragment = function() {
    var fragment = '';
    if(this.mode === 'history') {
        fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
        fragment = fragment.replace(/\?(.*)$/, '');
        fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
    } else {
        var match = window.location.href.match(/#(.*)$/);
        fragment = match ? match[1] : '';
    }
    return this.clearSlashes(fragment);
  }
  Router.prototype.convertPathToRegExp = function(path) {
    if(!(path instanceof RegExp)) {
      var str = path.replace(this.pathNameRegex, this.pathNameReplacement).replace(this.splatNameRegex, this.splatNameReplacement);
                path.lastIndex = 0;

      return new RegExp("^" + str + "$", "gi");

    } else {
      return path;
    }
  }
  Router.prototype.capturePathParamNames = function(path) {
    var names = [ ];
    var name;
    while((name = this.nameRegex.exec(path))) {
      names.push(name[1]);
    }
    return names;
  }
  Router.prototype.start = function(path) {
    this.watch();
  }

  var router = new Router();

  return router;

});