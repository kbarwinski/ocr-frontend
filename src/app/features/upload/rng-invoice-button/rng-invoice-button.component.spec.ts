import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RngInvoiceButtonComponent } from './rng-invoice-button.component';

describe('RngInvoiceButtonComponent', () => {
  let component: RngInvoiceButtonComponent;
  let fixture: ComponentFixture<RngInvoiceButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RngInvoiceButtonComponent]
    });
    fixture = TestBed.createComponent(RngInvoiceButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
