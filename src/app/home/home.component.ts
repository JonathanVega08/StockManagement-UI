import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../models/product-model';
import { ProductService } from '../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteStockComponent } from '../dialogs/delete-stock/delete-stock.component';
import { MatTableDataSource } from '@angular/material/table';

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

  dataSource = new MatTableDataSource<ProductModel>();

  displayedColumns: string[] = 
  ['name',
  'description',
  'ageRestriction',
  'company',
  'price',
  'actions'];

  getProducts(): void{
    this.productService.getProducts().subscribe(
      data => this.dataSource.data = data,
      error => console.log(error)
    );
  }

  openDeleteDialog(item: ProductModel, index: number): void{
    const dialogRef = this.dialog.open(DeleteStockComponent,{
      width: '250px',
      data: item.name
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.deleteProduct(item.productId, index);
      }
    });
  }

  private deleteProduct(productId: number, index: number): void{
    this.productService.deleteProduct(productId).subscribe(
      () => {
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      },
      () => {
        console.log('error');
      }
    );
  }
}
