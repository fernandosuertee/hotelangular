package com.uniamerica.pie.hotel.repositories;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;

import com.uniamerica.pie.hotel.models.Hospede;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class HospedeRepositoryTest {

    @Autowired
    private HospedeRepository hospedeRepository;

    @Autowired
    private ReservaRepository reservaRepository; 

    @BeforeEach
    void setUp() {
        
        reservaRepository.deleteAll();
        hospedeRepository.deleteAll();
    }

    @Test
    @DisplayName("Deve lançar exceção de violação de chave única ao tentar salvar dois hóspedes com o mesmo e-mail")
    void testEmailDuplicadoNoBancoDeDados() {
        
        Hospede hospede1 = new Hospede("Ana Silva", "ana@exemplo.com");
        hospedeRepository.saveAndFlush(hospede1);

        
        Hospede hospede2 = new Hospede("Ana Oliveira", "ana@exemplo.com");

        assertThrows(DataIntegrityViolationException.class, () -> {
            hospedeRepository.saveAndFlush(hospede2);
        });
    }
}