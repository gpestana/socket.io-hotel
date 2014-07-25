var test  = require('tape'),
_         = require('underscore'),
Hotel     = require('../lib/socket.io-hotel.js')


var adapter_mockup =
  { nsp: 
    { name: '/',server: {name: 'mock_server'},
     sockets: [],
     connected: {},
     fns: [],
     ids: 0,
     acks: {},
     adapter: NaN },
  rooms: {
    room1: ['user1'],
    room2: ['user1', 'user2'],
    emptyRoom: []
  },
  rooms_props: {
    room1: {size: "Large", name:"Grand Room",color:"Green"},
    room2: {size: "Small", name: "Mini room"},
    emptyRoom: {size:"Medium"}
  },
  sids: {
    'user1': {'room1': true, 'room2': true},
    'user2': {'room1': true}
  },
  encoder: {} 
  }


var hotel = new Hotel(adapter_mockup)


test('all general', function(t) {
  //List all the rooms
  hotel.listRooms(function(rooms) {
    t.equal(_.size(rooms), 3, 'there are 3 rooms')
  })
  //Get users in room2
  hotel.getUsersRoom('room2', function(users) {
    t.equal(_.size(users), 2, 'there are 2 users in room2')
  })

  //Check if room exists
  hotel.roomExists('room1', function(res) {
    t.equal(res, true, 'room1 exists')
  })    

  //Get the room Properties 
  hotel.getPropertiesRoom('room1',function(properties){
       t.equal(_.size(properties),3, 'room 1 has 3 properties')
  })

  hotel.removeRoomProperty('room1','color',function(properties){
       t.equal(properties.color,undefined,'color was removed from room 1');
       t.equal(_.size(properties),2, 'room 1 has 2 properties')
  })
  //Check if ghostRoom exists
  hotel.roomExists('ghostRoom', function(res) {
    t.equal(res, false, 'ghost room doesnt exist (yet... .AHAHAH)')
  })
  //Delete empty room
  hotel.delEmptyRoom('room1', function(res) {
    t.equal(res, false, 'room1 is not empty do not delete it')
  })
  //Get the room1 Properties 
  hotel.getPropertiesRoom('room1',function(properties){
       t.equal(_.size(properties),2, 'room 1 is not empty so still has properties')
  })
  //Get the emptyroom Properties 
  hotel.getPropertiesRoom('emptyRoom',function(properties){
       t.equal(_.size(properties),1, 'emptyroom has 1 property')
  })
  hotel.delEmptyRoom('emptyRoom', function(res) {
    t.equal(res, true, 'emptyRoom is empty (!), delete it!') 
   

    hotel.roomExists('emptyRoom', function(res) {
      t.equal(res, false, 'empty room does not exist anymore')
    }) 

    hotel.getPropertiesRoom('emptyRoom',function(properties){
      t.equal(properties,undefined,'emptyRoom has no properties anymore');
      
    })
   })


  t.end()
})


test('properties', function(t) {
  
  hotel.setPropertyRoom('room1', 'size', 'Small', function(_notUsed) {
    hotel.getPropertiesRoom('room1', function(props){
      t.equal(props.size,'Small', 'room has new properties')
    
      hotel.setPropertyRoom('room1', 'size', 'Large', function(_notUsed) {
        hotel.getPropertiesRoom('room1', function(props) {
          t.equal(props.size,'Large', 'property updated')
        })
      })  
    })
  })


  t.end()
})

