// import { Component } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ToursService } from '../../../../../core/services/tours.service';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-tours-update',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule],
//   templateUrl: './tours-update.component.html',
//   styleUrls: ['./tours-update.component.css'] // ✅ لازم styleUrls مش styleUrl
// })
// export class ToursUpdateComponent {
//   id: any;
//   tourform!: FormGroup;

//   constructor(
//     private activetroute: ActivatedRoute,
//     private serv: ToursService,
//     private fb: FormBuilder,
//     private router: Router,
//     private toaster: ToastrService
//   ) {
//     this.createform();
//     this.id = this.activetroute.snapshot.paramMap.get('id'); // 👈 نجيب id من الرابط
//     this.loadTourData(); // 👈 تحميل بيانات التور عشان نعمل Patch للفورم
//   }

//   createform() {
//     this.tourform = this.fb.group({
//       name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[A-Za-z]+$/)]],
//       price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
//       destination: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[A-Za-z]+$/)]],
//       img: ['', [Validators.required]]
//     });
//   }

//   loadTourData() {
//     this.serv.getAll().subscribe((data: any[]) => {
//       const tour = data.find(t => t.id == this.id);
//       if (tour) {
//         this.tourform.patchValue({
//           name: tour.name,
//           price: tour.price,
//           destination: tour.destination,
//           img: tour.img
//         });
//       } else {
//         this.toaster.error("Tour not found ❌");
//         this.router.navigateByUrl('/admin/tl');
//       }
//     });
//   }

//   onSubmit() {
//     if (this.tourform.valid) {
//       const tourData = this.tourform.value;

//       this.serv.put(tourData, this.id).subscribe({
//         next: () => {
//           this.toaster.success("Tour updated successfully ✅", "Success");
//           this.router.navigateByUrl('/admin/tl');
//         },
//         error: (err) => {
//           console.error("❌ error updating tour", err);
//           this.toaster.error("Failed to update tour ❌", "Error");
//         }
//       });
//     } else {
//       this.toaster.warning("Please fill in all required fields ⚠️", "Warning");
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ToursService } from '../../../../../core/services/tours.service';

@Component({
  selector: 'app-tours-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tours-update.component.html',
  styleUrls: ['./tours-update.component.css']
})
export class ToursUpdateComponent implements OnInit {

  tourform!: FormGroup;
  id: string | null = null;

  constructor(
    private activetroute: ActivatedRoute,
    private serv: ToursService,
    private fb: FormBuilder,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.createForm();
    this.id = this.activetroute.snapshot.paramMap.get('id');
    if (this.id) {
      this.loadTourData();
    } else {
      this.toaster.error("Invalid tour ID ❌");
      this.router.navigateByUrl('/admin/tl');
    }
  }

  createForm() {
    this.tourform = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[A-Za-z]+$/)]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      destination: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[A-Za-z]+$/)]],
      img: ['', [Validators.required]]
    });
  }

  loadTourData() {
    this.serv.getAll().subscribe({
      next: (data: any[]) => {
        const tour = data.find(t => t.id == this.id);
        if (tour) {
          this.tourform.patchValue({
            name: tour.name,
            price: tour.price,
            destination: tour.destination,
            img: tour.img
          });
        } else {
          this.toaster.error("Tour not found ❌");
          this.router.navigateByUrl('/admin/tl');
        }
      },
      error: (err) => {
        console.error("❌ error loading tour", err);
        this.toaster.error("Failed to load tour ❌");
        this.router.navigateByUrl('/admin/tl');
      }
    });
  }

  onSubmit() {
    if (this.tourform.valid && this.id) {
      const tourData = this.tourform.value;

      this.serv.put(tourData, this.id).subscribe({
        next: () => {
          this.toaster.success("Tour updated successfully ✅", "Success");
          this.router.navigateByUrl('/admin/tl');
        },
        error: (err) => {
          console.error("❌ error updating tour", err);
          this.toaster.error("Failed to update tour ❌", "Error");
        }
      });
    } else {
      this.toaster.warning("Please fill in all required fields ⚠️", "Warning");
    }
  }
}
