package com.uniamerica.pie.hotel.repositories;


import org.junit.jupiter.api.BeforeEach;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.uniamerica.pie.hotel.models.Hotel;


@SpringBootTest
public class QuartoRepositoryTest {

    @Autowired
    private QuartoRepository quartoRepository;

    @Autowired
    private HotelRepository hotelRepository;

    private Hotel hotel;

    @BeforeEach
    void setUp() {
        quartoRepository.deleteAll();
        hotelRepository.deleteAll();

        hotel = hotelRepository.save(new Hotel("Hotel Exemplo", "Rua Exemplo", "Hotel de teste", 50));
    }

    /*@Test
    @DisplayName("Deve buscar quartos por hotel e status")
    void testBuscarQuartosPorHotelEStatus() {
        Quarto quartoDisponivel = new Quarto("101", "Luxo", "Disponível", hotel);
        Quarto quartoOcupado = new Quarto("102", "Standard", "Ocupado", hotel);
        quartoRepository.save(quartoDisponivel);
        quartoRepository.save(quartoOcupado);

        List<Quarto> quartosDisponiveis = quartoRepository.findByHotelAndStatus(hotel, "Disponível");
        assertEquals(1, quartosDisponiveis.size());
        assertEquals("101", quartosDisponiveis.get(0).getNumero());
    }*/
}