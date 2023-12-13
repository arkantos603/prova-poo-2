import * as fs from 'fs';
import { Perfil } from './Perfil';

export interface IRepositorioPerfis {
    consultar(id?: number, nome?: string, email?: string): Perfil | null 
    incluir(perfil: Perfil): void;
    remover(id: number): void;
  }

  export class RepositorioDePerfis implements IRepositorioPerfis {
    private CAMINHO_ARQUIVO: string = 'perfis.txt';
  
    incluir(perfil: Perfil): void {
      const linha = `${perfil.id};${perfil.nome};${perfil.email}\r\n`;
      fs.appendFileSync(this.CAMINHO_ARQUIVO, linha, 'utf-8');
    }
  
    consultar(id?: number, nome?: string, email?: string): Perfil | null {
      const arquivo: string = fs.readFileSync(this.CAMINHO_ARQUIVO, 'utf-8');
      const linhas: string[] = arquivo.split('\r\n');
  
      for (let i = 0; i < linhas.length; i++) {
        const dadosPerfil: string[] = linhas[i].split(';');
        const perfilId = parseInt(dadosPerfil[0]);
  
        if (id && perfilId === id) {
          return new Perfil(perfilId, dadosPerfil[1], dadosPerfil[2]);
        }
  
        if (nome && dadosPerfil[1] === nome) {
          return new Perfil(perfilId, dadosPerfil[1], dadosPerfil[2]);
        }
  
        if (email && dadosPerfil[2] === email) {
          return new Perfil(perfilId, dadosPerfil[1], dadosPerfil[2]);
        }
      }
  
      return null;
    }
  
    remover(id: number): void {
      try {
        const arquivo: string = fs.readFileSync(this.CAMINHO_ARQUIVO, 'utf-8');
        const linhas: string[] = arquivo.split('\r\n');
    
        const indexToRemove = linhas.findIndex((linha) => {
          const dadosPerfil: string[] = linha.split(';');
          const perfilId = parseInt(dadosPerfil[0]);
          return perfilId === id;
        });
    
        if (indexToRemove !== -1) {
          linhas.splice(indexToRemove, 1);
    
          fs.writeFileSync(this.CAMINHO_ARQUIVO, linhas.join('\r\n'), 'utf-8');
    
          console.log("Perfil removido com sucesso.");
        } else {
          console.log("Erro: Perfil não encontrado.");
        }
      } catch (error) {
        console.error(`Erro ao remover perfil: ${error}`);
      }
    }
    
  }