(function () {
  "use strict";

  angular.module('canvas-square-builder', [])

    .directive('canvasGrid', ['$window', '$log', 'CanvasResponsive', 'CanvasDrawSystem', 'CanvasGridSystem', 'WorldMap', 'CanvasSquares', function ($window, $log, CanvasResponsive, CanvasDrawSystem, CanvasGridSystem, WorldMap, CanvasSquares) {

      return function (scope, elem) {

        var window = angular.element($window);

        CanvasGridSystem.setCanvasGridElem(elem[0]);

        CanvasResponsive.resizeCanvas(elem[0]);
        CanvasResponsive.setAspectRatio();
        CanvasDrawSystem.drawGridLines(elem[0]);

        WorldMap.create();

        window.on('resize', function () {
          CanvasResponsive.setAspectRatio();
          CanvasResponsive.resizeCanvas(elem[0]);
          CanvasDrawSystem.drawGridLines(elem[0]);
        });

      };

    }]) // end canvas-grid

    .directive('canvasCheckpoints', ['$window', '$log', 'CanvasResponsive', 'CanvasCheckpointSystem', 'CanvasDrawSquareSystem', function ($window, $log, CanvasResponsive, CanvasCheckpointSystem, CanvasDrawSquareSystem) {

      return function (scope, elem) {
        var window = angular.element($window);

        CanvasCheckpointSystem.setCanvasCheckpointElem(elem[0]);

        CanvasResponsive.resizeCanvas(elem[0]);

        window.on('resize', function () {
          CanvasResponsive.resizeCanvas(elem[0]);
          CanvasDrawSquareSystem.drawSquareCheckpoints(elem[0]);
        });

      };

    }])

    .directive('canvasSquares', ['$window', '$log', '$timeout', 'CanvasResponsive', 'CanvasSquareSystem', 'CanvasSquares', 'CanvasAnimationLoop', 'CanvasClickSystem', function ($window, $log, $timeout, CanvasResponsive, CanvasSquareSystem, CanvasSquares, CanvasAnimationLoop, CanvasClickSystem) {

      return function (scope, elem) {
        var window = angular.element($window);

        CanvasSquareSystem.setCanvasSquaresElem(elem[0]);
        CanvasResponsive.resizeCanvas(elem[0]);

        CanvasSquares.init();
        CanvasAnimationLoop.stopAnimationLoop();
        CanvasClickSystem.getClickDetails().selected.square.current = null;
        CanvasClickSystem.getClickDetails().selected.square.previous = null;

        window.on('resize', function () {
          CanvasResponsive.resizeCanvas(elem[0]);
          CanvasSquareSystem.repositionCanvasSquares();
          CanvasSquareSystem.drawCanvasSquares();
        });

      };

    }]) // end canvas-squares

    .directive('canvasEndpoints', ['$window', '$log', 'CanvasResponsive', 'CanvasEndpointSystem', function ($window, $log, CanvasResponsive, CanvasEndpointSystem) {

      return function (scope, elem) {
        var window = angular.element($window);

        CanvasEndpointSystem.setCanvasEndpointElem(elem[0]);
        CanvasResponsive.resizeCanvas(elem[0]);

        window.on('resize', function () {
          CanvasResponsive.resizeCanvas(elem[0]);
          CanvasEndpointSystem.repositionCanvasEndpoints();
          CanvasEndpointSystem.drawAllSquareEndpoints();
        });
      };

    }]) // end canvas-endpoints

    .directive('canvasPathfinding', ['$window', '$log', 'CanvasResponsive', 'CanvasPathFindingSystem', function ($window, $log, CanvasResponsive, CanvasPathFindingSystem) {

      return function (scope, elem) {
        var window = angular.element($window);

        CanvasPathFindingSystem.setCanvasPathfindingElem(elem[0]);
        CanvasResponsive.resizeCanvas(elem[0]);

        window.on('resize', function () {
          CanvasResponsive.resizeCanvas(elem[0]);
          // draw path
        });
      };

    }]) // end canvas-pathfinding

    .directive('canvasClicks', ['$window', '$log', 'CanvasResponsive', 'CanvasDrawSystem', 'CanvasClickSystem', 'CanvasSquareSystem', function ($window, $log, CanvasResponsive, CanvasDrawSystem, CanvasClickSystem, CanvasSquareSystem) {

      return function (scope, elem) {
        var window = angular.element($window);

        CanvasResponsive.resizeCanvas(elem[0]);

        window.on('resize', function (event) {
          CanvasResponsive.resizeCanvas(elem[0]);
          CanvasClickSystem.drawClickEvent(elem[0]);

          if (scope.showClickOptions) {
            scope.setClickOptions(event);
          }
        });

        elem.on('click', function (event) {
          var spaceClicked = CanvasClickSystem.parseClickedLocation(event);
          // console.log("spaceClicked:", spaceClicked);

          scope.$apply(scope.spaceClicked = spaceClicked);

          scope.setClickOptions(event);
          // scope.$apply(scope.squareExistsAtLocation = CanvasSquareSystem.doesSquareExistAtLocation(event.pageX, event.pageY));
          CanvasDrawSystem.clearCanvas(elem[0]);
          CanvasClickSystem.drawClickEvent(elem[0]);
        });
      };

    }]) // end canvas-clicks

    .directive('clickOptions', [function () {
      return {
        restrict: 'E',
        templateUrl: 'js/directives/templates/click-options/click-options.html'
      };
    }])

    .directive('selectedOptions', [function () {
      return {
        restrict: 'E',
        templateUrl: 'js/directives/templates/selected-options/selected-options.html'
      };
    }])

    .directive('draggable', ['$document', '$window', function ($document, $window) {
      return function (scope, element) {
        var startX = 0, startY = 0, x = 0, y = 0;

        element.css({
          position: 'absolute'
        });

        element.on('mousedown', function(event) {
          // Prevent default dragging of selected content
          event.preventDefault();
          startX = event.pageX - x;
          startY = event.pageY - y;
          $document.on('mousemove', mousemove);
          $document.on('mouseup', mouseup);
        });

        function mousemove(event) {
          y = event.pageY - startY;
          x = event.pageX - startX;

          if (x > 0 && x < ($window.innerWidth - element[0].clientWidth)) {
            element.css({
              left:  x + 'px'
            });
          }

          if (y > 0 && y < ($window.innerHeight - element[0].clientHeight)) {
            element.css({
              top: y + 'px'
            });
          }
        }

        function mouseup() {
          $document.off('mousemove', mousemove);
          $document.off('mouseup', mouseup);
        }
      };
    }]);

})();
