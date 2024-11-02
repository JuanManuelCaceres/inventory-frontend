import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
  openCategoryDialog() {
    throw new Error('Method not implemented.');
  }
  buscar(arg0: string) {
    throw new Error('Method not implemented.');
  }

  displayedColumns: string[]=['id','name','description','accounts','costPrice','sellPrice','picture','actions'];
  dataSource : MatTableDataSource<ProductElement> = new MatTableDataSource<ProductElement>();
}

export interface ProductElement{
  id: number;
  name: string;
  description: string;
  accounts: number;
  costPrice: number;
  sellPrice: number;
  picture: any;
}