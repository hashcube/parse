# Parse

(https://parse.com)[parse website]

### import
  ````Javascript
  import plugins.parse.parse as parse;
  ````

### initialize
  ````Javascript
  parse.initialize('appid', 'clientKey', 'restKey');  ````

### create an object
  ````Javascript
    var user = parse.create('User');
  ````

### set properties to an object
````Javascript
  user.set('time', 'now');
  user.set({name: 'Binod:D', age: 24});
````

### create and fetch
````Javascript
  var user = parse.create('User', 'myUserObjectId');
````
### fetch
````Javascript
  user.fetch('YoMyObjID', callback)
````

### save  an object to cloud
user.save(callback);

### delete
user.del('self') // to delete self
user.del(objectID, callback);

> callback has 2 arguments error and response `callback(err, resp)`

