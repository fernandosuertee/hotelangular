package com.uniamerica.pie.hotel.repositories;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.uniamerica.pie.hotel.models.Hospede;
import com.uniamerica.pie.hotel.models.Hotel;
import com.uniamerica.pie.hotel.models.Quarto;
import com.uniamerica.pie.hotel.models.Reserva;

@SpringBootTest
public class ReservaRepositoryTest {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private QuartoRepository quartoRepository;

    @Autowired
    private HospedeRepository hospedeRepository;

    private Hospede hospede;
    private Hotel hotel;
    private Quarto quarto;

    @BeforeEach
    void setUp() {
        reservaRepository.deleteAll();
        hospede = hospedeRepository.save(new Hospede("John Doe", "john@example.com"));
        hotel = hotelRepository.save(new Hotel("Hotel Exemplo", "Rua Exemplo, 123", "Hotel Luxo", 50));
        quarto = quartoRepository.save(new Quarto("101", "Luxo", "Disponível", hotel));
    }

    @Test
    @DisplayName("Deve salvar e buscar uma reserva pelo ID")
    void testSalvarEBuscarReserva() {
        Reserva reserva = new Reserva(hospede, hotel, quarto, LocalDate.now(), LocalDate.now().plusDays(2), 2, "Pendente");
        reservaRepository.save(reserva);

        Optional<Reserva> reservaEncontrada = reservaRepository.findById(reserva.getId());
        assertTrue(reservaEncontrada.isPresent());
        assertEquals(hospede.getNome(), reservaEncontrada.get().getHospede().getNome());
    }

    /*@Test
    @DisplayName("Deve encontrar reservas por quarto e datas")
    void testFindByQuartoAndDatas() {
        Reserva reserva = new Reserva(hospede, hotel, quarto, LocalDate.now(), LocalDate.now().plusDays(2), 2, "Pendente");
        reservaRepository.save(reserva);

        List<Reserva> reservas = reservaRepository.findByQuartoAndDataCheckInLessThanEqualAndDataCheckOutGreaterThanEqual(quarto, LocalDate.now().plusDays(2), LocalDate.now());
        assertEquals(1, reservas.size());
    }*/
}