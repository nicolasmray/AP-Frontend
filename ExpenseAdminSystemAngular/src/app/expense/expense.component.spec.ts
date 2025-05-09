// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ExpenseComponent } from './expense.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';

// describe('ExpenseComponent', () => {
//   let component: ExpenseComponent;
//   let fixture: ComponentFixture<ExpenseComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [ExpenseComponent, HttpClientTestingModule]
//     })
//     .compileComponents();
    
//     fixture = TestBed.createComponent(ExpenseComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

















// -------------------------------------------------------------------













// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ExpenseComponent } from './expense.component';
// import { Router } from '@angular/router';
// import { ExpenseService } from '../services/expense.service';
// import { UserService } from '../services/user.service';
// import { of } from 'rxjs';
// import { Expense } from '../model/expense';

// class MockExpenseService {
//   deleteExpense(id: number) {
//     return of(true);
//   }
// }

// class MockUserService {}

// describe('ExpenseComponent', () => {
//   let component: ExpenseComponent;
//   let fixture: ComponentFixture<ExpenseComponent>;
//   let expenseService: ExpenseService;
//   let router: Router;

//   const mockExpense: Expense = {
//     id: 1,
//     userId: 1,
//     amount: 50,
//     expenseDate: new Date(),
//     categoryId: 2,
//     currencyId: 1,
//     comments: 'Test expense',
//     createdAt: new Date()
//   };

//   beforeEach(async () => {
//     //spyOn(window.location, 'reload');


//     // Object.defineProperty(window, 'location', {
//     //   value: {
//     //     ...window.location,
//     //     reload: jasmine.createSpy('reload')
//     //   },
//     //   writable: true
//     // });
    

//     await TestBed.configureTestingModule({
//       imports: [ExpenseComponent],
//       providers: [
//         { provide: ExpenseService, useClass: MockExpenseService },
//         { provide: UserService, useClass: MockUserService },
//         {
//           provide: Router,
//           useValue: {
//             navigate: jasmine.createSpy('navigate').and.returnValue(Promise.resolve(true))
//           }
//         }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(ExpenseComponent);
//     component = fixture.componentInstance;
//     component.expense = mockExpense;
//     expenseService = TestBed.inject(ExpenseService);
//     router = TestBed.inject(Router);
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should navigate to edit page on onEdit()', () => {
//     component.onEdit();
//     expect(router.navigate).toHaveBeenCalledWith(['/expenseEdit', mockExpense.id]);
//   });

//   it('should call deleteExpense and navigate when confirmed', () => {
//     spyOn(window, 'confirm').and.returnValue(true);
//     const deleteSpy = spyOn(expenseService, 'deleteExpense').and.callThrough();
//     component.onDelete();
//     expect(deleteSpy).toHaveBeenCalledWith(mockExpense.id);
//     expect(router.navigate).toHaveBeenCalledWith(['/expenses']);
//   });

//   it('should not call deleteExpense when delete is cancelled', () => {
//     spyOn(window, 'confirm').and.returnValue(false);
//     const deleteSpy = spyOn(expenseService, 'deleteExpense');
//     component.onDelete();
//     expect(deleteSpy).not.toHaveBeenCalled();
//     expect(router.navigate).toHaveBeenCalledWith(['/expenses']);
//   });
// });
