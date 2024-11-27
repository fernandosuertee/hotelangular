package com.uniamerica.pie.hotel.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uniamerica.pie.hotel.models.Hotel;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {

    List<Hotel> findByEnderecoContainingIgnoreCase(String endereco);

    boolean existsByNomeIgnoreCase(String nome);
}
