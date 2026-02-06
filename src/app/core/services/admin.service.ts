import { Injectable } from '@angular/core';
import { ApifuncService } from './apifunc.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends ApifuncService {

 constructor(protected override http : HttpClient ){
     super(http);
     this.Base_url = "http://localhost:3000/admin";
}
}
