import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../../../core/services/admin.service';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.css'
})
export class AdminListComponent implements OnInit {
  alldata: any[] = [];

  constructor(private serv: AdminService, private toastr: ToastrService) {}

  ngOnInit() {
    this.getAllAdmins();
  }

  getAllAdmins() {
    this.serv.getAll().subscribe((data: any) => {
      this.alldata = data;
    });
  }

  remove(id: string | number) {
    this.serv.delete(id).subscribe({
      next: () => {
        this.alldata = this.alldata.filter(t => t.id !== id);
        this.toastr.success(`Admin deleted successfully ✅`);
      },
      error: (err: { status: number; }) => {
        if (err.status === 404) {
          this.toastr.warning(`Admin with id not found ⚠️`);
        } else {
          this.toastr.error("Error deleting Admin ❌");
        }
      }
    });
  }
}
