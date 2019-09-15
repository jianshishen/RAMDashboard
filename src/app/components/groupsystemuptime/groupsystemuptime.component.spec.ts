import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsystemuptimeComponent } from './groupsystemuptime.component';

describe('GroupsystemuptimeComponent', () => {
  let component: GroupsystemuptimeComponent;
  let fixture: ComponentFixture<GroupsystemuptimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsystemuptimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsystemuptimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
