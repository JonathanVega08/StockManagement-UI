import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ProductModel } from '../models/product-model';

@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.sass']
})
export class EditStockComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,) { }

  productId: number;
  product: ProductModel;
  productForm: FormGroup;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.productId = parseInt(params.get('productId'));
    });

    this.getProduct();
  }
  getProduct(): void{
    this.productService.getProductById(this.productId)
    .subscribe(
      response => {
        this.product = response,
        this.setProduct();
      },
      error => {
        console.log(error)
      }
    )
  }

  setProduct(): void{
    this.productForm = new FormGroup({
      name: new FormControl(this.product.name,[
        Validators.required,
        Validators.maxLength(50),
      ]),
      description: new FormControl(this.product.description,[
        Validators.maxLength(100),
      ]),
      ageRestriction: new FormControl(this.product.ageRestriction,[
        Validators.pattern(/^[0-9]\d*$/),
        Validators.max(100),
      ]),
      company: new FormControl(this.product.company,[
        Validators.required,
        Validators.maxLength(50),
      ]),
      price: new FormControl(this.product.price,[
        Validators.required,
        Validators.min(1),
        Validators.max(1000)
      ]),
    })
  }

  get name() { return this.productForm.get('name'); }
  get description() { return this.productForm.get('description'); }
  get ageRestriction() { return this.productForm.get('ageRestriction'); }
  get company() { return this.productForm.get('company'); }
  get price() { return this.productForm.get('price'); }

  onSubmit(): void{
    this.productService.updateProduct(this.productId, this.productForm.value)
    .subscribe(() => {
      this.router.navigate(['/home']);
    },
    () => {

    })
  }
}
