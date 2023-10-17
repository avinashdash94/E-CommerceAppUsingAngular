import { Component, OnInit } from '@angular/core';
import { SignUp, cart, login, product } from '../data-type';
import { UserService } from '../services/user.service';
import { element } from 'protractor';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  showLogin: boolean = true;
  authError:string = "";
  constructor(private user:UserService, private product:ProductService) { }

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signUp(data: SignUp){    
    this.user.userSignUp(data);
  }

  login(data: login){
    this.user.userLogin(data);
    this.user.invalidUerAuth.subscribe((result)=>{
      if(result){
        this.authError = "Please enter valid user derails."
      }{
        this.localCartToRemoteCart();
      }
    })
  }

  openSignUp(){
    this.showLogin = false;
  }

  openLogin(){
    this.showLogin = true;
  }

  //note: it is used to move data from localstore to DB
  localCartToRemoteCart(){
    let localStoreData = localStorage.getItem('localCart');
    if(localStoreData){
      let cartDataList: product[] = JSON.parse(localStoreData);
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      cartDataList.forEach((product: product, index) =>{
        let cartData: cart = {
          ...product,
        userId,
        productId: product.id
        }

        delete cartData.id;
        // this.product.addToCart(cartData).subscribe((result)=>{
        //   if(result){
        //     console.log("added records")
        //   }
        // })

        //Note : Need setTimeout as operation is to fast and Json Data server might not responde in that speed
        setTimeout(()=>{
            this.product.addToCart(cartData).subscribe((result)=>{
              if(result){
                console.log("added records");
              }
            });
            if(cartDataList.length === index + 1){
              // once all the items are move to localstorage to Db delete the local storage
              localStorage.removeItem('localCart');
            }
        }, 500)
      });

    }
  }

}
