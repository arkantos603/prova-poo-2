interface FiguraGeometrica {
    calcularArea(): number;
    calcularPerimetro(): number;
  }
  
  interface IComparavel {
    comparar(outraForma: FiguraGeometrica): number;
  }
  
  class Quadrado implements FiguraGeometrica, IComparavel {
    constructor(private lado: number) {}
  
    calcularArea(): number {
      return this.lado * this.lado;
    }
  
    calcularPerimetro(): number {
      return 4 * this.lado;
    }
  
    comparar(outraForma: FiguraGeometrica): number {
      const areaQuadrado = this.calcularArea();
      const areaOutraForma = outraForma.calcularArea();
  
      if (areaQuadrado < areaOutraForma) {
        return -1;
      } else if (areaQuadrado > areaOutraForma) {
        return 1;
      } else {
        return 0;
      }
    }
  }
  
  class Triangulo implements FiguraGeometrica, IComparavel {
    constructor(private base: number, private altura: number) {}
  
    calcularArea(): number {
      return (this.base * this.altura) / 2;
    }
  
    calcularPerimetro(): number {
      return this.base + 2 * this.altura;
    }
  
    comparar(outraForma: FiguraGeometrica): number {
      const areaTriangulo = this.calcularArea();
      const areaOutraForma = outraForma.calcularArea();
  
      if (areaTriangulo < areaOutraForma) {
        return -1;
      } else if (areaTriangulo > areaOutraForma) {
        return 1;
      } else {
        return 0;
      }
    }
  }
  
  // Adicionando um círculo para testar
  class Circulo implements FiguraGeometrica, IComparavel {
    constructor(private raio: number) {}
  
    calcularArea(): number {
      return Math.PI * this.raio * this.raio;
    }
  
    calcularPerimetro(): number {
      return 2 * Math.PI * this.raio;
    }
  
    comparar(outraForma: FiguraGeometrica): number {
      const areaCirculo = this.calcularArea();
      const areaOutraForma = outraForma.calcularArea();
  
      if (areaCirculo < areaOutraForma) {
        return -1;
      } else if (areaCirculo > areaOutraForma) {
        return 1;
      } else {
        return 0;
      }
    }
  }
  
  // Script para testar e comparar diferentes formas geométricas
  const quadrado = new Quadrado(5);
  const triangulo = new Triangulo(4, 6);
  const circulo = new Circulo(3);
  
  console.log("Comparação Quadrado com Triângulo:", quadrado.comparar(triangulo));
  console.log("Comparação Triângulo com Circulo:", triangulo.comparar(circulo));
  console.log("Comparação Circulo com Quadrado:", circulo.comparar(quadrado));