// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { AccountCreateComponent } from './account-create.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';

// describe('AccountCreateComponent', () => {
//   let component: AccountCreateComponent;
//   let fixture: ComponentFixture<AccountCreateComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AccountCreateComponent, HttpClientTestingModule]
//     })
//     .compileComponents();
    
//     fixture = TestBed.createComponent(AccountCreateComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountCreateComponent } from './account-create.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { of, throwError } from 'rxjs';
import { User } from '../model/user';
import { Login } from '../model/login'; // assuming Login is exported from same file

class MockUserService {
  createUser(user: User) {
    return of(user);
  }
}

class MockAuthService {
  authenticate(username: string, password: string) {
    const login: Login = {
      headerValue: 'mock-header',
      username: username,
      id: '123'
    };
    return of(login);
  }
}

describe('AccountCreateComponent', () => {
  let component: AccountCreateComponent;
  let fixture: ComponentFixture<AccountCreateComponent>;
  let router: Router;
  let userService: UserService;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountCreateComponent, HttpClientTestingModule],
      providers: [
        provideRouter([]),
        { provide: UserService, useClass: MockUserService },
        { provide: AuthService, useClass: MockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountCreateComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    userService = TestBed.inject(UserService);
    authService = TestBed.inject(AuthService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize user on ngOnInit', () => {
    component.ngOnInit();
    expect(component.user).toBeTruthy();
    expect(component.user?.userName).toBe('');
  });

  it('should call createUser and authenticate, then navigate to home', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const user: User = {
      id: 0,
      userName: 'testuser',
      email: 'test@example.com',
      password: 'password',
      createdAt: new Date()
    };
    component.user = user;

    const createSpy = spyOn(userService, 'createUser').and.callThrough();
    const authSpy = spyOn(authService, 'authenticate').and.callThrough();

    component.saveChanges();

    expect(createSpy).toHaveBeenCalledWith(user);
    expect(authSpy).toHaveBeenCalledWith(user.userName, user.password);
    expect(navigateSpy).toHaveBeenCalledWith(['home']);
  });

  it('should navigate to account if authentication fails', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.user = {
      id: 0,
      userName: 'testuser',
      email: 'test@example.com',
      password: 'password',
      createdAt: new Date()
    };

    spyOn(userService, 'createUser').and.returnValue(of(component.user));
    spyOn(authService, 'authenticate').and.returnValue(throwError(() => new Error('Auth failed')));

    component.saveChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['account']);
  });

  it('should do nothing if user is null', () => {
    component.user = undefined!;
    const createSpy = spyOn(userService, 'createUser');
    component.saveChanges();
    expect(createSpy).not.toHaveBeenCalled();
  });
});
