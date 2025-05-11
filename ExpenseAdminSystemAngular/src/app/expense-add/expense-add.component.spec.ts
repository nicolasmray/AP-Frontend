// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ExpenseAddComponent } from './expense-add.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { provideRouter, Router } from '@angular/router';
// import { ExpenseService } from '../services/expense.service';
// import { UserService } from '../services/user.service';
// import { of } from 'rxjs';
// import { Expense } from '../model/expense';

// class MockExpenseService {
//   createExpense(expense: Expense) {
//     return of(expense);
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

// describe('ExpenseAddComponent', () => {
//   let component: ExpenseAddComponent;
//   let fixture: ComponentFixture<ExpenseAddComponent>;
//   let mockUserService: MockUserService;
//   let router: Router;
//   let expenseService: ExpenseService;

//   beforeEach(async () => {
//     mockUserService = new MockUserService();

//     await TestBed.configureTestingModule({
//       imports: [ExpenseAddComponent, HttpClientTestingModule],
//       providers: [
//         provideRouter([]),
//         { provide: ExpenseService, useClass: MockExpenseService },
//         { provide: UserService, useValue: mockUserService }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(ExpenseAddComponent);
//     component = fixture.componentInstance;
//     router = TestBed.inject(Router);
//     expenseService = TestBed.inject(ExpenseService);
//   });

//   it('should redirect to login if authHeader is null', () => {
//     mockUserService.setAuthHeader(null);
//     const navigateSpy = spyOn(router, 'navigate');
//     fixture.detectChanges(); // triggers ngOnInit
//     expect(navigateSpy).toHaveBeenCalledWith(['login']);
//   });

//   it('should create the component', () => {
//     fixture.detectChanges();
//     expect(component).toBeTruthy();
//   });

//   it('should call createExpense and navigate on addTheExpense', () => {
//     const navigateSpy = spyOn(router, 'navigate');
//     const createSpy = spyOn(expenseService, 'createExpense').and.callThrough();

//     fixture.detectChanges(); // triggers ngOnInit
//     component.addTheExpense();

//     expect(createSpy).toHaveBeenCalledWith(component.expense);
//     expect(navigateSpy).toHaveBeenCalledWith(['/expenses']);
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseAddComponent } from './expense-add.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';
import { ExpenseService } from '../services/expense.service';
import { UserService } from '../services/user.service';
import { of } from 'rxjs';
import { Expense } from '../model/expense';

////////// MOCK SERVICES FOR UNIT TESTS //////////
class MockExpenseService {
  createExpense(expense: Expense) {
    return of(expense);
  }
}

class MockUserService {
  private _authHeader: string | null = 'mock-token';
  get authHeader() {
    return this._authHeader;
  }
  setAuthHeader(val: string | null) {
    this._authHeader = val;
  }
}

////////// MAIN TEST SUITE //////////
describe('ExpenseAddComponent - Unit + Integration Tests', () => {
  let component: ExpenseAddComponent;
  let fixture: ComponentFixture<ExpenseAddComponent>;
  let router: Router;

  //////// UNIT TESTS ////////
  describe('Unit Tests', () => {
    let mockUserService: MockUserService;
    let expenseService: ExpenseService;

    beforeEach(async () => {
      mockUserService = new MockUserService();

      await TestBed.configureTestingModule({
        imports: [ExpenseAddComponent, HttpClientTestingModule],
        providers: [
          provideRouter([]),
          { provide: ExpenseService, useClass: MockExpenseService },
          { provide: UserService, useValue: mockUserService }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(ExpenseAddComponent);
      component = fixture.componentInstance;
      router = TestBed.inject(Router);
      expenseService = TestBed.inject(ExpenseService);
    });

    it('should redirect to login if authHeader is null', () => {
      mockUserService.setAuthHeader(null);
      const navigateSpy = spyOn(router, 'navigate');
      fixture.detectChanges(); // triggers ngOnInit
      expect(navigateSpy).toHaveBeenCalledWith(['login']);
    });

    it('should create the component', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should call createExpense and navigate on addTheExpense', () => {
      const navigateSpy = spyOn(router, 'navigate');
      const createSpy = spyOn(expenseService, 'createExpense').and.callThrough();

      fixture.detectChanges();
      component.expense = {
        id: 0,
        userId: 1,
        amount: 150,
        expenseDate: new Date(),
        categoryId: 2,
        currencyId: 1,
        comments: 'Test unit expense',
        createdAt: new Date()
      };

      component.addTheExpense();

      expect(createSpy).toHaveBeenCalledWith(component.expense);
      expect(navigateSpy).toHaveBeenCalledWith(['/expenses']);
    });
  });

  //////// INTEGRATION TESTS ////////
  describe('Integration Tests', () => {
    let userService: UserService;
    let expenseService: ExpenseService;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ExpenseAddComponent, HttpClientTestingModule],
        providers: [
          provideRouter([]),
          ExpenseService,
          UserService
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(ExpenseAddComponent);
      component = fixture.componentInstance;
      router = TestBed.inject(Router);
      userService = TestBed.inject(UserService);
      expenseService = TestBed.inject(ExpenseService);
      httpMock = TestBed.inject(HttpTestingController);

      spyOnProperty(userService, 'authHeader', 'get').and.returnValue('real-token');
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should create the component', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should make HTTP POST and navigate to /expenses on addTheExpense', () => {
      const navigateSpy = spyOn(router, 'navigate');

      fixture.detectChanges();
      component.expense = {
        id: 0,
        userId: 2,
        amount: 250,
        expenseDate: new Date('2024-12-01'),
        categoryId: 3,
        currencyId: 1,
        comments: 'Integration test expense',
        createdAt: new Date()
      };

      component.addTheExpense();

      const req = httpMock.expectOne('http://localhost:5038/api/expense');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(component.expense);

      req.flush(component.expense); // Simulate server response

      expect(navigateSpy).toHaveBeenCalledWith(['/expenses']);
    });

    // it('should redirect to login if no authHeader', () => {
    //   localStorage.removeItem('headerValue');
      
    //   spyOnProperty(expenseService, 'authHeader', 'get').and.returnValue('');
    //   const navigateSpy = spyOn(router, 'navigate');
    
    //   fixture.detectChanges(); // triggers ngOnInit
    
    //   expect(navigateSpy).toHaveBeenCalledWith(['login']);
    // });

    it('should handle error when creating expense fails', () => {
      const consoleSpy = spyOn(console, 'error');
      const navigateSpy = spyOn(router, 'navigate');

      fixture.detectChanges();
      component.expense = {
        id: 0,
        userId: 2,
        amount: 999,
        expenseDate: new Date(),
        categoryId: 99,
        currencyId: 99,
        comments: 'Fail test',
        createdAt: new Date()
      };

      component.addTheExpense();

      const req = httpMock.expectOne('http://localhost:5038/api/expense');
      req.flush({ message: 'Server error' }, { status: 500, statusText: 'Internal Server Error' });

      expect(consoleSpy).toHaveBeenCalledWith('Failed to add expense:', jasmine.any(Error));
      expect(navigateSpy).not.toHaveBeenCalled();
    });
  });
});
