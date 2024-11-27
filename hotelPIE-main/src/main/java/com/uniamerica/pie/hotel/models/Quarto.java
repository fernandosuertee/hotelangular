package com.uniamerica.pie.hotel.models;

import java.util.List;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


@Entity
@Table (name = "quartos")
public class Quarto {
	
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull(message = "O número do quarto é obrigatório")
    @Column(name = "numero", nullable = false)
    //@Size(min = 1, max = 100, message = "O número do quarto deve ter até 100 caracteres")
    private String numero;

    @NotBlank(message = "O tipo do quarto é obrigatório")
    @Column(name = "tipo", nullable = false)
    private String tipo;

    @NotBlank(message = "O status é obrigatório")
    @Column(name = "status", nullable = false)
    private String status;

    @NotNull(message = "A capacidade mínima é obrigatória")
    @Column(name = "capacidade_minima", nullable = false)
    private Integer capacidadeMinima;

    @NotNull(message = "A capacidade máxima é obrigatória")
    @Column(name = "capacidade_maxima", nullable = false)
    private Integer capacidadeMaxima;

    @ManyToOne(fetch = FetchType.EAGER) 
    @JoinColumn(name = "hotel_id", nullable = false)
    @JsonIgnoreProperties("quartos") 
    private Hotel hotel;


    @OneToMany(mappedBy = "quarto")
    @JsonIgnoreProperties("quarto")
    private List<Reserva> reservas;

  

    public Quarto(String numero, String tipo, String status, Integer capacidadeMinima, Integer capacidadeMaxima, Hotel hotel) {
        this.numero = numero;
        this.tipo = tipo;
        this.status = status;
        this.capacidadeMinima = capacidadeMinima;
        this.capacidadeMaxima = capacidadeMaxima;
        this.hotel = hotel;
    }

    
	
	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public String getNumero() {
		return numero;
	}



	public void setNumero(String numero) {
		this.numero = numero;
	}



	public String getTipo() {
		return tipo;
	}



	public void setTipo(String tipo) {
		this.tipo = tipo;
	}



	public String getStatus() {
		return status;
	}



	public void setStatus(String status) {
		this.status = status;
	}



	public Integer getCapacidadeMinima() {
		return capacidadeMinima;
	}



	public void setCapacidadeMinima(Integer capacidadeMinima) {
		this.capacidadeMinima = capacidadeMinima;
	}



	public Integer getCapacidadeMaxima() {
		return capacidadeMaxima;
	}



	public void setCapacidadeMaxima(Integer capacidadeMaxima) {
		this.capacidadeMaxima = capacidadeMaxima;
	}



	public Hotel getHotel() {
		return hotel;
	}



	public void setHotel(Hotel hotel) {
		this.hotel = hotel;
	}



	public List<Reserva> getReservas() {
		return reservas;
	}



	public void setReservas(List<Reserva> reservas) {
		this.reservas = reservas;
	}



	public Quarto() {}

}
