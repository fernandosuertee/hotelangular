package com.uniamerica.pie.hotel.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.time.LocalDate;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

public class ReservaTest {

    private Validator validator;
    private Hospede hospede;
    private Hotel hotel;
    private Quarto quarto;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
        hospede = new Hospede("John Doe", "john@example.com");
        hotel = new Hotel("Hotel Exemplo", "Rua Exemplo, 123", "Hotel Luxo", 50);
        quarto = new Quarto("101", "Luxo", "Disponível", hotel);
    }

    @Test
    @DisplayName("Deve validar uma reserva válida")
    void testReservaValida() {
        Reserva reserva = new Reserva(hospede, hotel, quarto, LocalDate.now(), LocalDate.now().plusDays(2), 2, "Pendente");
        Set<ConstraintViolation<Reserva>> violations = validator.validate(reserva);
        assertEquals(0, violations.size(), "Não deve haver violações para uma reserva válida.");
    }

    @Test
    @DisplayName("Deve lançar exceção quando a data de check-in for nula")
    void testDataCheckInNula() {
        Reserva reserva = new Reserva(hospede, hotel, quarto, null, LocalDate.now().plusDays(2), 2, "Pendente");

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            validarReserva(reserva);
        });

        assertEquals("Data de check-in é obrigatória", exception.getConstraintViolations().iterator().next().getMessage());
    }

    @Test
    @DisplayName("Deve lançar exceção quando a data de check-out for nula")
    void testDataCheckOutNula() {
        Reserva reserva = new Reserva(hospede, hotel, quarto, LocalDate.now(), null, 2, "Pendente");

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            validarReserva(reserva);
        });

        assertEquals("Data de check-out é obrigatória", exception.getConstraintViolations().iterator().next().getMessage());
    }

    @Test
    @DisplayName("Deve lançar exceção quando o número de hóspedes for nulo")
    void testNumHospedesNulo() {
        Reserva reserva = new Reserva(hospede, hotel, quarto, LocalDate.now(), LocalDate.now().plusDays(2), null, "Pendente");

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            validarReserva(reserva);
        });

        assertEquals("Número de hóspedes é obrigatório", exception.getConstraintViolations().iterator().next().getMessage());
    }

    private void validarReserva(Reserva reserva) {
        Set<ConstraintViolation<Reserva>> violations = validator.validate(reserva);

        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }
    }
}