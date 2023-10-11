import { EventEmitter, Injectable } from '@angular/core';
import { SignUp, login } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUerAuth= new EventEmitter<boolean>(false);
  constructor(private http:HttpClient, private router: Router) { }

  userSignUp(user: SignUp){
    this.http.post("http://localhost:3000/users", user, {observe: 'response'})
    .subscribe((result) =>{
      if(result)
      {
        localStorage.setItem('user', JSON.stringify(result));
        this.router.navigate(['/']);
      }
    });
  }

  userLogin(data: login){
    this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
    {observe: 'response'})
    .subscribe((result)=> {
      if(result && result.body?.length > 0){
        localStorage.setItem('user', JSON.stringify(result.body[0]));
        this.router.navigate(['/']);
        this.invalidUerAuth.emit(false);
      }
      else{
        this.invalidUerAuth.emit(true);
      }
    });
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  }
}
