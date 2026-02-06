import { Component } from '@angular/core';
import { DestinationsService } from '../../../../core/services/destinations.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.css'
})
export class DestinationsComponent {

  alldata: any[] = [];

      constructor(private serv: DestinationsService, private toastr: ToastrService) {}

      ngOnInit() {
        this.getAllDestinations();
      }

      getAllDestinations() {
        this.serv.getAll().subscribe((data: any) => {
          this.alldata = data;
        });
      }

}
