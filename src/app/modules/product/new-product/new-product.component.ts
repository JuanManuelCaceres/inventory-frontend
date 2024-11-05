import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/modules/shared/service/product.service';
import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})

export class NewProductComponent implements OnInit{
onFileChanged($event: Event) {
throw new Error('Method not implemented.');
}
  
  public productForm!: FormGroup;
  formState:string ="";
  private fb = inject(FormBuilder);
  private service = inject(ProductService);
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);
  private categoryService = inject(CategoryService);
  public categories: Category[] = [];
  public cargandoCategorias:boolean=true;
  
  selectedFile: File | null = null;
  selectedFileName: string = '';
  imageUrl: string | null = null;

  ngOnInit(): void {
    this.formState="Agregar"
    
    //Generates the form fields
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      account: ['', Validators.required],
      costPrice: ['', Validators.required],
      sellPrice: ['', Validators.required],
      picture: ['', Validators.required],
    });

    // load the categories into the form
    this.categoryService.getCategories()
    .subscribe({
      next:(data:any)=>{
        this.proccesCategoriesRespones(data);
        console.log("categorias cargadas: ",data);
        this.cargandoCategorias = false;
      },
      error:(error:any)=>{
        console.log("Error: ",error);
      }
    });

    // this code lines below are used to update an existent product
    if(this.data != null){
      this.updateForm(this.data);
      this.formState="Actualizar";
    }
  }

  // method to load data into update product form
  updateForm(data:any){
    this.productForm = this.fb.group({
      name: [data.name, Validators.required],
      category: [data.category.id, Validators.required],
      account: [data.account, Validators.required],
      costPrice: [data.costPrice, Validators.required],
      sellPrice: [data.sellPrice, Validators.required],
      picture: [data.picture, Validators.required],
    });
  }
  
  onCancel(){
    this.dialogRef.close(0);
  }

  onSave(){
    let data = {
      name: this.productForm.get('name')?.value,
      category: this.productForm.get('category')?.value.toString(),
      account: this.productForm.get('account')?.value.toString(),
      costPrice: this.productForm.get('costPrice')?.value.toString(),
      sellPrice: this.productForm.get('sellPrice')?.value.toString(),
      picture: this.productForm.get('picture')?.value,
    }
    
    const formData = new FormData();
    formData.append('picture',data.picture, data.picture.name);
    formData.append('name',data.name);
    formData.append('sellPrice',data.sellPrice);
    formData.append('costPrice',data.costPrice);
    formData.append('account',data.account);
    formData.append('categoryId',data.category);
    
     //update registery
    if(this.data!=null){
      this.service.updateProduct(formData, this.data.id)
      .subscribe({
        next:(data:any)=>{
        this.dialogRef.close(1);
        },
        error: (error:any)=>{
        this.dialogRef.close(2);
        }
    })
      
    //create new registery
    } else {
      this.service.saveProduct(formData)
      .subscribe({
        next: (data:any) => {
          console.log(data);
          this.dialogRef.close(1);
        }, 
        error: (error:any)=>{
          this.dialogRef.close(2);
        }
      })
    }
    
  }
  
  proccesCategoriesRespones(resp:any){
    const dataCategory: Category[]=[];
    if(resp.metadata[0].code == "00"){
      let listCategory = resp.categoryResponse.categories;
      listCategory.forEach((category:Category) => {
          dataCategory.push(category);
      });
      this.categories=dataCategory;
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;

      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);

      // Si estás usando reactive forms, actualiza el valor
      this.productForm.patchValue({
        picture: file
      });
    }
  }
}
export interface Category {
  id:number;
  name:string;
  description:string
}