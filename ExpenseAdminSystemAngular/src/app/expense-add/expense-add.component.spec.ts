import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseAddComponent } from './expense-add.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ExpenseAddComponent', () => {
  let component: ExpenseAddComponent;
  let fixture: ComponentFixture<ExpenseAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseAddComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpenseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
