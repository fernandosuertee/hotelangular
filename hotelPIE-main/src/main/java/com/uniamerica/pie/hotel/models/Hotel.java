package com.uniamerica.pie.hotel.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


@Entity
@Table (name = "hoteis")
public class Hotel {
    
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
    private Long id;
    
	
	@NotBlank(message = "O nome do hotel não pode estar vazio")
	@Size(min = 6, max = 50, message = "O nome do hotel deve ter entre 3 e 50 caracteres")
	@Column(name = "nome", nullable = false, unique = true)
	private String nome;

	
	
	@Column(name = "endereco", nullable = false)
	@NotBlank(message = "Endereco é obrigatório")
    private String endereco;
	
	
	@Column(name = "descricao", nullable = false)
	@NotBlank(message = "Descricao é obrigatório")
    private String descricao;
	
	
	@Column(name = "numero_de_quartos", nullable = false)
	@NotNull(message = "Numero de quartos é obrigatório")
    private Integer numeroDeQuartos;
    
    
	
	@OneToMany(mappedBy = "hotel")
	@JsonIgnoreProperties("hotel")
	private List<Quarto> quartos;

	@Transient
	private int quartosCadastrados;

   
	public List<Quarto> getQuartos() {
		return quartos;
	}


	public void setQuartos(List<Quarto> quartos) {
		this.quartos = quartos;
	}


	public int getQuartosCadastrados() {
	    return quartosCadastrados;
	}

	public void setQuartosCadastrados(int quartosCadastrados) {
	    this.quartosCadastrados = quartosCadastrados;
	}



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


	public String getEndereco() {
		return endereco;
	}


	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}


	public String getDescricao() {
		return descricao;
	}


	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}


	public Integer getNumeroDeQuartos() {
		return numeroDeQuartos;
	}


	public void setNumeroDeQuartos(Integer numeroDeQuartos) {
		this.numeroDeQuartos = numeroDeQuartos;
	}

    
	
	
	
	public Hotel() {}

	public Hotel(String nome, String endereco, String descricao, Integer numeroDeQuartos) {
	    this.nome = nome;
	    this.endereco = endereco;
	    this.descricao = descricao;
	    this.numeroDeQuartos = numeroDeQuartos;
	}

}