import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaymentData, IPaymentResponse } from '../../core/interfaces/Interfaces';
import { url } from '../../core/environment/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  constructor(private http :HttpClient) { }

  getPaymentMethod():Observable<IPaymentResponse>{
return this.http.get<IPaymentResponse>(url.endPoint_payment_Method)
  }


  PaymentMethod(obj:any):Observable<IPaymentResponse>{
return this.http.post<IPaymentResponse>(url.endPoint_payment_Method,obj)
  }
}
