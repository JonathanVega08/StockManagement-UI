import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteDialogData } from '../../models/delete-dialog-data'

@Component({
  selector: 'app-delete-stock',
  templateUrl: './delete-stock.component.html',
})
export class DeleteStockComponent {

  constructor(public dialogRef: MatDialogRef<DeleteStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData) { }

  ngOnInit(): void {
  }
}