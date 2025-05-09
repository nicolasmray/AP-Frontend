// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { ExpenseListComponent } from './expense-list.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';

// describe('ExpenseListComponent', () => {
//   let component: ExpenseListComponent;
//   let fixture: ComponentFixture<ExpenseListComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [ExpenseListComponent, HttpClientTestingModule]
//     })
//     .compileComponents();
    
//     fixture = TestBed.createComponent(ExpenseListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

















// ------------------------------------------------------------------------












// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ExpenseListComponent } from './expense-list.component';
// import { ExpenseService } from '../services/expense.service';
// import { UserService } from '../services/user.service';
// import { Router } from '@angular/router';
// import { of } from 'rxjs';
// import { Expense } from '../model/expense';

// class MockExpenseService {
//   getExpenses(userId: number) {
//     return of([
//       {
//         id: 1,
//         userId,
//         amount: 100,
//         expenseDate: new Date(),
//         categoryId: 1,
//         currencyId: 1, // USD
//         comments: '',
//         createdAt: new Date()
//       },
//       {
//         id: 2,
//         userId,
//         amount: 50,
//         expenseDate: new Date(),
//         categoryId: 2,
//         currencyId: 2, // EUR
//         comments: '',
//         createdAt: new Date()
//       }
//     ] as Expense[]);
//   }
// }

// class MockUserService {
//   private _authHeader: string | null = 'mock-token';
//   get authHeader() {
//     return this._authHeader;
//   }
//   setAuthHeader(val: string | null) {
//     this._authHeader = val;
//   }
// }

// describe('ExpenseListComponent', () => {
//   let component: ExpenseListComponent;
//   let fixture: ComponentFixture<ExpenseListComponent>;
//   let mockUserService: MockUserService;
//   let router: Router;

//   beforeEach(async () => {
//     mockUserService = new MockUserService();
//     spyOn(localStorage, 'getItem').and.returnValue('1');

//     //spyOn(window.location, 'reload');

//     Object.defineProperty(window, 'location', {
//       value: {
//         ...window.location,
//         reload: jasmine.createSpy('reload')
//       },
//       writable: true
//     });
    

//     await TestBed.configureTestingModule({
//       imports: [ExpenseListComponent],
//       providers: [
//         { provide: ExpenseService, useClass: MockExpenseService },
//         { provide: UserService, useValue: mockUserService },
//         {
//           provide: Router,
//           useValue: {
//             navigate: jasmine.createSpy('navigate').and.returnValue(Promise.resolve(true))
//           }
//         }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(ExpenseListComponent);
//     component = fixture.componentInstance;
//     router = TestBed.inject(Router);
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should redirect to login if authHeader is null', () => {
//     mockUserService.setAuthHeader(null);
//     fixture.detectChanges(); // triggers ngOnInit
//     expect(router.navigate).toHaveBeenCalledWith(['login']);
//   });

//   it('should load expenses on init', () => {
//     fixture.detectChanges();
//     expect(component.expenses.length).toBe(2);
//   });

//   it('should calculate total amount', () => {
//     fixture.detectChanges();
//     expect(component.totalAmount).toBe(150);
//   });

//   it('should calculate totalAmountInEuro correctly (USD: 0.92, EUR: 1)', () => {
//     fixture.detectChanges();
//     // USD: 100 * 0.92 = 92; EUR: 50
//     expect(component.totalAmountInEuro).toBeCloseTo(142);
//   });

//   it('should calculate totalAmountInSelectedCurrency correctly', () => {
//     fixture.detectChanges();
//     // Convert both to EUR (92 + 50 = 142) and divide by selectedCurrency.rateToEUR (EUR = 1)
//     expect(component.totalAmountInSelectedCurrency).toBeCloseTo(142);
//   });

//   it('should navigate to addExpense on goToAddExpense()', () => {
//     component.goToAddExpense();
//     expect(router.navigate).toHaveBeenCalledWith(['addExpense']);
//   });
// });
