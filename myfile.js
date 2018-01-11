function ParkingFloor(noOfSlots, typesOfVehicles) {
	this.noOfSlots = noOfSlots;
	this.typesOfVehicles = typesOfVehicles;
	this.flor = new Array(noOfSlots);
	for(var i=0;i<noOfSlots;i++) {
		this.flor[i] = 0;
	}
}
ParkingFloor.prototype.getFloorStatus = function () {
    var status = '';
    for(i=0;i<this.noOfSlots;i++) {
        status = status + this.flor[i].toString() + ' ';
    }
    return status;
}

function ParkingLot(noOfFloors, slotsInFloors, typesInFloors) {
	this.noOfFloors = noOfFloors;
	this.slotsInFloors = slotsInFloors;
	this.typesInFloors = typesInFloors;
	this.floors = new Array(noOfFloors);
	for(var i=0;i<noOfFloors;i++) {
		this.floors[i] = new ParkingFloor(slotsInFloors[i], typesInFloors);
	}
}
ParkingLot.prototype.getStatus = function () {
	for(var i=0;i<this.noOfFloors;i++) {
		console.log(this.floors[i].getFloorStatus());
	}
}

var parkingLot = new ParkingLot(3,[15,12,9],[['Car', 'Truck'], ['Car'], ['Car', 'Bike']]);
parkingLot.getStatus();

function Vehicle(type, noOfWheels, headLight, honk, parkingSpace, vehicleNumber) {
	this.type = type;
	this.noOfWheels = noOfWheels;
	this.headLight = headLight;
	this.honk = honk;
	this.parkingSpace = parkingSpace;
	this.vehicleNumber = vehicleNumber;
	this.isParked = false;
}
Vehicle.prototype.isHonking = function() {
	if(this.honk === true) {
		console.log('It is honking.');
	}
	else {
		console.log('It is not honking.');
	}
}
Vehicle.prototype.startHonking = function () {
    this.honk = true;
}
Vehicle.prototype.stopHonking = function () {
    this.honk = false;
}
Vehicle.prototype.lightsOn = function () {
    this.headLight = true;
}
Vehicle.prototype.lightsOff = function () {
    this.headLight = false;
}
Vehicle.prototype.isLightsOn = function () {
	if(this.headLight === true) {
		console.log('Lights are On');
	}
	else {
		console.log('Lights are Off');
	}
}
Vehicle.prototype.park = function(parkingLot) {
	if(this.isParked) {
		console.log('Already parked');
		return;
	}
	for(var i=0;i<parkingLot.noOfFloors && this.isParked===false;i++) {
		if(!parkingLot.floors[i].typesOfVehicles[i].includes(this.type)) {
			continue;
		}
		for(var j=0;j<parkingLot.floors[i].noOfSlots;j++) {
			var possible = true;
			for(var k=0;k<this.parkingSpace;k++) {
				if(j+k < parkingLot.floors[i].noOfSlots && parkingLot.floors[i].flor[j+k]===0) {
				}
				else {
					possible = false;
					break;
				}
			}
			if(possible === true) {
				this.parkingInfo = {flor:i, slot:j};
				console.log('Your ' + this.type + ' ' + this.vehicleNumber + ' is parked on flor no. ' + i + ', at slot number ' + j);
				this.isParked = true;
				console.log(this.parkingSpace);
				for(var w=0;w<this.parkingSpace;w++) {
					parkingLot.floors[i].flor[w+j] = this.type + ':' + this.vehicleNumber;
				}
				break;
			}
		}
	}
	if(this.isParked === false) {
		console.log('Your ' + this.type + ' ' + this.vehicleNumber + ' could not be parked');
	}
}
Vehicle.prototype.removeVehicle = function(parkingLot) {
	if(this.isParked===false) {
		console.log('Vehicle is not in the Parking lot');
		return;
	}
	else {
		var flr = this.parkingInfo['flor'];
		var slot = this.parkingInfo['slot'];
		for(var i=0;i<this.parkingSpace;i++) {
			parkingLot.floors[flr].flor[slot+i] = 0;
		}
		this.isParked = false;
		console.log('Your ' + this.type + ':' + this.vehicleNumber + ' is removed from the parking lot.');
    }
}

/* *** Vehicle definition ends. Car definition begins **** */

function Car(headLight, honk, parkingSpace, vehicleNumber) {
	Vehicle.call(this,'Car',4,headLight,honk,parkingSpace,vehicleNumber);
}
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

/* *** Car definition ends. Bike definition begins **** */

function Bike(headLight, honk, parkingSpace, vehicleNumber) {
    Vehicle.call(this,'Bike',2,headLight,honk,parkingSpace,vehicleNumber);
}
Bike.prototype = Object.create(Vehicle.prototype);
Bike.prototype.constructor = Bike;

/* *** Bike definition ends. Truck definition begins **** */

function Truck(headlight, honk, parkingSpace, vehicleNumber,permit) {
	Vehicle.call(this,'Truck',6,headlight,honk,parkingSpace,vehicleNumber);
	this.permit = permit;
}
Truck.prototype = Object.create(Vehicle.prototype);
Truck.prototype.constructor = Truck;

/* *** End of definitions **** */

var car1 = new Car(true,false,4,'BY6928');
var car2 = new Car(true,false,4,'F4444');
car1.park(parkingLot);
parkingLot.getStatus();
car2.park(parkingLot);
parkingLot.getStatus();
var truck = new Truck(true, false, 8, 'XYZ', 'AI');
truck.park(parkingLot);
parkingLot.getStatus();
truck.isLightsOn();
truck.isHonking();
var bike = new Bike(false,false,2,'DK5651');
bike.park(parkingLot);
car1.removeVehicle(parkingLot);
parkingLot.getStatus();
//console.log(res)