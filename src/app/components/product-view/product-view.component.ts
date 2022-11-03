import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductviewService } from 'src/app/Service/productview.service';
import { NavigationExtras } from '@angular/router';
import { CartService } from 'src/app/Service/cart.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  product:Product=new Product(0," "," ",0," "," "," ",0,0);
  products: Array<object> = [];
  product_id: number;
  constructor( private http:CartService,private service:ProductviewService,private route:Router,private activateroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activateroute.paramMap.subscribe(()=>{this.getProductById()});
    let product_id = this.activateroute.snapshot.params['id'];
  }

  getProductById() 
  {
    const product_id =+this.activateroute.snapshot.paramMap.get("id");
    if(product_id>0)
    {
      this.service.getProductById(product_id).subscribe(data => {this.product=data});
    }
  }


  addItemToCart(product_id:number){
    this.route.navigateByUrl("/cart/"+ product_id);
  }
   

}
