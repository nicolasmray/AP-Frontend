import { Component, Input } from '@angular/core';
import { Currency } from '../model/currency';

@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.css'
})
export class CurrencyComponent {
  @Input() currency?: Currency; 
}
