// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { AuthService } from './auth.service';
// import { Login } from '../model/login';

// describe('AuthService', () => {
//   let service: AuthService;
//   let httpMock: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [AuthService]
//     });

//     service = TestBed.inject(AuthService);
//     httpMock = TestBed.inject(HttpTestingController);
//   });

//   afterEach(() => {
//     httpMock.verify(); // Ensure no outstanding requests
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should send a POST request to authenticate the user', () => {
//     const mockResponse: Login = {
//       headerValue: 'some-header',
//       username: 'testUser',
//       id: '123'
//     };

//     service.authenticate('testUser', 'testPass').subscribe(response => {
//       expect(response).toEqual(mockResponse);
//     });

//     const req = httpMock.expectOne('http://localhost:5038/api/login');
//     expect(req.request.method).toBe('POST');
//     expect(req.request.body).toEqual({
//       username: 'testUser',
//       password: 'testPass'
//     });

//     req.flush(mockResponse);
//   });

//   it('should handle HTTP errors properly', () => {
//     const errorMessage = 'Invalid credentials';

//     service.authenticate('wrongUser', 'wrongPass').subscribe({
//       next: () => fail('Should have failed with 401 error'),
//       error: (error) => {
//         expect(error.status).toBe(401);
//         expect(error.statusText).toBe('Unauthorized');
//       }
//     });

//     const req = httpMock.expectOne('http://localhost:5038/api/login');
//     req.flush(errorMessage, { status: 401, statusText: 'Unauthorized' });
//   });
// });


import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Login } from '../model/login';

describe('AuthService - Unit + Integration Tests', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockResponse: Login = {
    headerValue: 'some-header',
    username: 'testUser',
    id: '123'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // No pending HTTP requests
  });

  ///////// UNIT TESTS /////////

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send POST request to authenticate user (Unit)', () => {
    service.authenticate('testUser', 'testPass').subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:5038/api/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      username: 'testUser',
      password: 'testPass'
    });

    req.flush(mockResponse);
  });

  it('should handle HTTP errors properly (Unit)', () => {
    const errorMessage = 'Invalid credentials';

    service.authenticate('wrongUser', 'wrongPass').subscribe({
      next: () => fail('Expected authentication failure'),
      error: (error) => {
        expect(error.status).toBe(401);
        expect(error.statusText).toBe('Unauthorized');
      }
    });

    const req = httpMock.expectOne('http://localhost:5038/api/login');
    req.flush(errorMessage, { status: 401, statusText: 'Unauthorized' });
  });

  ///////// INTEGRATION TESTS /////////

  it('should call correct URL with correct method (Integration)', () => {
    service.authenticate('testUser', 'testPass').subscribe();

    const req = httpMock.expectOne((request) =>
      request.url === 'http://localhost:5038/api/login' && request.method === 'POST'
    );

    expect(req.request.url).toBe('http://localhost:5038/api/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should send correct payload (Integration)', () => {
    service.authenticate('testUser', 'testPass').subscribe();

    const req = httpMock.expectOne('http://localhost:5038/api/login');
    expect(req.request.body).toEqual({
      username: 'testUser',
      password: 'testPass'
    });
    req.flush(mockResponse);
  });

  it('should return valid Login response (Integration)', () => {
    service.authenticate('testUser', 'testPass').subscribe(response => {
      expect(response).toBeTruthy();
      expect(response.headerValue).toBe('some-header');
      expect(response.username).toBe('testUser');
      expect(response.id).toBe('123');
    });

    const req = httpMock.expectOne('http://localhost:5038/api/login');
    req.flush(mockResponse);
  });

  it('should return error when server fails (Integration)', () => {
    service.authenticate('testUser', 'testPass').subscribe({
      next: () => fail('Expected error'),
      error: (err) => {
        expect(err.status).toBe(500);
        expect(err.statusText).toBe('Internal Server Error');
      }
    });

    const req = httpMock.expectOne('http://localhost:5038/api/login');
    req.flush({ message: 'Server error' }, { status: 500, statusText: 'Internal Server Error' });
  });
});
