import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DestinationsService } from '../../../../../core/services/destinations.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-destinations-list',
  standalone: true,
  imports: [CommonModule, RouterModule,RouterLink],
  templateUrl: './destinations-list.component.html',
  styleUrl: './destinations-list.component.css'
})
export class DestinationsListComponent {
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

    remove(id: string | number) {
      this.serv.delete(id).subscribe({
        next: () => {
          // ✅ تحديث المصفوفة محلياً
          this.alldata = this.alldata.filter(t => t.id !== id);

          this.toastr.success(`Destinations  deleted successfully ✅`);
        },
        error: (err: { status: number; }) => {
          if (err.status === 404) {
            this.toastr.warning(`Destinations with id not found ⚠️`);
          } else {
            this.toastr.error("Error deleting Destinations ❌");
          }
        }
      });
    }

}
