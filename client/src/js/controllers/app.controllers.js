(function (angular, undefined) {
  "use strict";

  angular.module('app.controllers', [])

    .controller('BuildAnimationCtrl', ['$scope', '$log', '$state', '$timeout', '$uibModal', 'CanvasResponsive', 'CanvasSquare', 'CanvasClickSystem', 'CanvasSquareSystem', 'CanvasDrawSystem', 'CanvasDrawSquareSystem', 'CanvasCheckpointSystem', 'CanvasSquares', 'CanvasCheckpoint', 'CanvasAnimationLoop', 'WorldMap', 'CanvasPathFindingSystem', 'CanvasEndpointSystem', 'CanvasAnimationModel', 'CanvasSquareModel', function($scope, $log, $state, $timeout, $uibModal, CanvasResponsive, CanvasSquare, CanvasClickSystem, CanvasSquareSystem, CanvasDrawSystem, CanvasDrawSquareSystem, CanvasCheckpointSystem, CanvasSquares, CanvasCheckpoint, CanvasAnimationLoop, WorldMap, CanvasPathFindingSystem, CanvasEndpointSystem, CanvasAnimationModel, CanvasSquareModel) {

      $scope.canvasAnimation = {
        startDelay: 0
      };

      $scope.showClickOptions = false;
      $scope.showAllSquarePaths = false;

      $scope.setClickOptions = function(event) {
        event.stopPropagation();

        // TODO: set clickPosition to not go off the screen
        var clickEvent = CanvasClickSystem.getClickDetails().clickEvent;
        var aspectRatio = CanvasResponsive.getAspectRatio();

        $scope.clickOptionsPos = {
          left: (clickEvent.colNum - 1) * aspectRatio.cols.width,
          top: (clickEvent.rowNum  - 1) * aspectRatio.rows.height + aspectRatio.rows.height
        };

        $scope.$apply($scope.showClickOptions = true);
      };

      $scope.addNewSquare = function () {
        var newSquare = new CanvasSquare();

        CanvasSquares.addCanvasSquare(newSquare);
        $scope.setSelectedSquare(newSquare);

        WorldMap.update({
          rowNum: newSquare.rowNum - 1,
          colNum: newSquare.colNum - 1,
          weight: 0
        });
      };

      $scope.setSelectedSquare = function (canvasSquare) {
        $scope.selectedSquare = canvasSquare;
        CanvasClickSystem.setSelectedSquare(canvasSquare);

        var previouslySelectedSquare = CanvasClickSystem.getClickDetails().selected.square.previous;
        var checkpointCanvas = CanvasCheckpointSystem.getCanvasCheckpointElem();
        var pathfindingCanvas = CanvasPathFindingSystem.getCanvasPathfindingElem();
        var endpointCanvas = CanvasEndpointSystem.getCanvasEndpointElem();

        if (previouslySelectedSquare) {
          previouslySelectedSquare.clear();
          previouslySelectedSquare.draw();
        }

        CanvasDrawSystem.clearCanvas(checkpointCanvas);
        CanvasDrawSystem.clearCanvas(pathfindingCanvas);
        CanvasDrawSystem.clearCanvas(endpointCanvas);

        $scope.selectedSquare.draw();
        CanvasPathFindingSystem.drawPathForSquare($scope.selectedSquare);
        CanvasCheckpointSystem.drawSquareCheckpoints($scope.selectedSquare);
        $scope.selectedSquare.endpoint.draw();

        $scope.showClickOptions = false;
      };

      $scope.addNewCheckpoint = function () {
        var newCheckpoint = new CanvasCheckpoint();

        $scope.selectedSquare.checkpoints.push(newCheckpoint);
        if (!$scope.selectedSquare.nextCheckpoint) {
          $scope.selectedSquare.nextCheckpoint = newCheckpoint;
        }

        newCheckpoint.draw();

        CanvasDrawSystem.clearCanvas(CanvasPathFindingSystem.getCanvasPathfindingElem());
        CanvasPathFindingSystem.drawPathForSquare($scope.selectedSquare);

        $scope.showClickOptions = false;
      };

      $scope.drawAllSquarePaths = function () {
        var checkpointCanvas = CanvasCheckpointSystem.getCanvasCheckpointElem();
        var pathfindingCanvas = CanvasPathFindingSystem.getCanvasPathfindingElem();
        var endpointCanvas = CanvasEndpointSystem.getCanvasEndpointElem();

        CanvasDrawSystem.clearCanvas(checkpointCanvas);
        CanvasDrawSystem.clearCanvas(pathfindingCanvas);
        CanvasDrawSystem.clearCanvas(endpointCanvas);

        if ($scope.showAllSquarePaths) {
          CanvasPathFindingSystem.drawAllSquarePaths();
          CanvasCheckpointSystem.drawAllSquareCheckpoints();
          CanvasEndpointSystem.drawAllSquareEndpoints();
        } else {
          if ($scope.selectedSquare) {
            CanvasPathFindingSystem.drawPathForSquare($scope.selectedSquare);
            CanvasCheckpointSystem.drawSquareCheckpoints($scope.selectedSquare);
            $scope.selectedSquare.endpoint.draw();
          }
        }
      };

      $scope.openSaveModal = function () {
        $scope.showWrongPasswordAlert = false;
        $scope.showAnimationSaved = false;

        var modalInstance = $uibModal.open({
          templateUrl: 'saveModal.html',
          size: 'md',
          scope: $scope,
          controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
            $scope.saveAnimation = function () {
              var password = "Monsoon@321";

              if ($scope.passwordToSave === password) {
                $scope.save();
              } else {
                $scope.showWrongPasswordAlert = true;
              }

            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };

            $scope.save = function () {
              var canvasSquares = CanvasSquares.getCanvasSquares();
              var canvasAnimationId;
              async.waterfall([
                function (wateryCB) {
                  var newCanvasAnimation = {
                    startDelay: $scope.canvasAnimation.startDelay
                  };
                  CanvasAnimationModel.upsert(newCanvasAnimation)
                    .$promise
                    .then(function (canvasAnimation) {
                      canvasAnimationId = canvasAnimation.id;
                      return wateryCB(null, canvasAnimation.id);
                    })
                    .catch(function (err) {
                      return wateryCB(err);
                    });
                },
                function (canvasAnimationId, wateryCB) {
                  async.each(canvasSquares, function (canvasSquare, canvasSquareCB) {

                    async.waterfall([
                      function (innerWateryCB) {
                        var newCanvasSquare = {
                          colNum: canvasSquare.colNum,
                          rowNum: canvasSquare.rowNum,
                          fillStyle: canvasSquare.fillStyle,
                          velocity: canvasSquare.velocity
                        };

                        CanvasAnimationModel.squares.create({
                            id: canvasAnimationId
                          }, newCanvasSquare)
                          .$promise
                          .then(function (canvasSquareCreated) {
                            return innerWateryCB(null, canvasSquareCreated.id);
                          })
                          .catch(function (err) {
                            return innerWateryCB(err);
                          });
                      },
                      function (canvasSquareId, innerWateryCB) {
                        async.each(canvasSquare.checkpoints, function (squareCheckpoint, squareCheckpointCB) {
                          var newSquareCheckpoint = {
                            colNum: squareCheckpoint.colNum,
                            rowNum: squareCheckpoint.rowNum
                          };

                          CanvasSquareModel.checkpoints.create({
                              id: canvasSquareId
                            }, newSquareCheckpoint)
                            .$promise
                            .then(function () {
                              return squareCheckpointCB();
                            })
                            .catch(function (err) {
                              return squareCheckpointCB(err);
                            });
                        }, function (err) {
                          return innerWateryCB(err, canvasSquareId);
                        });
                      },
                      function (canvasSquareId, innerWateryCB) {
                        var newEndpoint = {
                          colNum: canvasSquare.endpoint.colNum,
                          rowNum: canvasSquare.endpoint.rowNum
                        };

                        CanvasSquareModel.endpoint.create({
                            id: canvasSquareId
                          }, newEndpoint)
                          .$promise
                          .then(function () {
                            return innerWateryCB();
                          })
                          .catch(function (err) {
                            return innerWateryCB(err);
                          });
                      }
                    ], function (err) {
                      return canvasSquareCB(err);
                    });

                  }, function (err) {
                    return wateryCB(err);
                  });
                }
              ], function (err) {
                if (err) {
                  return false;
                }

                $timeout(function () {
                  $scope.showWrongPasswordAlert = false;
                  $scope.showAnimationSaved = true;
                });
                console.log('save success');
                $state.transitionTo('preview-animation', {animationId: canvasAnimationId});

                return true;
              });

            };
          }]
        })
      };

      $scope.start = function () {
        CanvasAnimationLoop.startAnimationLoop();
      };

      $scope.stop = function () {
        CanvasAnimationLoop.stopAnimationLoop();
      };

    }]) // end ClickOptionsCtrl

    .controller('CanvasPreviewAnimationCtrl', ['$scope', '$log', 'canvasAnimation', 'CanvasSquareSystem', function ($scope, $log, canvasAnimation, CanvasSquareSystem) {
      $scope.canvasAnimation = canvasAnimation;
      console.log(JSON.stringify($scope.canvasAnimation));
    }])

    .controller('CanvasAnimationFrontendCtrl', ['$scope', 'CanvasSquares', 'CanvasSquare', function ($scope, CanvasSquares, CanvasSquare) {
    }]);

})(angular);
