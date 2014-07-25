import util.underscore as _;
import plugins.parse.ParseObject as ParseObject;

function pluginSend(evt, params) {
	NATIVE && NATIVE.plugins && NATIVE.plugins.sendEvent &&
		NATIVE.plugins.sendEvent("ParsePlugin", evt,
			JSON.stringify(params || {}));
}

function pluginOn(evt, next) {
	NATIVE && NATIVE.events && NATIVE.events.registerHandler &&
		NATIVE.events.registerHandler(evt, next);
}

// TODO Queries
var Parse = Class (function () {
  this.initialize = function(appid, clientkey, restkey) {
    this._keys = {
      appid: appid,
      clientkey: clientkey,
      restkey: restkey
    };
    pluginSend('initialize', {appid: appid, clientkey: clientkey});
  };
  this.create = function (parseClass, objectId) {
    if (!this._keys) {
      logger.log('PS: call initialize before creating object');
      return;
    }
    var obj = new ParseObject(parseClass);

    obj.setKeys(this._keys);
    if (objectId) {
      obj.fetch(objectId, function (err) {
        if (err) {
          logger.log(err);
        }
      });
    }
    return obj;
  };

  // Subscribe to a channel
  this.subscribe = function (evt) {
    pluginSend('subscribe', {evt: evt});
  };
  // Unsubscribe from a channel
  this.unsubscibe = function (evt) {
    pluginSend('unsubscibe', {evt: evt});
  };
});
exports = new Parse();
