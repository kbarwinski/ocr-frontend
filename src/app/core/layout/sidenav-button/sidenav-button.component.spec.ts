import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavButtonComponent } from './sidenav-button.component';

describe('SidenavButtonComponent', () => {
  let component: SidenavButtonComponent;
  let fixture: ComponentFixture<SidenavButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavButtonComponent],
    });
    fixture = TestBed.createComponent(SidenavButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
