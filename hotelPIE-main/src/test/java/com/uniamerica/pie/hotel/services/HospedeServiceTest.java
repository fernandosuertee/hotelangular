package com.uniamerica.pie.hotel.services;

import com.uniamerica.pie.hotel.models.Hospede;
import com.uniamerica.pie.hotel.repositories.HospedeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class HospedeServiceTest {

    @Autowired
    private HospedeService hospedeService;

    @MockBean
    private HospedeRepository hospedeRepository;

    private Hospede hospede;

    @BeforeEach
    void setUp() {
        hospede = new Hospede("Ana Silva", "ana@exemplo.com");
    }

    @Test
    @DisplayName("Deve lançar exceção ao tentar cadastrar hóspede com e-mail duplicado")
    void testCadastrarHospedeEmailDuplicado() {
        
        when(hospedeRepository.findByEmail(hospede.getEmail())).thenReturn(Optional.of(hospede));

        
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            hospedeService.cadastrarHospede(hospede);
        });

        assertEquals("Hóspede com este e-mail já existe", exception.getMessage());

        
        verify(hospedeRepository, times(1)).findByEmail(hospede.getEmail());
        
        verify(hospedeRepository, never()).save(any(Hospede.class));
    }

    @Test
    @DisplayName("Deve cadastrar hóspede com sucesso")
    void testCadastrarHospedeComSucesso() {
        
        when(hospedeRepository.findByEmail(hospede.getEmail())).thenReturn(Optional.empty());
        when(hospedeRepository.save(hospede)).thenReturn(hospede);

        Hospede novoHospede = hospedeService.cadastrarHospede(hospede);

        assertNotNull(novoHospede);
        assertEquals("Ana Silva", novoHospede.getNome());
        assertEquals("ana@exemplo.com", novoHospede.getEmail());

        verify(hospedeRepository, times(1)).findByEmail(hospede.getEmail());
        verify(hospedeRepository, times(1)).save(hospede);
    }

    @Test
    @DisplayName("Deve listar todos os hóspedes")
    void testListarTodos() {
        Hospede hospede1 = new Hospede("João Silva", "joao@exemplo.com");
        Hospede hospede2 = new Hospede("Maria Souza", "maria@exemplo.com");

        when(hospedeRepository.findAll()).thenReturn(Arrays.asList(hospede1, hospede2));

        List<Hospede> hospedes = hospedeService.listarTodos();

        assertEquals(2, hospedes.size());
        assertEquals("João Silva", hospedes.get(0).getNome());
        assertEquals("Maria Souza", hospedes.get(1).getNome());

        verify(hospedeRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("Deve atualizar um hóspede")
    void testAtualizarHospede() {
        Hospede hospedeExistente = new Hospede("João Silva", "joao@exemplo.com");
        hospedeExistente.setId(1L);
        Hospede hospedeAtualizado = new Hospede("João Santos", "joaosantos@exemplo.com");

        when(hospedeRepository.findById(1L)).thenReturn(Optional.of(hospedeExistente));
        when(hospedeRepository.save(hospedeExistente)).thenReturn(hospedeAtualizado);

        Hospede atualizado = hospedeService.atualizarHospede(1L, hospedeAtualizado);

        assertNotNull(atualizado);
        assertEquals("João Santos", atualizado.getNome());
        assertEquals("joaosantos@exemplo.com", atualizado.getEmail());

        verify(hospedeRepository, times(1)).findById(1L);
        verify(hospedeRepository, times(1)).save(hospedeExistente);
    }

    @Test
    @DisplayName("Deve deletar um hóspede")
    void testDeletarHospede() {
        Hospede hospedeExistente = new Hospede("João Silva", "joao@exemplo.com");
        hospedeExistente.setId(1L);

        when(hospedeRepository.findById(1L)).thenReturn(Optional.of(hospedeExistente));
        doNothing().when(hospedeRepository).delete(hospedeExistente);

        assertDoesNotThrow(() -> hospedeService.deletarHospede(1L));

        verify(hospedeRepository, times(1)).findById(1L);
        verify(hospedeRepository, times(1)).delete(hospedeExistente);
    }
}