import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherTripComponent } from './publisher-trip.component';

describe('PublisherTripComponent', () => {
  let component: PublisherTripComponent;
  let fixture: ComponentFixture<PublisherTripComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublisherTripComponent]
    });
    fixture = TestBed.createComponent(PublisherTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
