import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  
  private categorySerivice = inject(CategoryService);
  
  constructor(private categoryService: CategoryService){};

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
}

export interface CategoryElement{
  description: string;
  id: number;
  name: string;
}