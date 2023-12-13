interface FiguraGeometrica {
    calcularArea(): number;
    calcularPerimetro(): number;
  }
  
  class Quadrado implements FiguraGeometrica {
    constructor(private lado: number) {}
  
    calcularArea(): number {
      return this.lado * this.lado;
    }
  
    calcularPerimetro(): number {
      return 4 * this.lado;
    }
  }
  
  class Triangulo implements FiguraGeometrica {
    constructor(private base: number, private altura: number) {}
  
    calcularArea(): number {
      return (this.base * this.altura) / 2;
    }
  
    calcularPerimetro(): number {
      return this.base + 2 * this.altura;
    }
  }
  
  // Script para testar diferentes formas geométricas
  const quadrado = new Quadrado(5);
  console.log("Área do Quadrado:", quadrado.calcularArea());
  console.log("Perímetro do Quadrado:", quadrado.calcularPerimetro());
  
  const triangulo = new Triangulo(4, 6);
  console.log("Área do Triângulo:", triangulo.calcularArea());
  console.log("Perímetro do Triângulo:", triangulo.calcularPerimetro());

  class Circulo implements FiguraGeometrica {
    constructor(private raio: number) {}
  
    calcularArea(): number {
      return Math.PI * this.raio * this.raio;
    }
  
    calcularPerimetro(): number {
      return 2 * Math.PI * this.raio;
    }
  }
  
  const circulo = new Circulo(3);
  console.log("Área do Círculo:", circulo.calcularArea());
  console.log("Perímetro do Círculo:", circulo.calcularPerimetro());