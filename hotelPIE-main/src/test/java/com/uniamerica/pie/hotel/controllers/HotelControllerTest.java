package com.uniamerica.pie.hotel.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.uniamerica.pie.hotel.models.Hotel;
import com.uniamerica.pie.hotel.services.HotelService;
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
class HotelControllerTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @MockBean
    private HotelService hotelService;

    private Hotel hotel;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        hotel = new Hotel("Hotel Exemplo", "Rua Exemplo, 123", "Hotel de exemplo", 10);
        hotel.setId(1L);
    }

    @Test
    @DisplayName("Deve cadastrar um novo hotel")
    void testCadastrarHotel() throws Exception {
        when(hotelService.cadastrarHotel(any(Hotel.class))).thenReturn(hotel);

        ObjectMapper objectMapper = new ObjectMapper();
        String hotelJson = objectMapper.writeValueAsString(hotel);

        mockMvc.perform(post("/hoteis")
                .contentType(MediaType.APPLICATION_JSON)
                .content(hotelJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.nome").value("Hotel Exemplo"))
                .andExpect(jsonPath("$.endereco").value("Rua Exemplo, 123"))
                .andExpect(jsonPath("$.descricao").value("Hotel de exemplo"))
                .andExpect(jsonPath("$.numeroDeQuartos").value(10));

        verify(hotelService, times(1)).cadastrarHotel(any(Hotel.class));
    }

    @Test
    @DisplayName("Deve buscar um hotel por ID")
    void testBuscarHotelPorId() throws Exception {
        when(hotelService.buscarPorId(1L)).thenReturn(hotel);

        mockMvc.perform(get("/hoteis/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Hotel Exemplo"))
                .andExpect(jsonPath("$.endereco").value("Rua Exemplo, 123"))
                .andExpect(jsonPath("$.descricao").value("Hotel de exemplo"))
                .andExpect(jsonPath("$.numeroDeQuartos").value(10));

        verify(hotelService, times(1)).buscarPorId(1L);
    }

    @Test
    @DisplayName("Deve listar todos os hoteis")
    void testListarTodosOsHoteis() throws Exception {
        Hotel hotel2 = new Hotel("Hotel Teste", "Rua Teste, 456", "Hotel de teste", 15);
        hotel2.setId(2L);
        when(hotelService.listarTodos()).thenReturn(Arrays.asList(hotel, hotel2));

        mockMvc.perform(get("/hoteis")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nome").value("Hotel Exemplo"))
                .andExpect(jsonPath("$[0].endereco").value("Rua Exemplo, 123"))
                .andExpect(jsonPath("$[0].descricao").value("Hotel de exemplo"))
                .andExpect(jsonPath("$[0].numeroDeQuartos").value(10))
                .andExpect(jsonPath("$[1].nome").value("Hotel Teste"))
                .andExpect(jsonPath("$[1].endereco").value("Rua Teste, 456"))
                .andExpect(jsonPath("$[1].descricao").value("Hotel de teste"))
                .andExpect(jsonPath("$[1].numeroDeQuartos").value(15));

        verify(hotelService, times(1)).listarTodos();
    }

    @Test
    @DisplayName("Deve atualizar um hotel")
    void testAtualizarHotel() throws Exception {
        Hotel hotelAtualizado = new Hotel("Hotel Atualizado", "Rua Nova, 456", "Hotel atualizado", 20);
        hotelAtualizado.setId(1L);

        when(hotelService.atualizarHotel(eq(1L), any(Hotel.class))).thenReturn(hotelAtualizado);

        ObjectMapper objectMapper = new ObjectMapper();
        String hotelJson = objectMapper.writeValueAsString(hotelAtualizado);

        mockMvc.perform(put("/hoteis/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(hotelJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Hotel Atualizado"))
                .andExpect(jsonPath("$.endereco").value("Rua Nova, 456"))
                .andExpect(jsonPath("$.descricao").value("Hotel atualizado"))
                .andExpect(jsonPath("$.numeroDeQuartos").value(20));

        verify(hotelService, times(1)).atualizarHotel(eq(1L), any(Hotel.class));
    }

    @Test
    @DisplayName("Deve deletar um hotel")
    void testDeletarHotel() throws Exception {
        doNothing().when(hotelService).deletarHotel(1L);

        mockMvc.perform(delete("/hoteis/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());

        verify(hotelService, times(1)).deletarHotel(1L);
    }
    
    
}