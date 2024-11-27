Principais Endpoints Possíveis:
Autenticação:
POST /api/login - Autenticar usuário
POST /api/register - Registrar novo usuário
Quartos:
GET /api/rooms - Listar todos os quartos
GET /api/rooms/:id - Detalhes de um quarto específico
POST /api/rooms - Adicionar novo quarto
PUT /api/rooms/:id - Atualizar informações de um quarto
DELETE /api/rooms/:id - Excluir um quarto
Reservas:
GET /api/bookings - Listar todas as reservas
GET /api/bookings/:id - Detalhes de uma reserva específica
POST /api/bookings - Criar nova reserva
PUT /api/bookings/:id - Atualizar uma reserva
DELETE /api/bookings/:id - Cancelar uma reserva
Clientes:
GET /api/customers - Listar todos os clientes
GET /api/customers/:id - Detalhes de um cliente
POST /api/customers - Adicionar novo cliente
PUT /api/customers/:id - Atualizar informações do cliente
DELETE /api/customers/:id - Excluir um cliente
Como Testar Cada Endpoint no Postman:
1. Configurando o Ambiente no Postman:

URL Base: Defina uma variável de ambiente no Postman para a URL base, por exemplo, {{base_url}} = http://localhost:3000.
Headers Comuns: Se o projeto requer autenticação, adicione o token JWT nos headers:
Key: Authorization
Value: Bearer {{token}}
2. Testando Endpoints de Autenticação:

Login:
Método: POST
URL: {{base_url}}/api/login
Body (JSON):
json
Copiar código
{
  "email": "usuario@example.com",
  "password": "senha123"
}
Resposta Esperada: Token JWT que será usado para autenticação nos demais endpoints.
Registro:
Método: POST
URL: {{base_url}}/api/register
Body (JSON):
json
Copiar código
{
  "name": "Nome do Usuário",
  "email": "usuario@example.com",
  "password": "senha123"
}
3. Testando Endpoints de Quartos:

Listar Quartos:
Método: GET
URL: {{base_url}}/api/rooms
Detalhes de um Quarto:
Método: GET
URL: {{base_url}}/api/rooms/1 (substitua 1 pelo ID do quarto)
Adicionar Novo Quarto:
Método: POST
URL: {{base_url}}/api/rooms
Body (JSON):
json
Copiar código
{
  "number": 101,
  "type": "Deluxe",
  "price": 200.00,
  "description": "Quarto com vista para o mar."
}
Atualizar Quarto:
Método: PUT
URL: {{base_url}}/api/rooms/1
Body (JSON):
json
Copiar código
{
  "price": 220.00
}
Excluir Quarto:
Método: DELETE
URL: {{base_url}}/api/rooms/1
4. Testando Endpoints de Reservas:

Listar Reservas:
Método: GET
URL: {{base_url}}/api/bookings
Detalhes de uma Reserva:
Método: GET
URL: {{base_url}}/api/bookings/1
Criar Nova Reserva:
Método: POST
URL: {{base_url}}/api/bookings
Body (JSON):
json
Copiar código
{
  "room_id": 1,
  "customer_id": 1,
  "check_in": "2024-11-01",
  "check_out": "2024-11-05"
}
Atualizar Reserva:
Método: PUT
URL: {{base_url}}/api/bookings/1
Body (JSON):
json
Copiar código
{
  "check_out": "2024-11-06"
}
Cancelar Reserva:
Método: DELETE
URL: {{base_url}}/api/bookings/1
5. Testando Endpoints de Clientes:

Listar Clientes:
Método: GET
URL: {{base_url}}/api/customers
Detalhes de um Cliente:
Método: GET
URL: {{base_url}}/api/customers/1
Adicionar Novo Cliente:
Método: POST
URL: {{base_url}}/api/customers
Body (JSON):
json
Copiar código
{
  "name": "João Silva",
  "email": "joao.silva@example.com",
  "phone": "(11) 99999-9999"
}
Atualizar Cliente:
Método: PUT
URL: {{base_url}}/api/customers/1
Body (JSON):
json
Copiar código
{
  "phone": "(11) 98888-8888"
}
Excluir Cliente:
Método: DELETE
URL: {{base_url}}/api/customers/1
Dicas para Testar no Postman:
Autenticação:
Após obter o token JWT no login, salve-o em uma variável de ambiente ({{token}}).
Adicione o header Authorization em todas as requisições que necessitam de autenticação.
Headers Comuns:
Content-Type: application/json (para requisições com body em JSON)
Variáveis de Ambiente:
Utilize variáveis para gerenciar URLs, tokens e IDs dinâmicos.
Coleções:
Crie uma coleção no Postman para organizar todos os endpoints do projeto.
Como Encontrar os Endpoints no Projeto:
Arquivos de Rotas:
Verifique a pasta routes ou controllers no código fonte para identificar todos os endpoints disponíveis.
Documentação Interna:
Veja se há uma documentação interna, como Swagger ou arquivos README com detalhes das APIs.
