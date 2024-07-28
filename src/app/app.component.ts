import { Component, ViewChild, ElementRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APIResponse, AddUpdatePassengers, LoginObj } from './Modal/trains.modal';
import { FormsModule } from '@angular/forms';
import { TrainService } from './Service/train.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  registerObj: AddUpdatePassengers = new AddUpdatePassengers();
  trainService = inject(TrainService);
  loginObj: LoginObj = new LoginObj();
  loggedUser: AddUpdatePassengers = new AddUpdatePassengers();
  @ViewChild('registerModel') registerModel!: ElementRef;
  @ViewChild('loginModel') loginModel!: ElementRef;

  ngOnInit(): void {
    let localData = localStorage.getItem('trainLogin');
    if (localData != null) {
      this.loggedUser = JSON.parse(localData);
    }
  }

  openRegister() {
    const model = this.registerModel.nativeElement;
    if (model != null) {
      model.style.display = 'block';
    }
  }

  closeRegister() {
    const model = this.registerModel.nativeElement;
    if (model != null) {
      model.style.display = 'none';
    }
  }

  openLogin() {
    const model = this.loginModel.nativeElement;
    if (model != null) {
      model.style.display = 'block';
    }
  }

  closeLogin() {
    const model = this.loginModel.nativeElement;
    if (model != null) {
      model.style.display = 'none';
    }
  }
  onRegister() {
    this.trainService
      .addUpdatePassengers(this.registerObj)
      .subscribe((result: APIResponse) => {
        if (result.result) {
          alert('Registration Success');
          this.closeRegister();
        } else {
          alert(result.message);
        }
      });
  }
  login() {
    this.trainService.login(this.loginObj).subscribe((result: APIResponse) => {
      if (result.result) {
        alert('login Successfull');
        localStorage.setItem('trainLogin', JSON.stringify(result.data));
        this.loggedUser = result.data;
        this.closeLogin();
      } else {
        alert(result.message);
      }
    });
  }
  logOff() {
    this.loggedUser = new AddUpdatePassengers();
    localStorage.removeItem('trainLogin');
  }
}
