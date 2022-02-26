import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarlyBirdSuccessComponent } from './early-bird-success.component';

describe('EarlyBirdSuccessComponent', () => {
  let component: EarlyBirdSuccessComponent;
  let fixture: ComponentFixture<EarlyBirdSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarlyBirdSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EarlyBirdSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
