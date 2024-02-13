import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import { inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
describe('ProfileService', () => {
  let service: ProfileService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService],
    });
    service = TestBed.inject(ProfileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get profile info', () => {
    const mockProfileInfo = { login: 'testUser', name: 'Test User' };
    const username = 'testUser';

    service.updateProfile(username);

    service.getProfileInfo().subscribe((data: any) => {
      expect(data).toEqual(mockProfileInfo);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProfileInfo);
  });

  it('should get profile repositories', () => {
    const mockRepos = [{ name: 'repo1' }, { name: 'repo2' }];
    const username = 'testUser';

    service.updateProfile(username);

    service.getProfileRepos().subscribe((data: any) => {
      expect(data).toEqual(mockRepos);
    });

    const req = httpMock.expectOne(
      `https://api.github.com/users/${username}/repos`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockRepos);
  });
});
