abstract class ClasseAbstrata {
    abstract imprimaAlgo(): void;
  }
  
  class ClasseConcreta extends ClasseAbstrata {
    imprimaAlgo(): void {
      console.log("Implementação do método imprimaAlgo na ClasseConcreta");
    }
  }

//A ClasseConcreta fornece a implementação necessária para o método abstrato imprimaAlgo() definido na ClasseAbstrata. Agora, a compilação ocorrerá sem erros.