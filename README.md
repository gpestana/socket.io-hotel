##socket.io-hotel

room's manager that adds new features and functionalities to socket.io

---

###how to install
npm install socket.io-hotel

###how to use
```javascript
io    = require('socket.io')(http),
Hotel = require('socket.io-hotel')
//...
var hotel = new Hotel(io.sockets.adapter)
```

###API
---
####setPropertyRoom(roomID, key, val, clbk)   
sets a new property [val: key] to the room . clbk receives an object with the rooms' properties  modified 


####delRoomProperty(roomID, key, clbk)  
deletes a specific property from the room. callback receives an object with the rooms' properties object modified 

####getPropertiesRoom(roomID, clbk)  
callback receives all properties from a give object 

####listRooms = function(clbk)  
calback receives a list with all rooms 

####getUsersRoom = function(roomID, clbk)    
callback receives all users from a given room 

####delEmptyRoom = function(roomID, clbk)    
if room is empty, delete it. callback returns `true` if the room was deleted and `false` otherwise 

