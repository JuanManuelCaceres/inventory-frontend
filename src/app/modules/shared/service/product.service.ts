import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080/api/v1";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  /**
   * get products
   * @returns all the products in DB
   */
  getProducts(){
    const endpoint =`${base_url}/products`;
    return this.http.get(endpoint);
  }

  deleteProduct(id:number){
    const endpoint = `${base_url}/products/${id}`
  }
}
