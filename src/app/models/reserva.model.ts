export interface Reserva {
  id?: number;
  hospede: {
    id: number;
    nome?: string;
  };
  hotel: {
    id: number;
    nome?: string;
  };
  quarto: {
    id: number;
    numero?: string;
  };
  dataCheckIn: string; // Usaremos string para facilitar o binding com inputs de data
  dataCheckOut: string;
  numHospedes: number;
  status: string;
}