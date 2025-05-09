import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseAddComponent } from './expense-add.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';
import { ExpenseService } from '../services/expense.service';
import { UserService } from '../services/user.service';
import { of } from 'rxjs';
import { Expense } from '../model/expense';

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

describe('ExpenseAddComponent', () => {
  let component: ExpenseAddComponent;
  let fixture: ComponentFixture<ExpenseAddComponent>;
  let mockUserService: MockUserService;
  let router: Router;
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

    fixture.detectChanges(); // triggers ngOnInit
    component.addTheExpense();

    expect(createSpy).toHaveBeenCalledWith(component.expense);
    expect(navigateSpy).toHaveBeenCalledWith(['/expenses']);
  });
});
