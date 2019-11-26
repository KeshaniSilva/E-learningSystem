import { Injectable, EventEmitter } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {map} from 'rxjs/operators';
import {HttpClient,HttpClientModule,HttpHeaders, HttpErrorResponse} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

sCourse =new EventEmitter<any>();

  constructor(private http:HttpClient) { }

getCourses(){
 // const course=this.http.get("http://localhost:3000/course/display");
  const course=this.http.get("http://localhost:3000/catergory/display");

  console.log(course);
  console.log("MMMMMMMMMMMMMMM")
  return course;

}
getFullCourse(){
 return this.http.get('http://localhost:3000/course/display');

}
getCourseVideos(catergory){
  const course=this.http.get("http://localhost:3000/subCatergory/display/"+catergory);
 // const course=this.http.get("http://localhost:3000/subCatergory/display"+catergory);

   console.log(course);
   console.log("MMMMMMMMMMMMMMM")
   return course;
}

getCourseVideossub(catergory,subCatergory){
  const course=this.http.get("http://localhost:3000/subCatergory/display/"+catergory+"/"+subCatergory);

   return course;
}

courseVideoUpdate = new EventEmitter<string>( );
courseDetail = new EventEmitter<string>();

//display a full course
displaycourse(id: string){
  return this.http.get("http://localhost:3000/course/display/"+id);
}
//user register for a course


registerUserToCourse(course, id: string){
  const httpOption ={
    headers: new HttpHeaders({
      'Content-type':'application/json',
      'Authorization' : localStorage.getItem('id_token')
  })
  };
  //let headers = new HttpHeaders();


   //headers.append('Authorization',localStorage.getItem('id_token'));
  return this.http.post('http://localhost:3000/course/registerCourse/' + id, course,httpOption).pipe(map((res: any) => res));


}

getNullPermissionCourse(){
  return this.http.get('http://localhost:3000/course/display/permissionNullCourse');
}

givePermission(permission, id: string){
  return this.http.put('http://localhost:3000/course/givePermissionOrNot/' + id, permission).pipe(map((res: any) => res));
}


// giveRate(id: string, rate){
//   return this.http.put('http://localhost:3000/course/rating/' + id, rate).pipe(map((res: any) => res));
// }
getTopRate(){

  return this.http.get('http://localhost:3000/course/highRated' );

}
 rating = new EventEmitter<string>();


 Addcourse(course){

  return this.http.post('http://localhost:3000/course/put', course).pipe(map((res:any)=>res));

  }
 courseImgUpload(selectedFile:File, id: string){
  const fd = new FormData();
  fd.append('image', selectedFile, selectedFile.name);
  return this.http.post('http://localhost:3000/course/uploadCourseImage/'+ id, fd).pipe(map((res:any)=>res));
 }

 getSubcourses(catergory){

   return this.http.get('http://localhost:3000/subCatergory/display/' + catergory);

}
searchCourse(value){
  return this.http.get('http://localhost:3000/course/search/' + value);
}

rateCourse(rate){
  console.log(rate)
  return this.http.post('http://localhost:3000/course/rating' , rate).pipe(map((res:any)=>res));;
}
 updateCourse(course,id:string){
  return this.http.put('http://localhost:3000/course/update/'+ id , course).pipe(map((res:any)=>res));;
 }

 removeCourse(id){
  const httpOption ={
    headers: new HttpHeaders({
      'Content-type':'application/json',
      'Authorization' : localStorage.getItem('id_token')
  })
  };
  return this.http.delete('http://localhost:3000/course/delete/' + id, httpOption ).pipe(map((res:any)=>res));;
 }
// course image
// uploadCourseImg(selectedFile: File){
//   const fd = new FormData();
//   fd.append('image', selectedFile, selectedFile.name);
//   this.http.post('http://localhost:3000/course/put/',fd)
//     .subscribe(res => {
//       console.log(res);
//     });
// }


   courseUpdate = new EventEmitter<string>( )


}


