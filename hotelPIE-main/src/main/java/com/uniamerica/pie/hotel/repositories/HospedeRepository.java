package com.uniamerica.pie.hotel.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uniamerica.pie.hotel.models.Hospede;



@Repository
public interface HospedeRepository extends JpaRepository<Hospede, Long> {
	
    Optional<Hospede> findByEmail(String email);
}

