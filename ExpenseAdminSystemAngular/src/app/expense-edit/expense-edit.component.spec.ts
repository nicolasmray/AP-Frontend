// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ExpenseEditComponent } from './expense-edit.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ActivatedRoute } from '@angular/router';
// import { provideRouter, Router } from '@angular/router';
// import { of } from 'rxjs';
// import { ExpenseService } from '../services/expense.service';
// import { UserService } from '../services/user.service';
// import { Expense } from '../model/expense';

// class MockExpenseService {
//   getExpense(id: number) {
//     return of({
//       id,
//       userId: 1,
//       amount: 100,
//       expenseDate: new Date(),
//       categoryId: 1,
//       currencyId: 1,
//       comments: 'Test',
//       createdAt: new Date(),
//     } as Expense);
//   }

//   updateExpense(expense: Expense) {
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

// describe('ExpenseEditComponent', () => {
//   let component: ExpenseEditComponent;
//   let fixture: ComponentFixture<ExpenseEditComponent>;
//   let mockUserService: MockUserService;
//   let router: Router;

//   beforeEach(async () => {
//     mockUserService = new MockUserService();

//     await TestBed.configureTestingModule({
//       imports: [ExpenseEditComponent, HttpClientTestingModule],
//       providers: [
//         provideRouter([]),
//         { provide: ExpenseService, useClass: MockExpenseService },
//         { provide: UserService, useValue: mockUserService },
//         {
//           provide: ActivatedRoute,
//           useValue: {
//             snapshot: {
//               paramMap: {
//                 get: () => '1',
//               },
//             },
//           },
//         },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(ExpenseEditComponent);
//     component = fixture.componentInstance;
//     router = TestBed.inject(Router);
//   });

//   it('should redirect to login if authHeader is null', () => {
//     mockUserService.setAuthHeader(null);
//     const navigateSpy = spyOn(router, 'navigate');
//     fixture.detectChanges();
//     expect(navigateSpy).toHaveBeenCalledWith(['login']);
//   });

//   it('should create and load expense', () => {
//     fixture.detectChanges();
//     expect(component).toBeTruthy();
//     expect(component.expense?.id).toBe(1);
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseEditComponent } from './expense-edit.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { ExpenseService } from '../services/expense.service';
import { UserService } from '../services/user.service';
import { Expense } from '../model/expense';

////////// MOCK SERVICES FOR UNIT TESTS //////////
class MockExpenseService {
  getExpense(id: number) {
    return of({
      id,
      userId: 1,
      amount: 100,
      expenseDate: new Date('2024-12-10'),
      categoryId: 1,
      currencyId: 1,
      comments: 'Mocked expense',
      createdAt: new Date('2024-12-01')
    } as Expense);
  }

  updateExpense(expense: Expense) {
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

////////// TEST SUITE //////////
describe('ExpenseEditComponent - Unit + Integration Tests', () => {
  let component: ExpenseEditComponent;
  let fixture: ComponentFixture<ExpenseEditComponent>;
  let router: Router;

  //////// UNIT TESTS ////////
  describe('Unit Tests', () => {
    let mockUserService: MockUserService;

    beforeEach(async () => {
      mockUserService = new MockUserService();

      await TestBed.configureTestingModule({
        imports: [ExpenseEditComponent, HttpClientTestingModule],
        providers: [
          provideRouter([]),
          { provide: ExpenseService, useClass: MockExpenseService },
          { provide: UserService, useValue: mockUserService },
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                paramMap: {
                  get: () => '1',
                },
              },
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ExpenseEditComponent);
      component = fixture.componentInstance;
      router = TestBed.inject(Router);
    });

    it('should redirect to login if authHeader is null', () => {
      mockUserService.setAuthHeader(null);
      const navigateSpy = spyOn(router, 'navigate');
      fixture.detectChanges();
      expect(navigateSpy).toHaveBeenCalledWith(['login']);
    });

    it('should create the component and load expense', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
      expect(component.expense?.id).toBe(1);
    });

    it('should update expense and navigate to /expenses', () => {
      fixture.detectChanges();
      const navigateSpy = spyOn(router, 'navigate');
      component.expense = {
        id: 1,
        userId: 1,
        amount: 150,
        expenseDate: new Date(),
        categoryId: 2,
        currencyId: 1,
        comments: 'Updated comment',
        createdAt: new Date()
      };

      component.editExpense();
      expect(navigateSpy).toHaveBeenCalledWith(['/expenses']);
    });
  });

  //////// INTEGRATION TESTS ////////
  describe('Integration Tests', () => {
    let userService: UserService;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ExpenseEditComponent, HttpClientTestingModule],
        providers: [
          provideRouter([]),
          ExpenseService,
          UserService,
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                paramMap: {
                  get: () => '1',
                },
              },
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ExpenseEditComponent);
      component = fixture.componentInstance;
      router = TestBed.inject(Router);
      userService = TestBed.inject(UserService);
      httpMock = TestBed.inject(HttpTestingController);

      spyOnProperty(userService, 'authHeader', 'get').and.returnValue('real-token');
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should create component and load expense via GET', () => {
      fixture.detectChanges();

      const req = httpMock.expectOne('http://localhost:5038/api/expense/1');
      expect(req.request.method).toBe('GET');

      const mockExpense: Expense = {
        id: 1,
        userId: 1,
        amount: 200,
        expenseDate: new Date('2024-12-11'),
        categoryId: 3,
        currencyId: 2,
        comments: 'Loaded expense',
        createdAt: new Date('2024-11-30')
      };
      req.flush(mockExpense);

      expect(component.expense).toEqual(mockExpense);
    });

    it('should send PUT request and navigate on updateTheExpense', () => {
      const navigateSpy = spyOn(router, 'navigate');
      fixture.detectChanges();

      // Mock GET
      const getReq = httpMock.expectOne('http://localhost:5038/api/expense/1');
      getReq.flush({
        id: 1,
        userId: 1,
        amount: 100,
        expenseDate: new Date(),
        categoryId: 1,
        currencyId: 1,
        comments: 'Initial',
        createdAt: new Date()
      });

      component.expense!.amount = 999;
      component.expense!.comments = 'Integration update';

      component.editExpense();

      const putReq = httpMock.expectOne('http://localhost:5038/api/expense');
      expect(putReq.request.method).toBe('PUT');
      expect(putReq.request.body).toEqual(component.expense);

      putReq.flush(component.expense!);

      expect(navigateSpy).toHaveBeenCalledWith(['/expenses']);
    });

    it('should log error on GET failure', () => {
      const consoleSpy = spyOn(console, 'error');
      fixture.detectChanges();

      const req = httpMock.expectOne('http://localhost:5038/api/expense/1');
      req.flush({ message: 'Not Found' }, { status: 404, statusText: 'Not Found' });

      expect(consoleSpy).toHaveBeenCalledWith('Error loading expense:', jasmine.any(Error));
    });

    it('should log error on PUT failure', () => {
      fixture.detectChanges();

      // Mock GET
      const getReq = httpMock.expectOne('http://localhost:5038/api/expense/1');
      getReq.flush({
        id: 1,
        userId: 1,
        amount: 100,
        expenseDate: new Date(),
        categoryId: 1,
        currencyId: 1,
        comments: 'Initial',
        createdAt: new Date()
      });

      const consoleSpy = spyOn(console, 'error');
      component.expense!.amount = 9999;

      component.editExpense();

      const putReq = httpMock.expectOne('http://localhost:5038/api/expense');
      putReq.flush({ message: 'Update failed' }, { status: 500, statusText: 'Server Error' });

      expect(consoleSpy).toHaveBeenCalledWith('Failed to update expense:', jasmine.any(Error));
    });

    // it('should redirect to login if authHeader is null', () => {
    //   spyOnProperty(userService, 'headerValue', 'get').and.returnValue('');
    //   const navigateSpy = spyOn(router, 'navigate');

    //   fixture.detectChanges();

    //   expect(navigateSpy).toHaveBeenCalledWith(['login']);
    // });
  });
});
