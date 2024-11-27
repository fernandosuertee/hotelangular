package com.uniamerica.pie.hotel.models;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;



@Entity
@Table(name = "reservas")
public class Reserva {

	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

	@ManyToOne
    @JsonBackReference
    @JoinColumn(name = "hospede_id", nullable = false)
    private Hospede hospede;

	@ManyToOne
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;

	@ManyToOne
    @JoinColumn(name = "quarto_id", nullable = false)
    private Quarto quarto;

    @Column(name = "data_checkin", nullable = false)
    @NotNull(message = "Data de check-in é obrigatória")
    private LocalDate dataCheckIn;

    @Column(name = "data_checkout", nullable = false)
    @NotNull(message = "Data de check-out é obrigatória")
    private LocalDate dataCheckOut;

    @NotNull(message = "Número de hóspedes é obrigatório")
    @Min(value = 1, message = "Número de hóspedes deve ser no mínimo 1")
    @Column(name = "num_hospedes", nullable = false)
    private Integer numHospedes;


    @Column(name = "status", nullable = false)
    private String status;

    
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Hospede getHospede() {
		return hospede;
	}

	public void setHospede(Hospede hospede) {
		this.hospede = hospede;
	}

	public Hotel getHotel() {
		return hotel;
	}

	public void setHotel(Hotel hotel) {
		this.hotel = hotel;
	}

	public Quarto getQuarto() {
		return quarto;
	}

	public void setQuarto(Quarto quarto) {
		this.quarto = quarto;
	}

	public LocalDate getDataCheckIn() {
		return dataCheckIn;
	}

	public void setDataCheckIn(LocalDate dataCheckIn) {
		this.dataCheckIn = dataCheckIn;
	}

	public LocalDate getDataCheckOut() {
		return dataCheckOut;
	}

	public void setDataCheckOut(LocalDate dataCheckOut) {
		this.dataCheckOut = dataCheckOut;
	}

	public Integer getNumHospedes() {
		return numHospedes;
	}

	public void setNumHospedes(Integer numHospedes) {
		this.numHospedes = numHospedes;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	
	
	public Reserva() {
    }

    public Reserva(Hospede hospede, Hotel hotel, Quarto quarto, LocalDate dataCheckIn, LocalDate dataCheckOut,
            Integer numHospedes, String status) {
        this.hospede = hospede;
        this.hotel = hotel;
        this.quarto = quarto;
        this.dataCheckIn = dataCheckIn;
        this.dataCheckOut = dataCheckOut;
        this.numHospedes = numHospedes;
        this.status = status;
    }

    
    
}