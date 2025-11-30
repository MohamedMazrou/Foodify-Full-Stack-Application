import { Component, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { SharedModuleModule } from '../../shared/shared-module.module';
import { FormsModule } from '@angular/forms';
import { Irecommended } from '../../core/interfaces/Interfaces';
import { GetRecommendedService } from '../../pages/home/get-recommended.service';
import { SearchByRecommendPipe } from '../../core/pipe/search-by-recommend.pipe';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,SharedModuleModule,FormsModule,SearchByRecommendPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private _GetRecommendedService:GetRecommendedService){}
switchOffsearch :boolean = false
switchNotification :boolean = false
switchNavbar :boolean = false
searchValue:string = ''
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getRecommended()
}

swithOnSearch():void{
  this.switchOffsearch = !this.switchOffsearch
  this.switchNotification = false
  this.switchNavbar = false
    this.searchValue = ''


}

swithOnNotification():void{
  this.switchNotification = !this.switchNotification
  this.switchOffsearch = false
  this.switchNavbar = false
  this.searchValue = ''
}
switchOnNavbar():void{
  this.switchNavbar = !this.switchNavbar
  this.switchOffsearch = false
  this.switchNotification = false
    this.searchValue = ''


}


arrRecommend !: Irecommended[] 
getRecommended():void{
  this._GetRecommendedService.getRecommended().subscribe({
    next:(res:any)=>{
     this.arrRecommend = res.data
    }


  })
}

}
