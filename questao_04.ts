abstract class FiguraGeometrica {
    abstract calcularArea(): number;
    abstract calcularPerimetro(): number;
  }

  class Quadrado extends FiguraGeometrica {
    constructor(private lado: number) {
      super();
    }
  
    calcularArea(): number {
      return this.lado * this.lado;
    }
  
    calcularPerimetro(): number {
      return 4 * this.lado;
    }
  }
  
  class Triangulo extends FiguraGeometrica {
    constructor(private base: number, private altura: number) {
      super();
    }
  
    calcularArea(): number {
      return (this.base * this.altura) / 2;
    }
  
    calcularPerimetro(): number {
      return this.base + 2 * this.altura;
    }
  }
  
  const quadrado = new Quadrado(5);
  console.log("Área do Quadrado:", quadrado.calcularArea());
  console.log("Perímetro do Quadrado:", quadrado.calcularPerimetro());
  
  const triangulo = new Triangulo(4, 6);
  console.log("Área do Triângulo:", triangulo.calcularArea());
  console.log("Perímetro do Triângulo:", triangulo.calcularPerimetro());