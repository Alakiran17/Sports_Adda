import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductviewService {
  productURL:string="http://localhost:8080/foodbasket/product"


  constructor(private httpClient:HttpClient) { }

  getAllProducts(): Observable<Product[]>
  {
    return this.httpClient.get<getProducts>(this.productURL).
    pipe(map(response=>response._embedded.products))
  }

  getProductById(product_id:number):Observable<Product>
  {
     const productURL=this.productURL+"/"+product_id;
    return this.httpClient.get<Product>(productURL);
  }

}
interface getProducts{
  _embedded:{
    products:Product[]
  }
}
