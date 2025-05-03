import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { AccountComponent } from './account/account.component';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { ExpenseAddComponent } from './expense-add/expense-add.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: "home", component: HomeComponent },
    { path: "account", component: AccountComponent },
    { path: "account-edit", component: AccountEditComponent },
    { path: "expenses", component: ExpenseListComponent },
    { path: "addExpense", component: ExpenseAddComponent },
    { path: "user", component: UserComponent },
    { path: "user-list", component: UserListComponent },
    { path: "login", component: LoginComponent }



];
