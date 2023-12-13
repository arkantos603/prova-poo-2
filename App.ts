import { RedeSocial } from './RedeSocial';
import { RepositorioDePerfis, IRepositorioPerfis } from './RepositorioDePerfil';
import { RepositorioDePostagens, IRepositorioPostagens } from './RepositorioDePostagens';
import { Perfil } from './Perfil';
import { Postagem } from './Postagem ';
import { PostagemAvancada } from './PostagemAvançada';
const promptSync = require('prompt-sync')();

class App {
    private redeSocial: RedeSocial;
  
    constructor() {
      const repositorioDePerfis: IRepositorioPerfis = new RepositorioDePerfis();
      const repositorioDePostagens: IRepositorioPostagens = new RepositorioDePostagens(repositorioDePerfis);
      this.redeSocial = new RedeSocial(repositorioDePostagens, repositorioDePerfis);
    }
      exibirMenu(): void {
        while (true) {
          console.log(`
                                    IFPIGRAM
    
                                Escolha uma opção:
    
    1. Criar Perfil                                     8. Remover Perfil
    2. Criar Postagem                                   9. Excluir Postagem
    3. Criar Postagem Avançada                          10. Adicionar Comentário
    4. Consultar Perfil                                 11. Excluir Comentário
    5. Consultar Postagem e Curtir/Descurtir Postagem   12. Exibir Postagens Populares
    6. Exibir Postagens por Hashtag                     13. Exibir Hashtags Populares
    7. Exibir Postagens por Perfil                      14. Exibir o Feed Completo
    
                                    0. Sair
          `);
    
          const opcao = promptSync("Escolha uma opção: ");
    
          switch (opcao) {
            case '1':
              this.criarPerfil();
              break;
            case '2':
              this.criarPostagem();
              break;
            case '3':
              this.criarPostagemAvancada();
              break;
            case '4':
              this.consultarPerfil();
              break;
            case '5':
              this.consultarPostagens();
              break;
            case '6':
              this.exibirPostagensPorHashtag();
              break;
            case '7':
              this.exibirPostagensPorPerfil();
              break;
            case '8':
              this.excluirPerfil();
              break;
            case '9':
              this.excluirPostagem();
              break;
            case '10':
              this.adicionarComentario();
              break;
            case '11':
              this.excluirComentario();
              break;
            case '12':
              this.exibirPostagensPopulares();
              break;
            case '13':
              this.exibirHashtagsPopulares();
              break;
            case '14':
              this.exibirTodasAsPostagens();
              break;
            case '0':
              console.log("Saindo do IFPIGRAM");
              return;
            default:
              console.log("Opção inválida. Escolha uma opção válida.");
          }
        }
      }
    
        menuCurtirDescurtir(postagem: Postagem): void {
          while (true) {
            console.log(`
            Escolha uma opção:
            1. Curtir Postagem
            2. Descurtir Postagem
            0. Voltar
            `);
      
            const opcao = promptSync("Escolha uma opção: ");
      
            switch (opcao) {
              case '1':
                this.redeSocial.curtir(postagem.id);
                break;
              case '2':
                this.redeSocial.descurtir(postagem.id);
                break;
              case '0':
                return;
              default:
                console.log("Opção inválida. Escolha uma opção válida.");
            }
          }
        }
      
      // criarPerfil(): void {
      //   const id = parseInt(promptSync("Digite o seu ID: "));
      //   const nome = promptSync("Digite seu nome: ");
      //   const email = promptSync("Digite seu email: ");
    
      //   const perfil = new Perfil(id, nome, email);
      //   this.redeSocial.incluirPerfil(perfil);
      // }
      criarPerfil(): void {
        try {
          const id = parseInt(promptSync("Digite o seu ID: "));
          if (isNaN(id)) {
            throw new Error("ID inválido. Certifique-se de inserir um número.");
          }
      
          const nome = promptSync("Digite seu nome: ");
          if (!nome) {
            throw new Error("Nome não pode ser vazio.");
          }
      
          const email = promptSync("Digite seu email: ");
          if (!email) {
            throw new Error("Email não pode ser vazio.");
          }
      
          const perfil = new Perfil(id, nome, email);
          this.redeSocial.incluirPerfil(perfil);
            
        } catch (error) {
          console.error(`Erro ao criar perfil: ${error}`);
        }
      }
    
      // criarPostagem(): void {
      //   const perfilId = parseInt(promptSync("Digite o ID do perfil que está fazendo a postagem: "));
      //   const id = parseInt(promptSync("Digite o ID da postagem: "));
      //   const texto = promptSync("Digite o texto da postagem: ");
    
      //   const perfil = this.redeSocial.consultarPerfil(perfilId);
      //   if (!perfil) {
      //     console.log("Erro: Perfil inexistente.");
          
      //     return;
          
      //   }
      //   const postagem = new Postagem(id, texto, 0, 0, new Date(), perfil);
      //   this.redeSocial.incluirPostagem(postagem);
      // }
      criarPostagem(): void {
        try {
          const perfilId = parseInt(promptSync("Digite o ID do perfil que está fazendo a postagem: "));
          if (isNaN(perfilId)) {
            throw new Error("ID do perfil inválido. Certifique-se de inserir um número.");
          }
    
          const id = parseInt(promptSync("Digite o ID da postagem: "));
          if (isNaN(id)) {
            throw new Error("ID da postagem inválido. Certifique-se de inserir um número.");
          }
    
          const texto = promptSync("Digite o texto da postagem: ");
          if (!texto) {
            throw new Error("Texto da postagem não pode ser vazio.");
          }
    
          const perfil = this.redeSocial.consultarPerfil(perfilId);
          if (!perfil) {
            throw new Error("Perfil inexistente.");
          }
    
          const postagem = new Postagem(id, texto, 0, 0, new Date(), perfil);
          this.redeSocial.incluirPostagem(postagem);
        } catch (error) {
          console.error(`Erro ao criar postagem: ${error}`);
        }
      }
  
      // criarPostagemAvancada(): void {
      //   const perfilId = parseInt(promptSync("Digite o ID do perfil que está fazendo a postagem: "));
      //   const id = parseInt(promptSync("Digite o ID da postagem: "));
      //   const texto = promptSync("Digite o texto da postagem: ");
      //   const hashtagsInput = promptSync("Deseja adicionar hashtags a esta postagem? (1 para sim, 0 para não): ");
      //   let hashtags: string[] = [];
  
      //   if (hashtagsInput === "1") {
      //     const hashtagsString = promptSync("Digite as hashtags (separadas por vírgula): ");
      //     hashtags = hashtagsString.split(',');
      //   }
  
      //   const visualizacoesRestantes = parseInt(promptSync("Digite o número de visualizações para a sua postagem: "));
    
      //   const perfil = this.redeSocial.consultarPerfil(perfilId);
      //   if (perfil) {
      //     const postagemAvancada = new PostagemAvancada(id, texto, 0, 0, new Date(), perfil, hashtags, visualizacoesRestantes);
      //     this.redeSocial.incluirPostagem(postagemAvancada);
           
      //   } else {
      //     console.log("Perfil não encontrado. A postagem não pôde ser criada.");
      //   }
      // }
      criarPostagemAvancada(): void {
        try {
          const perfilId = parseInt(promptSync("Digite o ID do perfil que está fazendo a postagem: "));
          if (isNaN(perfilId)) {
            throw new Error("ID do perfil inválido. Certifique-se de inserir um número.");
          }
    
          const id = parseInt(promptSync("Digite o ID da postagem: "));
          if (isNaN(id)) {
            throw new Error("ID da postagem inválido. Certifique-se de inserir um número.");
          }
    
          const texto = promptSync("Digite o texto da postagem: ");
          if (!texto) {
            throw new Error("O texto da postagem não pode ser vazio.");
          }
    
          const hashtagsInput = promptSync("Deseja adicionar hashtags a esta postagem? (1 para sim, 0 para não): ");
          let hashtags: string[] = [];
    
          if (hashtagsInput === "1") {
            const hashtagsString = promptSync("Digite as hashtags (separadas por vírgula): ");
            hashtags = hashtagsString.split(',');
          }
    
          const visualizacoesRestantes = parseInt(promptSync("Digite o número de visualizações para a sua postagem: "));
          if (isNaN(visualizacoesRestantes)) {
            throw new Error("Número de visualizações inválido. Certifique-se de inserir um número.");
          }
    
          const perfil = this.redeSocial.consultarPerfil(perfilId);
          if (!perfil) {
            throw new Error("Perfil não encontrado. A postagem não pôde ser criada.");
          }
    
          const postagemAvancada = new PostagemAvancada(id, texto, 0, 0, new Date(), perfil, hashtags, visualizacoesRestantes);
          this.redeSocial.incluirPostagem(postagemAvancada);
    
        } catch (error) {
          console.error(`Erro ao criar postagem avançada: ${error}`);
        }
      }
    
      // consultarPerfil(): void {
      //   const id = parseInt(promptSync("Digite o ID do perfil: "));
      //   const perfil = this.redeSocial.consultarPerfil(id);
      //   if (perfil) {
      //     console.log(`Perfil encontrado: ${perfil.nome}`);
      //     console.log(`Quantidade de postagens: ${perfil.postagens.length}`);
      //   } else {
      //     console.log("Perfil não encontrado.");
      //   }
      // }
      consultarPerfil(): void {
        try {
          const perfilId = parseInt(promptSync("Digite o ID do perfil que deseja consultar: "));
          if (isNaN(perfilId)) {
            throw new Error("ID do perfil inválido. Certifique-se de inserir um número.");
          }
    
          const perfil = this.redeSocial.consultarPerfil(perfilId);
          if (!perfil) {
            throw new Error("Perfil não encontrado.");
          }
    
          console.log(`Perfil encontrado: ${perfil.nome}`);
          console.log(`Quantidade de postagens: ${perfil.postagens.length}`);
        } catch (error) {
          console.error(`Erro ao consultar perfil: ${error}`);
        }
      }
    
      // consultarPostagens(): void {
      //   const id = parseInt(promptSync("Digite o ID da postagem: "));
      //   const postagens = this.redeSocial.consultarPostagens(id);
      
      //   if (postagens.length === 0) {
      //     console.log("Nenhuma postagem encontrada.");
      //     return;
      //   }
      
      //   postagens.forEach((postagem) => {
      //     console.log(`\n${postagem.data}`);
      //     console.log(`${postagem.perfil.nome}: ${postagem.texto}`);
      //     if (postagem instanceof PostagemAvancada) {
      //       console.log(`${postagem.hashtags}`);
      //       console.log(`Visualizações Restantes: ${postagem.visualizacoesRestantes}`);
      //     }
      //     console.log(`${postagem.curtidas} curtidas, ${postagem.descurtidas} descurtidas. ${postagem.ehPopular() ? 'Postagem Popular' : ''}`);
      //     if (postagem.comentarios.length > 0) {
      //       console.log(`Número de Comentários: ${postagem.comentarios.length}`);
      //       postagem.comentarios.forEach((comentario) => {
      //         console.log(` - ${comentario.perfil.nome}: ${comentario.texto}`);
      //       });
      //     }        
      //   });
  
      //   if (id) {
      //     const postagemSelecionada = postagens.find((postagem) => postagem.id === Number(id));
      //     if (postagemSelecionada) {
      //       this.menuCurtirDescurtir(postagemSelecionada);
      //     } else {
      //       console.log("Postagem não encontrada.");
      //     }
      //   }
      // }
      consultarPostagens(): void {
        try {
          const id = parseInt(promptSync("Digite o ID da postagem que deseja consultar: "));
          if (isNaN(id)) {
            throw new Error("ID da postagem inválido. Certifique-se de inserir um número.");
          }
          
          const postagem = this.redeSocial.consultarPostagens(id);
          if (postagem.length === 0) {
            throw new Error("Postagem não encontrada.");
          }

        postagem.forEach((postagem) => {
          console.log(`\n${postagem.data}`);
          console.log(`${postagem.perfil.nome}: ${postagem.texto}`);
          if (postagem instanceof PostagemAvancada) {
            console.log(`${postagem.hashtags}`);
            console.log(`Visualizações Restantes: ${postagem.visualizacoesRestantes}`);
          }
          console.log(`${postagem.curtidas} curtidas, ${postagem.descurtidas} descurtidas. ${postagem.ehPopular() ? 'Postagem Popular' : ''}`);
          if (postagem.comentarios.length > 0) {
            console.log(`Número de Comentários: ${postagem.comentarios.length}`);
            postagem.comentarios.forEach((comentario) => {
              console.log(` - ${comentario.perfil.nome}: ${comentario.texto}`);
            });
          }        
        });
        if (id) {
          const postagemSelecionada = postagem.find((postagem) => postagem.id === Number(id));
          if (postagemSelecionada) {
            this.menuCurtirDescurtir(postagemSelecionada);
          }
        }
        } catch (error) {
          console.error(`Erro ao consultar postagem: ${error}`);
        } 
      }
        
      //   exibirPostagensPorPerfil(): void {
      //     const idPerfil = parseInt(promptSync("Digite o ID do perfil: "));
      //     const postagens = this.redeSocial.exibirPostagensPorPerfil(idPerfil);
  
      //     if (postagens.length > 0) {
      //       postagens.forEach((postagem) => {
      //       console.log(`\n${postagem.data}`);
      //       console.log(`${postagem.perfil.nome}: ${postagem.texto}`);
      //       if (postagem instanceof PostagemAvancada) {
      //         console.log(`${postagem.hashtags}`);
      //         console.log(`Visualizações Restantes: ${postagem.visualizacoesRestantes}`);
      //       }
      //       console.log(`${postagem.curtidas} curtidas, ${postagem.descurtidas} descurtidas. ${postagem.ehPopular() ? 'Postagem Popular!' : ''}`);
      //       if (postagem.comentarios.length > 0) {
      //         console.log(`Número de Comentários: ${postagem.comentarios.length}`);
      //         postagem.comentarios.forEach((comentario) => {
      //           console.log(` - ${comentario.perfil.nome}: ${comentario.texto}`);
      //         });
      //       }
      //     });
      //   } else {
      //     console.log("Nenhuma postagem encontrada.");
      //   }
      // }
      exibirPostagensPorPerfil(): void {
        try {
          const perfilId = parseInt(promptSync("Digite o ID do perfil para exibir suas postagens: "));
          if (isNaN(perfilId)) {
            throw new Error("ID do perfil inválido. Certifique-se de inserir um número.");
          }
    
          const postagens = this.redeSocial.exibirPostagensPorPerfil(perfilId);
          if (postagens.length > 0) {
            postagens.forEach((postagem) => {
            console.log(`\n${postagem.data}`);
            console.log(`${postagem.perfil.nome}: ${postagem.texto}`);
            if (postagem instanceof PostagemAvancada) {
              console.log(`${postagem.hashtags}`);
              console.log(`Visualizações Restantes: ${postagem.visualizacoesRestantes}`);
            }
            console.log(`${postagem.curtidas} curtidas, ${postagem.descurtidas} descurtidas. ${postagem.ehPopular() ? 'Postagem Popular!' : ''}`);
            if (postagem.comentarios.length > 0) {
              console.log(`Número de Comentários: ${postagem.comentarios.length}`);
              postagem.comentarios.forEach((comentario) => {
                console.log(` - ${comentario.perfil.nome}: ${comentario.texto}`);
              });
            }
          });
        }
      }catch (error) {
          console.error(`Erro ao exibir postagens por perfil: ${error}`);
        }
      }
    
      // exibirPostagensPorHashtag(): void {
      //   const hashtag = promptSync("Digite a hashtag: ");
      //   const postagens = this.redeSocial.exibirPostagensPorHashtag(hashtag);
  
      //   if (postagens.length > 0) {
          
      //     console.log(`Postagens com a hashtag: ${hashtag}`);
      //     postagens.forEach((postagem) => {
      //       console.log(`\n${postagem.data}`);
      //       console.log(`${postagem.perfil.nome}: ${postagem.texto}`);
      //       if (postagem instanceof PostagemAvancada) {
      //         console.log(`Visualizações Restantes: ${postagem.visualizacoesRestantes}`);
      //       }
      //       console.log(`${postagem.curtidas} curtidas, ${postagem.descurtidas} descurtidas. ${postagem.ehPopular() ? 'Postagem Popular!' : ''}`);
      //       if (postagem.comentarios.length > 0) {
      //         console.log(`Número de Comentários: ${postagem.comentarios.length}`);
      //         postagem.comentarios.forEach((comentario) => {
      //           console.log(` - ${comentario.perfil.nome}: ${comentario.texto}`);
      //         });
      //       }
      //     });
      //   } else {
      //     console.log("Nenhuma postagem encontrada com esta hashtag.");
      //   }
      // }
      exibirPostagensPorHashtag(): void {
        try {
          const hashtag = promptSync("Digite a hashtag: ");
          const postagens = this.redeSocial.exibirPostagensPorHashtag(hashtag);
          if (postagens.length === 0) {
            throw new Error(`Nenhuma postagem encontrada para a hashtag '${hashtag}'.`);
          }
  
        if (postagens.length > 0) {
          
          console.log(`Postagens com a hashtag: ${hashtag}`);
          postagens.forEach((postagem) => {
            console.log(`\n${postagem.data}`);
            console.log(`${postagem.perfil.nome}: ${postagem.texto}`);
            if (postagem instanceof PostagemAvancada) {
              console.log(`Visualizações Restantes: ${postagem.visualizacoesRestantes}`);
            }
            console.log(`${postagem.curtidas} curtidas, ${postagem.descurtidas} descurtidas. ${postagem.ehPopular() ? 'Postagem Popular!' : ''}`);
            if (postagem.comentarios.length > 0) {
              console.log(`Número de Comentários: ${postagem.comentarios.length}`);
              postagem.comentarios.forEach((comentario) => {
                console.log(` - ${comentario.perfil.nome}: ${comentario.texto}`);
              });
              }
            });
          }
        }catch (error) {
            console.error(`Erro ao exibir postagens por hashtag: ${error}`);
          }
        }
  
      // exibirPostagensPopulares(): void {
      //   const postagens = this.redeSocial.consultarPostagens();
      
      //   if (postagens.length > 0) {
      //     const postagensPopulares = postagens.filter((postagem) => {
      //       return postagem.ehPopular() && ((postagem instanceof PostagemAvancada && postagem.visualizacoesRestantes > 0) || postagem instanceof Postagem);
      //     });
      
      //     if (postagensPopulares.length > 0) {
      //       console.log("Postagens Populares:");
      //       postagensPopulares.forEach((postagem) => {
      //         console.log(`\n${postagem.data}`);
      //         console.log(`${postagem.perfil.nome}: ${postagem.texto}`);
      //         if (postagem instanceof PostagemAvancada) {
      //           console.log(`Visualizações Restantes: ${postagem.visualizacoesRestantes}`);
      //         }
      //         console.log(`${postagem.curtidas} curtidas, ${postagem.descurtidas} descurtidas`);
      //         if (postagem.comentarios.length > 0) {
      //           console.log(`Número de Comentários: ${postagem.comentarios.length}`);
      //           postagem.comentarios.forEach((comentario) => {
      //             console.log(` - ${comentario.perfil.nome}: ${comentario.texto}`);
      //           });
      //         }
      //       });
      //     } else {
      //       console.log("Nenhuma postagem popular encontrada que ainda possa ser exibida.");
      //     }
      //   } else {
      //     console.log("Nenhuma postagem encontrada.");
      //   }
      // }
      exibirPostagensPopulares(): void {
        try {
          const postagens = this.redeSocial.consultarPostagens();
      
          if (postagens.length === 0) {
            throw new Error("Nenhuma postagem encontrada.");
          }
      
          const postagensPopulares = postagens.filter((postagem) => {
            return postagem.ehPopular() && ((postagem instanceof PostagemAvancada && postagem.visualizacoesRestantes > 0) || postagem instanceof Postagem);
          });
      
          if (postagensPopulares.length === 0) {
            throw new Error("Nenhuma postagem popular encontrada que ainda possa ser exibida.");
          }
      
          console.log("Postagens Populares:");
          postagensPopulares.forEach((postagem) => {
            console.log(`\n${postagem.data}`);
            console.log(`${postagem.perfil.nome}: ${postagem.texto}`);
            if (postagem instanceof PostagemAvancada) {
              console.log(`Visualizações Restantes: ${postagem.visualizacoesRestantes}`);
            }
            console.log(`${postagem.curtidas} curtidas, ${postagem.descurtidas} descurtidas`);
            if (postagem.comentarios.length > 0) {
              console.log(`Número de Comentários: ${postagem.comentarios.length}`);
              postagem.comentarios.forEach((comentario) => {
                console.log(` - ${comentario.perfil.nome}: ${comentario.texto}`);
              });
            }
          });
        } catch (error) {
          console.error(`Erro ao exibir postagens populares: ${error}`);
        }
      }
  
      // exibirHashtagsPopulares(): void {
      //   const popularHashtags = this.redeSocial.exibirHashtagsPopulares();
      
      //   if (popularHashtags.length > 0) {
      //     console.log("Hashtags Populares:");
      //     popularHashtags.forEach((hashtagInfo) => {
      //       console.log(hashtagInfo);
      //     });
      //   } else {
      //     console.log("Nenhuma hashtag popular encontrada.");
      //   }
      // }
      exibirHashtagsPopulares(): void {
        try {
          const hashtags = this.redeSocial.exibirHashtagsPopulares();
      
          if (hashtags.length === 0) {
            throw new Error("Nenhuma hashtag encontrada.");
          }
      
          console.log("Hashtags populares: ", hashtags);
        } catch (error) {
          console.error(`Erro ao exibir hashtags populares: ${error}`);
        }
      }
  
      adicionarComentario(): void {
        const idPostagem = parseInt(promptSync("Digite o ID da postagem que deseja comentar: "));
        
        const postagem = this.redeSocial.consultarPostagens(idPostagem);
      
        if (postagem.length === 0) {
          console.log("Postagem não encontrada.");
          return;
        }
      
        const perfilId = parseInt(promptSync("Digite o ID do perfil que está comentando: "));
        const perfil = this.redeSocial.consultarPerfil(perfilId);
        
        if (!perfil) {
          console.log("Perfil não encontrado.");
          return;
        }
        const textoComentario = promptSync("Digite o texto do comentário: ");
      
        postagem[0].adicionarComentario(postagem[0].comentarios.length + 1, textoComentario, perfil);
      
        console.log("Comentário adicionado com sucesso.");
      }
  
      // excluirPostagem(): void {
      //   const idPostagem = parseInt(promptSync("Digite o ID da postagem que deseja excluir: "));
      
      //   this.redeSocial.excluirPostagem(idPostagem);
      // }
      excluirPostagem(): void {
        try {
          const idPostagem = parseInt(promptSync("Digite o ID da postagem que deseja excluir: "));
          if (isNaN(idPostagem)) {
            throw new Error("ID da postagem inválido. Certifique-se de inserir um número.");
          }
    
          this.redeSocial.excluirPostagem(idPostagem);
          if (!true) {
            throw new Error("Postagem não encontrada ou não foi possível excluí-la.");
          }
    
        } catch (error) {
          console.error(`Erro ao excluir postagem: ${error}`);
        }
      }
      
  
      excluirComentario(): void {
        const idPostagem = parseInt(promptSync("Digite o ID da postagem da qual deseja excluir um comentário: "));
        const postagem = this.redeSocial.consultarPostagens(idPostagem);
      
        if (postagem.length === 0) {
          console.log("Postagem não encontrada.");
          return;
        }
      
        if (postagem[0].comentarios.length === 0) {
          console.log("Não há comentários para excluir.");
          return;
        }
      
        console.log("Comentários da postagem:");
        postagem[0].comentarios.forEach((comentario) => {
          console.log(`ID: ${comentario.id}, Texto: ${comentario.texto}`);
        });
      
        const idComentario = parseInt(promptSync("Digite o ID do comentário que deseja excluir: "));
      
        postagem[0].excluirComentario(idComentario);
      }
  
      // excluirPerfil(): void {
      //   const idPerfil = parseInt(promptSync("Digite o ID do perfil que deseja excluir: "));
      //   this.redeSocial.excluirPerfil(idPerfil);
      // }
      excluirPerfil(): void {
        try {
          const perfilId = parseInt(promptSync("Digite o ID do perfil que deseja excluir: "));
          if (isNaN(perfilId)) {
            throw new Error("ID do perfil inválido. Certifique-se de inserir um número.");
          }
    
          this.redeSocial.excluirPerfil(perfilId);
          if (!true) {
            throw new Error("Perfil não encontrado ou não foi possível excluí-lo.");
          }
    
        } catch (error) {
          console.error(`Erro ao excluir perfil: ${error}`);
        }
      }
  
    //   exibirTodasAsPostagens(): void {
    //     this.redeSocial.exibirTodasAsPostagens();
    //   }
    // }
      exibirTodasAsPostagens(): void {
        try {
          const postagens = this.redeSocial.consultarPostagens();
      
          if (postagens.length > 0) {
            postagens.forEach((postagem) => {
              console.log(`\n${postagem.data}`);
              console.log(`${postagem.perfil.nome}: ${postagem.texto}`);
              if (postagem instanceof PostagemAvancada) {
                console.log(`${postagem.hashtags}`);
                console.log(`Visualizações Restantes: ${postagem.visualizacoesRestantes}`);
              }
              console.log(`${postagem.curtidas} curtidas, ${postagem.descurtidas} descurtidas. ${postagem.ehPopular() ? 'Postagem Popular' : ''}`);
              if (postagem.comentarios.length > 0) {
                console.log(`Número de Comentários: ${postagem.comentarios.length}`);
                postagem.comentarios.forEach((comentario) => {
                  console.log(` - ${comentario.perfil.nome}: ${comentario.texto}`);
                });
              }
            });
          } else {
            console.log("Nenhuma postagem encontrada.");
          }
        } catch (error) {
          console.error(`Erro ao exibir todas as postagens: ${error}`);
        }
      }
    }

    const app = new App();
    app.exibirMenu();