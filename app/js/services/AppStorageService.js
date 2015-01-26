/*global define*/
define(['./module', 'underscore'], function(servicesModule, _) {
  servicesModule.factory('AppStorageService', ['localStorageService', 'DateTimeService', 'DefaultData',
    function(localStorageService, DateTimeService, DefaultData) {
      ///Thanks to Dave Furfero for extending underscore
      _.mixin({
        // Get/set the value of a nested property
        deep: function(obj, key, value) {
          var keys = key.replace(/\[(["']?)([^\1]+?)\1?\]/g, '.$2').replace(/^\./, '').split('.'),
            root,
            i = 0,
            n = keys.length;

          // Set deep value
          if (arguments.length > 2) {

            root = obj;
            n--;

            while (i < n) {
              key = keys[i++];
              obj = obj[key] = _.isObject(obj[key]) ? obj[key] : {};
            }

            obj[keys[i]] = value;

            value = root;

            // Get deep value
          } else {
            while ((obj = obj[keys[i++]]) != null && i < n) {}
            value = i < n ? void 0 : obj;
          }

          return value;
        },
        pluckDeep: function(obj, key) {
          return _.map(obj, function(value) {
            return _.deep(value, key);
          });
        }, // Return a copy of an object containing all but the blacklisted properties.
        unpick: function(obj) {
          obj = obj || {};
          return _.pick(obj, _.difference(_.keys(obj), _.flatten(Array.prototype.slice.call(arguments, 1))));
        }
      });

      var _checkDefaults = function() {
        return localStorageService.get('dataExists');
      };
      var _setDefaults = function() {
        _.each(DefaultData, function(value, key) {
          localStorageService.set(key, value);
        });
      };

      var _getData = function(key) {
        return localStorageService.get(key);
      };

      var _setData = function(key, value) {
        localStorageService.set(key, value);
        return;
      };

      var _clearData = function() {
        return localStorageService.clearAll();
      };

      return {
        getDefaults: _checkDefaults,
        setDefaults: _setDefaults,
        getData: _getData,
        setData: _setData,
        clearData: _clearData
      };
    }
  ]);
});