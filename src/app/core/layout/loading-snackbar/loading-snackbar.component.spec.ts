import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarComponent } from './loading-snackbar.component';

describe('SnackBarComponent', () => {
  let component: SnackBarComponent;
  let fixture: ComponentFixture<SnackBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SnackBarComponent],
    });
    fixture = TestBed.createComponent(SnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
