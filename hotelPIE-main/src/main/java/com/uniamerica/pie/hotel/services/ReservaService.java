package com.uniamerica.pie.hotel.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uniamerica.pie.hotel.models.Hospede;
import com.uniamerica.pie.hotel.models.Hotel;
import com.uniamerica.pie.hotel.models.Quarto;
import com.uniamerica.pie.hotel.models.Reserva;
import com.uniamerica.pie.hotel.repositories.HospedeRepository;
import com.uniamerica.pie.hotel.repositories.HotelRepository;
import com.uniamerica.pie.hotel.repositories.QuartoRepository;
import com.uniamerica.pie.hotel.repositories.ReservaRepository;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private QuartoRepository quartoRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private HospedeRepository hospedeRepository;

    public Reserva cadastrarReserva(Reserva reserva) {

        // Verificar se o hóspede existe
        Hospede hospede = hospedeRepository.findById(reserva.getHospede().getId())
                .orElseThrow(() -> new IllegalArgumentException("Hóspede não encontrado."));

        // Verificar se o hotel existe
        Hotel hotel = hotelRepository.findById(reserva.getHotel().getId())
                .orElseThrow(() -> new IllegalArgumentException("Hotel não encontrado."));

        // Verificar se o quarto existe
        Quarto quarto = quartoRepository.findById(reserva.getQuarto().getId())
                .orElseThrow(() -> new IllegalArgumentException("Quarto não encontrado."));

        // Validar se o quarto pertence ao hotel
        if (!quarto.getHotel().getId().equals(hotel.getId())) {
            throw new IllegalArgumentException("O quarto não pertence ao hotel especificado.");
        }

        // Verificar disponibilidade do quarto
        if (!verificarDisponibilidade(quarto, reserva.getDataCheckIn(), reserva.getDataCheckOut())) {
            throw new IllegalArgumentException("Quarto não está disponível nas datas selecionadas.");
        }

        // Validar número de hóspedes com base na capacidade do quarto
        if (reserva.getNumHospedes() < quarto.getCapacidadeMinima() || reserva.getNumHospedes() > quarto.getCapacidadeMaxima()) {
            throw new IllegalArgumentException(
                    String.format("Número de hóspedes inválido para o tipo de quarto '%s'. O número permitido é entre %d e %d.",
                            quarto.getTipo(), quarto.getCapacidadeMinima(), quarto.getCapacidadeMaxima()));
        }

        // Configurar a reserva
        reserva.setStatus("Pendente");
        reserva.setHospede(hospede);
        reserva.setHotel(hotel);
        reserva.setQuarto(quarto);

        return reservaRepository.save(reserva);
    }

    public Reserva buscarPorId(Long id) {
        return reservaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reserva não encontrada"));
    }

    public List<Reserva> listarTodos() {
        return reservaRepository.findAll();
    }

    public Reserva atualizarReserva(Long id, Reserva reservaAtualizada) {
        Reserva reservaExistente = buscarPorId(id);

        // Verificar entidades relacionadas
        Hospede hospede = hospedeRepository.findById(reservaAtualizada.getHospede().getId())
                .orElseThrow(() -> new IllegalArgumentException("Hóspede não encontrado."));
        Hotel hotel = hotelRepository.findById(reservaAtualizada.getHotel().getId())
                .orElseThrow(() -> new IllegalArgumentException("Hotel não encontrado."));
        Quarto quarto = quartoRepository.findById(reservaAtualizada.getQuarto().getId())
                .orElseThrow(() -> new IllegalArgumentException("Quarto não encontrado."));

        // Validar se o quarto pertence ao hotel
        if (!quarto.getHotel().getId().equals(hotel.getId())) {
            throw new IllegalArgumentException("O quarto não pertence ao hotel especificado.");
        }

        // Verificar disponibilidade do quarto
        if (!verificarDisponibilidadeParaAtualizacao(reservaExistente.getId(), quarto,
                reservaAtualizada.getDataCheckIn(), reservaAtualizada.getDataCheckOut())) {
            throw new IllegalArgumentException("Quarto não está disponível nas datas selecionadas.");
        }

        // Validar número de hóspedes com base na capacidade do quarto
        if (reservaAtualizada.getNumHospedes() < quarto.getCapacidadeMinima()
                || reservaAtualizada.getNumHospedes() > quarto.getCapacidadeMaxima()) {
            throw new IllegalArgumentException(
                    String.format("Número de hóspedes inválido para o tipo de quarto '%s'. O número permitido é entre %d e %d.",
                            quarto.getTipo(), quarto.getCapacidadeMinima(), quarto.getCapacidadeMaxima()));
        }

        // Atualizar os dados da reserva
        reservaExistente.setHospede(hospede);
        reservaExistente.setHotel(hotel);
        reservaExistente.setQuarto(quarto);
        reservaExistente.setDataCheckIn(reservaAtualizada.getDataCheckIn());
        reservaExistente.setDataCheckOut(reservaAtualizada.getDataCheckOut());
        reservaExistente.setNumHospedes(reservaAtualizada.getNumHospedes());
        reservaExistente.setStatus(reservaAtualizada.getStatus());

        return reservaRepository.save(reservaExistente);
    }


    public void deletarReserva(Long id) {
        Reserva reserva = buscarPorId(id);
        reservaRepository.delete(reserva);
    }

    private boolean verificarDisponibilidade(Quarto quarto, LocalDate dataCheckIn, LocalDate dataCheckOut) {
        List<Reserva> reservasExistentes = reservaRepository
                .findByQuartoAndDataCheckInLessThanEqualAndDataCheckOutGreaterThanEqual(quarto, dataCheckOut,
                        dataCheckIn);

        return reservasExistentes.isEmpty();
    }

    private boolean verificarDisponibilidadeParaAtualizacao(Long reservaId, Quarto quarto, LocalDate dataCheckIn,
            LocalDate dataCheckOut) {
        List<Reserva> reservasExistentes = reservaRepository
                .findByQuartoAndDataCheckInLessThanEqualAndDataCheckOutGreaterThanEqualAndIdNot(quarto, dataCheckOut,
                        dataCheckIn, reservaId);

        return reservasExistentes.isEmpty();
    }

}