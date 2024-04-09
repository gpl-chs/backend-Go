import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  template: `<div class="confirmation-dialog">
  <h1>Confirmation</h1>
  <p>Are you sure ?</p>
  <button mat-button (click)="onConfirm()">Confirm</button>
  <button mat-button (click)="onCancel()">Cancel</button>
</div>`,
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) { }
  onConfirm() {
    this.dialogRef.close(true);
  }
  onCancel() {
    this.dialogRef.close(false);
  }

}
