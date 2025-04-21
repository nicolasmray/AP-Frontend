import { Component } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { UserComponent } from '../user/user.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    if(this.userService.authHeader == null) {
      this.router.navigate(["login"]);
    }

    this.userService.getUsers().subscribe(listOfUsers=>{
      this.users = listOfUsers
    })
    //throw new Error('Method not implemented.');
  }
}
