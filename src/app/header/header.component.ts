import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartItems = 0;
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  searchResult: undefined | product[];
  constructor(private route: Router, private product:ProductService) { }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      //console.log(val.url);      
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          //console.log("in seller area");
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore);
            this.sellerName = sellerData.body[0].name;
          }
        }
         else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          if(userData?.name){
            this.userName = userData.name;
          }
          else{
            this.userName = userData.body.name;
          }
          
          this.menuType = 'user';

        }
        else {
          //console.log("outside seller")
          this.menuType = 'default';
        }
      }
    });

    let cartDaTa = localStorage.getItem('localCart');
    if(cartDaTa){
      this.cartItems = JSON.parse(cartDaTa).length;
    }
    this.product.cartData.subscribe((items)=>{
      this.cartItems = items.length;
    });
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((result)=>{
        if(result.length > 5)
          result.length = 5;  // It will limit to only 5 search result
        this.searchResult = result;
      })
    }
  }
  hideSearch(){
    this.searchResult = undefined;
  }

  submitSearch(val: string){
    // console.log(val)
    this.route.navigate([`search/${val}`])
  }
  
  redirectToDetails(id: number){
    this.route.navigate(['/details/'+id]);
  }
}
