// CommonJS package manager support
if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports) {
  // Export the *name* of this Angular module
  // Sample usage:
  //
  //   import lbServices from './lb-services';
  //   angular.module('app', [lbServices]);
  //
  module.exports = "lbServices";
}

(function(window, angular, undefined) {'use strict';

var urlBase = "/api";
var authHeader = 'authorization';

function getHost(url) {
  var m = url.match(/^(?:https?:)?\/\/([^\/]+)/);
  return m ? m[1] : null;
}

var urlBaseHost = getHost(urlBase) || location.host;

/**
 * @ngdoc overview
 * @name lbServices
 * @module
 * @description
 *
 * The `lbServices` module provides services for interacting with
 * the models exposed by the LoopBack server via the REST API.
 *
 */
var module = angular.module("lbServices", ['ngResource']);

/**
 * @ngdoc object
 * @name lbServices.CanvasAnimationModel
 * @header lbServices.CanvasAnimationModel
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `CanvasAnimationModel` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "CanvasAnimationModel",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/CanvasAnimationModels/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use CanvasAnimationModel.squares.findById() instead.
        "prototype$__findById__squares": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/CanvasAnimationModels/:id/squares/:fk",
          method: "GET"
        },

        // INTERNAL. Use CanvasAnimationModel.squares.destroyById() instead.
        "prototype$__destroyById__squares": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/CanvasAnimationModels/:id/squares/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use CanvasAnimationModel.squares.updateById() instead.
        "prototype$__updateById__squares": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/CanvasAnimationModels/:id/squares/:fk",
          method: "PUT"
        },

        // INTERNAL. Use CanvasAnimationModel.squares() instead.
        "prototype$__get__squares": {
          isArray: true,
          url: urlBase + "/CanvasAnimationModels/:id/squares",
          method: "GET"
        },

        // INTERNAL. Use CanvasAnimationModel.squares.create() instead.
        "prototype$__create__squares": {
          url: urlBase + "/CanvasAnimationModels/:id/squares",
          method: "POST"
        },

        // INTERNAL. Use CanvasAnimationModel.squares.destroyAll() instead.
        "prototype$__delete__squares": {
          url: urlBase + "/CanvasAnimationModels/:id/squares",
          method: "DELETE"
        },

        // INTERNAL. Use CanvasAnimationModel.squares.count() instead.
        "prototype$__count__squares": {
          url: urlBase + "/CanvasAnimationModels/:id/squares/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasAnimationModel#create
         * @methodOf lbServices.CanvasAnimationModel
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasAnimationModel` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/CanvasAnimationModels",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasAnimationModel#createMany
         * @methodOf lbServices.CanvasAnimationModel
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasAnimationModel` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/CanvasAnimationModels",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasAnimationModel#upsert
         * @methodOf lbServices.CanvasAnimationModel
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasAnimationModel` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/CanvasAnimationModels",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasAnimationModel#exists
         * @methodOf lbServices.CanvasAnimationModel
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/CanvasAnimationModels/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasAnimationModel#findById
         * @methodOf lbServices.CanvasAnimationModel
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasAnimationModel` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/CanvasAnimationModels/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasAnimationModel#find
         * @methodOf lbServices.CanvasAnimationModel
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasAnimationModel` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/CanvasAnimationModels",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasAnimationModel#findOne
         * @methodOf lbServices.CanvasAnimationModel
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasAnimationModel` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/CanvasAnimationModels/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasAnimationModel#updateAll
         * @methodOf lbServices.CanvasAnimationModel
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/CanvasAnimationModels/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasAnimationModel#deleteById
         * @methodOf lbServices.CanvasAnimationModel
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasAnimationModel` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/CanvasAnimationModels/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasAnimationModel#count
         * @methodOf lbServices.CanvasAnimationModel
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/CanvasAnimationModels/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasAnimationModel#prototype$updateAttributes
         * @methodOf lbServices.CanvasAnimationModel
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasAnimationModel` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/CanvasAnimationModels/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasAnimationModel#createChangeStream
         * @methodOf lbServices.CanvasAnimationModel
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/CanvasAnimationModels/change-stream",
          method: "POST"
        },

        // INTERNAL. Use CanvasSquareModel.canvasAnimation() instead.
        "::get::CanvasSquareModel::canvasAnimation": {
          url: urlBase + "/CanvasSquareModels/:id/canvasAnimation",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.CanvasAnimationModel#updateOrCreate
         * @methodOf lbServices.CanvasAnimationModel
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasAnimationModel` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.CanvasAnimationModel#update
         * @methodOf lbServices.CanvasAnimationModel
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.CanvasAnimationModel#destroyById
         * @methodOf lbServices.CanvasAnimationModel
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasAnimationModel` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.CanvasAnimationModel#removeById
         * @methodOf lbServices.CanvasAnimationModel
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasAnimationModel` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.CanvasAnimationModel#modelName
    * @propertyOf lbServices.CanvasAnimationModel
    * @description
    * The name of the model represented by this $resource,
    * i.e. `CanvasAnimationModel`.
    */
    R.modelName = "CanvasAnimationModel";

    /**
     * @ngdoc object
     * @name lbServices.CanvasAnimationModel.squares
     * @header lbServices.CanvasAnimationModel.squares
     * @object
     * @description
     *
     * The object `CanvasAnimationModel.squares` groups methods
     * manipulating `CanvasSquareModel` instances related to `CanvasAnimationModel`.
     *
     * Call {@link lbServices.CanvasAnimationModel#squares CanvasAnimationModel.squares()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.CanvasAnimationModel#squares
         * @methodOf lbServices.CanvasAnimationModel
         *
         * @description
         *
         * Queries squares of CanvasAnimationModel.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareModel` object.)
         * </em>
         */
        R.squares = function() {
          var TargetResource = $injector.get("CanvasSquareModel");
          var action = TargetResource["::get::CanvasAnimationModel::squares"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.CanvasAnimationModel.squares#count
         * @methodOf lbServices.CanvasAnimationModel.squares
         *
         * @description
         *
         * Counts squares of CanvasAnimationModel.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.squares.count = function() {
          var TargetResource = $injector.get("CanvasSquareModel");
          var action = TargetResource["::count::CanvasAnimationModel::squares"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.CanvasAnimationModel.squares#create
         * @methodOf lbServices.CanvasAnimationModel.squares
         *
         * @description
         *
         * Creates a new instance in squares of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareModel` object.)
         * </em>
         */
        R.squares.create = function() {
          var TargetResource = $injector.get("CanvasSquareModel");
          var action = TargetResource["::create::CanvasAnimationModel::squares"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.CanvasAnimationModel.squares#createMany
         * @methodOf lbServices.CanvasAnimationModel.squares
         *
         * @description
         *
         * Creates a new instance in squares of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareModel` object.)
         * </em>
         */
        R.squares.createMany = function() {
          var TargetResource = $injector.get("CanvasSquareModel");
          var action = TargetResource["::createMany::CanvasAnimationModel::squares"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.CanvasAnimationModel.squares#destroyAll
         * @methodOf lbServices.CanvasAnimationModel.squares
         *
         * @description
         *
         * Deletes all squares of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.squares.destroyAll = function() {
          var TargetResource = $injector.get("CanvasSquareModel");
          var action = TargetResource["::delete::CanvasAnimationModel::squares"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.CanvasAnimationModel.squares#destroyById
         * @methodOf lbServices.CanvasAnimationModel.squares
         *
         * @description
         *
         * Delete a related item by id for squares.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for squares
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.squares.destroyById = function() {
          var TargetResource = $injector.get("CanvasSquareModel");
          var action = TargetResource["::destroyById::CanvasAnimationModel::squares"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.CanvasAnimationModel.squares#findById
         * @methodOf lbServices.CanvasAnimationModel.squares
         *
         * @description
         *
         * Find a related item by id for squares.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for squares
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareModel` object.)
         * </em>
         */
        R.squares.findById = function() {
          var TargetResource = $injector.get("CanvasSquareModel");
          var action = TargetResource["::findById::CanvasAnimationModel::squares"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.CanvasAnimationModel.squares#updateById
         * @methodOf lbServices.CanvasAnimationModel.squares
         *
         * @description
         *
         * Update a related item by id for squares.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for squares
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareModel` object.)
         * </em>
         */
        R.squares.updateById = function() {
          var TargetResource = $injector.get("CanvasSquareModel");
          var action = TargetResource["::updateById::CanvasAnimationModel::squares"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.CanvasSquareModel
 * @header lbServices.CanvasSquareModel
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `CanvasSquareModel` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "CanvasSquareModel",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/CanvasSquareModels/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use CanvasSquareModel.canvasAnimation() instead.
        "prototype$__get__canvasAnimation": {
          url: urlBase + "/CanvasSquareModels/:id/canvasAnimation",
          method: "GET"
        },

        // INTERNAL. Use CanvasSquareModel.checkpoints.findById() instead.
        "prototype$__findById__checkpoints": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/CanvasSquareModels/:id/checkpoints/:fk",
          method: "GET"
        },

        // INTERNAL. Use CanvasSquareModel.checkpoints.destroyById() instead.
        "prototype$__destroyById__checkpoints": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/CanvasSquareModels/:id/checkpoints/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use CanvasSquareModel.checkpoints.updateById() instead.
        "prototype$__updateById__checkpoints": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/CanvasSquareModels/:id/checkpoints/:fk",
          method: "PUT"
        },

        // INTERNAL. Use CanvasSquareModel.endpoint() instead.
        "prototype$__get__endpoint": {
          url: urlBase + "/CanvasSquareModels/:id/endpoint",
          method: "GET"
        },

        // INTERNAL. Use CanvasSquareModel.endpoint.create() instead.
        "prototype$__create__endpoint": {
          url: urlBase + "/CanvasSquareModels/:id/endpoint",
          method: "POST"
        },

        // INTERNAL. Use CanvasSquareModel.endpoint.update() instead.
        "prototype$__update__endpoint": {
          url: urlBase + "/CanvasSquareModels/:id/endpoint",
          method: "PUT"
        },

        // INTERNAL. Use CanvasSquareModel.endpoint.destroy() instead.
        "prototype$__destroy__endpoint": {
          url: urlBase + "/CanvasSquareModels/:id/endpoint",
          method: "DELETE"
        },

        // INTERNAL. Use CanvasSquareModel.checkpoints() instead.
        "prototype$__get__checkpoints": {
          isArray: true,
          url: urlBase + "/CanvasSquareModels/:id/checkpoints",
          method: "GET"
        },

        // INTERNAL. Use CanvasSquareModel.checkpoints.create() instead.
        "prototype$__create__checkpoints": {
          url: urlBase + "/CanvasSquareModels/:id/checkpoints",
          method: "POST"
        },

        // INTERNAL. Use CanvasSquareModel.checkpoints.destroyAll() instead.
        "prototype$__delete__checkpoints": {
          url: urlBase + "/CanvasSquareModels/:id/checkpoints",
          method: "DELETE"
        },

        // INTERNAL. Use CanvasSquareModel.checkpoints.count() instead.
        "prototype$__count__checkpoints": {
          url: urlBase + "/CanvasSquareModels/:id/checkpoints/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel#create
         * @methodOf lbServices.CanvasSquareModel
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareModel` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/CanvasSquareModels",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel#createMany
         * @methodOf lbServices.CanvasSquareModel
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareModel` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/CanvasSquareModels",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel#upsert
         * @methodOf lbServices.CanvasSquareModel
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareModel` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/CanvasSquareModels",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel#exists
         * @methodOf lbServices.CanvasSquareModel
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/CanvasSquareModels/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel#findById
         * @methodOf lbServices.CanvasSquareModel
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareModel` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/CanvasSquareModels/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel#find
         * @methodOf lbServices.CanvasSquareModel
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareModel` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/CanvasSquareModels",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel#findOne
         * @methodOf lbServices.CanvasSquareModel
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareModel` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/CanvasSquareModels/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel#updateAll
         * @methodOf lbServices.CanvasSquareModel
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/CanvasSquareModels/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel#deleteById
         * @methodOf lbServices.CanvasSquareModel
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareModel` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/CanvasSquareModels/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel#count
         * @methodOf lbServices.CanvasSquareModel
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/CanvasSquareModels/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel#prototype$updateAttributes
         * @methodOf lbServices.CanvasSquareModel
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareModel` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/CanvasSquareModels/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel#createChangeStream
         * @methodOf lbServices.CanvasSquareModel
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/CanvasSquareModels/change-stream",
          method: "POST"
        },

        // INTERNAL. Use CanvasAnimationModel.squares.findById() instead.
        "::findById::CanvasAnimationModel::squares": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/CanvasAnimationModels/:id/squares/:fk",
          method: "GET"
        },

        // INTERNAL. Use CanvasAnimationModel.squares.destroyById() instead.
        "::destroyById::CanvasAnimationModel::squares": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/CanvasAnimationModels/:id/squares/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use CanvasAnimationModel.squares.updateById() instead.
        "::updateById::CanvasAnimationModel::squares": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/CanvasAnimationModels/:id/squares/:fk",
          method: "PUT"
        },

        // INTERNAL. Use CanvasAnimationModel.squares() instead.
        "::get::CanvasAnimationModel::squares": {
          isArray: true,
          url: urlBase + "/CanvasAnimationModels/:id/squares",
          method: "GET"
        },

        // INTERNAL. Use CanvasAnimationModel.squares.create() instead.
        "::create::CanvasAnimationModel::squares": {
          url: urlBase + "/CanvasAnimationModels/:id/squares",
          method: "POST"
        },

        // INTERNAL. Use CanvasAnimationModel.squares.createMany() instead.
        "::createMany::CanvasAnimationModel::squares": {
          isArray: true,
          url: urlBase + "/CanvasAnimationModels/:id/squares",
          method: "POST"
        },

        // INTERNAL. Use CanvasAnimationModel.squares.destroyAll() instead.
        "::delete::CanvasAnimationModel::squares": {
          url: urlBase + "/CanvasAnimationModels/:id/squares",
          method: "DELETE"
        },

        // INTERNAL. Use CanvasAnimationModel.squares.count() instead.
        "::count::CanvasAnimationModel::squares": {
          url: urlBase + "/CanvasAnimationModels/:id/squares/count",
          method: "GET"
        },

        // INTERNAL. Use CanvasSquareCheckpointModel.canvasSquare() instead.
        "::get::CanvasSquareCheckpointModel::canvasSquare": {
          url: urlBase + "/CanvasSquareCheckpointModels/:id/canvasSquare",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel#updateOrCreate
         * @methodOf lbServices.CanvasSquareModel
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareModel` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel#update
         * @methodOf lbServices.CanvasSquareModel
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel#destroyById
         * @methodOf lbServices.CanvasSquareModel
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareModel` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel#removeById
         * @methodOf lbServices.CanvasSquareModel
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareModel` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.CanvasSquareModel#modelName
    * @propertyOf lbServices.CanvasSquareModel
    * @description
    * The name of the model represented by this $resource,
    * i.e. `CanvasSquareModel`.
    */
    R.modelName = "CanvasSquareModel";


        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel#canvasAnimation
         * @methodOf lbServices.CanvasSquareModel
         *
         * @description
         *
         * Fetches belongsTo relation canvasAnimation.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasAnimationModel` object.)
         * </em>
         */
        R.canvasAnimation = function() {
          var TargetResource = $injector.get("CanvasAnimationModel");
          var action = TargetResource["::get::CanvasSquareModel::canvasAnimation"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.CanvasSquareModel.checkpoints
     * @header lbServices.CanvasSquareModel.checkpoints
     * @object
     * @description
     *
     * The object `CanvasSquareModel.checkpoints` groups methods
     * manipulating `CanvasSquareCheckpointModel` instances related to `CanvasSquareModel`.
     *
     * Call {@link lbServices.CanvasSquareModel#checkpoints CanvasSquareModel.checkpoints()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel#checkpoints
         * @methodOf lbServices.CanvasSquareModel
         *
         * @description
         *
         * Queries checkpoints of CanvasSquareModel.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareCheckpointModel` object.)
         * </em>
         */
        R.checkpoints = function() {
          var TargetResource = $injector.get("CanvasSquareCheckpointModel");
          var action = TargetResource["::get::CanvasSquareModel::checkpoints"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel.checkpoints#count
         * @methodOf lbServices.CanvasSquareModel.checkpoints
         *
         * @description
         *
         * Counts checkpoints of CanvasSquareModel.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.checkpoints.count = function() {
          var TargetResource = $injector.get("CanvasSquareCheckpointModel");
          var action = TargetResource["::count::CanvasSquareModel::checkpoints"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel.checkpoints#create
         * @methodOf lbServices.CanvasSquareModel.checkpoints
         *
         * @description
         *
         * Creates a new instance in checkpoints of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareCheckpointModel` object.)
         * </em>
         */
        R.checkpoints.create = function() {
          var TargetResource = $injector.get("CanvasSquareCheckpointModel");
          var action = TargetResource["::create::CanvasSquareModel::checkpoints"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel.checkpoints#createMany
         * @methodOf lbServices.CanvasSquareModel.checkpoints
         *
         * @description
         *
         * Creates a new instance in checkpoints of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareCheckpointModel` object.)
         * </em>
         */
        R.checkpoints.createMany = function() {
          var TargetResource = $injector.get("CanvasSquareCheckpointModel");
          var action = TargetResource["::createMany::CanvasSquareModel::checkpoints"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel.checkpoints#destroyAll
         * @methodOf lbServices.CanvasSquareModel.checkpoints
         *
         * @description
         *
         * Deletes all checkpoints of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.checkpoints.destroyAll = function() {
          var TargetResource = $injector.get("CanvasSquareCheckpointModel");
          var action = TargetResource["::delete::CanvasSquareModel::checkpoints"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel.checkpoints#destroyById
         * @methodOf lbServices.CanvasSquareModel.checkpoints
         *
         * @description
         *
         * Delete a related item by id for checkpoints.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for checkpoints
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.checkpoints.destroyById = function() {
          var TargetResource = $injector.get("CanvasSquareCheckpointModel");
          var action = TargetResource["::destroyById::CanvasSquareModel::checkpoints"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel.checkpoints#findById
         * @methodOf lbServices.CanvasSquareModel.checkpoints
         *
         * @description
         *
         * Find a related item by id for checkpoints.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for checkpoints
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareCheckpointModel` object.)
         * </em>
         */
        R.checkpoints.findById = function() {
          var TargetResource = $injector.get("CanvasSquareCheckpointModel");
          var action = TargetResource["::findById::CanvasSquareModel::checkpoints"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel.checkpoints#updateById
         * @methodOf lbServices.CanvasSquareModel.checkpoints
         *
         * @description
         *
         * Update a related item by id for checkpoints.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for checkpoints
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareCheckpointModel` object.)
         * </em>
         */
        R.checkpoints.updateById = function() {
          var TargetResource = $injector.get("CanvasSquareCheckpointModel");
          var action = TargetResource["::updateById::CanvasSquareModel::checkpoints"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.CanvasSquareModel.endpoint
     * @header lbServices.CanvasSquareModel.endpoint
     * @object
     * @description
     *
     * The object `CanvasSquareModel.endpoint` groups methods
     * manipulating `CanvasSquareEndpointModel` instances related to `CanvasSquareModel`.
     *
     * Call {@link lbServices.CanvasSquareModel#endpoint CanvasSquareModel.endpoint()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel#endpoint
         * @methodOf lbServices.CanvasSquareModel
         *
         * @description
         *
         * Fetches hasOne relation endpoint.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareEndpointModel` object.)
         * </em>
         */
        R.endpoint = function() {
          var TargetResource = $injector.get("CanvasSquareEndpointModel");
          var action = TargetResource["::get::CanvasSquareModel::endpoint"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel.endpoint#create
         * @methodOf lbServices.CanvasSquareModel.endpoint
         *
         * @description
         *
         * Creates a new instance in endpoint of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareEndpointModel` object.)
         * </em>
         */
        R.endpoint.create = function() {
          var TargetResource = $injector.get("CanvasSquareEndpointModel");
          var action = TargetResource["::create::CanvasSquareModel::endpoint"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel.endpoint#createMany
         * @methodOf lbServices.CanvasSquareModel.endpoint
         *
         * @description
         *
         * Creates a new instance in endpoint of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareEndpointModel` object.)
         * </em>
         */
        R.endpoint.createMany = function() {
          var TargetResource = $injector.get("CanvasSquareEndpointModel");
          var action = TargetResource["::createMany::CanvasSquareModel::endpoint"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel.endpoint#destroy
         * @methodOf lbServices.CanvasSquareModel.endpoint
         *
         * @description
         *
         * Deletes endpoint of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.endpoint.destroy = function() {
          var TargetResource = $injector.get("CanvasSquareEndpointModel");
          var action = TargetResource["::destroy::CanvasSquareModel::endpoint"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareModel.endpoint#update
         * @methodOf lbServices.CanvasSquareModel.endpoint
         *
         * @description
         *
         * Update endpoint of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareEndpointModel` object.)
         * </em>
         */
        R.endpoint.update = function() {
          var TargetResource = $injector.get("CanvasSquareEndpointModel");
          var action = TargetResource["::update::CanvasSquareModel::endpoint"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.CanvasSquareCheckpointModel
 * @header lbServices.CanvasSquareCheckpointModel
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `CanvasSquareCheckpointModel` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "CanvasSquareCheckpointModel",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/CanvasSquareCheckpointModels/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use CanvasSquareCheckpointModel.canvasSquare() instead.
        "prototype$__get__canvasSquare": {
          url: urlBase + "/CanvasSquareCheckpointModels/:id/canvasSquare",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareCheckpointModel#create
         * @methodOf lbServices.CanvasSquareCheckpointModel
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareCheckpointModel` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/CanvasSquareCheckpointModels",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareCheckpointModel#createMany
         * @methodOf lbServices.CanvasSquareCheckpointModel
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareCheckpointModel` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/CanvasSquareCheckpointModels",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareCheckpointModel#upsert
         * @methodOf lbServices.CanvasSquareCheckpointModel
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareCheckpointModel` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/CanvasSquareCheckpointModels",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareCheckpointModel#exists
         * @methodOf lbServices.CanvasSquareCheckpointModel
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/CanvasSquareCheckpointModels/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareCheckpointModel#findById
         * @methodOf lbServices.CanvasSquareCheckpointModel
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareCheckpointModel` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/CanvasSquareCheckpointModels/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareCheckpointModel#find
         * @methodOf lbServices.CanvasSquareCheckpointModel
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareCheckpointModel` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/CanvasSquareCheckpointModels",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareCheckpointModel#findOne
         * @methodOf lbServices.CanvasSquareCheckpointModel
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareCheckpointModel` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/CanvasSquareCheckpointModels/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareCheckpointModel#updateAll
         * @methodOf lbServices.CanvasSquareCheckpointModel
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/CanvasSquareCheckpointModels/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareCheckpointModel#deleteById
         * @methodOf lbServices.CanvasSquareCheckpointModel
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareCheckpointModel` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/CanvasSquareCheckpointModels/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareCheckpointModel#count
         * @methodOf lbServices.CanvasSquareCheckpointModel
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/CanvasSquareCheckpointModels/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareCheckpointModel#prototype$updateAttributes
         * @methodOf lbServices.CanvasSquareCheckpointModel
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareCheckpointModel` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/CanvasSquareCheckpointModels/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareCheckpointModel#createChangeStream
         * @methodOf lbServices.CanvasSquareCheckpointModel
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/CanvasSquareCheckpointModels/change-stream",
          method: "POST"
        },

        // INTERNAL. Use CanvasSquareModel.checkpoints.findById() instead.
        "::findById::CanvasSquareModel::checkpoints": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/CanvasSquareModels/:id/checkpoints/:fk",
          method: "GET"
        },

        // INTERNAL. Use CanvasSquareModel.checkpoints.destroyById() instead.
        "::destroyById::CanvasSquareModel::checkpoints": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/CanvasSquareModels/:id/checkpoints/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use CanvasSquareModel.checkpoints.updateById() instead.
        "::updateById::CanvasSquareModel::checkpoints": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/CanvasSquareModels/:id/checkpoints/:fk",
          method: "PUT"
        },

        // INTERNAL. Use CanvasSquareModel.checkpoints() instead.
        "::get::CanvasSquareModel::checkpoints": {
          isArray: true,
          url: urlBase + "/CanvasSquareModels/:id/checkpoints",
          method: "GET"
        },

        // INTERNAL. Use CanvasSquareModel.checkpoints.create() instead.
        "::create::CanvasSquareModel::checkpoints": {
          url: urlBase + "/CanvasSquareModels/:id/checkpoints",
          method: "POST"
        },

        // INTERNAL. Use CanvasSquareModel.checkpoints.createMany() instead.
        "::createMany::CanvasSquareModel::checkpoints": {
          isArray: true,
          url: urlBase + "/CanvasSquareModels/:id/checkpoints",
          method: "POST"
        },

        // INTERNAL. Use CanvasSquareModel.checkpoints.destroyAll() instead.
        "::delete::CanvasSquareModel::checkpoints": {
          url: urlBase + "/CanvasSquareModels/:id/checkpoints",
          method: "DELETE"
        },

        // INTERNAL. Use CanvasSquareModel.checkpoints.count() instead.
        "::count::CanvasSquareModel::checkpoints": {
          url: urlBase + "/CanvasSquareModels/:id/checkpoints/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareCheckpointModel#updateOrCreate
         * @methodOf lbServices.CanvasSquareCheckpointModel
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareCheckpointModel` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareCheckpointModel#update
         * @methodOf lbServices.CanvasSquareCheckpointModel
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareCheckpointModel#destroyById
         * @methodOf lbServices.CanvasSquareCheckpointModel
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareCheckpointModel` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareCheckpointModel#removeById
         * @methodOf lbServices.CanvasSquareCheckpointModel
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareCheckpointModel` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.CanvasSquareCheckpointModel#modelName
    * @propertyOf lbServices.CanvasSquareCheckpointModel
    * @description
    * The name of the model represented by this $resource,
    * i.e. `CanvasSquareCheckpointModel`.
    */
    R.modelName = "CanvasSquareCheckpointModel";


        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareCheckpointModel#canvasSquare
         * @methodOf lbServices.CanvasSquareCheckpointModel
         *
         * @description
         *
         * Fetches belongsTo relation canvasSquare.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareModel` object.)
         * </em>
         */
        R.canvasSquare = function() {
          var TargetResource = $injector.get("CanvasSquareModel");
          var action = TargetResource["::get::CanvasSquareCheckpointModel::canvasSquare"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.CanvasSquareEndpointModel
 * @header lbServices.CanvasSquareEndpointModel
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `CanvasSquareEndpointModel` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "CanvasSquareEndpointModel",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/CanvasSquareEndpointModels/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareEndpointModel#create
         * @methodOf lbServices.CanvasSquareEndpointModel
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareEndpointModel` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/CanvasSquareEndpointModels",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareEndpointModel#createMany
         * @methodOf lbServices.CanvasSquareEndpointModel
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareEndpointModel` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/CanvasSquareEndpointModels",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareEndpointModel#upsert
         * @methodOf lbServices.CanvasSquareEndpointModel
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareEndpointModel` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/CanvasSquareEndpointModels",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareEndpointModel#exists
         * @methodOf lbServices.CanvasSquareEndpointModel
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/CanvasSquareEndpointModels/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareEndpointModel#findById
         * @methodOf lbServices.CanvasSquareEndpointModel
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareEndpointModel` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/CanvasSquareEndpointModels/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareEndpointModel#find
         * @methodOf lbServices.CanvasSquareEndpointModel
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareEndpointModel` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/CanvasSquareEndpointModels",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareEndpointModel#findOne
         * @methodOf lbServices.CanvasSquareEndpointModel
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareEndpointModel` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/CanvasSquareEndpointModels/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareEndpointModel#updateAll
         * @methodOf lbServices.CanvasSquareEndpointModel
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/CanvasSquareEndpointModels/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareEndpointModel#deleteById
         * @methodOf lbServices.CanvasSquareEndpointModel
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareEndpointModel` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/CanvasSquareEndpointModels/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareEndpointModel#count
         * @methodOf lbServices.CanvasSquareEndpointModel
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/CanvasSquareEndpointModels/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareEndpointModel#prototype$updateAttributes
         * @methodOf lbServices.CanvasSquareEndpointModel
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareEndpointModel` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/CanvasSquareEndpointModels/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareEndpointModel#createChangeStream
         * @methodOf lbServices.CanvasSquareEndpointModel
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/CanvasSquareEndpointModels/change-stream",
          method: "POST"
        },

        // INTERNAL. Use CanvasSquareModel.endpoint() instead.
        "::get::CanvasSquareModel::endpoint": {
          url: urlBase + "/CanvasSquareModels/:id/endpoint",
          method: "GET"
        },

        // INTERNAL. Use CanvasSquareModel.endpoint.create() instead.
        "::create::CanvasSquareModel::endpoint": {
          url: urlBase + "/CanvasSquareModels/:id/endpoint",
          method: "POST"
        },

        // INTERNAL. Use CanvasSquareModel.endpoint.createMany() instead.
        "::createMany::CanvasSquareModel::endpoint": {
          isArray: true,
          url: urlBase + "/CanvasSquareModels/:id/endpoint",
          method: "POST"
        },

        // INTERNAL. Use CanvasSquareModel.endpoint.update() instead.
        "::update::CanvasSquareModel::endpoint": {
          url: urlBase + "/CanvasSquareModels/:id/endpoint",
          method: "PUT"
        },

        // INTERNAL. Use CanvasSquareModel.endpoint.destroy() instead.
        "::destroy::CanvasSquareModel::endpoint": {
          url: urlBase + "/CanvasSquareModels/:id/endpoint",
          method: "DELETE"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareEndpointModel#updateOrCreate
         * @methodOf lbServices.CanvasSquareEndpointModel
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareEndpointModel` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareEndpointModel#update
         * @methodOf lbServices.CanvasSquareEndpointModel
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareEndpointModel#destroyById
         * @methodOf lbServices.CanvasSquareEndpointModel
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareEndpointModel` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.CanvasSquareEndpointModel#removeById
         * @methodOf lbServices.CanvasSquareEndpointModel
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CanvasSquareEndpointModel` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.CanvasSquareEndpointModel#modelName
    * @propertyOf lbServices.CanvasSquareEndpointModel
    * @description
    * The name of the model represented by this $resource,
    * i.e. `CanvasSquareEndpointModel`.
    */
    R.modelName = "CanvasSquareEndpointModel";


    return R;
  }]);


module
  .factory('LoopBackAuth', function() {
    var props = ['accessTokenId', 'currentUserId', 'rememberMe'];
    var propsPrefix = '$LoopBack$';

    function LoopBackAuth() {
      var self = this;
      props.forEach(function(name) {
        self[name] = load(name);
      });
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.save = function() {
      var self = this;
      var storage = this.rememberMe ? localStorage : sessionStorage;
      props.forEach(function(name) {
        save(storage, name, self[name]);
      });
    };

    LoopBackAuth.prototype.setUser = function(accessTokenId, userId, userData) {
      this.accessTokenId = accessTokenId;
      this.currentUserId = userId;
      this.currentUserData = userData;
    }

    LoopBackAuth.prototype.clearUser = function() {
      this.accessTokenId = null;
      this.currentUserId = null;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.clearStorage = function() {
      props.forEach(function(name) {
        save(sessionStorage, name, null);
        save(localStorage, name, null);
      });
    };

    return new LoopBackAuth();

    // Note: LocalStorage converts the value to string
    // We are using empty string as a marker for null/undefined values.
    function save(storage, name, value) {
      try {
        var key = propsPrefix + name;
        if (value == null) value = '';
        storage[key] = value;
      } catch(err) {
        console.log('Cannot access local/session storage:', err);
      }
    }

    function load(name) {
      var key = propsPrefix + name;
      return localStorage[key] || sessionStorage[key] || null;
    }
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
  }])
  .factory('LoopBackAuthRequestInterceptor', [ '$q', 'LoopBackAuth',
    function($q, LoopBackAuth) {
      return {
        'request': function(config) {

          // filter out external requests
          var host = getHost(config.url);
          if (host && host !== urlBaseHost) {
            return config;
          }

          if (LoopBackAuth.accessTokenId) {
            config.headers[authHeader] = LoopBackAuth.accessTokenId;
          } else if (config.__isGetCurrentUser__) {
            // Return a stub 401 error for User.getCurrent() when
            // there is no user logged in
            var res = {
              body: { error: { status: 401 } },
              status: 401,
              config: config,
              headers: function() { return undefined; }
            };
            return $q.reject(res);
          }
          return config || $q.when(config);
        }
      }
    }])

  /**
   * @ngdoc object
   * @name lbServices.LoopBackResourceProvider
   * @header lbServices.LoopBackResourceProvider
   * @description
   * Use `LoopBackResourceProvider` to change the global configuration
   * settings used by all models. Note that the provider is available
   * to Configuration Blocks only, see
   * {@link https://docs.angularjs.org/guide/module#module-loading-dependencies Module Loading & Dependencies}
   * for more details.
   *
   * ## Example
   *
   * ```js
   * angular.module('app')
   *  .config(function(LoopBackResourceProvider) {
   *     LoopBackResourceProvider.setAuthHeader('X-Access-Token');
   *  });
   * ```
   */
  .provider('LoopBackResource', function LoopBackResourceProvider() {
    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setAuthHeader
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} header The header name to use, e.g. `X-Access-Token`
     * @description
     * Configure the REST transport to use a different header for sending
     * the authentication token. It is sent in the `Authorization` header
     * by default.
     */
    this.setAuthHeader = function(header) {
      authHeader = header;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
     * @description
     * Change the URL of the REST API server. By default, the URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.setUrlBase = function(url) {
      urlBase = url;
      urlBaseHost = getHost(urlBase) || location.host;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#getUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @description
     * Get the URL of the REST API server. The URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.getUrlBase = function() {
      return urlBase;
    };

    this.$get = ['$resource', function($resource) {
      return function(url, params, actions) {
        var resource = $resource(url, params, actions);

        // Angular always calls POST on $save()
        // This hack is based on
        // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
        resource.prototype.$save = function(success, error) {
          // Fortunately, LoopBack provides a convenient `upsert` method
          // that exactly fits our needs.
          var result = resource.upsert.call(this, {}, this, success, error);
          return result.$promise || result;
        };
        return resource;
      };
    }];
  });

})(window, window.angular);
