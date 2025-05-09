// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { AccountComponent } from './account.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { Router } from '@angular/router';
// import { provideRouter } from '@angular/router';
// import { UserService } from '../services/user.service';
// import { of, throwError } from 'rxjs';
// import { User } from '../model/user';

// class MockUserService {
//   authHeader: string | null = 'mock-token';

//   getUser(id: number) {
//     return of({
//       id,
//       userName: 'testUser',
//       email: 'test@example.com',
//       password: 'pass123',
//       createdAt: new Date()
//     });
//   }

//   deleteUser(id: number) {
//     return of(true);
//   }
// }

// describe('AccountComponent', () => {
//   let component: AccountComponent;
//   let fixture: ComponentFixture<AccountComponent>;
//   let router: Router;
//   let userService: MockUserService;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AccountComponent, HttpClientTestingModule],
//       providers: [
//         provideRouter([]),
//         { provide: UserService, useClass: MockUserService }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(AccountComponent);
//     component = fixture.componentInstance;
//     router = TestBed.inject(Router);
//     userService = TestBed.inject(UserService) as unknown as MockUserService;
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should redirect to login if authHeader is null', () => {
//     userService.authHeader = null;
//     const navigateSpy = spyOn(router, 'navigate');
//     component.ngOnInit();
//     expect(navigateSpy).toHaveBeenCalledWith(['login']);
//   });

//   it('should fetch user if ID is in localStorage', () => {
//     const testUserId = '5';
//     spyOn(localStorage, 'getItem').and.callFake((key: string) => key === 'id' ? testUserId : null);
//     const getUserSpy = spyOn(userService, 'getUser').and.callThrough();

//     component.ngOnInit();
//     expect(getUserSpy).toHaveBeenCalledWith(Number(testUserId));
//     expect(component.user?.userName).toBe('testUser');
//   });

//   it('should not fetch user if no ID in localStorage', () => {
//     spyOn(localStorage, 'getItem').and.returnValue(null);
//     const getUserSpy = spyOn(userService, 'getUser');
//     component.ngOnInit();
//     expect(getUserSpy).not.toHaveBeenCalled();
//   });

//   it('should navigate to account-edit on goToEditAccount()', () => {
//     const navigateSpy = spyOn(router, 'navigate');
//     component.goToEditAccount();
//     expect(navigateSpy).toHaveBeenCalledWith(['account-edit']);
//   });

//   it('should delete account and navigate to home on confirmation', () => {
//     spyOn(window, 'confirm').and.returnValue(true);
//     spyOn(localStorage, 'getItem').and.callFake((key: string) => key === 'id' ? '7' : null);
//     const navigateSpy = spyOn(router, 'navigate');
//     const deleteSpy = spyOn(userService, 'deleteUser').and.callThrough();
//     spyOn(localStorage, 'removeItem');

//     component.deleteAccount();

//     expect(deleteSpy).toHaveBeenCalledWith(7);
//     expect(localStorage.removeItem).toHaveBeenCalledWith('headerValue');
//     expect(navigateSpy).toHaveBeenCalledWith(['home']);
//   });

//   it('should cancel delete and navigate back to account if not confirmed', () => {
//     spyOn(window, 'confirm').and.returnValue(false);
//     const navigateSpy = spyOn(router, 'navigate');
//     component.deleteAccount();
//     expect(navigateSpy).toHaveBeenCalledWith(['account']);
//   });

//   it('should not delete account if no ID in localStorage', () => {
//     spyOn(window, 'confirm').and.returnValue(true);
//     spyOn(localStorage, 'getItem').and.returnValue(null);
//     const deleteSpy = spyOn(userService, 'deleteUser');
//     component.deleteAccount();
//     expect(deleteSpy).not.toHaveBeenCalled();
//   });

//   it('should handle delete error gracefully', () => {
//     spyOn(window, 'confirm').and.returnValue(true);
//     spyOn(localStorage, 'getItem').and.returnValue('8');
//     spyOn(userService, 'deleteUser').and.returnValue(throwError(() => new Error('Delete failed')));
//     const consoleSpy = spyOn(console, 'error');
//     component.deleteAccount();
//     expect(consoleSpy).toHaveBeenCalledWith('Failed to delete user:', jasmine.any(Error));
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountComponent } from './account.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { UserService } from '../services/user.service';
import { of, throwError } from 'rxjs';
import { User } from '../model/user';

////////// MOCK CLASS FOR UNIT TESTS //////////
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

////////// MAIN TEST SUITE //////////
describe('AccountComponent - Unit + Integration Tests', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let router: Router;

  //////// UNIT TESTS ////////
  describe('Unit Tests', () => {
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

  //////// INTEGRATION TESTS ////////
  describe('Integration Tests', () => {
    let userService: UserService;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [AccountComponent, HttpClientTestingModule],
        providers: [
          provideRouter([]),
          UserService
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(AccountComponent);
      component = fixture.componentInstance;
      router = TestBed.inject(Router);
      userService = TestBed.inject(UserService);
      httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpMock.verify();
    });

    // it('should fetch user from backend on ngOnInit', () => {
    //   spyOn(localStorage, 'getItem').and.returnValue('10');
    //   userService.authHeader = 'real-token';
    //   component.ngOnInit();

    //   const req = httpMock.expectOne('http://localhost:5038/api/user/10');
    //   expect(req.request.method).toBe('GET');
    //   req.flush({
    //     id: 10,
    //     userName: 'realUser',
    //     email: 'real@example.com',
    //     password: 'securepass',
    //     createdAt: new Date()
    //   });

    //   expect(component.user?.userName).toBe('realUser');
    // });

    it('should delete user and clear localStorage on confirmation', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      spyOn(localStorage, 'getItem').and.returnValue('3');
      spyOn(localStorage, 'removeItem');
      const navigateSpy = spyOn(router, 'navigate');

      component.deleteAccount();

      const req = httpMock.expectOne('http://localhost:5038/api/user/3');
      expect(req.request.method).toBe('DELETE');
      req.flush({});

      expect(localStorage.removeItem).toHaveBeenCalledWith('headerValue');
      expect(navigateSpy).toHaveBeenCalledWith(['home']);
    });

    it('should handle backend delete error gracefully', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      spyOn(localStorage, 'getItem').and.returnValue('6');
      const consoleSpy = spyOn(console, 'error');

      component.deleteAccount();

      const req = httpMock.expectOne('http://localhost:5038/api/user/6');
      req.flush({ message: 'Error' }, { status: 500, statusText: 'Server Error' });

      expect(consoleSpy).toHaveBeenCalledWith('Failed to delete user:', jasmine.any(Error));
    });
  });
});
