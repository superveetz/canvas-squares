(function (angular, undefined) {
  "use strict";

  angular.module('canvasApp', [
    'ui.router',
    'ui.bootstrap',
    'ngResource',
    'ngAnimate',
    'lbServices',
    'app.controllers',
    'canvas-square-services',
    'canvas-square-builder',
    'canvas-square-viewer'
  ])

    .config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function ($urlRouterProvider, $stateProvider, $locationProvider) {

      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('app', {
          url: '/',
          templateUrl: 'js/views/app/index.html',
          controller: 'BuildAnimationCtrl'
        })
        .state('preview-animation', {
          url: '/preview-animation/:animationId',
          templateUrl: 'js/views/app/preview-animation.html',
          controller: 'CanvasPreviewAnimationCtrl',
          resolve: {
            canvasAnimation: ['CanvasAnimationModel', '$stateParams', function (CanvasAnimationModel, $stateParams) {
              return CanvasAnimationModel.findById({
                id: $stateParams.animationId,
                filter: {
                  include: [
                    {
                      relation: 'squares',
                      scope: {
                        include: [
                          {
                            relation: 'checkpoints'
                          },
                          {
                            relation: 'endpoint'
                          }
                        ]
                      }
                    }
                  ]
                }
              }).$promise
                .then(function (canvasAnimation) {
                  console.log("canvasAnimation:", canvasAnimation);

                  return canvasAnimation;
                })
                .catch(function (err) {
                  console.log("err:", err);
                });
            }]
          }
        });
    }]);

})(angular);
