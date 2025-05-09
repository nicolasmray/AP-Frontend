// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { LoginComponent } from './login.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { Router } from '@angular/router';
// import { provideRouter } from '@angular/router';
// import { AuthService } from '../services/auth.service';
// import { of, throwError } from 'rxjs';

// class MockAuthService {
//   authenticate(username: string, password: string) {
//     if (username === 'validUser' && password === 'validPass') {
//       return of({
//         headerValue: 'mock-header',
//         username: 'validUser',
//         id: '1'
//       });
//     }
//     return throwError(() => new Error('Invalid credentials'));
//   }
// }

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let router: Router;
//   let authService: MockAuthService;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [LoginComponent, HttpClientTestingModule],
//       providers: [
//         provideRouter([]),
//         { provide: AuthService, useClass: MockAuthService }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     router = TestBed.inject(Router);
//     authService = TestBed.inject(AuthService) as unknown as MockAuthService;
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should store data in localStorage and navigate to home on successful login', () => {
//     component.username = 'validUser';
//     component.password = 'validPass';

//     const navigateSpy = spyOn(router, 'navigate');
//     const localStorageSetItemSpy = spyOn(localStorage, 'setItem');
//     component.login();

//     expect(localStorageSetItemSpy).toHaveBeenCalledWith('headerValue', 'mock-header');
//     expect(localStorageSetItemSpy).toHaveBeenCalledWith('username', 'validUser');
//     expect(localStorageSetItemSpy).toHaveBeenCalledWith('id', '1');
//     expect(navigateSpy).toHaveBeenCalledWith(['home']);
//   });

//   it('should not navigate and show an error on failed login', () => {
//     component.username = 'invalidUser';
//     component.password = 'invalidPass';

//     const navigateSpy = spyOn(router, 'navigate');
//     spyOn(localStorage, 'setItem');
//     component.login();

//     expect(navigateSpy).not.toHaveBeenCalled(); // No navigation should happen
//     expect(localStorage.setItem).not.toHaveBeenCalled(); // No localStorage changes
//   });

//   it('should call authenticate method with username and password', () => {
//     component.username = 'validUser';
//     component.password = 'validPass';

//     const authenticateSpy = spyOn(authService, 'authenticate').and.callThrough();
//     component.login();
//     expect(authenticateSpy).toHaveBeenCalledWith('validUser', 'validPass');
//   });

//   it('should handle authentication error gracefully', () => {
//     component.username = 'invalidUser';
//     component.password = 'invalidPass';

//     const consoleSpy = spyOn(console, 'error');
//     component.login();
//     //expect(consoleSpy).toHaveBeenCalledWith('Invalid credentials');
//     expect(consoleSpy).toHaveBeenCalledWith('Authentication failed:', new Error('Invalid credentials'));

//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { of, throwError } from 'rxjs';

////////// MOCK CLASS FOR UNIT TESTS //////////
class MockAuthService {
  authenticate(username: string, password: string) {
    if (username === 'validUser' && password === 'validPass') {
      return of({
        headerValue: 'mock-header',
        username: 'validUser',
        id: '1'
      });
    }
    return throwError(() => new Error('Invalid credentials'));
  }
}

////////// MAIN TEST SUITE //////////
describe('LoginComponent - Unit + Integration Tests', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  //////// UNIT TESTS ////////
  describe('Unit Tests', () => {
    let authService: MockAuthService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [LoginComponent, HttpClientTestingModule],
        providers: [
          provideRouter([]),
          { provide: AuthService, useClass: MockAuthService }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      router = TestBed.inject(Router);
      authService = TestBed.inject(AuthService) as unknown as MockAuthService;
    });

    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should store data in localStorage and navigate to home on successful login', () => {
      component.username = 'validUser';
      component.password = 'validPass';

      const navigateSpy = spyOn(router, 'navigate');
      const localStorageSetItemSpy = spyOn(localStorage, 'setItem');
      component.login();

      expect(localStorageSetItemSpy).toHaveBeenCalledWith('headerValue', 'mock-header');
      expect(localStorageSetItemSpy).toHaveBeenCalledWith('username', 'validUser');
      expect(localStorageSetItemSpy).toHaveBeenCalledWith('id', '1');
      expect(navigateSpy).toHaveBeenCalledWith(['home']);
    });

    it('should not navigate and show an error on failed login', () => {
      component.username = 'invalidUser';
      component.password = 'invalidPass';

      const navigateSpy = spyOn(router, 'navigate');
      spyOn(localStorage, 'setItem');
      component.login();

      expect(navigateSpy).not.toHaveBeenCalled();
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });

    it('should call authenticate method with username and password', () => {
      component.username = 'validUser';
      component.password = 'validPass';

      const authenticateSpy = spyOn(authService, 'authenticate').and.callThrough();
      component.login();
      expect(authenticateSpy).toHaveBeenCalledWith('validUser', 'validPass');
    });

    it('should handle authentication error gracefully', () => {
      component.username = 'invalidUser';
      component.password = 'invalidPass';

      const consoleSpy = spyOn(console, 'error');
      component.login();
      expect(consoleSpy).toHaveBeenCalledWith('Authentication failed:', new Error('Invalid credentials'));
    });
  });

  //////// INTEGRATION TESTS ////////
  describe('Integration Tests', () => {
    let authService: AuthService;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [LoginComponent, HttpClientTestingModule],
        providers: [
          provideRouter([]),
          AuthService
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      router = TestBed.inject(Router);
      authService = TestBed.inject(AuthService);
      httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should authenticate and store data from backend', () => {
      component.username = 'realUser';
      component.password = 'realPass';

      const navigateSpy = spyOn(router, 'navigate');
      const localStorageSetItemSpy = spyOn(localStorage, 'setItem');

      component.login();

      const req = httpMock.expectOne('http://localhost:5038/api/login');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        username: 'realUser',
        password: 'realPass'
      });

      req.flush({
        headerValue: 'real-token',
        username: 'realUser',
        id: '123'
      });

      expect(localStorageSetItemSpy).toHaveBeenCalledWith('headerValue', 'real-token');
      expect(localStorageSetItemSpy).toHaveBeenCalledWith('username', 'realUser');
      expect(localStorageSetItemSpy).toHaveBeenCalledWith('id', '123');
      expect(navigateSpy).toHaveBeenCalledWith(['home']);
    });

    it('should handle backend auth error gracefully', () => {
      component.username = 'wrong';
      component.password = 'wrong';

      const consoleSpy = spyOn(console, 'error');
      component.login();

      const req = httpMock.expectOne('http://localhost:5038/api/login');
      req.flush({ message: 'Invalid credentials' }, { status: 401, statusText: 'Unauthorized' });

      expect(consoleSpy).toHaveBeenCalledWith('Authentication failed:', jasmine.any(Error));
    });
  });
});
