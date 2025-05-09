import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ExpenseService } from './expense.service';
import { Expense } from '../model/expense';

describe('ExpenseService', () => {
  let service: ExpenseService;
  let httpMock: HttpTestingController;

  const mockExpense: Expense = {
    id: 1,
    userId: 10,
    amount: 99.99,
    expenseDate: new Date('2024-05-01T00:00:00Z'),
    categoryId: 2,
    currencyId: 1,
    comments: 'Lunch with team',
    createdAt: new Date('2024-05-01T01:00:00Z')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExpenseService]
    });

    service = TestBed.inject(ExpenseService);
    httpMock = TestBed.inject(HttpTestingController);

    // Simulate auth header in localStorage
    localStorage.setItem('headerValue', 'Basic mock-auth');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve expenses for a user', () => {
    service.getExpenses(10).subscribe(expenses => {
      expect(expenses.length).toBe(1);
      expect(expenses[0].comments).toBe('Lunch with team');
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/expense?userId=10`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Basic mock-auth');
    req.flush([mockExpense]);
  });

  it('should retrieve a single expense by ID', () => {
    service.getExpense(1).subscribe(expense => {
      expect(expense.id).toBe(1);
      expect(expense.amount).toBe(99.99);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/expense/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockExpense);
  });

  it('should create a new expense', () => {
    service.createExpense(mockExpense).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/expense`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Basic mock-auth');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual(mockExpense);
    req.flush({ success: true });
  });

  it('should update an existing expense', () => {
    service.updateExpense(mockExpense).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/expense`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockExpense);
    req.flush({ success: true });
  });

  it('should delete an expense by ID', () => {
    service.deleteExpense(1).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/expense/1`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe('Basic mock-auth');
    req.flush({ success: true });
  });
});
