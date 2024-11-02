import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { MatPaginator } from '@angular/material/paginator';

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
    this.getCategories();
  }
  
  displayedColumns: string[]=['id','name','description','actions'];
  dataSource : MatTableDataSource<CategoryElement> = new MatTableDataSource<CategoryElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getCategories(): void {
    this.categorySerivice.getCategories()
      .subscribe({
        next: (data:any)=>{
          console.log("respuesta categories: ",data);
          this.proccesCategoriesRespones(data)   
        },
        error: (error:any) =>{
          console.log("error: ",error);
        },
        complete: () =>{

        }
      })    
  }

  proccesCategoriesRespones(resp:any){
    const dataCategory: CategoryElement[]=[];

    if(resp.metadata[0].code == "00"){
      let listCategory = resp.categoryResponse.categories;

      listCategory.forEach((category:CategoryElement) => {
          dataCategory.push(category);
      });

      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
      this.dataSource.paginator = this.paginator;
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

  edit(id:number, name: string, description: string){
    const dialogRef = this.dialog.open( NewCategoryComponent , {
      width: '450px',
      data: {id:id,name:name,description:description}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==1){
        this.openSnackBar("Categoría Actualizada","Exitosa");
        this.getCategories();
      } else if (result==2){
        this.openSnackBar("Se produjo un error al actualizar categoría","Error");
      }
    });
  }
  
  deleteCategory(id:any){
  
    const dialogRef = this.dialog.open( ConfirmComponent, {
      
      data: {id:id}
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if(result==1){
        this.openSnackBar("Categoría Eliminada","Exitosa");
        this.getCategories();
      } else if (result==2){
        this.openSnackBar("Se produjo un error al eliminar categoría","Error");
      }
    });
  
  }

  buscar(termino:string){
    if(termino.length === 0){
      return this.getCategories();
    } 
    
    this.categorySerivice.getCategoryById(termino)
      .subscribe((resp:any)=>{
        this.proccesCategoriesRespones(resp);
      })
  }
}

export interface CategoryElement{
  description: string;
  id: number;
  name: string;
}