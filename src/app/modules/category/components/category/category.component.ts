import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  
  private categorySerivice = inject(CategoryService);
  public categoryService = inject(CategoryService);
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.getCategories()
  }
  
  displayedColumns: string[]=['id','name','description','actions'];
  dataSource : MatTableDataSource<CategoryElement> = new MatTableDataSource<CategoryElement>();
  
  getCategories(): void {
    this.categorySerivice.getCategories()
      .subscribe((data:any)=>{
        console.log("respuesta categories",data);
        this.proccesCategoriesRespones(data)
      }
      )    
  }

  proccesCategoriesRespones(resp:any){
    const dataCategory: CategoryElement[]=[];

    if(resp.metadata[0].code == "00"){
      let listCategory = resp.categoryResponse.categories;

      listCategory.forEach((element:CategoryElement) => {
        dataCategory.push(element);
      });

      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);

    }
  }

  openCategoryDialog(){
    const dialogRef = this.dialog.open( NewCategoryComponent , {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==1){
        this.openSnackBar("Categoría Agregada","Exitosa");
        this.getCategories();
      } else if (result==2){
        this.openSnackBar("Se produjo un error al guardar categoría","Error");
      }
    });
  }

  openSnackBar(message:string,action:string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message,action,{
      duration: 2000
    })
  }

 

}

export interface CategoryElement{
  description: string;
  id: number;
  name: string;
}