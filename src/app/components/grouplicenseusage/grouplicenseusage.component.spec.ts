import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrouplicenseusageComponent } from './grouplicenseusage.component';

describe('GrouplicenseusageComponent', () => {
  let component: GrouplicenseusageComponent;
  let fixture: ComponentFixture<GrouplicenseusageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrouplicenseusageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrouplicenseusageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
