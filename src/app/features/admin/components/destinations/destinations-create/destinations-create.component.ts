import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { DestinationsService } from '../../../../../core/services/destinations.service';

@Component({
  selector: 'app-destinations-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './destinations-create.component.html',
  styleUrl: './destinations-create.component.css'
})
export class DestinationsCreateComponent {
  constructor(private serv:DestinationsService ,private fb:FormBuilder ,private Router:Router ,  private toaster: ToastrService){
      this.createform();
    }

   destinationsform!: FormGroup;


    createform(){
      this.destinationsform= this.fb.group({
        name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(50),Validators.pattern(/^[A-Za-z]+$/)]],
        price:['',[Validators.required,Validators.pattern('^[0-9]*$')]],
        destination:['',[Validators.required,Validators.minLength(3),Validators.maxLength(50),Validators.pattern(/^[A-Za-z]+$/)] ],
        img:['',[Validators.required  ]],
         category: ['', [Validators.required]]


      });
    }

  //   OnSubmit() {
  //   if (this.tourform.valid) {
  //     this.serv.post(this.tourform.value).subscribe({
  //       next: (data: any) => {
  //         console.log("✅ done create tour", data);
  //       },
  //       error: (err) => {
  //         console.error("❌ error creating tour", err);
  //       }
  //     });
  // this.Router.navigateByUrl('/admin/tl')
  //     console.log("Form values:", this.tourform.value);

  //     this.toaster.success("success","create tour succesfully ")
  //   } else {
  //     console.log("Form not valid");
  //   }
  // }
  onSubmit() {
    if (this.destinationsform.valid) {
      // ✅ ما نبعتش id .. json-server هيولده تلقائي
      const tourData = {
        name: this.destinationsform.value.name,
        price: this.destinationsform.value.price,
        destination: this.destinationsform.value.destination,
        img: this.destinationsform.value.img,
        category:this.destinationsform.value.category

      };

      this.serv.post(tourData).subscribe({
        next: (data: any) => {
          console.log("✅ done create tour", data);

          this.toaster.success("Tour created successfully ✅", "Success");
          this.Router.navigateByUrl('/admin/dl');
        },
        error: (err: any) => {
          console.error("❌ error creating tour", err);
          this.toaster.error("Failed to create tour ❌", "Error");
        }
      });
    } else {
      this.toaster.warning("Please fill in all required fields ⚠️", "Warning");
    }
  }

}
