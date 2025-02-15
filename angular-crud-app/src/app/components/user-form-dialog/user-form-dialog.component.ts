import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-form-dialog',
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatDialogModule],
  templateUrl: './user-form-dialog.component.html',
  styleUrl: './user-form-dialog.component.scss'
})
export class UserFormDialogComponent {
  user = { id: 0, name: '', email: '' };

  constructor(
    public dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.user = { ...data };
    }
  }

  saveUser(): void {
    this.dialogRef.close(this.user);
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
