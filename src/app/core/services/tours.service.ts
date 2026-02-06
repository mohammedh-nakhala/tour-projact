import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApifuncService } from './apifunc.service';

@Injectable({
  providedIn: 'root'
})
export class ToursService  extends ApifuncService  {

  constructor(protected override http : HttpClient ){
    super(http);
    this.Base_url = "/db.json";
  }

  override getAll(): Observable<any[]> {
    return this.http.get<any>(this.Base_url).pipe(map(data => data.tours));
  }

  override getById(id: string | number): Observable<any> {
    return this.getAll().pipe(map(tours => tours.find((t: any) => t.id == id)));
  }

  override post(obj: any): Observable<any> {
    console.log('Creating tour', obj);
    return this.getAll().pipe(map(tours => {
      obj.id = Date.now().toString();
      tours.push(obj);
      return obj;
    }));
  }

  override put(obj: any, id: string | number): Observable<any> {
    console.log('Updating tour', obj);
    return this.getAll().pipe(map(tours => {
      const index = tours.findIndex((t: any) => t.id == id);
      if (index !== -1) {
        tours[index] = obj;
      }
      return obj;
    }));
  }

  override delete(id: string | number): Observable<any> {
    console.log('Deleting tour', id);
    return this.getAll().pipe(map(tours => {
      tours = tours.filter((t: any) => t.id != id);
      return {};
    }));
  }

}
