import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFoodCategory, Irecommended } from '../core/interfaces/Interfaces';
import { url } from '../../app/core/environment/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class ShowDetailsDishesService {

  constructor(private http:HttpClient) { }
  getDishes(id:number|string ):Observable<Irecommended>{
return this.http.get<Irecommended>(`${url.endPoint_dishes}${id}`)
  }
}
