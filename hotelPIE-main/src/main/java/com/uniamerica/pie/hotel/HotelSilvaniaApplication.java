package com.uniamerica.pie.hotel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "API de Reservas", version = "1.0", description = "Documentação da API de Reservas de Hotel"))
public class HotelSilvaniaApplication {

	public static void main(String[] args) {
		SpringApplication.run(HotelSilvaniaApplication.class, args);
	}

}
