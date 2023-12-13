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

  class TesteFormasGeometricas {
    static executarTestes(): void {
      const quadrado1 = new Quadrado(5);
      const quadrado2 = new Quadrado(7);
      const triangulo1 = new Triangulo(4, 6);
      const triangulo2 = new Triangulo(3, 8);
      const circulo1 = new Circulo(3);
      const circulo2 = new Circulo(5);
  
      console.log("Comparação Quadrado 1 com Quadrado 2:", quadrado1.comparar(quadrado2));
      console.log("Comparação Triângulo 1 com Triângulo 2:", triangulo1.comparar(triangulo2));
      console.log("Comparação Circulo 1 com Circulo 2:", circulo1.comparar(circulo2));
  
      console.log("Comparação Quadrado 1 com Triângulo 1:", quadrado1.comparar(triangulo1));
      console.log("Comparação Triângulo 2 com Circulo 2:", triangulo2.comparar(circulo2));
      console.log("Comparação Circulo 1 com Quadrado 2:", circulo1.comparar(quadrado2));
    }
  }
  
  TesteFormasGeometricas.executarTestes();
  
  export{}