import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RamcountComponent } from './ramcount.component';

describe('RamcountComponent', () => {
  let component: RamcountComponent;
  let fixture: ComponentFixture<RamcountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RamcountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RamcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
