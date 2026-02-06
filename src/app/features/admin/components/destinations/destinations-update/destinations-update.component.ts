import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ToursService } from '../../../../../core/services/tours.service';

@Component({
  selector: 'app-destinations-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './destinations-update.component.html',
  styleUrl: './destinations-update.component.css'
})
export class DestinationsUpdateComponent {
  destinationsform!: FormGroup;
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
        this.router.navigateByUrl('/admin/dl');
      }
    }

    createForm() {
      this.destinationsform = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[A-Za-z]+$/)]],
        price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        destination: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[A-Za-z]+$/)]],
        img: ['', [Validators.required]],
         category: ['', [Validators.required]]
      });
    }

    loadTourData() {
      this.serv.getAll().subscribe({
        next: (data: any[]) => {
          const destinations = data.find(t => t.id == this.id);
          if (destinations) {
            this.destinationsform.patchValue({
              name: destinations.name,
              price: destinations.price,
              destination: destinations.destination,
              img: destinations.img,
              category: destinations

            });
          } else {
            this.toaster.error("Tour not found ❌");
            this.router.navigateByUrl('/admin/dl');
          }
        },
        error: (err: any) => {
          console.error("❌ error loading tour", err);
          this.toaster.error("Failed to load tour ❌");
          this.router.navigateByUrl('/admin/dl');
        }
      });
    }

    onSubmit() {
      if (this.destinationsform.valid && this.id) {
        const tourData = this.destinationsform.value;

        this.serv.put(tourData, this.id).subscribe({
          next: () => {
            this.toaster.success("Tour updated successfully ✅", "Success");
            this.router.navigateByUrl('/admin/tl');
          },
          error: (err: any) => {
            console.error("❌ error updating tour", err);
            this.toaster.error("Failed to update tour ❌", "Error");
          }
        });
      } else {
        this.toaster.warning("Please fill in all required fields ⚠️", "Warning");
      }
    }

}
