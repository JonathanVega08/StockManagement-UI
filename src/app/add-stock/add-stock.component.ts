import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.sass']
})
export class AddStockComponent implements OnInit {

  constructor(private productService: ProductService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  productForm = new FormGroup({
    name: new FormControl('',[
      Validators.required,
      Validators.maxLength(50),
    ]),
    description: new FormControl('',[
      Validators.maxLength(100),
    ]),
    ageRestriction: new FormControl('',[
      Validators.pattern(/^[0-9]\d*$/),
      Validators.max(100),
    ]),
    company: new FormControl('',[
      Validators.required,
      Validators.maxLength(50),
    ]),
    price: new FormControl('',[
      Validators.required,
      Validators.min(1),
      Validators.max(1000)
    ]),
  })

  get name() { return this.productForm.get('name'); }
  get description() { return this.productForm.get('description'); }
  get ageRestriction() { return this.productForm.get('ageRestriction'); }
  get company() { return this.productForm.get('company'); }
  get price() { return this.productForm.get('price'); }

  ngOnInit(): void {
  }

  onSubmit(): void{
    this.productService.addProduct(this.productForm.value)
    .subscribe(() => {
      this.openSnackBar('Product added successfully');
      this.router.navigate(['/home']);
    },
    error => {
      this.handleErrorMessage(error.error);
    })
  }

  clearForm(): void{
    this.productForm.reset();
  }

  openSnackBar(message: string): void{
    this.snackBar.open(message, 'OK', {
      duration: 3000,
    });
  }

  handleErrorMessage(error: any): void{
    if (error.status === 400){
      this.openSnackBar('One or more fields are empty or incorrect');
      return;
    }
    this.openSnackBar('An error ocurred in the server');
  }
}
