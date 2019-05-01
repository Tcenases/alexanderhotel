var hotelRooms = [];

var room1 = {};
room1.name = null;
room1.category = "Bachelor";
room1.roomNumber = "101";
room1.size = "20";
room1.bedType = "One bed";
room1.maxPersons = "1";
room1.facilities = {};
room1.price = 156;
room1.bookedPeriods = null;
room1.featured = false;

hotelRooms.push(room1);

var room2 = {};
room2.name = null;
room2.category = "Double Room";
room2.roomNumber = "102";
room2.size = "30";
room2.bedType = "Two beds";
room2.maxPersons = "2";
room2.facilities = {};
room2.price = 256;
room2.bookedPeriods = null;
room2.featured = false;

hotelRooms.push(room2);

var room3 = {};
room3.name = null;
room3.category = "Family";
room3.roomNumber = "103";
room3.size = "50";
room3.bedType = "Five Beds";
room3.maxPersons = "5";
room3.facilities = {};
room3.price = 456;
room3.bookedPeriods = null;
room3.featured = true;

hotelRooms.push(room3);

var room4 = {};
room4.name = null;
room4.category = "VIP Room";
room4.roomNumber = "104";
room1.size = "60";
room4.bedType = "Two beds";
room4.maxPersons = "4";
room4.facilities = {};
room4.price = 676;
room4.bookedPeriods = null;
room4.featured = false;

hotelRooms.push(room4);

var data = JSON.stringify(hotelRooms);
console.log(data);
