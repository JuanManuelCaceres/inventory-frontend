import { Component, OnInit, inject } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit{
  
  private categoryService = inject(CategoryService);
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);
  private productService = inject(ProductService);
  ngOnInit(): void {
    
  }

  onNoClick(){
    this.dialogRef.close(3);
  }
  /**
   * delete category
   */
  delete(){
    if(this.data!=null){
      
      if(this.data.module == "category"){
        this.categoryService.deleteCategory(this.data.id)
          .subscribe({
            next: (data:any) =>{
            this.dialogRef.close(1);
            }, 
            error: (error:any)=>{
            this.dialogRef.close(2);
            }
          })
      } else {
        this.dialogRef.close(2);
      }

      if(this.data.module == "product"){
        this.productService.deleteProduct(this.data.id)
          .subscribe({
            next: (data:any) =>{
            this.dialogRef.close(1);
            }, 
            error: (error:any)=>{
            this.dialogRef.close(2);
            }
          })
      } else {
        this.dialogRef.close(2);
      }
    }  
  }
}

