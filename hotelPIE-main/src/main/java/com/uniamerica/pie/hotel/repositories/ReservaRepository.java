package com.uniamerica.pie.hotel.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uniamerica.pie.hotel.models.Quarto;
import com.uniamerica.pie.hotel.models.Reserva;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
	
    List<Reserva> findByHotelIdAndQuartoIdAndDataCheckInLessThanEqualAndDataCheckOutGreaterThanEqual(
    		
            Long hotelId, Long quartoId, LocalDate dataCheckOut, LocalDate dataCheckIn);
    
    
    List<Reserva> findByQuartoAndDataCheckInLessThanEqualAndDataCheckOutGreaterThanEqual(Quarto quarto,
            LocalDate dataCheckOut, LocalDate dataCheckIn);

    List<Reserva> findByQuartoAndDataCheckInLessThanEqualAndDataCheckOutGreaterThanEqualAndIdNot(Quarto quarto,
            LocalDate dataCheckOut, LocalDate dataCheckIn, Long id);
    

    List<Reserva> findByQuartoIdAndDataCheckOutAfter(Long quartoId, LocalDate data);
}