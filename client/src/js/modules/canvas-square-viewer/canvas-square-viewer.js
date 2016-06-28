(function () {
  "use strict";

  angular.module('canvas-square-viewer', [
    'canvas-square-services'
  ])

    .directive('canvasSquareViewer', ['$window', '$log', 'CanvasResponsive', 'CanvasSquareSystem', 'CanvasSquare', 'CanvasCheckpoint', 'CanvasEndpoint', 'CanvasSquares', 'CanvasAnimationLoop', 'WorldMap', function ($window, $log, CanvasResponsive, CanvasSquareSystem, CanvasSquare, CanvasCheckpoint, CanvasEndpoint, CanvasSquares, CanvasAnimationLoop, WorldMap) {

      return {
        restrict: 'A',
        scope: {
          canvasAnimation: '='
        },
        link: function (scope, elem) {
          console.log('doing stuff');
          var window = angular.element($window);
          CanvasResponsive.setAspectRatio();
          CanvasSquareSystem.setCanvasSquaresElem(elem[0]);
          CanvasResponsive.resizeCanvas(elem[0]);

          CanvasSquares.init();

          var canvasSquare;
          var canvasSquareCheckpoint;

          for (var i = 0, j = scope.canvasAnimation.squares.length; i < j; i++) {
            canvasSquare = scope.canvasAnimation.squares[i];

            canvasSquare = new CanvasSquare(canvasSquare);
            CanvasSquares.addCanvasSquare(canvasSquare);

            for (var k = 0, l = canvasSquare.checkpoints.length; k < l; k++) {
              canvasSquareCheckpoint = canvasSquare.checkpoints[k];

              canvasSquareCheckpoint = new CanvasCheckpoint(canvasSquareCheckpoint);
            }

            canvasSquare.endpoint = new CanvasEndpoint(canvasSquare.endpoint);
          }


          CanvasSquareSystem.drawCanvasSquares();
          WorldMap.create();
          CanvasAnimationLoop.startAnimationLoop();

          window.on('resize', function () {
            CanvasResponsive.resizeCanvas(elem[0]);
            CanvasSquareSystem.repositionCanvasSquares();
            CanvasSquareSystem.drawCanvasSquares();
          });

        }
      };

    }]);

})();
