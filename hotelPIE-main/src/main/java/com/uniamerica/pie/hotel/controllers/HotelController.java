package com.uniamerica.pie.hotel.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uniamerica.pie.hotel.models.Hotel;
import com.uniamerica.pie.hotel.repositories.QuartoRepository;
import com.uniamerica.pie.hotel.services.HotelService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/hoteis")
@CrossOrigin(origins = "http://localhost:4200")
public class HotelController {

	
    @Autowired
    private HotelService hotelService;

    @Autowired
    private QuartoRepository quartoRepository;
    
    @PostMapping
    public ResponseEntity<?> cadastrarHotel(@Valid @RequestBody Hotel hotel) {
        try {
            Hotel novoHotel = hotelService.cadastrarHotel(hotel);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoHotel);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro de validação: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro inesperado: " + e.getMessage());
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<Hotel> buscarHotelPorId(@PathVariable Long id) {
        Hotel hotel = hotelService.buscarPorId(id);
        hotel.setQuartosCadastrados((int) quartoRepository.countByHotelId(hotel.getId())); // Atualize quartosCadastrados
        return ResponseEntity.ok(hotel);
    }

    @GetMapping
    public ResponseEntity<List<Hotel>> listarTodosOsHoteis() {
        List<Hotel> hoteis = hotelService.listarTodos();
        hoteis.forEach(hotel -> {
            hotel.setQuartosCadastrados((int) quartoRepository.countByHotelId(hotel.getId())); // Atualize para cada hotel
        });
        return ResponseEntity.ok(hoteis);
    }



    @PutMapping("/{id}")
    public ResponseEntity<Hotel> atualizarHotel(@PathVariable Long id, @Valid @RequestBody Hotel hotelAtualizado) {
        Hotel hotel = hotelService.atualizarHotel(id, hotelAtualizado);
        return ResponseEntity.ok(hotel);
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarHotel(@PathVariable Long id) {
        hotelService.deletarHotel(id);
        return ResponseEntity.noContent().build();
    }
    
}
