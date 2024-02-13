import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { ProfileService } from '../../services/profile.service';
import { of } from 'rxjs';
describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent]
    });
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



});
describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let profileServiceSpy: jasmine.SpyObj<ProfileService>;

  beforeEach(async () => {
    const profileServiceSpyObj = jasmine.createSpyObj('ProfileService', [
      'getProfileInfo',
      'updateProfile',
      'getProfileRepos'
    ]);

    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [{ provide: ProfileService, useValue: profileServiceSpyObj }]
    }).compileComponents();

    profileServiceSpy = TestBed.inject(ProfileService) as jasmine.SpyObj<ProfileService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle content', () => {
    component.showContent = false;
    component.toggleContent();
    expect(component.showContent).toBe(true);

    component.toggleContent();
    expect(component.showContent).toBe(false);
  });

  it('should update table size', () => {
    const event = { target: { value: 10 } };
    component.onTableSizeChange(event);
    expect(component.tablesize).toBe(10);
    expect(component.page).toBe(1);
  });

  it('should find profile', () => {
    const username = 'testUser';
    component.username = username;

    const profileInfo = { id: 1, name: 'Test User', location: 'Test Location' };
    const reposInfo = [{ name: 'Repo 1', html_url: 'http://repo1.com' }, { name: 'Repo 2', html_url: 'http://repo2.com' }];

    profileServiceSpy.updateProfile.and.stub();
    profileServiceSpy.getProfileInfo.and.returnValue(of(profileInfo));
    profileServiceSpy.getProfileRepos.and.returnValue(of(reposInfo));

    component.findProfile();

    expect(profileServiceSpy.updateProfile).toHaveBeenCalledWith(username);
    expect(profileServiceSpy.getProfileInfo).toHaveBeenCalled();
    expect(profileServiceSpy.getProfileRepos).toHaveBeenCalled();
    expect(component.profile).toEqual(profileInfo);
    expect(component.repos).toEqual(reposInfo);
  });
});