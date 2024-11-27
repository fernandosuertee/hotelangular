package com.uniamerica.pie.hotel.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.uniamerica.pie.hotel.models.Hospede;
import com.uniamerica.pie.hotel.services.HospedeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.Arrays;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
class HospedeControllerTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @MockBean
    private HospedeService hospedeService;

    private Hospede hospede;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        hospede = new Hospede("Ana Silva", "ana@exemplo.com");
        hospede.setId(1L);
    }

    @Test
    @DisplayName("Deve cadastrar um novo hóspede")
    void testCadastrarHospede() throws Exception {
        when(hospedeService.cadastrarHospede(any(Hospede.class))).thenReturn(hospede);

        ObjectMapper objectMapper = new ObjectMapper();
        String hospedeJson = objectMapper.writeValueAsString(hospede);

        mockMvc.perform(post("/hospedes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(hospedeJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.nome").value("Ana Silva"))
                .andExpect(jsonPath("$.email").value("ana@exemplo.com"));

        verify(hospedeService, times(1)).cadastrarHospede(any(Hospede.class));
    }

    @Test
    @DisplayName("Deve buscar um hóspede por ID")
    void testBuscarHospedePorId() throws Exception {
        when(hospedeService.buscarPorId(1L)).thenReturn(hospede);

        mockMvc.perform(get("/hospedes/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Ana Silva"))
                .andExpect(jsonPath("$.email").value("ana@exemplo.com"));

        verify(hospedeService, times(1)).buscarPorId(1L);
    }

    @Test
    @DisplayName("Deve listar todos os hóspedes")
    void testListarTodosOsHospedes() throws Exception {
        Hospede hospede2 = new Hospede("Maria Souza", "maria@exemplo.com");
        hospede2.setId(2L);
        when(hospedeService.listarTodos()).thenReturn(Arrays.asList(hospede, hospede2));

        mockMvc.perform(get("/hospedes")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nome").value("Ana Silva"))
                .andExpect(jsonPath("$[0].email").value("ana@exemplo.com"))
                .andExpect(jsonPath("$[1].nome").value("Maria Souza"))
                .andExpect(jsonPath("$[1].email").value("maria@exemplo.com"));

        verify(hospedeService, times(1)).listarTodos();
    }

    @Test
    @DisplayName("Deve atualizar um hóspede")
    void testAtualizarHospede() throws Exception {
        Hospede hospedeAtualizado = new Hospede("Ana Oliveira", "ana.oliveira@exemplo.com");
        hospedeAtualizado.setId(1L);

        when(hospedeService.atualizarHospede(eq(1L), any(Hospede.class))).thenReturn(hospedeAtualizado);

        ObjectMapper objectMapper = new ObjectMapper();
        String hospedeJson = objectMapper.writeValueAsString(hospedeAtualizado);

        mockMvc.perform(put("/hospedes/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(hospedeJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Ana Oliveira"))
                .andExpect(jsonPath("$.email").value("ana.oliveira@exemplo.com"));

        verify(hospedeService, times(1)).atualizarHospede(eq(1L), any(Hospede.class));
    }

    @Test
    @DisplayName("Deve deletar um hóspede")
    void testDeletarHospede() throws Exception {
        doNothing().when(hospedeService).deletarHospede(1L);

        mockMvc.perform(delete("/hospedes/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());

        verify(hospedeService, times(1)).deletarHospede(1L);
    }
}