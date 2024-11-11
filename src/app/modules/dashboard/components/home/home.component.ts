import { Component, inject, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ProductElement } from 'src/app/modules/product/product/product.component';
import { ProductService } from 'src/app/modules/shared/service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  chartBar:any;
  private productService=inject(ProductService)
  
  ngOnInit(): void {
    
  }
  
  getProducts(){
    this.productService.getProducts()
      .subscribe({
        next:(data)=>{
          console.log("product response: ",data)
          this.proccesProductResponse(data);
        },
        error:(error)=>{
          console.log("error: ",error)
        }
      })
  }
  proccesProductResponse(resp: any) {
    const nameProduct: String[]=[];
    const account: number[]=[];

    if(resp.metadata[0].code == "00"){
      let listProduct = resp.productResponse.products;

      listProduct.forEach((product:ProductElement)=>{
        nameProduct.push(product.name);
        account.push(product.accounts);  
      });

      // chart js
      this.chartBar = new Chart('canvas-bar',{
        type: 'bar',
        data:{
          labels: nameProduct,
          datasets:[
            {label: 'Productos', data :account}
          ]
        }
      })
    }
  }
}
