import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseusageComponent } from './licenseusage.component';

describe('LicenseusageComponent', () => {
  let component: LicenseusageComponent;
  let fixture: ComponentFixture<LicenseusageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseusageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseusageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
