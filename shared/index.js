Object.defineProperty(Object.prototype, "bound", {
  get: function() {
    var self;
    self = this;
    var allKeys = [];
    for (var k in self) allKeys.push(k);
    return allKeys.reduce(function(all, key) {
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
