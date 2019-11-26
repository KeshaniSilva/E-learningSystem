import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root'
})
export class SubcatergoryService {

  constructor(private http:HttpClient) { }

  getSubcatergory(){
    return this.http.get('http://localhost:3000/subCatergory/display');

  }

  addSubcatergory(subCatergory){
    return this.http.post('http://localhost:3000/subCatergory/addSubCatergory',subCatergory).pipe(map((res:any)=>res));
  }


 deleteSubcatergory(subCatergory){
  return this.http.delete('http://localhost:3000/subCatergory/delete/'+subCatergory);
 }

// navBar = new EventEmitter<string>( );
}
