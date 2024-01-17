import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080/api/v1";


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns all categories
   */

  getCategories(){
    const api_url ="/categories";
    const endpoint = base_url+api_url;
    return this.http.get(endpoint);
  }

  /**
   * save category 
   * 
   */

  saveCategory(body:any){
    const endpoint = `${base_url}/categories`;

    return this.http.post(endpoint, body);
  }

  deleteCategory(id:number){
    const endpoint = `${base_url}/categories/${id.toString}`;
    return this.http.delete(endpoint);

  }


}
