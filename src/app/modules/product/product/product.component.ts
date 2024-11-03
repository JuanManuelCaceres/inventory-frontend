import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../shared/service/product.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  
  private productService = inject(ProductService);
  
  ngOnInit(): void {
    this.getProducts();
  }
  
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
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
    const dataProduct: ProductElement[]=[];

    if(resp.metadata[0].code == "00"){
      let listProduct = resp.productResponse.products;

      listProduct.forEach((product:ProductElement)=>{
        product.category = product.category.name;
        product.picture = 'data:image/jpeg;base64,'+product.picture;
        dataProduct.push(product);
      });

      this.dataSource = new MatTableDataSource<ProductElement>(dataProduct);
      this.dataSource.paginator = this.paginator;
    }
  }

  
 
  
  openProductDialog() {
    throw new Error('Method not implemented.');
  }
  buscar(arg0: string) {
    throw new Error('Method not implemented.');
  }

  editProduct(element : any){

  }

  deleteProduct(id:number){
    this.productService.deleteProduct(id);
  }


  displayedColumns: string[]=['id','name','category','accounts','costPrice','sellPrice','picture','actions'];
  dataSource : MatTableDataSource<ProductElement> = new MatTableDataSource<ProductElement>();
}

export interface ProductElement{
  id: number;
  name: string;
  category: any;
  accounts: number;
  costPrice: number;
  sellPrice: number;
  picture: string;

}