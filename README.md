# CUBOS3D

CUBOS3D é um jogo interativo para a web onde o objetivo é destruir cubos 3D que caem continuamente, somando pontos a cada clique. Desafie sua precisão e velocidade para alcançar a pontuação máxima!

## Visão Geral do Jogo

O jogo consiste em uma tela 3D onde objetos cúbicos são gerados e caem em direção à base. O jogador deve clicar nos cubos antes que eles se acumulem, destruindo-os e incrementando o placar (score).

### Funcionalidades

* **Renderização 3D:** Exibição dinâmica de objetos cúbicos em um ambiente 3D.
* **Interatividade:** Destruição dos cubos através de eventos de clique.
* **Sistema de Pontuação:** Acompanhamento em tempo real do progresso do jogador.
* **Geração Dinâmica:** Geração contínua e randômica de cubos para manter o desafio.

## 🛠️ Stack Tecnológico

O projeto foi construído utilizando as seguintes tecnologias:

* **React:** Biblioteca para a construção da interface de usuário.
* **TypeScript:** Superset do JavaScript que adiciona tipagem estática, garantindo maior manutenibilidade e menos erros.
* **Vite:** Ferramenta de build rápida e leve para empacotamento do projeto.

## ⚙️ Instalação e Execução

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente local.

### Pré-requisitos

Certifique-se de que você tem o **Node.js** instalado em sua máquina. O Node.js inclui o `npm` (Node Package Manager).

### Instalação das Dependências

Abra o terminal na raiz do projeto (`CUBOS3D`) e execute o seguinte comando para instalar todas as dependências listadas em `package.json`:

```bash
npm install
```

### Execução do Servidor de Desenvolvimento

Após a instalação, inicie o servidor de desenvolvimento.

```bash
npm run dev
```

O terminal exibirá um link (ex: http://localhost:5173/). Copie e cole este endereço no seu navegador para acessar e jogar **CUBOS3D**.

# Detalhes da Implementação

Componente App.tsx
- Lógica do Jogo: Controla a criação, queda e remoção dos cubos.

- Pontuação: O estado do score é mantido aqui.

- Handler de Clique: Possui a função que é executada quando um cubo é clicado, incrementando o score e removendo o cubo da lista ativa.

Componente Cube3D.tsx
- Responsável pela renderização 3D de um único cubo.

- Gerencia a animação de queda (movimentação vertical).

- Chama a função de remoção fornecida pelo App.tsx quando detecta um evento de clique.