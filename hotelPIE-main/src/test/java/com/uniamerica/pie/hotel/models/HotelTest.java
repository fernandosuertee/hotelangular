package com.uniamerica.pie.hotel.models;

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

public class HotelTest {

    private Validator validator;

    @BeforeEach
    public void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        this.validator = factory.getValidator();
    }

    @Test
    @DisplayName("Deve lançar ConstraintViolationException quando o nome do hotel for inválido")
    public void testNomeHotelInvalido() {
        Hotel hotel = new Hotel("", "Rua Exemplo, 123", "Hotel de exemplo", 10);

        Set<ConstraintViolation<Hotel>> violations = validator.validate(hotel);

        assertThrows(ConstraintViolationException.class, () -> {
            if (!violations.isEmpty()) {
                throw new ConstraintViolationException(violations);
            }
        });
    }

    @Test
    @DisplayName("Deve passar quando todos os campos do hotel forem válidos")
    public void testHotelValido() {
        Hotel hotel = new Hotel("Hotel Exemplo", "Rua Exemplo, 123", "Hotel de exemplo", 10);

        Set<ConstraintViolation<Hotel>> violations = validator.validate(hotel);

        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }
    }
}