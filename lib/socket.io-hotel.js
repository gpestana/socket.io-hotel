_ = require('underscore')


function Hotel(adpt) {
  this.adapter = adpt
  this.adapter.rooms_props = []
}


Hotel.prototype.setPropertyRoom = function(roomID, key, val, clbk){
  this.adapter.rooms_props[roomID] = this.adapter.rooms_props[roomID] || {}
  this.adapter.rooms_props[roomID][key] = val
  clbk(this.adapter.rooms_props[roomID])
}

Hotel.prototype.getPropertiesRoom = function(roomID, clbk) {
  clbk(this.adapter.rooms_props[roomID])
}


Hotel.prototype.listRooms = function(clbk) {
  clbk(this.adapter.rooms)
}

Hotel.prototype.getUsersRoom = function(roomID, clbk) {
  clbk(this.adapter.rooms[roomID])
}

Hotel.prototype.delEmptyRoom = function(roomID, clbk) {
  if(_.isEmpty(this.adapter.rooms[roomID])){
    delete this.adapter.rooms[roomID]
    clbk(true)
    return 
  }
  clbk(false)
}

Hotel.prototype.roomExists = function(roomID, clbk) {
  clbk((typeof this.adapter.rooms[roomID] == 'undefined') ? false : true)
}


module.exports = Hotel
