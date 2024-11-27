package com.uniamerica.pie.hotel.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.uniamerica.pie.hotel.models.Hotel;
import com.uniamerica.pie.hotel.repositories.HotelRepository;

@SpringBootTest
public class HotelServiceTest {

    @Mock
    private HotelRepository hotelRepository;

    @InjectMocks
    private HotelService hotelService;

    @Test
    @DisplayName("Deve lançar exceção ao buscar um hotel não encontrado")
    void testBuscarHotelNaoEncontrado() {
        when(hotelRepository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            hotelService.buscarPorId(1L);
        });

        assertEquals("Hotel não encontrado", exception.getMessage());
    }

    @Test
    @DisplayName("Deve atualizar hotel existente")
    void testAtualizarHotel() {
        Hotel hotelExistente = new Hotel("Hotel ABC", "Rua XYZ", "Hotel simples", 100);
        when(hotelRepository.findById(1L)).thenReturn(Optional.of(hotelExistente));

        Hotel hotelAtualizado = new Hotel("Hotel Atualizado", "Rua XYZ", "Hotel renovado", 150);
        when(hotelRepository.save(hotelExistente)).thenReturn(hotelExistente);

        Hotel result = hotelService.atualizarHotel(1L, hotelAtualizado);
        assertEquals("Hotel Atualizado", result.getNome());
        assertEquals(150, result.getNumeroDeQuartos());
    }
    
    

}
