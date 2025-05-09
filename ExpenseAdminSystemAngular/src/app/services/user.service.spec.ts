import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../model/user';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockUser: User = {
    id: 1,
    userName: 'john',
    email: 'john@example.com',
    password: 'securePassword123',
    createdAt: new Date('2023-01-01T00:00:00Z')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);

    // Simulate auth header in localStorage
    localStorage.setItem('headerValue', 'Basic mock-auth');
  });

  afterEach(() => {
    httpMock.verify(); // Ensure all requests were matched
  });

  it('should retrieve all users', () => {
    const mockUsers: User[] = [mockUser];

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(1);
      expect(users[0].userName).toBe('john');
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/user`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Basic mock-auth');
    req.flush(mockUsers);
  });

  it('should retrieve a single user by ID', () => {
    service.getUser(1).subscribe(user => {
      expect(user.id).toBe(1);
      expect(user.userName).toBe('john');
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/user/1`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Basic mock-auth');
    req.flush(mockUser);
  });

  it('should create a new user', () => {
    service.createUser(mockUser).subscribe(response => {
      expect(response).toBeTruthy(); // Customize based on actual API response
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/user`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUser);
    req.flush({ success: true });
  });

  it('should update an existing user', () => {
    service.updateUser(mockUser).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/user`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe('Basic mock-auth');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual(mockUser);
    req.flush({ success: true });
  });

  it('should delete a user by ID', () => {
    service.deleteUser(1).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/user/1`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe('Basic mock-auth');
    req.flush({ success: true });
  });
});
