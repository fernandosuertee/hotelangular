package com.uniamerica.pie.hotel.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uniamerica.pie.hotel.models.Quarto;
import com.uniamerica.pie.hotel.models.Hotel;

@Repository
public interface QuartoRepository extends JpaRepository<Quarto, Long> {

    boolean existsByNumeroAndHotelId(String numero, Long hotelId);

    void deleteAllByHotel(Hotel hotel);

    List<Quarto> findByHotel(Hotel hotel);
    

    long countByHotelId(Long hotelId);
}
