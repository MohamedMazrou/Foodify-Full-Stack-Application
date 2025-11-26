import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IOtp } from '../../core/interfaces/Interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { OtpService } from './otp.service';
import { ToastrService } from 'ngx-toastr';
import { SharedModuleModule } from '../../shared/shared-module.module';
import { isPlatformBrowser } from '@angular/common';
// import { NgClass, NgIf } from "../../../../node_modules/@angular/common/index";

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [ReactiveFormsModule,SharedModuleModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {
  phone: string | undefined;
  constructor(private fb: FormBuilder,private _Otp :OtpService,private toastr: ToastrService,private router : Router){
      const platformId = inject(PLATFORM_ID);
       if (isPlatformBrowser(platformId)) {
 this.phone = history.state?.phone;
       }
  }
countdown: number = 60;
intervalId: any;
  ngOnInit(): void {

this.startCountdown()
  }



startCountdown() {
  this.countdown = 60;

  this.intervalId = setInterval(() => {
    this.countdown--;

    if (this.countdown === 0) {
      clearInterval(this.intervalId);
    }
  }, 1000);
}


     otp = this.fb.group({
      c1: [
        '',
        [
          Validators.required,
          Validators.pattern(/[0-9]/),
        ],
      ],
      c2: [
        '',
        [
          Validators.required,
          Validators.pattern(/[0-9]/),
        ],
      ],
      c3: [
        '',
        [
          Validators.required,
          Validators.pattern(/[0-9]/),
        ],
      ],
      c4: [
        '',
        [
          Validators.required,
          Validators.pattern(/[0-9]/),
        ],
      ],
     })


     fnOtp(otp:FormGroup):void{
        if(otp.valid){
        const { c1,c2,c3,c4 } = otp.value;
    const oTp = `${c1}${c2}${c3}${c4}`

    const obj_Otp : IOtp = {
      phone:this.phone || '',
      otp: oTp || '' ,
    }

    this._Otp.Otp(obj_Otp).subscribe({
      next:((res:any)=>{
        this.toastr.success(res.message);
        this.router.navigate(['/signin'])

      }),
      error:((err:any)=>{   this.toastr.error(err.error.message)})
    })
}
     }

ResendOtp(otp:FormGroup):void{
       
        const { c1,c2,c3,c4 } = otp.value;
    const oTp = `${c1}${c2}${c3}${c4}`

    const obj_Otp : IOtp = {
      phone:this.phone || '',
      otp: oTp || '' ,
    }

    this._Otp.ResendOtp(obj_Otp).subscribe({
      next:((res:any)=>{
        this.toastr.success(res.message);
       this.router.navigate(['/signin'])
      }),
      error:((err:any)=>{   this.toastr.error(err.error.message)})
    })

}



}
