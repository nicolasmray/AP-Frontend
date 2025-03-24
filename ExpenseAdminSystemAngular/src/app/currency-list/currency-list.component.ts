import { Component } from '@angular/core';
import { Currency } from '../model/currency';
import { CurrencyService } from '../services/currency.service';
import { CurrencyComponent } from '../currency/currency.component';

@Component({
  selector: 'app-currency-list',
  standalone: true,
  imports: [CurrencyComponent],
  templateUrl: './currency-list.component.html',
  styleUrl: './currency-list.component.css'
})

export class CurrencyListComponent {
  currencies: Currency[] = [];

  constructor(private currencyService: CurrencyService) {}
    ngOnInit(): void {
      this.currencyService.getCurrencies().subscribe(listOfCurrencies=>{
        this.currencies = listOfCurrencies
      }
    )
  }
}
