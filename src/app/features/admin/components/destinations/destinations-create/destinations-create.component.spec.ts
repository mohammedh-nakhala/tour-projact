import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationsCreateComponent } from './destinations-create.component';

describe('DestinationsCreateComponent', () => {
  let component: DestinationsCreateComponent;
  let fixture: ComponentFixture<DestinationsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationsCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
