package com.uniamerica.pie.hotel.controllers;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;
import java.util.Arrays;


import com.uniamerica.pie.hotel.models.Hospede;
import com.uniamerica.pie.hotel.models.Hotel;
import com.uniamerica.pie.hotel.models.Quarto;
import com.uniamerica.pie.hotel.models.Reserva;
import com.uniamerica.pie.hotel.services.ReservaService;
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

@SpringBootTest
public class ReservaControllerTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @MockBean
    private ReservaService reservaService;

    private Reserva reserva;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        Hospede hospede = new Hospede("John Doe", "john@example.com");
        Hotel hotel = new Hotel("Hotel Exemplo", "Rua Exemplo, 123", "Hotel Luxo", 50);
        Quarto quarto = new Quarto("101", "Luxo", "Disponível", hotel);
        reserva = new Reserva(hospede, hotel, quarto, LocalDate.now(), LocalDate.now().plusDays(2), 2, "Pendente");
    }

   

    @Test
    @DisplayName("Deve buscar uma reserva por ID")
    void testBuscarReservaPorId() throws Exception {
        when(reservaService.buscarPorId(1L)).thenReturn(reserva);

        mockMvc.perform(get("/reservas/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.hospede.nome").value("John Doe"));
    }

    @Test
    @DisplayName("Deve listar todas as reservas")
    void testListarTodasAsReservas() throws Exception {
        when(reservaService.listarTodos()).thenReturn(Arrays.asList(reserva));

        mockMvc.perform(get("/reservas")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].hospede.nome").value("John Doe"));
    }

   

    @Test
    @DisplayName("Deve deletar uma reserva")
    void testDeletarReserva() throws Exception {
        mockMvc.perform(delete("/reservas/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }
    
    
    /*
    @Test
    @DisplayName("Deve cadastrar uma nova reserva")
    void testCadastrarReserva() throws Exception {
        when(reservaService.cadastrarReserva(reserva)).thenReturn(reserva);

        ObjectMapper objectMapper = new ObjectMapper();
        String reservaJson = objectMapper.writeValueAsString(reserva);

        mockMvc.perform(post("/reservas")
                .contentType(MediaType.APPLICATION_JSON)
                .content(reservaJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.status").value("Pendente"));
    }*/
    
    /*@Test
    @DisplayName("Deve atualizar uma reserva")
    void testAtualizarReserva() throws Exception {
        Reserva reservaAtualizada = new Reserva(reserva.getHospede(), reserva.getHotel(), reserva.getQuarto(),
                LocalDate.now(), LocalDate.now().plusDays(5), 3, "Confirmada");

        when(reservaService.atualizarReserva(1L, reservaAtualizada)).thenReturn(reservaAtualizada);

        ObjectMapper objectMapper = new ObjectMapper();
        String reservaJson = objectMapper.writeValueAsString(reservaAtualizada);

        mockMvc.perform(put("/reservas/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(reservaJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("Confirmada"));
    }*/
}