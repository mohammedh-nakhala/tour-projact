import { Component } from '@angular/core';
import { ToursService } from '../../../../core/services/tours.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.css'
})
export class ToursComponent {


  alldata: any[] = [];

    constructor(private serv: ToursService, private toastr: ToastrService) {}

    ngOnInit() {
      this.getAllTours();
    }

    getAllTours() {
      this.serv.getAll().subscribe((data: any) => {
        this.alldata = data;
      });
    }
}
