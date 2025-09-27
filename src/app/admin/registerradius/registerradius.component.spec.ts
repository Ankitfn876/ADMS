import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterradiusComponent } from './registerradius.component';

describe('RegisterradiusComponent', () => {
  let component: RegisterradiusComponent;
  let fixture: ComponentFixture<RegisterradiusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterradiusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterradiusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
