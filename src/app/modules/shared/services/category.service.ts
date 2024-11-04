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
    
    const endpoint = `${base_url}/categories`;
    return this.http.get(endpoint);
  }

  /**
   * save category 
   * @param body {description: string, id : number, name : string}
   */

  saveCategory(body:any){
    const endpoint = `${base_url}/categories`;

    return this.http.post(endpoint, body);
  }

  /**
   * delete category
   * @param id category id
   * @returns delete category by id
   */

  deleteCategory(id:any){
    const endpoint = `${base_url}/categories/${id}`;
    return this.http.delete(endpoint);

  }

  /**
   * 
   * @param body {description: string, id : number, name : string}
   * @param id category id
   * @returns update given category
   */
  updateCategory(body:any,id:any){
    const endpoint = `${base_url}/categories/${id}`;

    return this.http.put(endpoint,body);
  }

  
  getCategory(termino:string){
    const endpointId = `${base_url}/categories/${termino}`;

    const endpointName = `${base_url}/categories/filter/${termino}`;
    if(!isNaN(Number(termino))){
      return this.http.get(endpointId);  
    }
    return this.http.get(endpointName);
  }

  
}
