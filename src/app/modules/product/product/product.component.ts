import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../shared/service/product.service';
import { NewProductComponent } from '../new-product/new-product.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  
  private productService = inject(ProductService);
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  
  
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
        //product.category = product.category.name;
        product.picture = 'data:image/jpeg;base64,'+product.picture;
        dataProduct.push(product);
      });

      this.dataSource = new MatTableDataSource<ProductElement>(dataProduct);
      this.dataSource.paginator = this.paginator;
    }
  }

  
  openProductDialog() {
    const dialogRef = this.dialog.open( NewProductComponent , {
      width: '450px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==1){
        this.openSnackBar("Producto agregado","Exitosa");
        this.getProducts();
      } else if (result==2){
        this.openSnackBar("Se produjo un error al guardar producto","Error");
      }
    });
  }


  openSnackBar(message:string,action:string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message,action,{
      duration: 20
    })
  }
  
  buscar(termino: string) {
    if(termino.length === 0){
      return this.getProducts();
    } 
    
    this.productService.getProduct(termino)
      .subscribe((resp:any)=>{
        this.proccesProductResponse(resp);
    })
    
  }
  

  editProduct(id:number,name:string,category:any,account:number,costPrice:number,sellPrice:number,picture:File){
    const dialogRef = this.dialog.open( NewProductComponent , {
      width: '450px',
      data: {id:id,name:name,category:category,account:account,costPrice:costPrice,sellPrice:sellPrice,picture:picture}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==1){
        this.openSnackBar("Producto actualizado","Exitosa");
        this.getProducts();
      } else if (result==2){
        this.openSnackBar("Se produjo un error al actualizar producto","Error");
      }
    });
  }

  deleteProduct(id:any){
    const dialogRef = this.dialog.open(ConfirmComponent,{
      width: '450px',
      data: {id:id, module:"product"}
    });

    dialogRef.afterClosed().subscribe((result:any)=>{
      if( result == 1) {
        this.openSnackBar("Producto eliminado", "Exitosa");
        this.getProducts();
      } else if (result== 2){
        this.openSnackBar("Se producjo un error al eliminar producto","Error");
      }
    })
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