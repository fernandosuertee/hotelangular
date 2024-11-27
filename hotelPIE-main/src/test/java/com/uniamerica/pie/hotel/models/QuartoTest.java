package com.uniamerica.pie.hotel.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

public class QuartoTest {

    private Validator validator;
    private Hotel hotel;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
        hotel = new Hotel("Hotel Exemplo", "Rua Exemplo", "Hotel 5 estrelas", 100);
    }

    @Test
    @DisplayName("Deve validar um quarto válido")
    void testQuartoValido() {
        Quarto quarto = new Quarto("101", "Luxo", "Disponível", hotel);
        Set<ConstraintViolation<Quarto>> violations = validator.validate(quarto);

        assertEquals(0, violations.size(), "Não deve haver violações para um quarto válido.");
    }

    @Test
    @DisplayName("Deve lançar exceção quando o número do quarto for nulo")
    void testNumeroQuartoNulo() {
        Quarto quarto = new Quarto(null, "Luxo", "Disponível", hotel);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            validarQuarto(quarto);
        });

        assertEquals("O numero do quarto é obrigatório", exception.getConstraintViolations().iterator().next().getMessage());
    }

    @Test
    @DisplayName("Deve lançar exceção quando o tipo do quarto for em branco")
    void testTipoQuartoEmBranco() {
        Quarto quarto = new Quarto("101", "", "Disponível", hotel);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            validarQuarto(quarto);
        });

        assertEquals("O tipo do quarto é obrigatório", exception.getConstraintViolations().iterator().next().getMessage());
    }

    @Test
    @DisplayName("Deve lançar exceção quando o status do quarto for em branco")
    void testStatusQuartoEmBranco() {
        Quarto quarto = new Quarto("101", "Luxo", "", hotel);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            validarQuarto(quarto);
        });

        assertEquals("O status é obrigatório", exception.getConstraintViolations().iterator().next().getMessage());
    }

    private void validarQuarto(Quarto quarto) {
        Set<ConstraintViolation<Quarto>> violations = validator.validate(quarto);

        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }
    }
}