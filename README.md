# DNC Sales Dashboard - Mori

**Dashboard de Vendas e Finanças**
Este projeto é um **dashboard** desenvolvido com base nos aprendizados na Escola DNC, com funcionalidades como **login e cadastro de usuários**, **perfil com possibilidade de alteração de dados**, **modo escuro e claro**, **deletar conta** e **dashboard financeiro**.
O sistema possui autenticação de usuários e oferece um painel de controle para visualizar as finanças de vendas, permitindo análise rápida dos dados.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção da interface do usuário.
- **React Router**: Para navegação entre as páginas.
- **CSS (ou SCSS)**: Para estilização do site.
- **JWT (JSON Web Tokens)**: Para autenticação e autorização de usuários.
- **Axios**: Para requisições HTTP.
- **LocalStorage**: Para armazenar dados de autenticação e preferências do usuário.
- **Theme Switcher**: Para alternar entre o modo claro e escuro.

## Funcionalidades

- **Login e Cadastro de Usuários**: Autenticação baseada em JWT, permitindo que os usuários façam login e se cadastrem.
- **Alteração de Perfil**: O usuário pode alterar seus dados cadastrais no perfil.
- **Modo Claro e Escuro**: O usuário pode alternar entre os modos claro e escuro para personalizar a interface.
- **Deletar Conta**: O usuário pode excluir sua conta permanentemente.
- **Dashboard Financeiro**: Exibição de gráficos e relatórios financeiros relacionados às vendas.

## Como Rodar o Projeto Localmente

### 1. Clone o Repositório

```bash
$ git clone https://github.com/MattMori/dnc-sales-dashboard-Mori.git
```

### 2. Acesse o Diretório

```bash
$ cd dnc-sales-dashboard-Mori
```

### 3. Instale as Dependências

```bash
$ npm install
```

### 4. Inicie o Servidor de Desenvolvimento

```bash
$ npm start
```

Agora você pode acessar o projeto no navegador através de **http://localhost:3000**.

## Modo Claro e Escuro
O sistema possui a funcionalidade de alternar entre o **modo claro** e **modo escuro**. A preferência do modo é salva no **LocalStorage** do navegador, para que o usuário possa manter sua escolha em sessões futuras.

## Autenticação de Usuários
A autenticação é feita utilizando **JWT** (JSON Web Tokens). O sistema permite o cadastro de novos usuários e o login, que geram um token de autenticação que é armazenado no **LocalStorage** para facilitar o gerenciamento de sessões.

## 🔗 Link para o Projeto
Você pode visualizar o projeto ao vivo através do link abaixo:
[Visite o projeto](https://dnc-sales-dashboard-mori.vercel.app/)

## Contribuição

Este projeto foi desenvolvido para fins acadêmicos. Contribuições são bem-vindas! Se você tiver sugestões ou melhorias, sinta-se à vontade para abrir uma **issue** ou enviar um **pull request**.
