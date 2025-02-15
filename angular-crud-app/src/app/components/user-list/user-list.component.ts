import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../models/user';
import { UserFormDialogComponent } from '../user-form-dialog/user-form-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, MatTableModule, MatIconModule, MatCardModule, MatButtonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data) => (this.users = data));
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => this.loadUsers());
  }

  openUserForm(user?: User): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '400px',
      data: user ? {...user} : {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if(user) {
          this.userService.updateUser(result).subscribe(() => this.loadUsers());
        } else {
          this.userService.addUser(result).subscribe(() => this.loadUsers());
        }
      }
    });
  }
}
