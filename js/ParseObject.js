import util.underscore as _;
import util.ajax as ajax;

exports = Class(function(supr) {
  this.init = function(classname) {
    this.route = "https://api.parse.com/1/classes/" + classname;
    this._attributes = {};
    this._dirty = [];
  };

  this.setKeys = function (keys) {
    this._keys = keys;
  };

  this.set = function(key, value) {
    if (_.isObject(key)) {
      _.extend(this._attributes, key);
      _.each(key, bind(this, function(key, value) {
        this.markDirty(key);
      }));
    } else {
      this.markDirty(key);
      this._attributes[key] = value;
    }
  };

  this.markDirty = function(key) {
    if (this._dirty.indexOf(key) < 0) {
      this._dirty.push(key);
    }
  };

  this.request = function(method, url, data, callback) {
    ajax.get(merge({method: method}, {
      url: url,
      type: 'json',
      headers: {
        'X-Parse-Application-Id': this._keys.appid,
        'X-Parse-REST-API-Key': this._keys.restkey
      },
      data: data
    }), callback)
  };

  this.fetch = function(objectId, callback) {
    if (!objectId) {
      logger.log('{parse}', 'ERROR:', 'An objectId is required to fetch an object');
      callback('no objectId', undefined);
    } else {
      this.request('GET', this.route + objectId, undefined, function (err, resp) {
        if (err) {
          logger.log('{Parse}', err);
        } else {
          this._attributes = resp.response;
        }
        callback(err, resp);
      });
    }
  };

  this.del = function(objectId, callback) {
    this.request('DELETE', this.route + objectId, undefined, callback);
  };

  this.save = function(cb) {
    var data;
    if (this._attributes.objectId) {
      if (!_.isEmpty(this._dirty)) {
        // Save only dirty objects
        data = _.pick(this._attributes, this._dirty);
        this._dirty = [];
        this.request('PUT', this.route + this._attributes.objectId, data, cb);
      }
    } else {
      this._dirty= [];
      this.request('POST', this.route, this._attributes, function (err, resp) {
        if (err) {
          logger.log('{parse}', err);
        } else {
          _.extend(this._attributes, resp.response);
          callback(err, resp);
        }
      });
    }
  };

});
