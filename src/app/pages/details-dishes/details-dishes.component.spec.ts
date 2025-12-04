import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDishesComponent } from './details-dishes.component';

describe('DetailsDishesComponent', () => {
  let component: DetailsDishesComponent;
  let fixture: ComponentFixture<DetailsDishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsDishesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
