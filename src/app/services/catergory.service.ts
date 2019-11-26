import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatergoryService {

  constructor(private http: HttpClient) { }


  getCatergory(){
    return this.http.get('http://localhost:3000/catergory/display');
  }

  addCatergory(catergory){
    return this.http.post('http://localhost:3000/catergory/addCatergory',catergory).pipe(map((res:any)=>res));
  }

  deleteCatergory(catergory){
    return this.http.delete('http://localhost:3000/catergory/delete/'+ catergory);
   }

   updateCatergory(catergory,id: string){
    return this.http.put('http://localhost:3000/catergory/updateCatergory/' + id, catergory).pipe(map((res:any)=>res));
   }
}
