// import { TestBed } from '@angular/core/testing';

// import { AuthService } from './auth.service';

// describe('AuthService', () => {
//   let service: AuthService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(AuthService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });


import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';  // Import these
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;  // Declare the mock controller

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]  // Import the testing module
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);  // Inject the mock controller
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate user', () => {
    const mockLoginData = { username: 'test', password: 'password' };  // Mock login data
    const mockResponse = { headerValue: 'fake-jwt-token' };  // Mock server response

    // Call the service method
    service.authenticate(mockLoginData.username, mockLoginData.password).subscribe(response => {
      expect(response.headerValue).toBe('fake-jwt-token');
    });

    // Set up mock HTTP request and response
    const req = httpMock.expectOne(`${service.baseUrl}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);  // Respond with the mocked data
  });

  afterEach(() => {
    // Ensure there are no outstanding HTTP requests after each test
    httpMock.verify();
  });
});
