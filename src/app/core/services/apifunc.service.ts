import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApifuncService {

  protected Base_url: string = '';

  constructor(protected http: HttpClient) {}


    get(){

    return this.http.get(this.Base_url);
    }
     post(obj:any){

    return this.http.post(this.Base_url,obj);
    }


      getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.Base_url);
  }

delete(id: string | number): Observable<any> {
    return this.http.delete<any>(`${this.Base_url}/${id}`);
  }

 getById(id: string | number): Observable<any> {
    return this.http.get<any>(`${this.Base_url}/${id}`);
  }

 put(obj: any, id: string | number): Observable<any> {
    return this.http.put<any>(`${this.Base_url}/${id}`, obj);
  }


}
