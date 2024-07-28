export interface APIResponse{
    message: string,
  result: boolean,
  data: any
}

export interface AllStations {
  stationID: number;
  stationName: string;
  stationCode: string;
}

export class StationParams{
  fromStationId :number;
  toStationId: number;
  dateOfTravel:string;
  constructor() {
    this.dateOfTravel = '';
    this.fromStationId = 0;
    this.toStationId = 0;
  }
}
export class SearchTrain {
  trainId: number;
  trainNo: number;
  trainName: string;
  departureStationId: number;
  arrivalStationId: number;
  departureTime: string;
  arrivalTime: string;
  totalSeats: number;
  departureDate: string;
  arrivalStationName: string;
  departureStationName: string;
  constructor() {
    this.trainId = 0;
    this.trainNo = 0;
    this.departureStationId = 0;
    this.arrivalStationId = 0;
    this.totalSeats = 0;
    this.trainName = '';
    this.departureTime='';
    this.arrivalTime = '';
     this.departureDate = '';
    this.arrivalStationName = '';
   this.departureStationName = '';
  }
}

export class AddUpdatePassengers {
  passengerID: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  constructor() {
     this.passengerID= 0;
     this.firstName='';
     this.lastName= '';
     this.email='';
     this.phone= '';
     this.password= '';
  }
}

export class LoginObj {
  phoneNum: number;
  password: string;

  constructor() {
    this.phoneNum = 0;
    this.password = '';
  }
}

  export class Book {
    bookingId: number;
    trainId: number;
    passengerId: number;
    travelDate: string;
    bookingDate: Date;
    totalSeats: number;
    TrainAppBookingPassengers: Array<Book>;
    constructor() {
      this.bookingId = 0;
      this.trainId = 0;
      this.passengerId = 0;
      this.travelDate = '',
        this.bookingDate = new Date();
      this.totalSeats = 0;
      this.TrainAppBookingPassengers = [];
    }

    //  this.TrainAppBookingPassengers": [
    //   {
    //      this.bookingPassengerId": 0,
    //      this.bookingId": 0,
    //      this.passengerName": "string",
    //      this.seatNo": 0,
    //      this.age": 0
    //   }
    // ]
  }