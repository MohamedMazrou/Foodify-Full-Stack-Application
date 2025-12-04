import { Component, signal } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { ShowDetailsDishesService } from '../../shared/show-details-dishes.service';
import { ActivatedRoute } from '@angular/router';
import { Irecommended } from '../../core/interfaces/Interfaces';
import { ToastrService } from 'ngx-toastr';
import { SharedModuleModule } from '../../shared/shared-module.module';

@Component({
  selector: 'app-details-dishes',
  standalone: true,
  imports: [NavbarComponent,SharedModuleModule],
  templateUrl: './details-dishes.component.html',
  styleUrl: './details-dishes.component.css'
})
export class DetailsDishesComponent {
constructor(private _ShowDetailsDishesService:ShowDetailsDishesService,private _activatedRoute: ActivatedRoute,private toastr: ToastrService ){}
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
      }) 
      console.log(this.dish())
    }),
        error:((err:any)=>{
        this.toastr.error(err.error.message)

    })
  })
}
}
