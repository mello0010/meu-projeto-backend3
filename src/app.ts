// Importa a biblioteca Express e também o tipo Express
// O Express será utilizado para criar o servidor web
import express from "express";
import type { Express, Request, Response } from "express";
//importa a classe Player do arquivo Player.ts
import { Player } from "./models/player.js";


// Cria uma aplicação Express
// A função express() devolve um objeto que representa o servidor da aplicação
const app: Express = express();

// Middleware para permitir que o servidor aceite requisições com corpo em formato JSON
app.use(express.json());

// Instanciação de um jogador ultilizando a classe Player
// Criamos (instanciamos) um novo jogador chamado "Hero" com 100 de saúde e nível 1
// Apartir da classe Playes que foi importada do arquivo Player.ts
let player1: Player = new Player("Hero", 100, 5);

// Rota GET para obter informações do jogador
// Quando o cliente fizer uma requisição GET para a rota "/player", o servidor responderá com os dados do jogador
// A função de callback recebe dois parâmetros: req (requisição) e res (resposta)
app.get("/player", (req: Request, res: Response) => {
  res.json({
    message: "Informações do jogador",
    player:player1,
  }); 
});
//rota POST para atacar o jogador
// Quando o cliente fizer uma requisição POST para a rota "/player/attack", o servidor chamará o método attack() do jogador
// do jogador
// É ultilizafa para enviar dados para o servidor, nesse caso, o ataque do jogador
// como neste case, onde o jogador realiza uma ação (como acionar um comportamento de ataque)
// que é o metodo attack() do Jogador.
// A função de callback recebe dois parâmetros: req (requisição) e res (resposta)
app.post("/player/attack", (req: Request, res: Response) => {
  const attackMessage = player1.attack(); //chama o método attack() do jogador
  // Retorna uma resposta JSON com a mensagem de ataque
  // para o cliente que fez a requisição
  res.json({
    message: attackMessage,
  });
});

// Rota para receber o dano 
// Quando o usúario acessar a rota "/player/damage" com uma requisição POST, o servidor chamará o método takeDamage() do jogador
// método takeDamage() do jogador, pasando o valor do dano recebido no corpo da requisição (req.body.amount).
//parâmetro
app.post("/player/damage", (req: Request, res: Response) => {
  const { damage } = req.body;
  const damageMessage = player1.takedamage(damage);
  // Retorna uma resposta JSON com a mensagem de dano
  // para o cliente que fez a requisição
  res.json({
    // Retorna a mensagem do dano recebido
    action: damageMessage,
    // Retorna o valor da saúde atual do jogador
    currentHealth: player1.health,
    // Retorna o nível atual do jogador
    currentLevel: player1.level
  });
});


// Define a porta onde o servidor ficará disponível
// Neste caso, o servidor poderá ser acessado pela porta 8081
const PORT: number = 8081;

// Inicializa o servidor utilizando a porta definida
// O método listen() faz o servidor começar a "escutar" requisições HTTP
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log("Rotas disponiveis:")
  console.log(`GET http://localhost:${PORT}/player - Obter informações jogador`);
  console.log(`POST http://localhost:${PORT}/player/attack - Jogador realiza ataque`);
  console.log(`POST http://localhost:${PORT}/player/take-demage - Jogador recebe dano`);
});