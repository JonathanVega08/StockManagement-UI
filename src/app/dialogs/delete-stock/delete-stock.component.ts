import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-stock',
  templateUrl: './delete-stock.component.html',
})
export class DeleteStockComponent {

  constructor(public dialogRef: MatDialogRef<DeleteStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
  }
}