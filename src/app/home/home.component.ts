import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  displayedColumns: string[] = 
  ['name',
  'description',
  'ageRestriction',
  'company',
  'price',
  'actions'];

  stockProducts: Array<ProductModel>;

  getProducts(): void{
    this.productService.getProducts().subscribe(
      data => this.stockProducts = data,
      error => console.log(error)
    );
  }
}
