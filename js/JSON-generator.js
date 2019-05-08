var hotelRooms = [];

var room1 = {};
room1.name = null;
room1.category = "Bachelor";
room1.roomNumber = "101";
room1.size = "20";
room1.bedType = "One bed";
room1.numberOfBeds = 1;
room1.maxPersons = "1";
room1.facilities = {};
room1.price = 156;
room1.bookedPeriods = [];
room1.featured = false;
room1.image = "images/img_1.jpg";

hotelRooms.push(room1);

var room2 = {};
room2.name = null;
room2.category = "Double Room";
room2.roomNumber = "102";
room2.size = "30";
room2.bedType = "Two beds";
room2.numberOfBeds = 2;
room2.maxPersons = "2";
room2.facilities = {};
room2.price = 256;
room2.bookedPeriods = [];
room2.featured = false;
room2.image = "images/img_2.jpg";

hotelRooms.push(room2);

var room3 = {};
room3.name = null;
room3.category = "Family";
room3.roomNumber = "103";
room3.size = "50";
room3.bedType = "Five Beds";
room3.numberOfBeds = 5;
room3.maxPersons = "5";
room3.facilities = {};
room3.price = 456;
room3.bookedPeriods = [];
room3.featured = true;
room3.image = "images/img_3.jpg";

hotelRooms.push(room3);

var room4 = {};
room4.name = null;
room4.category = "VIP Room";
room4.roomNumber = "104";
room4.size = "60";
room4.bedType = "Two beds";
room4.numberOfBeds = 2;
room4.maxPersons = "4";
room4.facilities = {};
room4.price = 676;
room4.bookedPeriods = [];
room4.featured = false;
room4.image = "images/img_4.jpg";

hotelRooms.push(room4);

var room5 = {};
room5.name = null;
room5.category = "Family Room";
room5.roomNumber = "105";
room5.size = "120";
room5.bedType = "Five beds";
room5.numberOfBeds = 5;
room5.maxPersons = "5";
room5.facilities = {};
room5.price = 725;
room5.bookedPeriods = [{checkIN: "2019-05-01", checkOUT: "2019-05-15"}, {checkIN: "2019-05-15", checkOUT: "2019-06-01"}];
room5.featured = false;
room5.image = "images/img_5.jpg";

hotelRooms.push(room5);

var room6 = {};
room6.name = null;
room6.category = "Double Room";
room6.roomNumber = "106";
room6.size = "45";
room6.bedType = "Two beds";
room6.numberOfBeds = 2;
room6.maxPersons = "2";
room6.facilities = {};
room6.price = 330;
room6.bookedPeriods = [{checkIN: "2019-06-01", checkOUT: "2019-06-15"}, {checkIN: "2019-06-15", checkOUT: "2019-07-01"}];
room6.featured = false;
room6.image = "images/img_6.jpg";

hotelRooms.push(room6);

var room7 = {};
room7.name = null;
room7.category = "Family Room";
room7.roomNumber = "107";
room7.size = "125";
room7.bedType = "Seven beds";
room7.numberOfBeds = 7;
room7.maxPersons = "7";
room7.facilities = {};
room7.price = 1240;
room7.bookedPeriods = [];
room7.featured = false;
room7.image = "images/img_2.jpg";

hotelRooms.push(room7);

var room8 = {};
room8.name = null;
room8.category = "Double Room";
room8.roomNumber = "108";
room8.size = "40";
room8.bedType = "Two beds";
room8.numberOfBeds = 2;
room8.maxPersons = "2";
room8.facilities = {};
room8.price = 241;
room8.bookedPeriods = [];
room8.featured = true;
room8.image = "images/img_2.jpg";

hotelRooms.push(room8);

var room9 = {};
room9.name = null;
room9.category = "Bachelor Room";
room9.roomNumber = "109";
room9.size = "40";
room9.bedType = "One Bed";
room9.numberOfBeds = 1;
room9.maxPersons = "1";
room9.facilities = {};
room9.price = 158;
room9.bookedPeriods = [];
room9.featured = false;
room9.image = "images/img_3.jpg";

hotelRooms.push(room9);

var room10 = {};
room10.name = null;
room10.category = "VIP Room";
room10.roomNumber = "110";
room10.size = "140";
room10.bedType = "Eight Beds";
room10.numberOfBeds = 8;
room10.maxPersons = "10";
room10.facilities = {};
room10.price = 1568;
room10.bookedPeriods = [];
room10.featured = true;
room10.image = "images/img_4.jpg";

hotelRooms.push(room10);

var room11 = {};
room11.name = null;
room11.category = "VIP Room";
room11.roomNumber = "111";
room11.size = "180";
room11.bedType = "Ten Beds";
room11.numberOfBeds = 10;
room11.maxPersons = "14";
room11.facilities = {};
room11.price = 2083;
room11.bookedPeriods = [];
room11.featured = false;
room11.image = "images/img_5.jpg";

hotelRooms.push(room11);

var room12 = {};
room12.name = null;
room12.category = "Presidental Room";
room12.roomNumber = "112";
room12.size = "240";
room12.bedType = "Six Beds";
room12.numberOfBeds = 6;
room12.maxPersons = "12";
room12.facilities = {};
room12.price = 3500;
room12.bookedPeriods = [];
room12.featured = false;
room12.image = "images/img_6.jpg";

hotelRooms.push(room12);

var data = JSON.stringify(hotelRooms);
console.log(data);
