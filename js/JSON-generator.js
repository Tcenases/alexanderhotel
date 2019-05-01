var hotelRooms = [];

var room1 = {};
room1.category = "Bachelor";
room1.roomNumber = "1";
room1.size = "20";
room1.bedType = "One bed";
room1.maxPersons = "1";
room1.facilities = {};
room1.bookedPeriods = null;

hotelRooms.push(room1);

var room2 = {};
room2.category = "Double Room";
room2.roomNumber = "2";
room2.size = "30";
room2.bedType = "Two beds";
room2.maxPersons = "2";
room2.facilities = {};
room2.bookedPeriods = null;

hotelRooms.push(room2);

var room3 = {};
room3.category = "Family";
room3.roomNumber = "3";
room3.size = "50";
room3.bedType = "Five Beds";
room3.maxPersons = "5";
room3.facilities = {};
room3.bookedPeriods = null;

hotelRooms.push(room3);

var room4 = {};
room4.category = "VIP Room";
room4.roomNumber = "4";
room1.size = "60";
room4.bedType = "Two beds";
room4.maxPersons = "4";
room4.facilities = {};
room4.bookedPeriods = null;

hotelRooms.push(room4);

var obj = JSON.stringify(hotelRooms);
console.log(obj)

var obj2 = JSON.parse(obj);
console.log(obj2)