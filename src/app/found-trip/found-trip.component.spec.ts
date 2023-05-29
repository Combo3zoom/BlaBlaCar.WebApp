import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundTripComponent } from './found-trip.component';

describe('FoundTripComponent', () => {
  let component: FoundTripComponent;
  let fixture: ComponentFixture<FoundTripComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoundTripComponent]
    });
    fixture = TestBed.createComponent(FoundTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
