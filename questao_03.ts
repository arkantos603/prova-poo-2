// Se uma classe herda de uma classe abstrata e não implementa todos os métodos abstratos definidos na classe pai, um erro ocorrerá durante a compilação ou em tempo de execução,

abstract class ClasseAbstrata {
    abstract imprimaAlgo(): void;
  }
  
  class ClasseConcreta extends ClasseAbstrata {
    // Não implementa o método imprimaAlgo
  }

// Neste caso, a classe ClasseConcreta está herdando da classe abstrata ClasseAbstrata, mas não está fornecendo uma implementação para o método abstrato imprimaAlgo. Ao tentar compilar esse código, você receberá um erro de compilação indicando que a classe derivada deve fornecer uma implementação para todos os métodos abstratos da classe abstrata. 
// Se você tentar instanciar a classe ClasseConcreta sem implementar o método abstrato, a execução também resultará em um erro em tempo de execução.