import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ToursService } from '../../../../../core/services/tours.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tours-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tours-create.component.html',
  styleUrl: './tours-create.component.css'
})
export class ToursCreateComponent {
  constructor(private serv:ToursService ,private fb:FormBuilder ,private Router:Router ,  private toaster: ToastrService){
    this.createform();
  }

 tourform!: FormGroup;


  createform(){
    this.tourform= this.fb.group({
      name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(50),Validators.pattern(/^[A-Za-z]+$/)]],
      price:['',[Validators.required,Validators.pattern('^[0-9]*$')]],
      destination:['',[Validators.required,Validators.minLength(3),Validators.maxLength(50),Validators.pattern(/^[A-Za-z]+$/)] ],
      img:['',[Validators.required  ]]


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
  if (this.tourform.valid) {
    // ✅ ما نبعتش id .. json-server هيولده تلقائي
    const tourData = {
      name: this.tourform.value.name,
      price: this.tourform.value.price,
      destination: this.tourform.value.destination,
      img: this.tourform.value.img
    };

    this.serv.post(tourData).subscribe({
      next: (data: any) => {
        console.log("✅ done create tour", data);

        this.toaster.success("Tour created successfully ✅", "Success");
        this.Router.navigateByUrl('/admin/tl');
      },
      error: (err) => {
        console.error("❌ error creating tour", err);
        this.toaster.error("Failed to create tour ❌", "Error");
      }
    });
  } else {
    this.toaster.warning("Please fill in all required fields ⚠️", "Warning");
  }
}

}
