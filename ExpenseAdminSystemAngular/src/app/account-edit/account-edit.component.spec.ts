// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { AccountEditComponent } from './account-edit.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';

// describe('AccountEditComponent', () => {
//   let component: AccountEditComponent;
//   let fixture: ComponentFixture<AccountEditComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AccountEditComponent, HttpClientTestingModule]
//     })
//     .compileComponents();
    
//     fixture = TestBed.createComponent(AccountEditComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountEditComponent } from './account-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { of, throwError } from 'rxjs';
import { User } from '../model/user';

class MockUserService {
  authHeader: string | null = 'mock-token';

  getUser(id: number) {
    return of({
      id,
      userName: 'mockUser',
      email: 'mock@example.com',
      password: 'mockPass',
      createdAt: new Date()
    });
  }

  updateUser(user: User) {
    return of(user);
  }
}

class MockAuthService {
  authenticate(username: string, password: string) {
    return of({
      headerValue: 'mock-header',
      username,
      id: '123'
    });
  }
}

describe('AccountEditComponent', () => {
  let component: AccountEditComponent;
  let fixture: ComponentFixture<AccountEditComponent>;
  let router: Router;
  let userService: MockUserService;
  let authService: MockAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountEditComponent, HttpClientTestingModule],
      providers: [
        provideRouter([]),
        { provide: UserService, useClass: MockUserService },
        { provide: AuthService, useClass: MockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountEditComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    userService = TestBed.inject(UserService) as unknown as MockUserService;
    authService = TestBed.inject(AuthService) as unknown as MockAuthService;
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

  it('should fetch user if ID is present in localStorage', () => {
    const testUserId = '42';
    spyOn(localStorage, 'getItem').and.callFake((key: string) => key === 'id' ? testUserId : null);
    const getUserSpy = spyOn(userService, 'getUser').and.callThrough();
    component.ngOnInit();
    expect(getUserSpy).toHaveBeenCalledWith(Number(testUserId));
  });

  it('should not fetch user if no ID in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const getUserSpy = spyOn(userService, 'getUser');
    component.ngOnInit();
    expect(getUserSpy).not.toHaveBeenCalled();
  });

  it('should update user and authenticate, then navigate to account', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const updateSpy = spyOn(userService, 'updateUser').and.callThrough();
    const authSpy = spyOn(authService, 'authenticate').and.callThrough();

    component.user = {
      id: 1,
      userName: 'updatedUser',
      email: 'updated@example.com',
      password: 'newPassword',
      createdAt: new Date()
    };

    component.saveChanges();

    expect(updateSpy).toHaveBeenCalledWith(component.user);
    expect(authSpy).toHaveBeenCalledWith('updatedUser', 'newPassword');
    expect(navigateSpy).toHaveBeenCalledWith(['account']);
  });

  it('should navigate even if authentication fails', () => {
    const navigateSpy = spyOn(router, 'navigate');
    spyOn(userService, 'updateUser').and.returnValue(of(component.user!));
    spyOn(authService, 'authenticate').and.returnValue(throwError(() => new Error('Auth failed')));

    component.user = {
      id: 2,
      userName: 'failAuthUser',
      email: 'fail@example.com',
      password: 'failPass',
      createdAt: new Date()
    };

    component.saveChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['account']);
  });

  it('should do nothing if user is undefined', () => {
    component.user = undefined!;
    const updateSpy = spyOn(userService, 'updateUser');
    component.saveChanges();
    expect(updateSpy).not.toHaveBeenCalled();
  });
});
