import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarHotelComponent } from './gerenciar-hotel.component';

describe('GerenciarHotelComponent', () => {
  let component: GerenciarHotelComponent;
  let fixture: ComponentFixture<GerenciarHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarHotelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
