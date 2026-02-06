import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationsUpdateComponent } from './destinations-update.component';

describe('DestinationsUpdateComponent', () => {
  let component: DestinationsUpdateComponent;
  let fixture: ComponentFixture<DestinationsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationsUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
