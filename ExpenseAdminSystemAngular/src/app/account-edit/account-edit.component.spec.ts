import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountEditComponent } from './account-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AccountEditComponent', () => {
  let component: AccountEditComponent;
  let fixture: ComponentFixture<AccountEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountEditComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
