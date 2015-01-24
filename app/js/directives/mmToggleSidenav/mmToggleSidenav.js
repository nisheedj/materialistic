/*global define*/
define(['../module'], function(directivesModule) {
  directivesModule.directive('mmToggleSidenav', ['$rootScope',
    function($rootScope) {
      return {
        replace: true,
        restrict: 'C',
        link: function(scope, element, attributes) {
          element.sideNav({
            edge: 'right'
          });
          /*Unbind*/
          scope.$on('$destroy', function() {

          });
        }
      };
    }
  ]);
});