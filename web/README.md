# Notes App

O Notes App é uma aplicação web para gerenciar notas pessoais. Os usuários podem se registrar, fazer login, criar, editar, visualizar e deletar notas. A aplicação utiliza autenticação baseada em tokens para garantir a segurança dos dados.

## Funcionalidades

### Funcionalidades Principais

1. **Registro de Usuário**

- Os usuários podem se registrar fornecendo nome, e-mail e senha.
- A senha deve ser confirmada durante o registro.

2. **Login de Usuário**

- Os usuários podem fazer login fornecendo e-mail e senha.
- Após o login, um token de autenticação é armazenado nos cookies.

3. **Gerenciamento de Notas**

- **Criação de Notas**
  - Os usuários podem criar novas notas fornecendo título, descrição e cor.
- **Edição de Notas**
  - Os usuários podem editar notas existentes.
- **Visualização de Notas**
  - Os usuários podem visualizar detalhes de uma nota específica.
- **Deleção de Notas**
  - Os usuários podem deletar notas existentes.

### Funcionalidades Adicionais

- **Modal de Perfil**
  - Os usuários podem atualizar informações do perfil.
- **Paginação**
  - As notas são paginadas para melhor visualização.

## Requisitos Funcionais

1. **Registro de Usuário**

- O sistema deve permitir que novos usuários se registrem.
- O sistema deve validar o e-mail e a senha durante o registro.

2. **Login de Usuário**

- O sistema deve permitir que usuários registrados façam login.
- O sistema deve validar as credenciais do usuário.

3. **Gerenciamento de Notas**

- O sistema deve permitir que usuários criem, editem, visualizem e deletem notas.
- O sistema deve validar os campos das notas (título, descrição e cor).

4. **Autenticação e Autorização**

- O sistema deve utilizar tokens de autenticação para proteger as rotas.
- O sistema deve armazenar o token de autenticação nos cookies.

## Requisitos Não Funcionais

1. **Usabilidade**

- A interface deve ser intuitiva e fácil de usar.
- O design deve ser responsivo e acessível.

2. **Desempenho**

- O sistema deve ser capaz de lidar com múltiplas requisições simultâneas.
- O tempo de resposta das operações deve ser aceitável para o usuário.

3. **Segurança**

- O sistema deve proteger os dados dos usuários utilizando HTTPS.
- O sistema deve armazenar senhas de forma segura.

4. **Manutenibilidade**

- O código deve ser modular e seguir boas práticas de desenvolvimento.
- O sistema deve ser fácil de manter e atualizar.

## Regras de Negócio

1. **Registro de Usuário**

- O e-mail deve ser único e válido.
- A senha deve ter no mínimo 8 caracteres.

2. **Login de Usuário**

- O e-mail e a senha devem corresponder a um usuário registrado.

3. **Gerenciamento de Notas**

- O título da nota deve ter entre 3 e 50 caracteres.
- A descrição da nota deve ter entre 10 e 255 caracteres.
- A cor da nota deve ser um código hexadecimal válido.

## Estrutura do Projeto

A estrutura do projeto é composta por pastas e arquivos organizados da seguinte forma:

```

notes-app/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
├── .env
├── .gitignore
├── .prettierrc
├── client.http
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

```

## Como Executar o Projeto

1. Clone o repositório:

```sh
git clone https://github.com/seu-usuario/notes-app.git
```

2. Instale as dependências:

```sh
npm install
```

3. Inicie o servidor de desenvolvimento:

```sh
npm run dev
```

4. Acesse a aplicação em seu navegador:

```sh
http://localhost:3000
```

## Configuração das Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

```env
VITE_UNSPLASH_ACCESS_KEY=""
VITE_API_OPENWATHER_KEY=""
VITE_API_SERVER_BACKEND='http://localhost:3000'
```

## Tecnologias Utilizadas

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Zod
- React Hook Form
- React Cookies

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature `(git checkout -b feature/nova-feature)`.
3. Commit suas mudanças `(git commit -m 'Adiciona nova feature')`.
4. Faça o push para a branch `(git push origin feature/nova-feature)`.
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo [LICENSE](LICENSE) para obter detalhes.

Este README fornece uma visão geral completa do projeto, incluindo suas funcionalidades, requisitos, regras de negócio, estrutura do projeto e instruções de execução. Ajuste conforme necessário para refletir com precisão os detalhes do seu projeto.
