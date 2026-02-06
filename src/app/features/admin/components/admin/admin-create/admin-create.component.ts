import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../../../core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-create.component.html',
  styleUrl: './admin-create.component.css'
})
export class AdminCreateComponent {


  constructor( private serv: AdminService , private fb: FormBuilder  , private toastr:ToastrService , private router:Router){

    this.createform();

  }

  registerform!: FormGroup ;
   createform(){
    this.registerform =this.fb.group({
      email : ['',[Validators.required,Validators.email]],
       name : ['',[Validators.required,Validators.minLength(3)]],
      password : ['',[Validators.required,Validators.minLength(3)]]
   })
   }

   onsubmit(){
    this.serv.post(this.registerform.value).subscribe((d)=>{

      this.toastr.success("success","create admin done "),
      this.router.navigateByUrl('admin/al')
    })
   }
}
