// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { AccountComponent } from './account.component';

// describe('AccountComponent', () => {
//   let component: AccountComponent;
//   let fixture: ComponentFixture<AccountComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AccountComponent, HttpClientTestingModule],
//     })
//     .compileComponents();
    
//     fixture = TestBed.createComponent(AccountComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountComponent } from './account.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { UserService } from '../services/user.service';
import { of, throwError } from 'rxjs';
import { User } from '../model/user';

class MockUserService {
  authHeader: string | null = 'mock-token';

  getUser(id: number) {
    return of({
      id,
      userName: 'testUser',
      email: 'test@example.com',
      password: 'pass123',
      createdAt: new Date()
    });
  }

  deleteUser(id: number) {
    return of(true);
  }
}

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let router: Router;
  let userService: MockUserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountComponent, HttpClientTestingModule],
      providers: [
        provideRouter([]),
        { provide: UserService, useClass: MockUserService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    userService = TestBed.inject(UserService) as unknown as MockUserService;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to login if authHeader is null', () => {
    userService.authHeader = null;
    const navigateSpy = spyOn(router, 'navigate');
    component.ngOnInit();
    expect(navigateSpy).toHaveBeenCalledWith(['login']);
  });

  it('should fetch user if ID is in localStorage', () => {
    const testUserId = '5';
    spyOn(localStorage, 'getItem').and.callFake((key: string) => key === 'id' ? testUserId : null);
    const getUserSpy = spyOn(userService, 'getUser').and.callThrough();

    component.ngOnInit();
    expect(getUserSpy).toHaveBeenCalledWith(Number(testUserId));
    expect(component.user?.userName).toBe('testUser');
  });

  it('should not fetch user if no ID in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const getUserSpy = spyOn(userService, 'getUser');
    component.ngOnInit();
    expect(getUserSpy).not.toHaveBeenCalled();
  });

  it('should navigate to account-edit on goToEditAccount()', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goToEditAccount();
    expect(navigateSpy).toHaveBeenCalledWith(['account-edit']);
  });

  it('should delete account and navigate to home on confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(localStorage, 'getItem').and.callFake((key: string) => key === 'id' ? '7' : null);
    const navigateSpy = spyOn(router, 'navigate');
    const deleteSpy = spyOn(userService, 'deleteUser').and.callThrough();
    spyOn(localStorage, 'removeItem');

    component.deleteAccount();

    expect(deleteSpy).toHaveBeenCalledWith(7);
    expect(localStorage.removeItem).toHaveBeenCalledWith('headerValue');
    expect(navigateSpy).toHaveBeenCalledWith(['home']);
  });

  it('should cancel delete and navigate back to account if not confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    const navigateSpy = spyOn(router, 'navigate');
    component.deleteAccount();
    expect(navigateSpy).toHaveBeenCalledWith(['account']);
  });

  it('should not delete account if no ID in localStorage', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const deleteSpy = spyOn(userService, 'deleteUser');
    component.deleteAccount();
    expect(deleteSpy).not.toHaveBeenCalled();
  });

  it('should handle delete error gracefully', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(localStorage, 'getItem').and.returnValue('8');
    spyOn(userService, 'deleteUser').and.returnValue(throwError(() => new Error('Delete failed')));
    const consoleSpy = spyOn(console, 'error');
    component.deleteAccount();
    expect(consoleSpy).toHaveBeenCalledWith('Failed to delete user:', jasmine.any(Error));
  });
});
