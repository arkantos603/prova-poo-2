let quadrado = new Quadrado(5);
let triangulo = new Triangulo(4, 6);

figuras.push(quadrado);
figuras.push(triangulo);

// Podemos criar instâncias destas classes concretas e armazendo-as no array. Essa abordagem é útil quando você deseja ter uma coleção de objetos que seguem a estrutura da classe abstrata, mas a instância real é de uma classe derivada.