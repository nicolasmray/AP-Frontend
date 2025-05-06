import { Component } from '@angular/core';
import { Expense } from '../model/expense';
import { ExpenseService } from '../services/expense.service';
import { ExpenseComponent } from '../expense/expense.component';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [ExpenseComponent, CommonModule, FormsModule],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent {
expenses: Expense[] = [];

currencyExchangeRates: { [key: number]: number } = {
  1: 0.92, // USD → EUR
  2: 1,    // EUR → EUR
  3: 1.17, // GBP → EUR
  4: 0.13, // DKK → EUR
  5: 0.088 // SEK → EUR
};

currencies = [
  { id: 1, name: 'USD', rateToEUR: 0.92 },
  { id: 2, name: 'EUR', rateToEUR: 1 },
  { id: 3, name: 'GBP', rateToEUR: 1.17 },
  { id: 4, name: 'DKK', rateToEUR: 0.13 },
  { id: 5, name: 'SEK', rateToEUR: 0.088 }
];

// Default selected target currency
selectedCurrencyId: number = 2; // EUR


  constructor(private expenseService: ExpenseService, private router: Router, private userService: UserService) {}
  ngOnInit(): void {
    if(this.userService.authHeader == null) {
      this.router.navigate(["login"]);
    }
    const userId = parseInt(localStorage.getItem('id') || '0', 10); 
    this.expenseService.getExpenses(userId).subscribe(listOfExpenses=>{
      this.expenses = listOfExpenses
    })
  }

  get totalAmount(): number {
    return this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }
  

  get totalAmountInEuro(): number {
    return this.expenses.reduce((sum, expense) => {
      const rate = this.currencyExchangeRates[expense.currencyId] || 1; // default to 1 if unknown
      return sum + (expense.amount * rate);
    }, 0);
  }
  
  getSelectedCurrencyName(): string {
    return this.currencies.find(c => c.id === this.selectedCurrencyId)?.name || '';
  }
  

  get totalAmountInSelectedCurrency(): number {
    const selectedCurrency = this.currencies.find(c => c.id === this.selectedCurrencyId);
    const selectedRate = selectedCurrency?.rateToEUR || 1;
  
    const totalInEuro = this.expenses.reduce((sum, expense) => {
      const fromRate = this.currencies.find(c => c.id === expense.currencyId)?.rateToEUR || 1;
      return sum + (expense.amount * fromRate);
    }, 0);
  
    return totalInEuro / selectedRate; // convert from EUR to selected currency
  }
  

  goToAddExpense(): void {
    this.router.navigate(['addExpense']);
  }

}
