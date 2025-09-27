import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterdesignationComponent } from './registerdesignation.component';

describe('RegisterdesignationComponent', () => {
  let component: RegisterdesignationComponent;
  let fixture: ComponentFixture<RegisterdesignationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterdesignationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterdesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
