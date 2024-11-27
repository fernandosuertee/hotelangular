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

import com.uniamerica.pie.hotel.models.Quarto;
import com.uniamerica.pie.hotel.services.QuartoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/quartos")
@CrossOrigin(origins = "http://localhost:4200")
public class QuartoController {

    @Autowired
    private QuartoService quartoService;


    @PostMapping
    public ResponseEntity<Quarto> cadastrarQuarto(@Valid @RequestBody Quarto quarto) {
        Quarto novoQuarto = quartoService.cadastrarQuarto(quarto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoQuarto);
    }

    
    @GetMapping
    public ResponseEntity<List<Quarto>> listarTodosOsQuartos() {
        List<Quarto> quartos = quartoService.listarTodos();
        return ResponseEntity.ok(quartos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quarto> buscarQuartoPorId(@PathVariable Long id) {
        Quarto quarto = quartoService.buscarPorId(id);
        return ResponseEntity.ok(quarto);
    }

   
    @PutMapping("/{id}")
    public ResponseEntity<Quarto> atualizarQuarto(@PathVariable Long id, @Valid @RequestBody Quarto quartoAtualizado) {
        Quarto quarto = quartoService.atualizarQuarto(id, quartoAtualizado);
        return ResponseEntity.ok(quarto);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarQuarto(@PathVariable Long id) {
        quartoService.deletarQuarto(id);
        return ResponseEntity.noContent().build();
    }
    
}
