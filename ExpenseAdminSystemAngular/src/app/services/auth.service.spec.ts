import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Login } from '../model/login';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to authenticate the user', () => {
    const mockResponse: Login = {
      headerValue: 'some-header',
      username: 'testUser',
      id: '123'
    };

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

  it('should handle HTTP errors properly', () => {
    const errorMessage = 'Invalid credentials';

    service.authenticate('wrongUser', 'wrongPass').subscribe({
      next: () => fail('Should have failed with 401 error'),
      error: (error) => {
        expect(error.status).toBe(401);
        expect(error.statusText).toBe('Unauthorized');
      }
    });

    const req = httpMock.expectOne('http://localhost:5038/api/login');
    req.flush(errorMessage, { status: 401, statusText: 'Unauthorized' });
  });
});
