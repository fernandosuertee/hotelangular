package com.uniamerica.pie.hotel.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;

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

import com.fasterxml.jackson.databind.ObjectMapper;
import com.uniamerica.pie.hotel.models.Hotel;
import com.uniamerica.pie.hotel.models.Quarto;
import com.uniamerica.pie.hotel.services.QuartoService;

@SpringBootTest
class QuartoControllerTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @MockBean
    private QuartoService quartoService;

    private Quarto quarto;
    private Hotel hotel;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        hotel = new Hotel("Hotel Exemplo", "Rua Exemplo", "Hotel 5 estrelas", 100);
        quarto = new Quarto("101", "Luxo", "Disponível", hotel);
        quarto.setId(1L);
    }

    @Test
    @DisplayName("Deve cadastrar um novo quarto")
    void testCadastrarQuarto() throws Exception {
        when(quartoService.cadastrarQuarto(any(Quarto.class))).thenReturn(quarto);

        ObjectMapper objectMapper = new ObjectMapper();
        String quartoJson = objectMapper.writeValueAsString(quarto);

        mockMvc.perform(post("/quartos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(quartoJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.numero").value("101"))
                .andExpect(jsonPath("$.tipo").value("Luxo"));

        verify(quartoService, times(1)).cadastrarQuarto(any(Quarto.class));
    }

    @Test
    @DisplayName("Deve listar todos os quartos")
    void testListarTodosOsQuartos() throws Exception {
        Quarto quarto2 = new Quarto("102", "Standard", "Ocupado", hotel);
        when(quartoService.listarTodos()).thenReturn(Arrays.asList(quarto, quarto2));

        mockMvc.perform(get("/quartos")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].numero").value("101"))
                .andExpect(jsonPath("$[1].numero").value("102"));

        verify(quartoService, times(1)).listarTodos();
    }

    @Test
    @DisplayName("Deve buscar quarto por ID")
    void testBuscarQuartoPorId() throws Exception {
        when(quartoService.buscarPorId(1L)).thenReturn(quarto);

        mockMvc.perform(get("/quartos/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.numero").value("101"));

        verify(quartoService, times(1)).buscarPorId(1L);
    }

    @Test
    @DisplayName("Deve atualizar um quarto")
    void testAtualizarQuarto() throws Exception {
        Quarto quartoAtualizado = new Quarto("102", "Standard", "Ocupado", hotel);
        when(quartoService.atualizarQuarto(eq(1L), any(Quarto.class))).thenReturn(quartoAtualizado);

        ObjectMapper objectMapper = new ObjectMapper();
        String quartoJson = objectMapper.writeValueAsString(quartoAtualizado);

        mockMvc.perform(put("/quartos/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(quartoJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.numero").value("102"));

        verify(quartoService, times(1)).atualizarQuarto(eq(1L), any(Quarto.class));
    }

    @Test
    @DisplayName("Deve deletar um quarto")
    void testDeletarQuarto() throws Exception {
        doNothing().when(quartoService).deletarQuarto(1L);

        mockMvc.perform(delete("/quartos/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());

        verify(quartoService, times(1)).deletarQuarto(1L);
    }
}
