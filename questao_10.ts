// Interface Tributavel
interface Tributavel {
    calculaTributos(): number;
  }
  
  // Classe Conta
  class Conta {
    private nome: string;
    private saldo: number;
  
    constructor(nome: string, saldo: number) {
      this.nome = nome;
      this.saldo = saldo;
    }
  
    getNome(): string {
      return this.nome;
    }
  
    setNome(nome: string): void {
      this.nome = nome;
    }
  
    getSaldo(): number {
      return this.saldo;
    }
  
    setSaldo(saldo: number): void {
      this.saldo = saldo;
    }
  }
  
  // Classe ContaCorrente
  class ContaCorrente extends Conta implements Tributavel {
    calculaTributos(): number {
      // Cálculo de tributos correspondente a 10% do saldo
      return this.getSaldo() * 0.1;
    }
  }
  
  // Classe SeguroDeVida
  class SeguroDeVida implements Tributavel {
    calculaTributos(): number {
      // Cálculo de tributos fixo, correspondente a R$ 50,00
      return 50;
    }
  }
  
  const contaCorrente = new ContaCorrente("Conta Corrente", 1000);
  const seguroVida = new SeguroDeVida();
  
  console.log("Tributos da Conta Corrente:", contaCorrente.calculaTributos());
  console.log("Tributos do Seguro de Vida:", seguroVida.calculaTributos());  