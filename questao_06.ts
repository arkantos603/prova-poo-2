abstract class Funcionario {
    private _salario: number;

    constructor(salario: number) {
        this._salario = salario;
    }

    abstract getBonificacao(): number;

    get salario(): number {
        return this._salario;
    }
}

class Gerente extends Funcionario {
    private _login: string;
    private _senha: string;

    constructor(salario: number, login: string, senha: string) {
        super(salario);
        this._login = login;
        this._senha = senha;
    }

    getBonificacao(): number {
        return this.salario * 0.4; // 40% do salário
    }

    autenticar(login: string, senha: string) {
        return this._login === login && this._senha === senha;
    }
}

class Cliente implements Autenticavel {
    private _cpf: string;
    private _nome: string;

    constructor(cpf: string, nome: string, private _login: string, private _senha: string) {
        this._cpf = cpf;
        this._nome = nome;
    }

    autenticar(login: string, senha: string): boolean {
        return this._login === login && this._senha === senha;   
    }
}

class Diretor extends Funcionario implements Autenticavel {
    private _login: string;
    private _senha: string;

    constructor(salario: number, login: string, senha: string) {
        super(salario);
        this._login = login;
        this._senha = senha;
    }

    autenticar(login: string, senha: string): boolean {
        return this._login === login && this._senha === senha;
    }

    getBonificacao(): number {
        return this.salario * 0.6; // 60% do salário
    }
}

class Presidente extends Funcionario implements Autenticavel {
    private _login: string;
    private _senha: string;

    constructor(salario: number, login: string, senha: string) {
        super(salario);
        this._login = login;
        this._senha = senha;
    }

    autenticar(login: string, senha: string): boolean {
        return this._login === login && this._senha === senha;
    }

    getBonificacao(): number {
        // 100% do salário mais R$1.000,00
        return this.salario + 1000;
    }
}

interface Autenticavel {
    autenticar(login: string, senha: string): boolean
}

class SistemaInterno{
    autenticar(autenticavel: Autenticavel, login: string, senha: string): boolean{
        return autenticavel.autenticar(login, senha)
    }

}


let diretor: Diretor = new Diretor(1000, "joao", "123");
let cliente: Cliente = new Cliente("xxx.xxx.xxx-yy", "pedro", "pedro", "senha123" );
let presidente: Presidente = new Presidente(5000, "presidente", "senha123");

let si: SistemaInterno = new SistemaInterno();

console.log(si.autenticar(diretor, "joao", "123"));
console.log(si.autenticar(cliente, "pedro", "senha123"));


console.log(diretor instanceof Funcionario)
console.log(diretor instanceof Diretor)
console.log(typeof(diretor))
console.log(presidente.getBonificacao());