import { Pipe, PipeTransform } from '@angular/core';
import { Irecommended } from '../interfaces/Interfaces';

@Pipe({
  name: 'searchByRecommend',
  standalone: true
})
export class SearchByRecommendPipe implements PipeTransform {

  transform( arrRecommended: Irecommended[],searchValue:string){
    return arrRecommended.filter((res:Irecommended)=> res.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
  }

}
