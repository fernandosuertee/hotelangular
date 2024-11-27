package com.uniamerica.pie.hotel.models;

import java.util.List;


import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;


@Entity
@Table
public class Hospede {
	
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    
    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 3, max = 50, message = "Nome deve ter entre 3 e 50 caracteres")
    @Column(name = "nome", nullable = false)
    private String nome;
    
    @NotBlank(message = "Email é obrigatório")
    @Column(name = "email", nullable = false, unique = true)
    @Pattern(regexp = "^[^@]+@[^@]+\\.[^@]+$", message = "Formato de e-mail inválido")
    private String email;

    
    @OneToMany(mappedBy = "hospede")
    @JsonManagedReference
    private List<Reserva> reservas;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<Reserva> getReservas() {
		return reservas;
	}

	public void setReservas(List<Reserva> reservas) {
		this.reservas = reservas;
	}

   
	public Hospede() {}

	 
	public Hospede(String nome, String email) {
		this.nome = nome;
		this.email = email;
	}
	
}