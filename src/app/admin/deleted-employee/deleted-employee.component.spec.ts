import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedEmployeeComponent } from './deleted-employee.component';

describe('DeletedEmployeeComponent', () => {
  let component: DeletedEmployeeComponent;
  let fixture: ComponentFixture<DeletedEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletedEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletedEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
