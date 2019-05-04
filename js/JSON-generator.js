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
room1.image = "images/img_1.jpg";

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
room2.image = "images/img_2.jpg";

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
room3.image = "images/img_3.jpg";

hotelRooms.push(room3);

var room4 = {};
room4.name = null;
room4.category = "VIP Room";
room4.roomNumber = "104";
room4.size = "60";
room4.bedType = "Two beds";
room4.maxPersons = "4";
room4.facilities = {};
room4.price = 676;
room4.bookedPeriods = null;
room4.featured = false;
room4.image = "images/img_4.jpg";

hotelRooms.push(room4);

var room5 = {};
room5.name = null;
room5.category = "? Room";
room5.roomNumber = "105";
room5.size = "60";
room5.bedType = "Two beds";
room5.maxPersons = "4";
room5.facilities = {};
room5.price = 403;
room5.bookedPeriods = null;
room5.featured = false;
room5.image = "images/img_5.jpg";

hotelRooms.push(room5);

var room6 = {};
room6.name = null;
room6.category = "? Room";
room6.roomNumber = "106";
room6.size = "60";
room6.bedType = "Two beds";
room6.maxPersons = "4";
room6.facilities = {};
room6.price = 676;
room6.bookedPeriods = null;
room6.featured = false;
room6.image = "images/img_6.jpg";

hotelRooms.push(room6);

var data = JSON.stringify(hotelRooms);
console.log(data);
