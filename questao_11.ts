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
  
  // Classe AuditoriaInterna
  class AuditoriaInterna {
    private tributaveis: Tributavel[] = [];
  
    adicionar(tributavel: Tributavel): void {
      this.tributaveis.push(tributavel);
    }
  
    calcularTributos(): number {
      let totalTributos = 0;
      for (const tributavel of this.tributaveis) {
        totalTributos += tributavel.calculaTributos();
      }
      return totalTributos;
    }
  }
  
  // Classe de Testes
  class TesteAuditoria {
    static executarTestes(): void {
      const auditoria = new AuditoriaInterna();
  
      const contaCorrente1 = new ContaCorrente("Conta Corrente 1", 1000);
      const contaCorrente2 = new ContaCorrente("Conta Corrente 2", 2000);
      const seguroVida1 = new SeguroDeVida();
      const seguroVida2 = new SeguroDeVida();
  
      auditoria.adicionar(contaCorrente1);
      auditoria.adicionar(contaCorrente2);
      auditoria.adicionar(seguroVida1);
      auditoria.adicionar(seguroVida2);
  
      const totalTributos = auditoria.calcularTributos();
      console.log("Total de Tributos:", totalTributos);
    }
  }
  
  // Execução dos testes
  TesteAuditoria.executarTestes();

export{}