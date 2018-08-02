import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursepageComponent } from './coursepage.component';

describe('CoursepageComponent', () => {
  let component: CoursepageComponent;
  let fixture: ComponentFixture<CoursepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
