import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseComponent } from './expense.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ExpenseComponent', () => {
  let component: ExpenseComponent;
  let fixture: ComponentFixture<ExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
