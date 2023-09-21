import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdvanceComponent } from './view-advance.component';

describe('ViewAdvanceComponent', () => {
  let component: ViewAdvanceComponent;
  let fixture: ComponentFixture<ViewAdvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAdvanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
