import * as fs from 'fs';
import { Perfil } from './Perfil';
import { Postagem } from './Postagem ';
import { IRepositorioPerfis } from './RepositorioDePerfil';
import { PostagemAvancada } from './PostagemAvançada'

export interface IRepositorioPostagens {
    incluir(postagem: Postagem): void;
    consultar(id?: number, texto?: string, hashtag?: string, perfil?: Perfil): Postagem[] 
    exibirTodasAsPostagens(): Postagem[];
    obterTodasAsPostagens(): Postagem[];
    excluirPostagem(id: number): void; 
    
  }
  export class RepositorioDePostagens implements IRepositorioPostagens {
    private CAMINHO_ARQUIVO: string = 'postagens.txt';
    private repositorioDePerfis: IRepositorioPerfis;
    private postagens: Postagem[] = [];
  
    constructor(repositorioDePerfis: IRepositorioPerfis) {
      this.repositorioDePerfis = repositorioDePerfis;
    }
  
    incluir(postagem: Postagem): void {
      const hashtags = postagem instanceof PostagemAvancada ? postagem.hashtags.join(',') : '';
      const linha = `${postagem.id};${postagem.texto};${hashtags};${postagem.curtidas};${postagem.descurtidas};${postagem.data.toISOString()}\r\n`;
      fs.appendFileSync(this.CAMINHO_ARQUIVO, linha, 'utf-8');
      this.postagens.push(postagem);
    }
  
    consultar(id?: number, texto?: string, hashtag?: string, perfil?: Perfil): Postagem[] {
      return this.postagens.filter((postagem) => {
        if (id && postagem.id === id) {
          return true;
        }
  
        if (texto && postagem.texto === texto) {
          return true;
        }
  
        if (hashtag && postagem instanceof PostagemAvancada && postagem.hashtags.includes(hashtag)) {
          return true;
        }
  
        return false;
      });
    }
  
    exibirTodasAsPostagens(): Postagem[] {
      return this.postagens;
    }
  
    obterTodasAsPostagens(): Postagem[] {
      return this.postagens;
    }
  
    excluirPostagem(id: number): void {
      const postagemIndex = this.postagens.findIndex((postagem) => postagem.id === id);
  
      if (postagemIndex !== -1) {
        const postagem = this.postagens[postagemIndex];
  
        if (postagem.perfil) {
          const perfil = this.repositorioDePerfis.consultar(postagem.perfil.id);
  
          if (perfil) {
            const perfilIndex = perfil.postagens.findIndex((p) => p.id === id);
  
            if (perfilIndex !== -1) {
              perfil.postagens.splice(perfilIndex, 1);
            }
          }
        }
  
        this.postagens.splice(postagemIndex, 1);
        console.log("Postagem excluída com sucesso.");
      } else {
        console.log("Erro: Postagem não encontrada.");
      }
    }
  }