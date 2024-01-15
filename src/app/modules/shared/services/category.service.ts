import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080";


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
    const api_url ="/api/v1/categories";
    const endpoint = base_url+api_url;
    return this.http.get(endpoint);
  }
}
