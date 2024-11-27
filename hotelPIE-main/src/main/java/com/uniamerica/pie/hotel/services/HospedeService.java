package com.uniamerica.pie.hotel.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uniamerica.pie.hotel.models.Hospede;
import com.uniamerica.pie.hotel.repositories.HospedeRepository;

@Service
public class HospedeService {

    @Autowired
    private HospedeRepository hospedeRepository;

    public Hospede cadastrarHospede(Hospede hospede) {
        if (hospedeRepository.findByEmail(hospede.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Hóspede com este e-mail já existe");
        }
        return hospedeRepository.save(hospede);
    }

    
    public List<Hospede> listarTodos() {
        return hospedeRepository.findAll();
    }

    
    public Hospede buscarPorId(Long id) {
        return hospedeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hóspede não encontrado"));
    }

    public Hospede atualizarHospede(Long id, Hospede hospedeAtualizado) {
        Hospede hospedeExistente = buscarPorId(id);
        hospedeExistente.setNome(hospedeAtualizado.getNome());
        hospedeExistente.setEmail(hospedeAtualizado.getEmail());
        return hospedeRepository.save(hospedeExistente);
    }

    public void deletarHospede(Long id) {
        Hospede hospede = buscarPorId(id);
        hospedeRepository.delete(hospede);
    }
}