import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VregisterComponent } from './vregister.component';

describe('VregisterComponent', () => {
  let component: VregisterComponent;
  let fixture: ComponentFixture<VregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VregisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
