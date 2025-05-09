// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { AccountCreateComponent } from './account-create.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { Router } from '@angular/router';
// import { provideRouter } from '@angular/router';
// import { UserService } from '../services/user.service';
// import { AuthService } from '../services/auth.service';
// import { of, throwError } from 'rxjs';
// import { User } from '../model/user';
// import { Login } from '../model/login'; // assuming Login is exported from same file

// class MockUserService {
//   createUser(user: User) {
//     return of(user);
//   }
// }

// class MockAuthService {
//   authenticate(username: string, password: string) {
//     const login: Login = {
//       headerValue: 'mock-header',
//       username: username,
//       id: '123'
//     };
//     return of(login);
//   }
// }

// describe('AccountCreateComponent', () => {
//   let component: AccountCreateComponent;
//   let fixture: ComponentFixture<AccountCreateComponent>;
//   let router: Router;
//   let userService: UserService;
//   let authService: AuthService;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AccountCreateComponent, HttpClientTestingModule],
//       providers: [
//         provideRouter([]),
//         { provide: UserService, useClass: MockUserService },
//         { provide: AuthService, useClass: MockAuthService }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(AccountCreateComponent);
//     component = fixture.componentInstance;
//     router = TestBed.inject(Router);
//     userService = TestBed.inject(UserService);
//     authService = TestBed.inject(AuthService);
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize user on ngOnInit', () => {
//     component.ngOnInit();
//     expect(component.user).toBeTruthy();
//     expect(component.user?.userName).toBe('');
//   });

//   it('should call createUser and authenticate, then navigate to home', () => {
//     const navigateSpy = spyOn(router, 'navigate');
//     const user: User = {
//       id: 0,
//       userName: 'testuser',
//       email: 'test@example.com',
//       password: 'password',
//       createdAt: new Date()
//     };
//     component.user = user;

//     const createSpy = spyOn(userService, 'createUser').and.callThrough();
//     const authSpy = spyOn(authService, 'authenticate').and.callThrough();

//     component.saveChanges();

//     expect(createSpy).toHaveBeenCalledWith(user);
//     expect(authSpy).toHaveBeenCalledWith(user.userName, user.password);
//     expect(navigateSpy).toHaveBeenCalledWith(['home']);
//   });

//   it('should navigate to account if authentication fails', () => {
//     const navigateSpy = spyOn(router, 'navigate');
//     component.user = {
//       id: 0,
//       userName: 'testuser',
//       email: 'test@example.com',
//       password: 'password',
//       createdAt: new Date()
//     };

//     spyOn(userService, 'createUser').and.returnValue(of(component.user));
//     spyOn(authService, 'authenticate').and.returnValue(throwError(() => new Error('Auth failed')));

//     component.saveChanges();

//     expect(navigateSpy).toHaveBeenCalledWith(['account']);
//   });

//   it('should do nothing if user is null', () => {
//     component.user = undefined!;
//     const createSpy = spyOn(userService, 'createUser');
//     component.saveChanges();
//     expect(createSpy).not.toHaveBeenCalled();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountCreateComponent } from './account-create.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { of, throwError } from 'rxjs';
import { User } from '../model/user';
import { Login } from '../model/login';

////////// MOCK CLASSES FOR UNIT TESTING //////////

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

////////// START OF TEST SUITE //////////

describe('AccountCreateComponent - Unit + Integration Tests', () => {
  let component: AccountCreateComponent;
  let fixture: ComponentFixture<AccountCreateComponent>;
  let router: Router;

  //////// UNIT TEST SETUP ////////
  describe('Unit Tests', () => {
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

  //////// INTEGRATION TEST SETUP ////////
  describe('Integration Tests', () => {
    let userService: UserService;
    let authService: AuthService;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [AccountCreateComponent, HttpClientTestingModule],
        providers: [provideRouter([]), UserService, AuthService]
      }).compileComponents();

      fixture = TestBed.createComponent(AccountCreateComponent);
      component = fixture.componentInstance;
      router = TestBed.inject(Router);
      userService = TestBed.inject(UserService);
      authService = TestBed.inject(AuthService);
      httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should create and authenticate user using real services', () => {
      const navigateSpy = spyOn(router, 'navigate');

      const mockUser: User = {
        id: 0,
        userName: 'realuser',
        email: 'real@example.com',
        password: 'realpass',
        createdAt: new Date()
      };
      const mockLogin: Login = {
        headerValue: 'Basic cmVhbHVzZXI6cmVhbHBhc3M=',
        username: 'realuser',
        id: '123'
      };

      component.user = mockUser;
      component.saveChanges();

      const reqCreate = httpMock.expectOne('http://localhost:5038/api/user');
      expect(reqCreate.request.method).toBe('POST');
      reqCreate.flush(mockUser);

      const reqAuth = httpMock.expectOne('http://localhost:5038/api/login');
      expect(reqAuth.request.method).toBe('POST');
      reqAuth.flush(mockLogin);

      expect(navigateSpy).toHaveBeenCalledWith(['home']);
    });

    it('should fallback to account route if authentication fails', () => {
      const navigateSpy = spyOn(router, 'navigate');

      const mockUser: User = {
        id: 0,
        userName: 'failuser',
        email: 'fail@example.com',
        password: 'failpass',
        createdAt: new Date()
      };

      component.user = mockUser;
      component.saveChanges();

      const reqCreate = httpMock.expectOne('http://localhost:5038/api/user');
      reqCreate.flush(mockUser);

      const reqAuth = httpMock.expectOne('http://localhost:5038/api/login');
      reqAuth.flush({ message: 'Invalid credentials' }, { status: 401, statusText: 'Unauthorized' });

      expect(navigateSpy).toHaveBeenCalledWith(['account']);
    });
  });
});
