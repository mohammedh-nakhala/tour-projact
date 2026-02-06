import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  busyRequest = 0;
  constructor(private spinnerService: NgxSpinnerService) {}
  busy() {
    this.busyRequest++;
    this.spinnerService.show();
  }
  hide() {
    this.busyRequest--;
    if (this.busyRequest <= 0) {
      this.busyRequest = 0;
      setTimeout(() => {
        this.spinnerService.hide();
      }, 1500);
    }
  }
}
