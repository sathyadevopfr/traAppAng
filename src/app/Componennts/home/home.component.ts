import { Component, OnInit, inject } from '@angular/core';
import { TrainService } from '../../Service/train.service';
import { APIResponse, AllStations } from '../../Modal/trains.modal';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  trainService = inject(TrainService);
  
  router = inject(Router);

  allStationsList: AllStations[] = [];

  fromStationId: number = 0;
  toStationId: number = 0;
  dateOfTravel: string = '';

  ngOnInit(): void {
    this.getAllStations();
  }

  getAllStations() {
    this.trainService.getAllStations().subscribe((result: APIResponse) => {
      this.allStationsList = result.data;
    });
  }

  onSearch() {
    if (this.fromStationId == 0 || this.fromStationId == 0 || this.dateOfTravel == '') {
      alert('Please Select From to Destination');
    }
    else {
      if (this.fromStationId == this.toStationId) {
        alert(' From and Destination Cannot Be Same');
      }
      else {
        this.router.navigate([
          '/search',
          this.fromStationId,
          this.toStationId,
          this.dateOfTravel,
        ]);
      }
    }
  }
}
