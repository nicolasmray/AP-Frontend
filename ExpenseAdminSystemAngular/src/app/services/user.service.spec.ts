// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { UserService } from './user.service';
// import { User } from '../model/user';

// describe('UserService', () => {
//   let service: UserService;
//   let httpMock: HttpTestingController;

//   const mockUser: User = {
//     id: 1,
//     userName: 'john',
//     email: 'john@example.com',
//     password: 'securePassword123',
//     createdAt: new Date('2023-01-01T00:00:00Z')
//   };

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [UserService]
//     });

//     service = TestBed.inject(UserService);
//     httpMock = TestBed.inject(HttpTestingController);

//     // Simulate auth header in localStorage
//     localStorage.setItem('headerValue', 'Basic mock-auth');
//   });

//   afterEach(() => {
//     httpMock.verify(); // Ensure all requests were matched
//   });

//   it('should retrieve all users', () => {
//     const mockUsers: User[] = [mockUser];

//     service.getUsers().subscribe(users => {
//       expect(users.length).toBe(1);
//       expect(users[0].userName).toBe('john');
//     });

//     const req = httpMock.expectOne(`${service['baseUrl']}/user`);
//     expect(req.request.method).toBe('GET');
//     expect(req.request.headers.get('Authorization')).toBe('Basic mock-auth');
//     req.flush(mockUsers);
//   });

//   it('should retrieve a single user by ID', () => {
//     service.getUser(1).subscribe(user => {
//       expect(user.id).toBe(1);
//       expect(user.userName).toBe('john');
//     });

//     const req = httpMock.expectOne(`${service['baseUrl']}/user/1`);
//     expect(req.request.method).toBe('GET');
//     expect(req.request.headers.get('Authorization')).toBe('Basic mock-auth');
//     req.flush(mockUser);
//   });

//   it('should create a new user', () => {
//     service.createUser(mockUser).subscribe(response => {
//       expect(response).toBeTruthy(); // Customize based on actual API response
//     });

//     const req = httpMock.expectOne(`${service['baseUrl']}/user`);
//     expect(req.request.method).toBe('POST');
//     expect(req.request.body).toEqual(mockUser);
//     req.flush({ success: true });
//   });

//   it('should update an existing user', () => {
//     service.updateUser(mockUser).subscribe(response => {
//       expect(response).toBeTruthy();
//     });

//     const req = httpMock.expectOne(`${service['baseUrl']}/user`);
//     expect(req.request.method).toBe('PUT');
//     expect(req.request.headers.get('Authorization')).toBe('Basic mock-auth');
//     expect(req.request.headers.get('Content-Type')).toBe('application/json');
//     expect(req.request.body).toEqual(mockUser);
//     req.flush({ success: true });
//   });

//   it('should delete a user by ID', () => {
//     service.deleteUser(1).subscribe(response => {
//       expect(response).toBeTruthy();
//     });

//     const req = httpMock.expectOne(`${service['baseUrl']}/user/1`);
//     expect(req.request.method).toBe('DELETE');
//     expect(req.request.headers.get('Authorization')).toBe('Basic mock-auth');
//     req.flush({ success: true });
//   });
// });


import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../model/user';

describe('UserService - Unit + Integration Tests', () => {
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

    localStorage.setItem('headerValue', 'Basic mock-auth');
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.removeItem('headerValue');
  });

  ///////// UNIT TESTS /////////

  it('should retrieve all users (Unit)', () => {
    const mockUsers: User[] = [mockUser];

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(1);
      expect(users[0].userName).toBe('john');
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/user`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should retrieve a single user by ID (Unit)', () => {
    service.getUser(1).subscribe(user => {
      expect(user.id).toBe(1);
      expect(user.userName).toBe('john');
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/user/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should create a new user (Unit)', () => {
    service.createUser(mockUser).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/user`);
    expect(req.request.method).toBe('POST');
    req.flush({ success: true });
  });

  it('should update an existing user (Unit)', () => {
    service.updateUser(mockUser).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/user`);
    expect(req.request.method).toBe('PUT');
    req.flush({ success: true });
  });

  it('should delete a user by ID (Unit)', () => {
    service.deleteUser(1).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/user/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ success: true });
  });

  ///////// INTEGRATION TESTS /////////

  it('should send Authorization header in GET all users (Integration)', () => {
    service.getUsers().subscribe();

    const req = httpMock.expectOne(`${service['baseUrl']}/user`);
    expect(req.request.headers.get('Authorization')).toBe('Basic mock-auth');
    req.flush([]);
  });

  it('should send correct Authorization header on GET user by ID (Integration)', () => {
    service.getUser(1).subscribe();

    const req = httpMock.expectOne(`${service['baseUrl']}/user/1`);
    expect(req.request.headers.get('Authorization')).toBe('Basic mock-auth');
    req.flush(mockUser);
  });

  it('should send correct payload on POST (Integration)', () => {
    service.createUser(mockUser).subscribe();

    const req = httpMock.expectOne(`${service['baseUrl']}/user`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUser);
    req.flush({ success: true });
  });

  it('should send correct headers and payload on PUT (Integration)', () => {
    service.updateUser(mockUser).subscribe();

    const req = httpMock.expectOne(`${service['baseUrl']}/user`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe('Basic mock-auth');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual(mockUser);
    req.flush({ success: true });
  });

  it('should send correct Authorization header on DELETE (Integration)', () => {
    service.deleteUser(1).subscribe();

    const req = httpMock.expectOne(`${service['baseUrl']}/user/1`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe('Basic mock-auth');
    req.flush({ success: true });
  });

  it('should handle error on failed GET user (Integration)', () => {
    const consoleSpy = spyOn(console, 'error');

    service.getUser(999).subscribe({
      next: () => fail('Should have thrown error'),
      error: err => {
        expect(err.status).toBe(404);
      }
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/user/999`);
    req.flush({ message: 'Not found' }, { status: 404, statusText: 'Not Found' });

    expect(consoleSpy).toHaveBeenCalled();
  });
});
