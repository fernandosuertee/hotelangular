package com.uniamerica.pie.hotel.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.uniamerica.pie.hotel.models.Hotel;
import com.uniamerica.pie.hotel.models.Quarto;
import com.uniamerica.pie.hotel.repositories.QuartoRepository;

@SpringBootTest
public class QuartoServiceTest {

    @Mock
    private QuartoRepository quartoRepository;

    @InjectMocks
    private QuartoService quartoService;

    private Quarto quarto;
    private Hotel hotel;

    @BeforeEach
    void setUp() {
        hotel = new Hotel("Hotel Exemplo", "Rua Exemplo", "Hotel 5 estrelas", 100);
        quarto = new Quarto("101", "Luxo", "Disponível", hotel);
        quarto.setId(1L);
    }

    @Test
    @DisplayName("Deve cadastrar um novo quarto")
    void testCadastrarQuarto() {
        when(quartoRepository.save(quarto)).thenReturn(quarto);

        Quarto novoQuarto = quartoService.cadastrarQuarto(quarto);
        assertEquals("101", novoQuarto.getNumero());
        verify(quartoRepository, times(1)).save(quarto);
    }

    @Test
    @DisplayName("Deve lançar exceção se quarto não for encontrado")
    void testBuscarPorIdQuartoNaoEncontrado() {
        when(quartoRepository.findById(1L)).thenReturn(Optional.empty());

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            quartoService.buscarPorId(1L);
        });

        assertEquals("Quarto não encontrado", exception.getMessage());
    }

    @Test
    @DisplayName("Deve atualizar as informações de um quarto")
    void testAtualizarQuarto() {
        when(quartoRepository.findById(1L)).thenReturn(Optional.of(quarto));

        Quarto quartoAtualizado = new Quarto("102", "Standard", "Ocupado", hotel);
        when(quartoRepository.save(quarto)).thenReturn(quarto);

        Quarto result = quartoService.atualizarQuarto(1L, quartoAtualizado);
        assertEquals("102", result.getNumero());
        assertEquals("Standard", result.getTipo());
        assertEquals("Ocupado", result.getStatus());
        verify(quartoRepository, times(1)).save(quarto);
    }

    @Test
    @DisplayName("Deve deletar um quarto existente")
    void testDeletarQuarto() {
        doNothing().when(quartoRepository).deleteById(1L);

        quartoService.deletarQuarto(1L);
        verify(quartoRepository, times(1)).deleteById(1L);
    }
}