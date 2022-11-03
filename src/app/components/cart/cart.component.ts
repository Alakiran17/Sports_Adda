import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/common/cart';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/Service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  product:Product=new Product(0," "," ",0," "," "," ",0,0);
  //cart:Cart[];
  cart:Cart=new Cart(this.product.product_name,this.product.product_image,this.product.product_quantity,this.product.price);
  
  constructor(private http: CartService,private activateroute:ActivatedRoute,private route:Router) {}
  
  ngOnInit(): void {
    this.activateroute.paramMap.subscribe(()=>{this.getProductById()});

  }

  getProductById()
  {
    const product_id=+this.activateroute.snapshot.paramMap.get("id");
    if(product_id>0){
      this.http.getProductById(product_id).subscribe(data =>{this.product=data});
    }
  }

  saveToCart(){
   this.http.saveToCart(this.cart).subscribe(data=>{
     console.log(data)
     this.route.navigateByUrl("/");
   })
 }
 

}
