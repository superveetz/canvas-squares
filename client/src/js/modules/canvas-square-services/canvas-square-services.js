(function () {
  "use strict";

  angular.module('canvas-square-services', [])

    .service('CanvasResponsive', ['$window', function ($window) {

      var aspectRatio;

      return {
        resizeCanvas: function (canvas) {
          canvas.width = canvas.parentElement.offsetWidth;
          canvas.height = canvas.parentElement.offsetHeight;
        },

        setAspectRatio: function () {
          // Todo: change aspect ratio according to window width/height
          var rows = 9;
          var cols = 16;

          var prevHeight;
          var prevWidth;
          var windowWidth = $window.innerWidth;
          var windowHeight = $window.innerHeight;

          if (aspectRatio) {
            prevHeight = aspectRatio.rows.height;
            prevWidth = aspectRatio.cols.width;
          } else {
            prevHeight = windowHeight / rows;
            prevWidth = windowWidth / cols;
          }

          var colWidth = windowWidth / cols;
          var rowHeight = windowHeight / rows;

          aspectRatio = {
            cols: {
              num: cols,
              width: colWidth,
              prevWidth: prevWidth
            },
            rows: {
              num: rows,
              height: rowHeight,
              prevHeight: prevHeight
            },
            pointRadius: 10
          };
        },

        getAspectRatio: function () {
          return aspectRatio;
        }

      };

    }]) // end CanvasResponsive

    .service('CanvasDrawSystem', ['CanvasResponsive', function (CanvasResponsive) {

      return {
        clearCanvas: function (canvas) {
          var ctx = canvas.getContext('2d');
          return ctx.clearRect(0, 0, canvas.width, canvas.height);
        },

        drawGridLines: function (canvas) {
          var ctx = canvas.getContext('2d');
          var aspectRatio = CanvasResponsive.getAspectRatio();

          ctx.fillStyle = 'black';
          ctx.setLineDash([5, 15]);

          // draw horizontal lines
          for (var i = 0, j = aspectRatio.rows.num; i < j; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i*aspectRatio.rows.height);
            ctx.lineTo(canvas.width, i*aspectRatio.rows.height);
            ctx.stroke();
          }
          // draw vertical lines
          for (var i = 0, j = aspectRatio.cols.num; i < j; i++) {
            ctx.beginPath();
            ctx.moveTo(i*aspectRatio.cols.width, 0);
            ctx.lineTo(i*aspectRatio.cols.width, canvas.height);
            ctx.stroke();
          }
        }

      };

    }]) // end CanvasDrawSystem

    .service('CanvasClickSystem', ['CanvasResponsive', 'CanvasSquares', function (CanvasResponsive, CanvasSquares) {

      var clickedDetails = {
        selected: {
          square: {
            previous: null,
            current: null
          },
          checkpoint: {
            previous: null,
            current: null
          },
          endpoint: {
            previous: null,
            current: null
          }
        },
        existsOnGrid: {
          squares: [],
          checkpoints: [],
          endpoints: []
        },
        radius: 8,
        clickEvent: {
          x: null,
          y: null,
          rowNum: null,
          colNum: null
        }
      };

      return {
        parseClickedLocation: function (event) {
          event.stopPropagation();

          var nearestGridLocation = this.getNearestGridLocation(event);

          clickedDetails.clickEvent = {
            x: event.pageX,
            y: event.pageY,
            rowNum: nearestGridLocation.rowNum,
            colNum: nearestGridLocation.colNum
          };

          clickedDetails.existsOnGrid = {
            squares: [],
            checkpoints: [],
            endpoints: []
          };

          var canvasSquares = CanvasSquares.getCanvasSquares();
          var aspectRatio = CanvasResponsive.getAspectRatio();

          for(var i = 0, j = canvasSquares.length; i < j; i++) {
            var currentSquare = canvasSquares[i];

            if (event.pageX >= currentSquare.x
              && event.pageX <= currentSquare.x + aspectRatio.cols.width
              && event.pageY >= currentSquare.y
              && event.pageY <= currentSquare.y + aspectRatio.rows.height) {
              clickedDetails.existsOnGrid.squares.push(currentSquare);
              break;
            }
          }

          var selectedSquare = clickedDetails.selected.square.current;
          if (selectedSquare) {
            for (var i = 0, j = selectedSquare.checkpoints.length; i < j; i++) {
              var currentCheckpoint = selectedSquare.checkpoints[i];

              if (event.pageX >= currentCheckpoint.x
                && event.pageX <= currentCheckpoint.x + aspectRatio.cols.width
                && event.pageY >= currentCheckpoint.y
                && event.pageY <= currentCheckpoint.y + aspectRatio.rows.height) {
                clickedDetails.existsOnGrid.checkpoints.push(currentCheckpoint);
              }
            }
          }

          return clickedDetails;
        },

        // returns values above 0
        getNearestGridLocation: function (event) {
          var colClicked = Math.floor((event.pageX + CanvasResponsive.getAspectRatio().cols.width) / CanvasResponsive.getAspectRatio().cols.width);
          var rowClicked = Math.floor((event.pageY + CanvasResponsive.getAspectRatio().rows.height) / CanvasResponsive.getAspectRatio().rows.height);

          return { colNum: colClicked, rowNum: rowClicked };
        },

        getClickDetails: function () {
          return clickedDetails;
        },

        setSelectedSquare: function (canvasSquare) {
          clickedDetails.selected.square.previous = clickedDetails.selected.square.current;
          clickedDetails.selected.square.current = canvasSquare;
        },

        drawClickEvent: function (canvas) {
          var ctx = canvas.getContext('2d');
          var aspectRatio = CanvasResponsive.getAspectRatio();


          ctx.beginPath();
          ctx.arc(((clickedDetails.clickEvent.colNum -1) * aspectRatio.cols.width) + (aspectRatio.cols.width / 2), ((clickedDetails.clickEvent.rowNum - 1) * aspectRatio.rows.height) + (aspectRatio.rows.height / 2), clickedDetails.radius, 0, 2*Math.PI);
          ctx.fillStyle = "black";
          ctx.fill();
          ctx.stroke();
          ctx.closePath();
        }

      };

    }]) // end CanvasClickSystem

    .service('CanvasSquare', ['CanvasResponsive', 'CanvasClickSystem', 'CanvasSquareSystem', 'CanvasEndpoint', 'CanvasCheckpoint', 'Astar', 'WorldMap', 'CanvasSquares', function (CanvasResponsive, CanvasClickSystem, CanvasSquareSystem, CanvasEndpoint, CanvasCheckpoint, Astar, WorldMap, CanvasSquares) {

      var defaultSquare = {};

      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }

      function guid() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
      }

      var SquareConstructor = function (squareData) {
        if (squareData) {
          this.init(angular.copy(squareData));
        } else {
          this.init(angular.copy(defaultSquare));
        }
      };

      SquareConstructor.prototype.init = function (squareData) {
        var clickEvent = CanvasClickSystem.getClickDetails().clickEvent;
        var aspectRatio = CanvasResponsive.getAspectRatio();

        this.id                 = squareData.id || guid();
        this.colNum             = squareData.colNum || clickEvent.colNum;
        this.rowNum             = squareData.rowNum || clickEvent.rowNum;
        this.nextNode           = null;
        this.currentNode        = null;
        this.timesNoPathFound   = 0;
        this.x                  = (this.colNum - 1) * aspectRatio.cols.width;
        this.y                  = (this.rowNum - 1) * aspectRatio.rows.height;
        this.fillStyle          = squareData.fillStyle || "green";
        this.velocity           = squareData.velocity || 6;
        this.checkpoints        = squareData.checkpoints && squareData.checkpoints.length ? this.createCheckpoints(squareData.checkpoints) : [];
        this.nextCheckpoint     = squareData.checkpoints && squareData.checkpoints.length ? this.checkpoints[0] : null;
        this.endpoint           = squareData.endpoint ? new CanvasEndpoint(squareData.endpoint) : new CanvasEndpoint();
      };

      SquareConstructor.prototype.createCheckpoints = function (checkpoints) {
        var squareCheckpoints = [];
        var newCheckpoint = null;

        for (var i = 0, j = checkpoints.length; i < j; i++) {
          newCheckpoint = new CanvasCheckpoint(checkpoints[i]);
          squareCheckpoints.push(newCheckpoint);
        }

        return squareCheckpoints;
      };

      SquareConstructor.prototype.clear = function () {
        var canvas = CanvasSquareSystem.getCanvasSquaresElem();
        var ctx = canvas.getContext('2d');
        var aspectRatio = CanvasResponsive.getAspectRatio();
        return ctx.clearRect(this.x, this.y, aspectRatio.cols.width, aspectRatio.rows.height);
      };

      SquareConstructor.prototype.draw = function () {
        var canvas = CanvasSquareSystem.getCanvasSquaresElem();
        var ctx = canvas.getContext('2d');
        var aspectRatio = CanvasResponsive.getAspectRatio();
        var currentlySelectedSquare = CanvasClickSystem.getClickDetails().selected.square.current;

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.rect(this.x+1, this.y+1, aspectRatio.cols.width-2, aspectRatio.rows.height-2);
        ctx.fillStyle = currentlySelectedSquare && currentlySelectedSquare.id === this.id ? 'gold' : this.fillStyle;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
      };

      SquareConstructor.prototype.generatePath = function () {
        var aspectRatio = CanvasResponsive.getAspectRatio();
        var graph = new Graph(WorldMap.data, { diagonal: false });
        var offsetByWidth = this.x >= this.nextCheckpoint.x;
        var offsetByHeight = this.y >= this.nextCheckpoint.y;
        var currCol = this.getCurrentColNum(offsetByWidth);
        var currRow = this.getCurrentRowNum(offsetByHeight);

        this.currentNode = {
          x: aspectRatio.cols.width * currCol - 1,
          y: aspectRatio.rows.height * currRow - 1,
          rowNum: currRow,
          colNum: currCol
        };

        var start = graph.grid[currRow-1][currCol-1];
        var end = graph.grid[this.nextCheckpoint.rowNum-1][this.nextCheckpoint.colNum-1];
        var result = astar.search(graph, start, end, { closest: true });

        return result;

      };

      SquareConstructor.prototype.moveTowardNextCheckpoint = function (nextNode) {
        var aspectRatio = CanvasResponsive.getAspectRatio();
        var nextNodeX = nextNode.x;
        var nextNodeY = nextNode.y;
        var squareExists;

        if (this.x < nextNodeX ) {
          // moving right
          if (Math.abs(this.x - nextNodeX) < this.velocity) {

            // squareExists = CanvasSquareSystem.doesSquareExistAtLocation(nextNodeX + aspectRatio.cols.width, this.y, this);
            // if (!squareExists) {
            //   this.x = nextNodeX;
            // }

            this.x = nextNodeX;

          } else {

            // squareExists = CanvasSquareSystem.doesSquareExistAtLocation(this.x + this.velocity + aspectRatio.cols.width, this.y, this);
            // if (!squareExists) {
            //   this.x += this.velocity;
            // }

            this.x += this.velocity;

          }
        } else if (this.x > nextNodeX) {
          // moving left
          if (Math.abs(this.x - nextNodeX) < this.velocity) {

            // squareExists = CanvasSquareSystem.doesSquareExistAtLocation(nextNodeX, this.y, this);
            // if (!squareExists) {
            //   this.x = nextNodeX;
            // }

            this.x = nextNodeX;

          } else {

            // squareExists = CanvasSquareSystem.doesSquareExistAtLocation(this.x - this.velocity, this.y, this);
            // if (!squareExists) {
            //   this.x -= this.velocity;
            // }

            this.x -= this.velocity;

          }
        } else if (this.y < nextNodeY) {
          // moving down
          if (Math.abs(this.y - nextNodeY) < this.velocity) {

            // squareExists = CanvasSquareSystem.doesSquareExistAtLocation(this.x, nextNodeY + aspectRatio.rows.height, this);
            // if (!squareExists) {
            //   this.y = nextNodeY;
            // }

            this.y = nextNodeY;

          } else {

            // squareExists = CanvasSquareSystem.doesSquareExistAtLocation(this.x, this.y + this.velocity + aspectRatio.rows.height, this);
            // if (!squareExists) {
            //   this.y += this.velocity;
            // }

            this.y += this.velocity;

          }
        } else if (this.y > nextNodeY) {
          // moving up
          if (Math.abs(this.y - nextNodeY) < this.velocity) {

            // squareExists = CanvasSquareSystem.doesSquareExistAtLocation(this.x, nextNodeY, this);
            // if (!squareExists) {
            //   this.y = nextNodeY;
            // }

            this.y = nextNodeY;

          } else {

            // squareExists = CanvasSquareSystem.doesSquareExistAtLocation(this.x, this.y - this.velocity, this);
            // if (!squareExists) {
            //   this.y -= this.velocity;
            // }

            this.y -= this.velocity;

          }
        }

        this.updateNextNode();
        this.updateNextCheckpoint();
      };

      SquareConstructor.prototype.setNextNode = function () {
        var aspectRatio = CanvasResponsive.getAspectRatio();
        var path = this.generatePath();

        if (path.length) {
          this.timesNoPathFound = 0;

          this.nextNode = {
            x: path[0].y * aspectRatio.cols.width,
            y: path[0].x * aspectRatio.rows.height,
            rowNum: path[0].x + 1,
            colNum: path[0].y + 1
          };

          WorldMap.update({
            rowNum: this.nextNode.rowNum - 1,
            colNum: this.nextNode.colNum - 1,
            weight: 0
          });

          // var self = this;
          // var canvasSquares = CanvasSquares.getCanvasSquares();
          // // ensure that no other squares are trying to move to this node
          // var currentSquare;
          // var nextNodeIsUnique = true;
          // for (var i = 0, j = canvasSquares.length; i < j; i++) {
          //   currentSquare = canvasSquares[i];
          //
          //   if (currentSquare.id == this.id) continue;
          //
          //   if (_.isEqual(currentSquare.nextNode, this.nextNode)) {
          //     nextNodeIsUnique = false;
          //     break;
          //   }
          // }

          // if (nextNodeIsUnique) {
          //   WorldMap.update({
          //     rowNum: this.nextNode.rowNum - 1,
          //     colNum: this.nextNode.colNum - 1,
          //     weight: 0
          //   });
          // } else {
          //   this.nextNode = null;
          //   setTimeout(function () {
          //     console.error('timed out');
          //     return self.setNextNode();
          //   }, 150);
          // }


        } else {
          this.timesNoPathFound++;

          if (this.timesNoPathFound >= 50) {
            this.updateNextCheckpoint(true);
          }
          this.nextNode = null;
        }
      };

      SquareConstructor.prototype.updateNextNode = function () {
        if (this.x == this.nextNode.x && this.y == this.nextNode.y) {

          WorldMap.update({
            rowNum: this.currentNode.rowNum - 1,
            colNum: this.currentNode.colNum - 1,
            weight: 1
          });

          this.nextNode = null;
        }
      };

      SquareConstructor.prototype.updateNextCheckpoint = function (skipCurrentNextCheckpoint) {
        if ((this.x == this.nextCheckpoint.x && this.y == this.nextCheckpoint.y) || skipCurrentNextCheckpoint) {
          var prevCheckpoint = this.checkpoints.indexOf(this.nextCheckpoint);

          if (prevCheckpoint+1 == this.checkpoints.length) {
            this.nextCheckpoint = this.endpoint;
          } else if (_.isMatch(this.nextCheckpoint, this.endpoint)) {
            this.nextCheckpoint = this.checkpoints[0];
          } else {
            this.nextCheckpoint = this.checkpoints[prevCheckpoint+1];
          }
        }
      };

      SquareConstructor.prototype.getCurrentColNum = function (offsetByWidth) {
        var aspectRatio = CanvasResponsive.getAspectRatio();
        var offset = 0;
        if (offsetByWidth) {
          offset += aspectRatio.cols.width - 1;
        }
        return Math.floor((this.x + offset) / aspectRatio.cols.width) + 1;
      };

      SquareConstructor.prototype.getCurrentRowNum = function (offsetByHeight) {
        var aspectRatio = CanvasResponsive.getAspectRatio();
        var offset = 0;
        if (offsetByHeight) {
          offset += aspectRatio.rows.height - 1;
        }
        return Math.floor((this.y + offset) / aspectRatio.rows.height) + 1;
      };

      return SquareConstructor;

    }]) // end CanvasSquare

    .service('CanvasCheckpoint', ['CanvasResponsive', 'CanvasClickSystem', 'CanvasCheckpointSystem', function (CanvasResponsive, CanvasClickSystem, CanvasCheckpointSystem) {

      var CheckpointConstructor = function (checkpointData) {
        if (checkpointData) {
          this.init(angular.copy(checkpointData));
        } else {
          var clickEvent = CanvasClickSystem.getClickDetails().clickEvent;
          var newCheckpoint = { colNum: clickEvent.colNum, rowNum: clickEvent.rowNum };

          this.init(angular.copy(newCheckpoint));
        }
      };

      CheckpointConstructor.prototype.init = function (checkpointData) {
        var aspectRatio = CanvasResponsive.getAspectRatio();

        this.colNum    = checkpointData.colNum;
        this.rowNum    = checkpointData.rowNum;
        this.x         = checkpointData.x || (this.colNum - 1) * aspectRatio.cols.width;
        this.y         = checkpointData.y || (this.rowNum - 1) * aspectRatio.rows.height;
        this.radius    = 10;
        this.fillStyle = "blue";
      };

      CheckpointConstructor.prototype.clear = function () {
        var canvas = CanvasCheckpointSystem.getCanvasCheckpointElem();
        var ctx = canvas.getContext('2d');
        var aspectRatio = CanvasResponsive.getAspectRatio();

        return ctx.clearRect(this.x, this.y, aspectRatio.cols.width, aspectRatio.rows.height);
      };

      CheckpointConstructor.prototype.draw = function () {
        var canvas = CanvasCheckpointSystem.getCanvasCheckpointElem();
        var ctx = canvas.getContext('2d');
        var aspectRatio = CanvasResponsive.getAspectRatio();

        ctx.beginPath();
        ctx.arc(this.x + (aspectRatio.cols.width / 2), this.y + (aspectRatio.rows.height / 2), this.radius, 0, 2*Math.PI);
        ctx.fillStyle = this.fillStyle;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
      };

      return CheckpointConstructor;

    }]) // end CanvasCheckpoint

    .service('CanvasEndpoint', ['CanvasResponsive', 'CanvasClickSystem', 'CanvasEndpointSystem', function (CanvasResponsive, CanvasClickSystem, CanvasEndpointSystem) {

      var EndpointConstructor = function (endpointData) {
        if (endpointData) {
          this.init(angular.copy(endpointData));
        } else {
          var clickEvent = CanvasClickSystem.getClickDetails().clickEvent;
          var newEndpoint = { colNum: clickEvent.colNum, rowNum: clickEvent.rowNum };

          this.init(angular.copy(newEndpoint));
        }

      };

      EndpointConstructor.prototype.init = function (endpointData) {
        var aspectRatio = CanvasResponsive.getAspectRatio();

        this.rowNum     = endpointData.rowNum;
        this.colNum     = endpointData.colNum;
        this.x          = (this.colNum - 1) * aspectRatio.cols.width;
        this.y          = (this.rowNum - 1) * aspectRatio.rows.height;
        this.radius     = 10;
        this.fillStyle  = "red";
      };

      EndpointConstructor.prototype.clear = function () {
        var canvas = CanvasEndpointSystem.getCanvasEndpointElem();
        var ctx = canvas.getContext('2d');
        var aspectRatio = CanvasResponsive.getAspectRatio();

        return ctx.clearRect(this.x, this.y, aspectRatio.cols.width, aspectRatio.rows.height);
      };

      EndpointConstructor.prototype.draw = function () {
        var canvas = CanvasEndpointSystem.getCanvasEndpointElem();
        var ctx = canvas.getContext('2d');
        var aspectRatio = CanvasResponsive.getAspectRatio();

        ctx.beginPath();
        ctx.arc(this.x + (aspectRatio.cols.width / 2), this.y + (aspectRatio.rows.height / 2), this.radius, 0, 2*Math.PI);
        ctx.fillStyle = this.fillStyle;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
      };

      return EndpointConstructor;

    }]) // end CanvasEndpoint

    .service('CanvasSquareSystem', ['CanvasResponsive', 'CanvasSquares', 'WorldMap', 'CanvasClickSystem', function (CanvasResponsive, CanvasSquares, WorldMap, CanvasClickSystem) {

      var canvasSquaresElem;

      return {
        setCanvasSquaresElem: function (canvas) {
          return canvasSquaresElem = canvas;
        },

        getCanvasSquaresElem: function () {
          return canvasSquaresElem;
        },

        drawCanvasSquares: function () {
          var canvasSquares = CanvasSquares.getCanvasSquares();
          var currentSquare;

          for (var i = 0, j = canvasSquares.length; i < j; i++) {
            currentSquare = canvasSquares[i];

            currentSquare.draw(canvasSquaresElem);
          }
        },

        repositionCanvasSquares: function () {
          var canvasSquares = CanvasSquares.getCanvasSquares();
          var aspectRatio = CanvasResponsive.getAspectRatio();

          var currentSquare;

          for (var i = 0, j = canvasSquares.length; i < j; i++) {
            currentSquare = canvasSquares[i];

            currentSquare.x += (aspectRatio.cols.width - aspectRatio.cols.prevWidth ) * (currentSquare.colNum - 1);
            currentSquare.y += (aspectRatio.rows.height - aspectRatio.rows.prevHeight) * (currentSquare.rowNum - 1);
          }
        },

        animateSquares: function () {
          var canvasSquares = CanvasSquares.getCanvasSquares();
          var currentSquare;
          var path;

          for (var i = 0, j = canvasSquares.length; i < j; i++) {
            currentSquare = canvasSquares[i];

            if (currentSquare.nextCheckpoint) {

              if (!currentSquare.nextNode) {
                currentSquare.setNextNode();
              }

              if (currentSquare.nextNode) {
                currentSquare.clear();
                currentSquare.moveTowardNextCheckpoint(currentSquare.nextNode);
                currentSquare.draw();
              }
            }

          }
        },

        doesSquareExistAtLocation: function (nxtX, nxtY, squareToOmit) {
          var canvasSquares = CanvasSquares.getCanvasSquares();
          var aspectRatio = CanvasResponsive.getAspectRatio();
          var offsetX = squareToOmit.x < nxtX ? 0 : aspectRatio.cols.width;
          var offsetY = squareToOmit.y < nxtY ? 0 : aspectRatio.rows.height;

          // where RectA = currentSquare
          // and   RectB = squareToOmit
          // RectB (x1,y1) /////////////////
          //             //
          // RectA (x1, y1) ///////////////////    //
          //      //       //    //
          //      ///////////////// RectB (x2, y2)
          //               //
          //               //
          /////////////////// RectA (x2, y2)

          var RectA;
          var RectB = {
            x1: Math.floor(nxtX),
            x2: Math.floor(nxtX + offsetX),
            y1: Math.floor(nxtY),
            y2: Math.floor(nxtY + offsetY)
          };

          for (var i = 0, j = canvasSquares.length; i < j; i++) {
            var currentSquare = canvasSquares[i];

            if (currentSquare.id == squareToOmit.id) continue;

            RectA = {
              x1: Math.floor(currentSquare.x),
              x2: Math.floor(currentSquare.x + aspectRatio.cols.width),
              y1: Math.floor(currentSquare.y),
              y2: Math.floor(currentSquare.y + aspectRatio.rows.height)
            };

            // proof by contradiction
            if (RectA.x1 < RectB.x2 && RectA.x2 > RectB.x1
              && RectA.y1 < RectB.y2 && RectA.y2 > RectB.y1) {
              return true;
            }

          }
          return false;
        }

      };

    }]) // end CanvasSquareSystem

    .service('CanvasAnimationLoop', ['CanvasSquareSystem', function (CanvasSquareSystem) {

      var animationId;
      var timeoutId;

      return {
        startAnimationLoop: function () {
          function animationLoop () {
            CanvasSquareSystem.animateSquares();


            timeoutId = setTimeout(function () {
              animationId = requestAnimationFrame(animationLoop);
            }, 0);
          }
          animationId = requestAnimationFrame(animationLoop);
        },

        stopAnimationLoop: function () {
          cancelAnimationFrame(animationId);
          clearTimeout(timeoutId);
        },
      };

    }]) // end CanvasAnimationLoop

    .service('CanvasSquares', [function () {
      var canvasSquares = [];

      return {
        init: function () {
          canvasSquares = [];
        },

        addCanvasSquare: function (canvasSquare) {
          return canvasSquares.push(canvasSquare);
        },

        getCanvasSquares: function () {
          return canvasSquares;
        }
      };
    }]) // end CanvasSquares

    .service('CanvasEndpointSystem', ['CanvasSquareSystem', 'CanvasResponsive', 'CanvasSquares', function (CanvasSquareSystem, CanvasResponsive, CanvasSquares) {
      var canvasEndpointElem;

      return {
        setCanvasEndpointElem: function (canvas) {
          canvasEndpointElem = canvas;
        },

        getCanvasEndpointElem: function () {
          return canvasEndpointElem;
        },

        drawAllSquareEndpoints: function () {
          var canvasSquares = CanvasSquares.getCanvasSquares();

          for (var i = 0, j = canvasSquares.length; i < j; i++) {
            canvasSquares[i].endpoint.draw(canvasEndpointElem);
          }
        },

        repositionCanvasEndpoints: function () {
          var canvasSquares = CanvasSquares.getCanvasSquares();
          var aspectRatio = CanvasResponsive.getAspectRatio();
          var currentSquare;

          for (var i = 0, j = canvasSquares.length; i < j; i++) {
            currentSquare = canvasSquares[i];
            currentSquare.endpoint.x += (aspectRatio.cols.width - aspectRatio.cols.prevWidth ) * (currentSquare.endpoint.colNum - 1);
            currentSquare.endpoint.y += (aspectRatio.rows.height - aspectRatio.rows.prevHeight) * (currentSquare.endpoint.rowNum - 1);
          }
        }
      };

    }]) // end CanvasEndpointSystem

    .service('CanvasPathFindingSystem', ['WorldMap', 'CanvasResponsive', 'CanvasSquares', 'CanvasClickSystem', function (WorldMap, CanvasResponsive, CanvasSquares, CanvasClickSystem) {

      var canvasPathfindingElem;

      return {
        setCanvasPathfindingElem: function (canvas) {
          canvasPathfindingElem = canvas;
        },

        getCanvasPathfindingElem: function () {
          return canvasPathfindingElem;
        },

        drawAllSquarePaths: function () {
          var canvasSquares = CanvasSquares.getCanvasSquares();

          for (var i = 0, j = canvasSquares.length; i < j; i++) {
            this.drawPathForSquare(canvasSquares[i]);
          }
        },

        drawPathForSquare: function (square) {

          if (!square.checkpoints.length) return;

          var aspectRatio = CanvasResponsive.getAspectRatio();
          var canvas = this.getCanvasPathfindingElem();
          var ctx = canvas.getContext('2d');
          var currentCheckpoint;
          var nextCheckpoint;
          var fromX;
          var fromY;
          var toX;
          var toY;
          var offsetX = aspectRatio.cols.width / 2;
          var offsetY = aspectRatio.rows.height / 2;
          var selectedSquare = CanvasClickSystem.getClickDetails().selected.square.current;

          ctx.strokeStyle = square.id == selectedSquare.id ? '#4682b4' : '#00bfff';
          ctx.lineWidth = 5;
          ctx.setLineDash([25, 15]);

          // draw lines from first and last checkpoints to endpoint
          var endpointX = (square.endpoint.colNum - 1) * aspectRatio.cols.width + offsetX;
          var endpointY = (square.endpoint.rowNum - 1) * aspectRatio.rows.height + offsetY;
          var firstCheckX = (square.checkpoints[0].colNum - 1) * aspectRatio.cols.width + offsetX;
          var firstCheckY = (square.checkpoints[0].rowNum - 1) * aspectRatio.rows.height + offsetY;
          var lastCheckX = (square.checkpoints[square.checkpoints.length - 1].colNum - 1) * aspectRatio.cols.width + offsetX;
          var lastCheckY = (square.checkpoints[square.checkpoints.length - 1].rowNum - 1) * aspectRatio.rows.height + offsetY;

          // endpoint to first
          ctx.beginPath();
          ctx.moveTo(endpointX, endpointY);
          ctx.lineTo(firstCheckX, firstCheckY);
          ctx.stroke();
          ctx.closePath();

          // last to endpoint
          ctx.beginPath();
          ctx.moveTo(lastCheckX, lastCheckY);
          ctx.lineTo(endpointX, endpointY);
          ctx.stroke();
          ctx.closePath();

          // checkpoints to eachother
          for (var i = 0, j = square.checkpoints.length; i < j; i++) {
            if (i + 1 == square.checkpoints.length) break;
            currentCheckpoint = square.checkpoints[i];
            nextCheckpoint = square.checkpoints[i + 1];

            fromX = (currentCheckpoint.colNum - 1) * aspectRatio.cols.width + offsetX;
            fromY = (currentCheckpoint.rowNum - 1) * aspectRatio.rows.height + offsetY;
            toX = (nextCheckpoint.colNum - 1) * aspectRatio.cols.width + offsetX;
            toY = (nextCheckpoint.rowNum - 1) * aspectRatio.rows.height + offsetY;

            ctx.beginPath();
            ctx.moveTo(fromX, fromY);
            ctx.lineTo(toX, toY);
            ctx.stroke();
            ctx.closePath();
          }
        }

      };

    }]) // end CanvasPathfindingSystem

    .service('CanvasGridSystem', [function () {
      var canvasGridElem;

      return {
        setCanvasGridElem: function (canvas) {
          return canvasGridElem = canvas;
        },

        getCanvasGridElem: function () {
          return canvasGridElem;
        }
      };

    }]) // end CanvasGridSystem

    .service('CanvasCheckpointSystem', ['CanvasResponsive', 'CanvasSquares', function (CanvasResponsive, CanvasSquares) {
      var canvasCheckpointElem;

      return {
        setCanvasCheckpointElem: function (canvas) {
          return canvasCheckpointElem = canvas;
        },

        getCanvasCheckpointElem: function () {
          return canvasCheckpointElem;
        },

        drawAllSquareCheckpoints: function () {
          var canvasSquares = CanvasSquares.getCanvasSquares();

          for (var i = 0, j = canvasSquares.length; i < j; i++) {
            this.drawSquareCheckpoints(canvasSquares[i]);
          }
        },

        drawSquareCheckpoints: function (square) {
          var ctx = canvasCheckpointElem.getContext('2d');
          var aspectRatio = CanvasResponsive.getAspectRatio();
          var currentCheckpoint;

          for (var i = 0, j = square.checkpoints.length; i < j; i++) {
            currentCheckpoint = square.checkpoints[i];

            ctx.beginPath();
            ctx.arc(currentCheckpoint.x + (aspectRatio.cols.width / 2), currentCheckpoint.y + (aspectRatio.rows.height / 2), currentCheckpoint.radius, 0, 2*Math.PI);
            ctx.fillStyle = currentCheckpoint.fillStyle;
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
          }
        }
      };

    }]) // end CanvasGridSystem

    .service('Astar', ['WorldMap', 'CanvasResponsive', function (WorldMap, CanvasResponsive) {
      return {
        findPath: function (pathObj) {
          // copy current map
          var map = angular.copy(WorldMap.data);

          // init vars
          var path = {};
          var open = [];
          var closed = [];

          // cache vars
          var currentNeighbourNode;
          var parentNode;
          var parentNodeIndex;
          var neighbouringNodes;
          var nodeExistsInClosed;
          var nodeExistsInOpen;

          // H-cost: distance from current node to end node
          // G-cost: distance from current node to starting node
          // F-cost: H-cost + G-cost

          // init H-Values for each node
          setMapNodesHValues(map, pathObj);

          // set ending node
          var endingNode = map[pathObj.endRow-1][pathObj.endCol-1];
          // set starting node
          var startingNode = map[pathObj.startRow-1][pathObj.startCol-1];
          // add starting node to open
          open.push(startingNode);

          // A* Loop Algorithm (find the shortest path between 2 nodes)
          while(true) {
            // find node with lowest F-cost in open
            parentNode = getLowestFCost(open);

            if (!_.isUndefined(parentNode)) {
              // remove node from open
              parentNodeIndex = open.indexOf(parentNode);
              open.splice(parentNodeIndex, 1);

              // add node to closed
              closed.push(parentNode);
            }

            // path established
            if (_.isUndefined(parentNode) || parentNode.id == endingNode.id) {
              // return an array of nodes containing the fastest path
              return buildFastestPath(map, startingNode, parentNode);
            }

            // get neighbours of current node
            neighbouringNodes = getNeighbouringNodes(map, parentNode, pathObj.square);
            // set parent, G-costs, and F-costs of neighbouring nodes
            for (var i = 0, j = neighbouringNodes.length; i < j; i++) {
              currentNeighbourNode = neighbouringNodes[i];
              // determine if the current node exists in the closed set
              nodeExistsInClosed = doesNodeExist(closed, currentNeighbourNode);

              // go to next node in neighbours
              if (!_.isUndefined(nodeExistsInClosed)) continue;

              // determine if the current node exists in the open set
              nodeExistsInOpen = doesNodeExist(open, currentNeighbourNode);
              if (_.isUndefined(nodeExistsInOpen)) {
                // set values
                setGCostOfNode(currentNeighbourNode, startingNode);
                setFCostOfNode(currentNeighbourNode);
                setParentOfNode(currentNeighbourNode, parentNode);

                // add current node to open
                open.push(currentNeighbourNode);
              }

            }

          }

          // pseudo algorithm
          // OPEN -- set of nodes to be evaluated
          // CLOSED -- set of nodes already evaluated

          // 1. add the start node to OPEN

          // while (searchingForPath) {
          //   current = node in OPEN with lowest f_cost
          //   remove current from OPEN
          //   add current to CLOSED

          //   if (current === targetNode) { (path has been found)
          //     return;
          //   }

          //   foreach neighbour of the current node
          //   if neighbour is not walkable or neighbour is in CLOSED
          //     skip to the next neighbour

          //   if new path to neighbour is shorter OR neighbour is not in OPEN
          //     set f_cost of neighbour
          //     set parent of neighbour to current
          //     if neighbour is not in OPEN
          //       add neighbour to OPEN
          // }
        }
      };

      // parse map data and return an array of the fastest path
      function buildFastestPath (map, startingNode, endingNode) {
        var path = [];
        var currentNode = endingNode;

        while (currentNode && currentNode.id != startingNode.id) {
          path.push(currentNode);
          currentNode = findChildOfParentNode(map, currentNode);
        }

        path.reverse();

        return path;
      }

      // find the child of a parent node
      function findChildOfParentNode (map, currentNode) {
        var topNode = map[currentNode.rowNum-2] ? map[currentNode.rowNum-2][currentNode.colNum-1] : undefined;
        var bottomNode = map[currentNode.rowNum] ? map[currentNode.rowNum][currentNode.colNum-1] : undefined;
        var leftNode = map[currentNode.rowNum-1][currentNode.colNum-2] ? map[currentNode.rowNum-1][currentNode.colNum-2] : undefined;
        var rightNode = map[currentNode.rowNum-1][currentNode.colNum] ? map[currentNode.rowNum-1][currentNode.colNum] : undefined;

        if (topNode && topNode.id == currentNode.parentId) {
          return topNode;
        } else if (bottomNode && bottomNode.id == currentNode.parentId) {
          return bottomNode;
        } else if (leftNode && leftNode.id == currentNode.parentId) {
          return leftNode;
        } else if (rightNode && rightNode.id == currentNode.parentId) {
          return rightNode;
        } else {
          return undefined;
        }

      }

      // determine if a node already exists in a set
      function doesNodeExist (set, currentNode) {
        var nodeExists = _.find(set, function (mapNode) {
          return mapNode.id == currentNode.id;
        });

        return nodeExists;
      }

      // get lowest F-cost in a collection
      function getLowestFCost (open) {
        if (!open.length) {
          return undefined;
        }
        else if (open.length == 1) {
          return open[0];
        } else {
          var lowest = { index: -1, F: Number.POSITIVE_INFINITY };
          var currentNode;

          for (var i = 0, j = open.length; i < j; i++) {
            currentNode = open[i];

            if (currentNode.F < lowest.F) lowest = { index: i, F: currentNode.F };
          }

          return open[lowest.index];
        }
      }

      // set parent of a node
      function setParentOfNode (currentNode, parentNode) {
        currentNode.parentId = parentNode.id;
      }

      // sets F-cost of a node
      function setFCostOfNode (currentNode) {
        currentNode.F = currentNode.G + currentNode.H;
      }

      // sets the G-cost of a node
      function setGCostOfNode (currentNode, startingNode) {
        var distancePerNode = 10;
        var numNodesHorizontally = Math.abs(startingNode.rowNum - currentNode.rowNum);
        var numNodesVertically = Math.abs(startingNode.colNum - currentNode.colNum);

        currentNode.G = (numNodesHorizontally * distancePerNode) + (numNodesVertically * distancePerNode);
      }

      // get neighbouring nodes of current node
      function getNeighbouringNodes (map, currentNode, square) {
        var numNodesPerRow = CanvasResponsive.getAspectRatio().cols.num;
        var neighbouringNodes = [];
        var currentNeighbours = [];
        var currentMapRow;

        for (var i = 0, j = map.length; i < j; i++) {
          currentMapRow = map[i];

          currentNeighbours = _.filter(currentMapRow, function (mapNode) {

            return (mapNode.walkable || mapNode.occupiedBy == square.id || _.isEqual(mapNode, map[square.nextCheckpoint.rowNum-1][square.nextCheckpoint.colNum-1]))
              && (currentNode.id == mapNode.id + 1
              || currentNode.id == mapNode.id - 1
              || currentNode.id == mapNode.id + numNodesPerRow
              || currentNode.id == mapNode.id - numNodesPerRow);
          });

          if (currentNeighbours.length) {
            neighbouringNodes = neighbouringNodes.concat(currentNeighbours);
          }
        }

        return neighbouringNodes;
      }

      // sets H-Value to each node on our map assuming non diagonal movement
      function setMapNodesHValues (map, pathObj) {
        var currentMapRow;
        var currentMapCol;
        var distancePerNode = 10;

        for (var i = 0, j = map.length; i < j; i++) {
          currentMapRow = map[i];

          for (var k = 0, l = currentMapRow.length; k < l; k++) {
            currentMapCol = currentMapRow[k];

            currentMapCol.H = (Math.abs(k+1 - pathObj.endCol) * distancePerNode) + (Math.abs(i+1 - pathObj.endRow) * distancePerNode);
          }

        }
      }
    }]) // end Astar

    .service('WorldMap', ['$log', 'CanvasResponsive', 'CanvasSquares', function ($log, CanvasResponsive, CanvasSquares) {

      var worldMap = {};

      worldMap.create = function () {
        var canvasSquares = CanvasSquares.getCanvasSquares();
        var aspectRatio = CanvasResponsive.getAspectRatio();
        var mapData = [];

        for (var i = 0, j = aspectRatio.rows.num; i < j; i++) {
          var mapRow = [];

          for (var k = 0, l = aspectRatio.cols.num; k < l; k++) {
            mapRow.push(1);
          }

          mapData.push(mapRow);
        }

        worldMap.mapWithoutSquares = angular.copy(mapData);


        for (var i = 0, j = canvasSquares.length; i < j; i++) {
          var currentSquare = canvasSquares[i];
          var colNum = currentSquare.colNum - 1;
          var rowNum = currentSquare.rowNum - 1;

          mapData[rowNum][colNum] = 0;
        }

        worldMap.data = angular.copy(mapData);
      };

      worldMap.update = function (mapObj) {
        worldMap.data[mapObj.rowNum][mapObj.colNum] = mapObj.weight;
        // this.printMap();
      };

      worldMap.printMap = function () {
        var currentMapRow = null;

        $log.debug('************************************************');
        for (var i = 0, j = worldMap.data.length; i < j; i++) {
          currentMapRow = worldMap.data[i];
          $log.debug(currentMapRow);
        }
        $log.debug('************************************************');
      };

      return worldMap;

    }]) // end WorldMap

    .service('CanvasDrawSquareSystem', ['CanvasResponsive', 'CanvasClickSystem', 'CanvasSquareSystem', 'CanvasSquares', function (CanvasResponsive, CanvasClickSystem, CanvasSquareSystem, CanvasSquares) {

      return {
        drawSquareEndpoints: function (canvas) {
          var ctx = canvas.getContext('2d');
          var aspectRatio = CanvasResponsive.getAspectRatio();
          var canvasSquares = CanvasSquareSystem.getCanvasSquares();

          for (var i = 0, j = canvasSquares.length; i < j; i++) {
            var currentEndpoint = canvasSquares[i].endpoint;

            ctx.beginPath();
            ctx.arc(((currentEndpoint.colNum -1) * aspectRatio.cols.width) + (aspectRatio.cols.width / 2), ((currentEndpoint.rowNum - 1) * aspectRatio.rows.height) + (aspectRatio.rows.height / 2), aspectRatio.pointRadius, 0, 2*Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
          }
        },

        drawSquareCheckpoints: function (canvas) {
          var ctx = canvas.getContext('2d');
          var aspectRatio = CanvasResponsive.getAspectRatio();
          var canvasSquares = CanvasSquares.getCanvasSquares();

          for (var i = 0, j = canvasSquares.length; i < j; i++) {
            var currentSquare = canvasSquares[i];

            for (var k = 0, l = currentSquare.checkpoints.length; k < l; k++) {
              var currentCheckpoint = currentSquare.checkpoints[k];
              ctx.beginPath();
              ctx.arc(((currentCheckpoint.colNum -1) * aspectRatio.cols.width) + (aspectRatio.cols.width / 2), ((currentCheckpoint.rowNum - 1) * aspectRatio.rows.height) + (aspectRatio.rows.height / 2), aspectRatio.pointRadius, 0, 2*Math.PI);
              ctx.fillStyle = "blue";
              ctx.fill();
              ctx.stroke();
              ctx.closePath();
            }
          }
        },

        drawSquareCheckpoint: function (canvas, checkpoint) {
          var ctx = canvas.getContext('2d');
          var aspectRatio = CanvasResponsive.getAspectRatio();

          ctx.beginPath();
          ctx.arc(((checkpoint.colNum -1) * aspectRatio.cols.width) + (aspectRatio.cols.width / 2), ((checkpoint.rowNum - 1) * aspectRatio.rows.height) + (aspectRatio.rows.height / 2), aspectRatio.pointRadius, 0, 2*Math.PI);
          ctx.fillStyle = "blue";
          ctx.fill();
          ctx.stroke();
          ctx.closePath();
        }
      };

    }]);

})();
