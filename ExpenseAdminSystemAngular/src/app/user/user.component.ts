import { Component, Input, OnInit } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  // user: User = {
  //   id: 1,
  //   userName: 'Admin',
  //   eMail: 'admin@mail.com',
  //   password: 'HardPassword',
  //   createdAt: new Date(),
  // };
  @Input() user?: User; 
}










// ----------------------------------------------------------------------------








// import { Component, OnInit } from '@angular/core';
// import { User } from '../model/user';
// import { UserService } from '../services/user.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-user',
//   standalone: true,
//   imports: [],
//   templateUrl: './user.component.html',
//   styleUrls: ['./user.component.css']
// })
// export class UserComponent implements OnInit {
//   user?: User;

//   constructor(private userService: UserService, private router: Router) {}

//   ngOnInit(): void {
//     const userIdString = localStorage.getItem('userId');

//     if (userIdString) {
//       const userId = Number(userIdString);
//       this.userService.getUser(userId).subscribe({
//         next: (data) => {
//           this.user = data;
//         },
//         error: (err) => {
//           console.error('Failed to fetch user:', err);
//         }
//       });
//     } else {
//       console.warn('No user ID found in localStorage');
//     }
//   }
// }
