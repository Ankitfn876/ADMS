import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmployeeUserComponent } from './create-employee-user.component';

describe('CreateEmployeeUserComponent', () => {
  let component: CreateEmployeeUserComponent;
  let fixture: ComponentFixture<CreateEmployeeUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEmployeeUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEmployeeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
