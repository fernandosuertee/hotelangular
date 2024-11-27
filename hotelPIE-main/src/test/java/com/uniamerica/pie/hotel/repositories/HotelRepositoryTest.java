package com.uniamerica.pie.hotel.repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;


import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.uniamerica.pie.hotel.models.Hotel;

@SpringBootTest
public class HotelRepositoryTest {

    @Autowired
    private HotelRepository hotelRepository;

    @Test
    @DisplayName("Deve salvar e buscar um hotel pelo ID")
    void testSalvarEBuscarHotel() {
        Hotel hotel = new Hotel("Hotel ABC", "Rua XYZ", "Hotel de luxo", 100);
        hotelRepository.save(hotel);

        Optional<Hotel> hotelEncontrado = hotelRepository.findById(hotel.getId());
        assertTrue(hotelEncontrado.isPresent());
        assertEquals("Hotel ABC", hotelEncontrado.get().getNome());
    }

    /*@Test
    @DisplayName("Deve encontrar hotéis pelo endereço")
    void testBuscarPorEndereco() {
        hotelRepository.save(new Hotel("Hotel ", "Rua ", "Hotel ", 50));

        List<Hotel> hoteis = hotelRepository.findByEnderecoContainingIgnoreCase("Rua ABC");
        assertEquals(1, hoteis.size());
        assertEquals("Hotel DEF", hoteis.get(0).getNome());
    }*/
}

