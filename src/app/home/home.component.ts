import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../models/product-model';
import { ProductService } from '../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteStockComponent } from '../dialogs/delete-stock/delete-stock.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private productService: ProductService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

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

  itemsInStock: boolean = false;

  getProducts(): void{
    this.productService.getProducts().subscribe(
      data => {
        this.dataSource.data = data;
        if(data && data.length > 0)
          this.itemsInStock = true;
      },
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

        if(this.dataSource.data.length === 0){
          this.itemsInStock = false;
        }

        this.dataSource._updateChangeSubscription();
        this.openSnackBar('Product deleted successfully');
      },
      () => {
        this.openSnackBar('An error ocurred in the server');
      }
    );
  }

  openSnackBar(message: string): void{
    this.snackBar.open(message, 'OK', {
      duration: 3000,
    });
  }
}
