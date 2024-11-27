package com.uniamerica.pie.hotel.services;



import java.time.LocalDate;


import org.junit.jupiter.api.BeforeEach;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.uniamerica.pie.hotel.models.Hospede;
import com.uniamerica.pie.hotel.models.Hotel;
import com.uniamerica.pie.hotel.models.Quarto;
import com.uniamerica.pie.hotel.models.Reserva;
import com.uniamerica.pie.hotel.repositories.HospedeRepository;
import com.uniamerica.pie.hotel.repositories.HotelRepository;
import com.uniamerica.pie.hotel.repositories.QuartoRepository;
import com.uniamerica.pie.hotel.repositories.ReservaRepository;

@SpringBootTest
public class ReservaServiceTest {

    @Mock
    private ReservaRepository reservaRepository;

    @Mock
    private QuartoRepository quartoRepository;

    @Mock
    private HotelRepository hotelRepository;

    @Mock
    private HospedeRepository hospedeRepository;

    @InjectMocks
    private ReservaService reservaService;

    private Reserva reserva;

    @BeforeEach
    void setUp() {
        Hospede hospede = new Hospede("John Doe", "john@example.com");
        Hotel hotel = new Hotel("Hotel Exemplo", "Rua Exemplo, 123", "Hotel Luxo", 50);
        Quarto quarto = new Quarto("101", "Luxo", "Disponível", hotel);
        reserva = new Reserva(hospede, hotel, quarto, LocalDate.now(), LocalDate.now().plusDays(2), 2, "Pendente");
    }

    /*@Test
    @DisplayName("Deve lançar exceção ao tentar cadastrar uma reserva para um quarto indisponível")
    void testCadastrarReservaQuartoIndisponivel() {
        when(quartoRepository.findById(any())).thenReturn(Optional.of(reserva.getQuarto()));
        when(reservaRepository.findByQuartoAndDataCheckInLessThanEqualAndDataCheckOutGreaterThanEqual(any(), any(), any()))
                .thenReturn(List.of(reserva));

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            reservaService.cadastrarReserva(reserva);
        });

        assertEquals("Quarto não está disponível nas datas selecionadas.", exception.getMessage());
    }

    @Test
    @DisplayName("Deve cadastrar uma nova reserva com sucesso")
    void testCadastrarReservaComSucesso() {
        when(hospedeRepository.findById(any())).thenReturn(Optional.of(reserva.getHospede()));
        when(hotelRepository.findById(any())).thenReturn(Optional.of(reserva.getHotel()));
        when(quartoRepository.findById(any())).thenReturn(Optional.of(reserva.getQuarto()));
        when(reservaRepository.save(any())).thenReturn(reserva);

        Reserva novaReserva = reservaService.cadastrarReserva(reserva);
        assertEquals("Pendente", novaReserva.getStatus());
    }*/
}