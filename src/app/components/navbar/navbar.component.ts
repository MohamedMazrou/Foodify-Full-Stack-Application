import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { SharedModuleModule } from '../../shared/shared-module.module';
import { FormsModule } from '@angular/forms';
import { ICartItem, ICartResponse, Irecommended, profile } from '../../core/interfaces/Interfaces';
import { GetRecommendedService } from '../../pages/home/get-recommended.service';
import { SearchByRecommendPipe } from '../../core/pipe/search-by-recommend.pipe';
import { CartService } from './cart.service';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,SharedModuleModule,FormsModule,SearchByRecommendPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class NavbarComponent {
  constructor(private _GetRecommendedService:GetRecommendedService,public _Cartservices:CartService,private toastr: ToastrService,private _ProfileService:ProfileService){}
switchOffsearch :boolean = false
switchNotification :boolean = false
switchNavbar :boolean = false
switchCarts :boolean = false
switchProfile :boolean = false
searchValue:string = ''
total_items!:number
total_price!:number
profile = signal<profile>({
    id: 0,
  name: '',
  full_name: '',
  phone: '',
  email: '',
  email_verified_at: '' ,
  created_at: '', 
  updated_at: '',
  birthday:'',
  address: '',
})


cart = signal <ICartItem[]>([])

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getRecommended()
  this.getCart()
  this.GetProfile()
}

swithOnSearch():void{
  this.switchOffsearch = !this.switchOffsearch
  this.switchNotification = false
  this.switchNavbar = false
       this.switchProfile =false


  this.searchValue = ''
    this.switchCarts = false
    this.showScroll()



}

swithOnNotification():void{
  this.switchNotification = !this.switchNotification
  this.switchOffsearch = false
  this.switchNavbar = false
      this.switchCarts = false
           this.switchProfile =false

  this.searchValue = ''
  this.showScroll()

}
switchOnNavbar():void{
  this.switchNavbar = !this.switchNavbar
  this.switchOffsearch = false
  this.switchNotification = false
    this.searchValue = ''
    this.switchCarts = false
     this.switchProfile =false

this.showScroll()

}

switchOnCart():void{
  this.switchCarts = !this.switchCarts
  this.switchNavbar = false
  this.switchOffsearch = false
  this.switchNotification = false
   this.switchProfile =false

    this.searchValue = ''
 
this.showScroll()
   
}

hiddenOvarlay():void{
   this.switchProfile =false
     this.switchCarts = false
this.showScroll()
}

showScroll():void{
   if(this.switchCarts|| this.switchProfile){
    window.document.body.style.overflow = 'hidden'
    }else{ window.document.body.style.overflow = 'auto'}
}


arrRecommend !: Irecommended[] 
getRecommended():void{
  this._GetRecommendedService.getRecommended().subscribe({
    next:(res:any)=>{
     this.arrRecommend = res.data
    }


  })
}


getCart():void{
this._Cartservices.getCart().subscribe({
  next:(res:ICartResponse)=>{
  this._Cartservices.setDataCart(res.data,res.summary)
  this.total_items = res.summary.total_items
  this.total_price = res.summary.total_price
  
  },

  error:((err:any)=>{
 this.toastr.error(err.error.message)

  })
})
}

// valueQuantity:number = 1 
// ======================================
Increment(itemCart:ICartItem):void{
    const newQuantity = itemCart.quantity + 1;

this._Cartservices.updateCartQuantity(itemCart,newQuantity).subscribe({
  next:((res:any)=>{
this.getCart()
this.toastr.success(res.message)
  } ),

  error:((err:any)=>{
    this.toastr.error(err.error.message)
  })
})
}

GetProfile():void{
  this._ProfileService.getProfile().subscribe({
    next:((res:profile)=>{
      this.profile.set({
            id: res.id,
  name:res.name,
  full_name:res.full_name,
  phone:res.phone,
  email:res.email,
  email_verified_at:res.email_verified_at ,
  created_at: res.created_at, 
  updated_at: res.updated_at,
  birthday:res.birthday,
  address: res.address,
      })
    })
  })
}

switchOnProfile():void{
  this.switchProfile = !this.switchProfile
  this.switchNavbar = false
  this.switchOffsearch = false
  this.switchNotification = false

    this.searchValue = ''
 
this.showScroll()

}









decrement(itemCart:ICartItem):void{

    const newQuantity = itemCart.quantity - 1;
    console.log(newQuantity)

this._Cartservices.updateCartQuantity(itemCart,newQuantity).subscribe({
  next:((res:any)=> this.getCart())
})
  
}

// =============================================
DeleteItem(itemCart:ICartItem):void{
  this._Cartservices.DeleteItem(itemCart).subscribe({
    next:((res:any)=> {
      this.getCart()
      this.toastr.success(res.message);
    
    }),
    error:((err)=>(this.toastr.error(err.error.message)))
  })
}

}
