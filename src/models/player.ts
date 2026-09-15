// a palavra "classe" define que estamos criando um molde
// a palavra "export" permite que esse arquivo seja usado por outros arquivos (como o app.ts)
export class Player {
    public name: string; // O nome do jogador (texto)
    public health: number; // a saúde do jogador (número)
    public level: number; // o nivel do jogador (número)

    // construtores (O construtor é um metodo especial que executado)
    // automaticamente quando a classe é instanciada uma unica vez
    constructor(name: string, health: number = 100, level: number = 1) {
        // A palavra "this" faz referência a própria classe, ou seja:
        // "Pegue"
        //
        this.name = name;
        this.health =  health;
        this.level = level;
    }

    // Métodos (comportamentos de classe )
    // Métodos são as "funções" que a classe pode executar, ou seja, são os comportamentos da classe.
    // o Método "attack" é um método que retorna uma string.
    public attack (): string{
    const damage = this.level * 10;
    return`${this.name} atacou e causou ${damage} de dano!`;
}

    public takedamage (amout: number): string{
        this.health -= amout;
        if (this.health < 0){
            this.health = 0; // não deixa a saúde ficar negativa
                    }
        return `${this.name} Foi Derrotado`!
return`${this.name} recebeu ${amout} de dano e agora tem ${this.health} de saúde.`;
                }


}