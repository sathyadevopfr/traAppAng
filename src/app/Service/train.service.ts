import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, AddUpdatePassengers, LoginObj,Book } from '../Modal/trains.modal';

@Injectable({
  providedIn: 'root',
})
export class TrainService {
  http = inject(HttpClient);

  apiUrl: string = `https://freeapi.miniprojectideas.com/api/TrainApp/`;

  getAllStations(): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${this.apiUrl}GetAllStations`);
  }
  getTrainsSearch(
    from: number,
    des: number,
    date: string
  ): Observable<APIResponse> {
    return this.http.get<APIResponse>(
      `${this.apiUrl}GetTrainsBetweenStations?departureStationId=${from}&arrivalStationId=${des}&departureDate=${date}`
    );
  }

  addUpdatePassengers(reg: AddUpdatePassengers): Observable<APIResponse> {
    return this.http.post<APIResponse>(
      `${this.apiUrl}AddUpdatePassengers`,
      reg
    );
  }

  login(loginObj:LoginObj):Observable<APIResponse> {
    return this.http.post<APIResponse>(`${this.apiUrl}Login`,loginObj);
  }
  bookTrain(booking: Book): Observable<APIResponse>{
     return this.http.post<APIResponse>(`${this.apiUrl}BookTrain`,booking)
   }
}


