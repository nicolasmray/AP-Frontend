import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseEditComponent } from './expense-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { ExpenseService } from '../services/expense.service';
import { UserService } from '../services/user.service';
import { Expense } from '../model/expense';

class MockExpenseService {
  getExpense(id: number) {
    return of({
      id,
      userId: 1,
      amount: 100,
      expenseDate: new Date(),
      categoryId: 1,
      currencyId: 1,
      comments: 'Test',
      createdAt: new Date(),
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

describe('ExpenseEditComponent', () => {
  let component: ExpenseEditComponent;
  let fixture: ComponentFixture<ExpenseEditComponent>;
  let mockUserService: MockUserService;
  let router: Router;

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

  it('should create and load expense', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.expense?.id).toBe(1);
  });
});
