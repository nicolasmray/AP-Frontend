import { Component, Input } from '@angular/core';
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
  //   userName: 'Nico',
  //   eMail: 'nico@mail.com',
  //   password: 'HardPassword',
  //   createdAt: new Date(),
  // };

  @Input() user?: User; 
}

