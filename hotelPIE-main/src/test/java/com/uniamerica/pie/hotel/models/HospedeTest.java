package com.uniamerica.pie.hotel.models;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Set;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class HospedeTest {

    private Validator validator;

    @BeforeEach
    public void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    @DisplayName("Teste de criação de hóspede com dados válidos")
    public void testHospedeValido() {
        Hospede hospede = new Hospede("Carlos Souza", "carlos@exemplo.com");

        Set<ConstraintViolation<Hospede>> violations = validator.validate(hospede);

        // Não deve haver violações
        assertTrue(violations.isEmpty());
    }

    @Test
    @DisplayName("Teste de criação de hóspede com nome inválido (menor que 3 caracteres)")
    public void testNomeInvalidoMenorQue3Caracteres() {
        Hospede hospede = new Hospede("Ca", "carlos@exemplo.com");

        Set<ConstraintViolation<Hospede>> violations = validator.validate(hospede);

        assertEquals(1, violations.size());
        ConstraintViolation<Hospede> violation = violations.iterator().next();
        assertEquals("Nome deve ter entre 3 e 50 caracteres", violation.getMessage());
    }

    @Test
    @DisplayName("Teste de criação de hóspede com nome inválido (maior que 50 caracteres)")
    public void testNomeInvalidoMaiorQue50Caracteres() {
        Hospede hospede = new Hospede("Carlos Souza Carlos Souza Carlos Souza Carlos Souza Carlos Souza", "carlos@exemplo.com");

        Set<ConstraintViolation<Hospede>> violations = validator.validate(hospede);

        assertEquals(1, violations.size());
        ConstraintViolation<Hospede> violation = violations.iterator().next();
        assertEquals("Nome deve ter entre 3 e 50 caracteres", violation.getMessage());
    }

    @Test
    @DisplayName("Teste de criação de hóspede com email inválido (formato incorreto)")
    public void testEmailInvalido() {
        Hospede hospede = new Hospede("Carlos Souza", "carlos.exemplo.com");  // Email inválido

        Set<ConstraintViolation<Hospede>> violations = validator.validate(hospede);

        assertEquals(1, violations.size());
        ConstraintViolation<Hospede> violation = violations.iterator().next();
        assertEquals("Formato de e-mail inválido", violation.getMessage());
    }

    @Test
    @DisplayName("Teste de criação de hóspede sem nome (campo obrigatório)")
    public void testNomeObrigatorio() {
        Hospede hospede = new Hospede(null, "carlos@exemplo.com");

        Set<ConstraintViolation<Hospede>> violations = validator.validate(hospede);

        assertEquals(1, violations.size());
        ConstraintViolation<Hospede> violation = violations.iterator().next();
        assertEquals("Nome é obrigatório", violation.getMessage());
    }

    @Test
    @DisplayName("Teste de criação de hóspede sem email (campo obrigatório)")
    public void testEmailObrigatorio() {
        Hospede hospede = new Hospede("Carlos Souza", null);

        Set<ConstraintViolation<Hospede>> violations = validator.validate(hospede);

        assertEquals(1, violations.size());
        ConstraintViolation<Hospede> violation = violations.iterator().next();
        assertEquals("Email é obrigatório", violation.getMessage());
    }
}