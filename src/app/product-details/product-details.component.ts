import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product;
  quantity:number =1;
  productQuantity: number =1
  removeCart = false;
  constructor(private activeRoute: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
      this.activeRoute.params.subscribe(parameter => {
      let productId = parameter.productId;
      productId && this.getProductData(productId);

    });
  }

  getProductData(productId: string){
      this.product.getProduct(productId).subscribe((result) =>{
      this.productData = result;
      let cartData = localStorage.getItem('localCart');
      if(productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:product)=> productId == item.id.toString());
        if(items.length){
          this.removeCart = true;
        }else{
          this.removeCart = false;
        }
      }

    });
  } 

  handleQuantity(val: string){
    if(this.productQuantity < 20 && val == 'plus'){
      this.productQuantity += 1;
    }
    else if(this.productQuantity > 1 && val == 'min'){
      this.productQuantity -= 1;
    }
  }

  addToCart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity
      //Note: If user is not loged in than add the cart data into localstore else store into DP for us it is json server
      if(!localStorage.getItem('user')){     
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      }
      else{
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
       let cartData: cart = {
        ...this.productData,
        userId,
        productId: this.productData.id
       }
       delete cartData.id;
       this.product.addToCart(cartData).subscribe((result)=>{
        // console.log(result)
        if(result){
          alert("Product is added in the cart");
        }
       });
      }
    }
  }

  removeToCart(productId: number){
    this.product.removeItemFromCart(productId);
    this.removeCart = false;
  }
}
