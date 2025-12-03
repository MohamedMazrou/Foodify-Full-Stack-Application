import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { profile } from '../../core/interfaces/Interfaces';
import { Observable } from 'rxjs';
import { url } from '../../core/environment/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http : HttpClient) { }
 getProfile():Observable<profile>{
    return this.http.get<profile>(url.endPoint_profile)
  }

}
