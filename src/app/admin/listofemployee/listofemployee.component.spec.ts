import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofemployeeComponent } from './listofemployee.component';

describe('ListofemployeeComponent', () => {
  let component: ListofemployeeComponent;
  let fixture: ComponentFixture<ListofemployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListofemployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListofemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
