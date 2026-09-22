// Importa a biblioteca Express e também o tipo Express
// O Express será utilizado para criar o servidor web
import express from "express";
import type { Express, Request, Response } from "express";
import fs from "fs";

// importa a classe player do arquivo Player.ts
import { Player } from "./models/player.js"
import { setSourceMapsSupport } from "module";

// Cria uma aplicação Express
// A função express() devolve um objeto que representa o servidor da aplicação
const app: Express = express();

// middiware para permitir que o servidor entenda requisições com corpo json
app.use(express.json());

// Define a porta onde o servidor ficará disponível
// Neste caso, o servidor poderá ser acessado pela porta 8081
const PORT: number = 8081;

// define o nome do diretorio onde os arquivos serão amazernados
const DATA_FILE = "./data/players.json";

/*
função para garantir que o diretorio de dados exista antes de salvar os arquivos.
Se o diretorio não existir, ele será criado.
*/
function ensureDataFolderExist() {
  const dataFolder = "./data";
  if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder);
  }
}

/* chamar a função para garantir que o diretorio de dados exista
antes de qualquer operação de leitura ou escrita de arquivos
*/
ensureDataFolderExist();

// função para salvar os dados do player em eum arquivo JSON
function savePlayerState(player: Player) {
  // converte o objeto player em uma string JSON
  const data = JSON.stringify(player, null, 2);
  // salva a string json  no arquivo  definido em DATA_FILE
  fs.writeFileSync(DATA_FILE, data, "utf8");
}

// função para carregar os dados do player de um arquivo JSON
function loadPlayerState(): Player {
  // verifica se o arquivo de dados existe
  if (fs.existsSync(DATA_FILE)) {
    // lê o conteúdo do arquivo  e converte de volta para um objeto Player
    const data = fs.readFileSync(DATA_FILE, "utf8");
    const playerData = JSON.parse(data);

    return new Player(playerData.name, playerData.health, playerData.level);
  }
  // cria um novo player  se não existir cpm nome "JOGADOR1", 100 de vida e nivel 1
  const newplayer = new Player("mello", 100, 1);
  savePlayerState(newplayer);
  return newplayer;
}

// instanciação de um jogador utilizando a classe Player
// criamos (instanciamos) um novo jogador  chamado "hero" com 100 de saúde e nivel 5
// a partir da classe Player que foi importada no arquivo Player.ts
let player1: Player = new Player("hero", 100, 5);

// Rota POST para o jogador atacar
// Quando o usuário acessar  a rota "/player/attack", o servidor  chamará o método attack() do jogador
// É utilizada para enviar dados ou realizar ações que alteram o estado do servidor,
// como neste caso, onde o jogador realiza  uma ação (como acionar um comportamento de ataque) que é o metodo attack() do jogador
// A função de callback recebe dois parâmetros: req (requisição) e res (resposta)
app.get("/player", (req: Request, res: Response) => {
  res.json({
    message: "informaçôes do jogador",
    player: player1,
  });
});

app.post("/player/attack", (req: Request, res: Response) => {
  const attackMessage = player1.attack();
  res.json({
    message: attackMessage
  });
});


app.post("/up/level", (req:Request, res: Response)=> {
  player1.level +=1;
  res.json({
    //Mostra a mensagem de nível aumentado com sucesso
    message: "nivel aumentado com sucesso",
    curretLevel: player1.level
  });
});




app.post("/player/take_Healt", (req: Request, res: Response) => {
  const { Healt } = req.body;
  player1.health += Healt;
savePlayerState(player1)
res.json({
  // Mostra a mensagem de saúde com sucesso
  message: "Saúde adicionada com sucesso",
  //Retorna o valor da saúde atual
  currentHealth: player1.health
});
});

//Rota para aumentar o nível do jogador 
// Quando o usúario acessar a rota "/level_up" com uma requisição POST, o servidor aumentará o nível do jogador em 1
// método takeDamage() do jogador, pasando o valor do dano recebido no corpo da requisição (req.body.amount).
app.post("/player/level_up", (req: Request, res: Response) => {
  player1.level += 1;
  savePlayerState(player1);
  res.json({
    // Retorna a mensagem de nível aumentado com sucesso
    message: "Nível aumentado com sucesso!",
    currentLevel: player1.level
  });
});







app.post("/player/take-damage", (req: Request, res: Response) => {
  const { damage } = req.body;
  const damageMessage = player1.takedamage(damage);
  // salvar o estado atual do player no arquivo JSON
  savePlayerState(player1);
  res.json({
    action: damageMessage,
    currentHealth: player1.health,
    currentLevel: player1.level
  });
});

// Inicializa o servidor utilizando a porta definida
// O método listen() faz o servidor começar a "escutar" requisições HTTP
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log("Rotas disponiveis:");
  console.log(`GET http://localhost:${PORT}/player - Obter informações do jogador`);
  console.log(`POST http://localhost:${PORT}/player/attack - Jogador realiza um ataque`);
  console.log(`POST http://localhost:${PORT}/player/take-dagame - jogador recebe dano`);
  console.log(`POST http://localhost:${PORT}/player/level_up - upar o level`);
  console.log(`POSThttp://localhost:${PORT}/player/take_healt - aumentar a vida`);
});