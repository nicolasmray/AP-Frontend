import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: "home", component: HomeComponent },
    { path: "user", component: UserComponent },
    { path: "user-list", component: UserListComponent },
    { path: "login", component: LoginComponent }



];
