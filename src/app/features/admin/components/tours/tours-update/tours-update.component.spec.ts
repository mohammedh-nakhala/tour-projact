import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToursUpdateComponent } from './tours-update.component';

describe('ToursUpdateComponent', () => {
  let component: ToursUpdateComponent;
  let fixture: ComponentFixture<ToursUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToursUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToursUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
