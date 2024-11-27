package com.uniamerica.pie.hotel.services;

import java.time.LocalDate;
import java.util.List;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uniamerica.pie.hotel.models.Quarto;
import com.uniamerica.pie.hotel.models.Reserva;
import com.uniamerica.pie.hotel.repositories.QuartoRepository;
import com.uniamerica.pie.hotel.repositories.ReservaRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Service
public class QuartoService {

    @Autowired
    private QuartoRepository quartoRepository;

    @Autowired
    private ReservaRepository reservaRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public List<Quarto> listarTodos() {
        List<Quarto> quartos = quartoRepository.findAll();
        quartos.forEach(quarto -> {
            Hibernate.initialize(quarto.getHotel());
        });
        return quartos;
    }

    public Quarto buscarPorId(Long id) {
        Quarto quarto = quartoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Quarto não encontrado"));
        Hibernate.initialize(quarto.getHotel());
        return quarto;
    }

    public Quarto cadastrarQuarto(Quarto quarto) {
        validarCapacidadePorTipo(quarto);

        if (quartoRepository.existsByNumeroAndHotelId(quarto.getNumero(), quarto.getHotel().getId())) {
            throw new IllegalArgumentException("Já existe um quarto com este número neste hotel.");
        }

        return quartoRepository.save(quarto);
    }

    public Quarto atualizarQuarto(Long id, Quarto quartoAtualizado) {
        Quarto quartoExistente = buscarPorId(id);

        if (!quartoExistente.getNumero().equals(quartoAtualizado.getNumero())) {
            if (quartoRepository.existsByNumeroAndHotelId(quartoAtualizado.getNumero(), quartoExistente.getHotel().getId())) {
                throw new IllegalArgumentException("Já existe um quarto com este número neste hotel.");
            }
        }

        validarCapacidadePorTipo(quartoAtualizado);

        quartoExistente.setNumero(quartoAtualizado.getNumero());
        quartoExistente.setTipo(quartoAtualizado.getTipo());
        quartoExistente.setStatus(quartoAtualizado.getStatus());
        quartoExistente.setCapacidadeMinima(quartoAtualizado.getCapacidadeMinima());
        quartoExistente.setCapacidadeMaxima(quartoAtualizado.getCapacidadeMaxima());

        return quartoRepository.save(quartoExistente);
    }

    
    private void validarCapacidadePorTipo(Quarto quarto) {
        switch (quarto.getTipo().toLowerCase()) {
            case "quarto solteiro":
                quarto.setCapacidadeMinima(1);
                quarto.setCapacidadeMaxima(1);
                break;
            case "quarto casal":
                quarto.setCapacidadeMinima(1);
                quarto.setCapacidadeMaxima(2);
                break;
            case "quarto triplo":
                quarto.setCapacidadeMinima(1);
                quarto.setCapacidadeMaxima(3);
                break;
            case "apartamento":
                quarto.setCapacidadeMinima(1);
                quarto.setCapacidadeMaxima(7);
                break;
            case "master deluxe":
                quarto.setCapacidadeMinima(1);
                quarto.setCapacidadeMaxima(2);
                break;
            default:
                throw new IllegalArgumentException("Tipo de quarto inválido.");
        }
    }

    
    public void deletarQuarto(Long id) {
        Quarto quarto = buscarPorId(id);

        // Verificar se o quarto está ocupado
        if ("Ocupado".equalsIgnoreCase(quarto.getStatus())) {
            throw new IllegalArgumentException("Não é possível excluir um quarto ocupado.");
        }

        // Verificar se há reservas ativas ou futuras
        LocalDate hoje = LocalDate.now();
        List<Reserva> reservasAtivas = reservaRepository.findByQuartoIdAndDataCheckOutAfter(id, hoje);

        if (!reservasAtivas.isEmpty()) {
            throw new IllegalArgumentException("Não é possível excluir um quarto com reservas ativas ou futuras.");
        }

        quartoRepository.delete(quarto);
    }
}
