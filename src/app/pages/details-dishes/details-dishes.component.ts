import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { ShowDetailsDishesService } from '../../shared/show-details-dishes.service';
import { ActivatedRoute } from '@angular/router';
import { ICartResponse, Irecommended } from '../../core/interfaces/Interfaces';
import { ToastrService } from 'ngx-toastr';
import { SharedModuleModule } from '../../shared/shared-module.module';
import { CartService } from '../../components/navbar/cart.service';
import { FavService } from '../fav/fav.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-details-dishes',
  standalone: true,
  imports: [NavbarComponent,SharedModuleModule],
  templateUrl: './details-dishes.component.html',
  styleUrl: './details-dishes.component.css'
})
export class DetailsDishesComponent {
constructor(private _favSrevices:FavService,private _ShowDetailsDishesService:ShowDetailsDishesService,private _activatedRoute: ActivatedRoute,private toastr: ToastrService ,private _Cartservices:CartService){}
 id!: string;
 dish = signal<Irecommended>({
    id: 0,
  name: '',
  description: '',
  price: '',
  kcal: 0,
  protein: '',
  reviews: 0,
  rating: 0,
  image: '',
  category: '',
 })
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
    this._activatedRoute.paramMap.subscribe((pro: any) => {
      this.id = pro.get("id")
      this.getDish()
    }
     
)
}

getDish():void{
  this._ShowDetailsDishesService.getDishes(this.id).subscribe({
    next:((res:any)=>{
      this.dish.set({
     id:res.data.id,
  name: res.data.name,
  description: res.data.description,
  price: res.data.price,
  kcal:res.data.kcal,
  protein: res.data.protein,
  reviews:res.data.reviews,
  rating:res.data.rating,
  image: res.data.image,
  category: res.data.category,
  switchOnFav:res.data.switchOnFav
      }) 
      this.onloadCheckFav(this.dish())
    }),
        error:((err:any)=>{
        this.toastr.error(err.error.message)

    })
  })
}



addTocart(Item:Irecommended):void{
  this._Cartservices.addToCart(Item).subscribe({
      next:((res:any)=> {
        this._Cartservices.getCart().subscribe({
          next:((res:ICartResponse)=>{
          this._Cartservices.setDataCart(res.data,res.summary)
          })
        })
        
        this.toastr.success(res.message);
      
      }),
    error:((err:any)=>(this.toastr.error(err.error.message)))
  })
}
platformId = inject(PLATFORM_ID)
 fav :number[] = []

addFav(itemRecomanded:Irecommended):void{
  this._favSrevices.addFav(itemRecomanded).subscribe({
    next:((res:any)=> {
      
      this.toastr.success(res.message);
      
      this.saveInlocal(itemRecomanded,res.message)
     

    
    
    }),
        error:((err:any)=>(this.toastr.error(err.error.message)))
  })
}




saveInlocal(itemRecomanded:Irecommended ,message:string):void{
     if(isPlatformBrowser(this.platformId)){
   if( message === 'Added to favorites'){
     this.fav.push(itemRecomanded.id)
      localStorage.setItem('fav',JSON.stringify(this.fav))
   if(itemRecomanded.id == this.dish().id){
   this.dish.set({
    id:itemRecomanded.id,
  name: itemRecomanded.name,
  description: itemRecomanded.description,
  price: itemRecomanded.price,
  kcal:itemRecomanded.kcal,
  protein: itemRecomanded.protein,
  reviews:itemRecomanded.reviews,
  rating:itemRecomanded.rating,
  image: itemRecomanded.image,
  category: itemRecomanded.category,
  switchOnFav:itemRecomanded.switchOnFav = true
    }
    )

   }
 
  

   }
   else if(message === 'Removed from favorites'){
   if(itemRecomanded.id == this.dish().id){
   this.dish.set({
    id:itemRecomanded.id,
  name: itemRecomanded.name,
  description: itemRecomanded.description,
  price: itemRecomanded.price,
  kcal:itemRecomanded.kcal,
  protein: itemRecomanded.protein,
  reviews:itemRecomanded.reviews,
  rating:itemRecomanded.rating,
  image: itemRecomanded.image,
  category: itemRecomanded.category,
  switchOnFav:itemRecomanded.switchOnFav = false
    }
    )

   }

   this.fav = this.fav.filter((id:number) => id !== itemRecomanded.id  )
      localStorage.setItem('fav',JSON.stringify(this.fav))
   }
}
}



onloadCheckFav(Recommended:Irecommended):void{
  if(isPlatformBrowser(this.platformId)){
  if(JSON.parse(localStorage.getItem('fav') || '[]') != null){
    this.fav = JSON.parse(localStorage.getItem('fav') || '[]')
  }
    if( this.fav.some((id:number) => id === Recommended.id)){
  return   this.dish.set({
         id:Recommended.id,
  name: Recommended.name,
  description: Recommended.description,
  price: Recommended.price,
  kcal:Recommended.kcal,
  protein: Recommended.protein,
  reviews:Recommended.reviews,
  rating:Recommended.rating,
  image: Recommended.image,
  category: Recommended.category,
  switchOnFav:Recommended.switchOnFav = true
     })
   
  }
}
}

}
