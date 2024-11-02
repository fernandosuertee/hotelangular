import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarHotelComponent } from './cadastrar-hotel.component';

describe('CadastrarHotelComponent', () => {
  let component: CadastrarHotelComponent;
  let fixture: ComponentFixture<CadastrarHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarHotelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
