// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { LoginComponent } from './login.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [LoginComponent, HttpClientTestingModule]
//     })
//     .compileComponents();
    
//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { of, throwError } from 'rxjs';

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

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
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

    expect(navigateSpy).not.toHaveBeenCalled(); // No navigation should happen
    expect(localStorage.setItem).not.toHaveBeenCalled(); // No localStorage changes
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
    //expect(consoleSpy).toHaveBeenCalledWith('Invalid credentials');
    expect(consoleSpy).toHaveBeenCalledWith('Authentication failed:', new Error('Invalid credentials'));

  });
});
