import { Component, OnInit } from '@angular/core';
import { ToursService } from '../../../../../core/services/tours.service';
import { ToastrService } from 'ngx-toastr';
import { AdminModul } from "../../../admin.routes.module";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-tours-list',
  templateUrl: './tours-list.component.html',
  styleUrls: ['./tours-list.component.css'],
  imports: [CommonModule, RouterModule,RouterLink],
  standalone: true,
})
export class ToursListComponent implements OnInit {
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

  remove(id: string | number) {
    this.serv.delete(id).subscribe({
      next: () => {
        // ✅ تحديث المصفوفة محلياً
        this.alldata = this.alldata.filter(t => t.id !== id);

        this.toastr.success(`Tour  deleted successfully ✅`);
      },
      error: (err) => {
        if (err.status === 404) {
          this.toastr.warning(`Tour with id not found ⚠️`);
        } else {
          this.toastr.error("Error deleting tour ❌");
        }
      }
    });
  }
}
