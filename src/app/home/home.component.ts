import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../models/product-model';
import { ProductService } from '../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteStockComponent } from '../dialogs/delete-stock/delete-stock.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private productService: ProductService,
    public dialog: MatDialog) { }

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

  openDeleteDialog(item: ProductModel): void{
    const dialogRef = this.dialog.open(DeleteStockComponent,{
      width: '250px',
      data: { name: item.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      var result = result;
    });
  }
}
