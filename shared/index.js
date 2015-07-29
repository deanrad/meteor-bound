Object.defineProperty(Object.prototype, "bound", {
  get: function() {
    var self;
    self = this;
    return Object.keys(self).reduce(function(all, key) {
      if (_.isFunction(self[key])) {
        Object.defineProperty(all, key, {
          get: function() {
            return self[key].bind(self);
          }
        });
      }
      return all;
    }, {});
  }
});

Object.defineProperty(console, "bound", {
  get: function() {
    return ["dir", "error", "info", "log", "table", "warn"].reduce(function(all, m) {
      if (console[m]){
        all[m] = console[m].bind(console);
      }
      return all;
    }, {});
  }
});
