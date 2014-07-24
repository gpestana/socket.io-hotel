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
    room2:['user1', 'user2'],
    emptyRoom: []
  },
  sids: {
    'user1': {'room1': true, 'room2': true},
    'user2': {'room1': true}
  },
  encoder: {} 
  }


var hotel = new Hotel(adapter_mockup)


test('all general', function(t) {
  hotel.listRooms(function(rooms) {
    t.equal(_.size(rooms), 3, 'there are 3 rooms')
  })

  hotel.getUsersRoom('room2', function(users) {
    t.equal(_.size(users), 2, 'there are 2 users in room2')
  })

  
  hotel.roomExists('room1', function(res) {
    t.equal(res, true, 'room1 exists')
  })    
  hotel.roomExists('ghostRoom', function(res) {
    t.equal(res, false, 'ghost room doesnt exist (yet... .AHAHAH)')
  })

  hotel.delEmptyRoom('room1', function(res) {
    t.equal(res, false, 'room1 is not empty do not delete it')
  })
  
  hotel.delEmptyRoom('emptyRoom', function(res) {
    t.equal(res, true, 'emeptyRoom is empty (!), delete it!')
    hotel.roomExists('emptyRoom', function(res) {
      t.equal(res, false, 'empty room does not exist anymore')
    })
   })
  
  t.end()
})


test('properties', function(t) {
  
  hotel.setPropertyRoom('room1', 'prop', 'val', function(_notUsed) {
    hotel.getPropertiesRoom('room1', function(props){
      t.equal(JSON.stringify({prop: 'val'}),
              JSON.stringify(props), 'room has new properties')
    
      hotel.setPropertyRoom('room1', 'prop', 'val2', function(_notUsed) {
        hotel.getPropertiesRoom('room1', function(props) {
          t.equal(JSON.stringify({prop: 'val2'}),
                  JSON.stringify(props), 'property updated')
        })
      })  
    })
  })


  t.end()
})

