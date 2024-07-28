import { Component, inject ,OnInit, ViewChild,ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllStations, APIResponse, SearchTrain, StationParams ,Book, AddUpdatePassengers} from '../../Modal/trains.modal';
import { TrainService } from '../../Service/train.service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  trainService = inject(TrainService);
  searchData: StationParams = new StationParams();
  searchTrainList: SearchTrain[] = [];
  allStationsList: AllStations[] = [];
  selectedTrain: SearchTrain = new SearchTrain();
  loggedUser: AddUpdatePassengers = new AddUpdatePassengers();
  passenger: any = {
    passengerName: '',
    age: 0,
  };

  passengerList: any[] = [];

  bookObject: Book = new Book();

  @ViewChild('bookingModal') bookingModal!: ElementRef;
  // depaName: string = '';
  // arrivalName: string = '';
  departureStationName: string = '';
  arrivalStationName: string = '';
  ngOnInit() {
    const loggedData = localStorage.getItem('trainLogin');
    if (loggedData != null) {
      this.loggedUser = JSON.parse(loggedData);
    }
      this.activatedRoute.params.subscribe((result: any) => {
        this.searchData.dateOfTravel = result.dateOfTravel;
        this.searchData.fromStationId = result.fromStationId;
        this.searchData.toStationId = result.toStationId;
        this.getSearchTrains();
        this.getAllStations();
      });
  }

  getSearchTrains() {
    this.trainService
      .getTrainsSearch(
        this.searchData.fromStationId,
        this.searchData.toStationId,
        this.searchData.dateOfTravel
      )
      .subscribe((result: APIResponse) => {
        this.searchTrainList = result.data;
        this.departureStationName = result.data.departureStationName;
        this.arrivalStationName = result.data.arrivalStationName;
        
      });
  }

  getAllStations() {
    this.trainService.getAllStations().subscribe((result: APIResponse) => {
      this.allStationsList = result.data;
    });
  }
  bookTicketModal(train: SearchTrain) {
    this.selectedTrain = train;
    const model = this.bookingModal.nativeElement;
    if (model != null) {
      model.style.display = 'block';
    }
  }
  closeBookTicketModal() {
    const model = this.bookingModal.nativeElement;
    if (model != null) {
      model.style.display = 'none';
    }
  }
  addPassenger() {
    const objStr = JSON.stringify(this.passenger);
    const parseObj = JSON.parse(objStr);
    this.passengerList.push(parseObj);
  }

  bookTicket() {
    this.bookObject.travelDate = this.searchData.dateOfTravel;
    this.bookObject.bookingDate = new Date();
    this.bookObject.trainId = this.selectedTrain.trainId;
    this.bookObject.passengerId = this.loggedUser.passengerID;
    this.bookObject.TrainAppBookingPassengers = this.passengerList;
    this.bookObject.totalSeats = this.passengerList.length;
    this.trainService.bookTrain(this.bookObject).subscribe(
      (result:APIResponse) => {
        if (result.result) {
          alert('Booking Confirmed');
        }
        else {
         alert(result.message);
        }
      }
    )
  }

}
