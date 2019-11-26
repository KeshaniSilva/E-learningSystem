import { Injectable, EventEmitter } from '@angular/core';
import {map} from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  authToken: any;
  user: {};
  constructor(private http: HttpClient, private jwtHelper:JwtHelperService) { }

  //register user
  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register',user,{headers:headers}).pipe(map((res:any)=>res));
  }
// regiser admin
 registerAdmin(user) {
  // let headers = new HttpHeaders();
  // headers.append('Content-Type', 'application/json');
  const httpOption ={
    headers: new HttpHeaders({
      'Content-type':'application/json',
      'Authorization' : localStorage.getItem('id_token')
  })
}
  return this.http.post('http://localhost:3000/users/registerAdmin',user,httpOption).pipe(map((res:any)=>res));
}

  //login user
  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate',user,{headers:headers}).pipe(map((res:any)=>res));
  }
  authenticateAdmin(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/adminUserAuthenticate',user,{headers:headers}).pipe(map((res:any)=>res));
  }


  // users loggedIn
  loggedIn() {
    return !this.jwtHelper.isTokenExpired();
  }
 // user logout
  logout(){
    this.authToken=null;
    this.user=null;
    localStorage.clear();
    console.log(localStorage.getItem('id_token'));
  }



  storeUserData(token,user){

    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken=token;
    this.user=user;
    // console.log(user);

  }
  loadToken(){
    const token=localStorage.getItem('user');
    return JSON.parse(token)
   // this.authToken=token;
  }
  loadUserToken(){
    const token = localStorage.getItem('id_token');
    return JSON.parse(token);
  }


  //image upload
  // uploadImage(selectedFile: File,id: string){
  //   console.log('hi')
  //   const fd = new FormData();
  //   fd.append('image', selectedFile, selectedFile.name);
  //   this.http.post<any>('http://localhost:3000/users/uploadUserImage/'+id,fd).pipe(map((res:any)=>res));



  // }

  uploadImage(selectedFile:File, id: string){
    const fd = new FormData();
    fd.append('image', selectedFile, selectedFile.name);
    return this.http.post('http://localhost:3000/users/uploadUserImage/'+ id, fd).pipe(map((res:any)=>res));
   }

  uploadImg = new EventEmitter<string>( );


  //get user details
  getUser(id: string){
    return this.http.get('http://localhost:3000/users/particularUser/'+id);
  }

  updataAccount(user,id: string){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/users/update/'+id,user,{headers:headers}).pipe(map((res:any)=>res));

  }

  deleteAccount(id: string,password){
      return this.http.delete('http://localhost:3000/users/remove/'+id+'/'+password).pipe(map((res:any)=>res));;
  }

  changePassword(restpassword, id: string){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/users/editUserProfile/' + id, restpassword,{headers:headers}).pipe(map((res:any)=>res));
  }

  forgetPassword(email: string){
    return this.http.get('http://localhost:3000/users/newPassword/' + email);
  }
  getRegisteredCourse(id: string){
    return this.http.get('http://localhost:3000/users/' + id);
  }

  getAllUser(){
    return this.http.get('http://localhost:3000/users/allUserDetails');
  }

  getContentProvider(){
    return this.http.get('http://localhost:3000/users/contentProviders')
  }

  //delete content provider and student and admins
  deleteCP(id: string){

    const httpOption ={
      headers: new HttpHeaders({
        'Content-type':'application/json',
        'Authorization' : localStorage.getItem('id_token')
    })
    };
    return this.http.delete('http://localhost:3000/users/delete/' + id, httpOption).pipe(map((res: any) => res));
  }

  getAllStudent(){
    return this.http.get('http://localhost:3000/users/student');
  }

  getAllAdmin(){
    return this.http.get('http://localhost:3000/users/admins');
  }
  getAllSuperAdmin(){
    return this.http.get('http://localhost:3000/users/superAdmins');
  }

  // get conten providers courses
  getCPPendingCourse(id){
    console.log(id);
    return this.http.get('http://localhost:3000/course/contentProvider/permissionNullCourse/'+ id);
  }
  getCPRejectCourse(id){
    return this.http.get('http://localhost:3000/course/contentProvider/permissionFalseCourse/'+ id);
  }
  getCPApprovedCourse(id){
    return this.http.get('http://localhost:3000/course/contentProvider/permissionTrueCourse/'+ id);
  }
}
