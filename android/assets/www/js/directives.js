angular.module('app.directives', [])

.directive('blankDirective', [function(){

}])

.directive('placeholderImg', function() {
    //default place holder
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            var img = window.scriptRoot + 'img/ben.png';
            if (attr.placeholderImg) {
                switch (attr.placeholderImg) {
                    case 'profile':
                        img = 'img/max.png';
                        break;
                    case 'profile_small':
                        img = 'img/mike.png';
                        break;
                    case 'profile_large':
                        img = 'img/mk-logo.png';
                        break;
                    //Add more placeholders
                } 
            }

            //If ngSrc is empty
            if (!attr.ngSrc)
                element[0].src = img;

            //If there is an error (404)
            element.on('error', function() {
                element[0].src = img;
            });

        }
    };
})

.directive('hideTabs', function($rootScope) {
  return {
    restrict: 'A',
    link: function(scope, element, attributes) {
      scope.$on('$ionicView.beforeEnter', function() {
        scope.$watch(attributes.hideTabs, function(value){
          $rootScope.hideTabs = value;
        });
      });

      scope.$on('$ionicView.beforeLeave', function() {
        $rootScope.hideTabs = false;
      });
    }
  };
})


