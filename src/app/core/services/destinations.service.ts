import { Injectable } from '@angular/core';
import { ApifuncService } from './apifunc.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinationsService extends ApifuncService  {

 constructor(protected override http : HttpClient ){
     super(http);
     this.Base_url = "/db.json";
   }

  override getAll(): Observable<any[]> {
    return this.http.get<any>(this.Base_url).pipe(map(data => data.destinations));
  }

  override getById(id: string | number): Observable<any> {
    return this.getAll().pipe(map(destinations => destinations.find((d: any) => d.id == id)));
  }

  override post(obj: any): Observable<any> {
    console.log('Creating destination', obj);
    return this.getAll().pipe(map(destinations => {
      obj.id = Date.now().toString();
      destinations.push(obj);
      return obj;
    }));
  }

  override put(obj: any, id: string | number): Observable<any> {
    console.log('Updating destination', obj);
    return this.getAll().pipe(map(destinations => {
      const index = destinations.findIndex((d: any) => d.id == id);
      if (index !== -1) {
        destinations[index] = obj;
      }
      return obj;
    }));
  }

  override delete(id: string | number): Observable<any> {
    console.log('Deleting destination', id);
    return this.getAll().pipe(map(destinations => {
      destinations = destinations.filter((d: any) => d.id != id);
      return {};
    }));
  }

}
