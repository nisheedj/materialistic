/*global define*/
define(['../module'], function(directivesModule) {
  directivesModule.directive('mmHeader', ['$rootScope',
    function($rootScope) {
      return {
        replace: true,
        restrict: 'E',
        link: function(scope, element, attributes) {
          /*Unbind*/
          scope.$on('$destroy', function() {

          });
        },
        templateUrl: 'js/directives/mmHeader/mmHeader.html'
      };
    }
  ]);
});