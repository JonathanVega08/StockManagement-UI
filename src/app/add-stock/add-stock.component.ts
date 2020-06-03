import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.sass']
})
export class AddStockComponent implements OnInit {

  constructor(private productService: ProductService,
    private router: Router) { }

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
      this.router.navigate(['/home']);
    },
    () => {

    })
  }
}
