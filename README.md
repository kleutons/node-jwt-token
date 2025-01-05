# 🔐 Node.js & TypeScript JWT Authentication

Este é um projeto básico de autenticação utilizando JSON Web Tokens (JWT) com Node.js e TypeScript. Ele demonstra como criar, verificar e proteger rotas usando JWT.

## 📋 Pré-requisitos

- Node.js instalado
- npm ou yarn para gerenciamento de pacotes

## 🚀 Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/kleutons/node-jwt-token
    ```

2. Navegue até o diretório do projeto:

3. Instale as dependências:
    ```bash
    npm install
    ```

## ⚙️ Configuração

1. Crie um arquivo `.env` na raiz do projeto e defina a chave secreta para o JWT:
    ```dotenv
    SECRET=your-jwt-secret
    ```

## 📂 Estrutura do Projeto

- `src/`
  - `controllers/`
    - `authController.ts`: Controlador de autenticação
  - `data/`
    - `users.ts`: Mock de dados de usuários
  - `middlewares/`
    - `authMiddleware.ts`: Middleware de autenticação
  - `utils/`
    - `generatePassword.ts`: Função para gerar hash da senha
  - `routes.ts`: Definição das rotas
  - `server.ts`: Configuração e inicialização do servidor

## 🛠️ Uso

### Iniciar o servidor

Para iniciar o servidor, execute:

```bash
npm run dev
```

# 📋 Endpoints
## 🔐 Autenticação
- POST /login
  - Endpoint para login e geração de token JWT.
  - Request Body:
  ```json
    {
        "email": "user@example.com",
        "password": "password"
    }

   ```
  - Response:
  ```json
    {
        "message": "Login Successful!",
        "data": {
            "token": "jwt-token"
        }
    }

   ```
## 👤 Usuários
- GET /api/user
  - Lista todos os usuários. (Protegido por token JWT)

- POST /api/user
  - Cria um novo usuário. (Protegido por token JWT e requer papel de administrador)
 - Request Body:
  ```json
    {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "password"
    }

   ```
 - PUT /api/user/:id
   - Request Body:
    ```json
    {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "newpassword"
    }
    ```
- DELETE /api/user/:id
  - Exclui um usuário. (Protegido por token JWT e requer papel de administrador)

## 📦 Produtos
  - GET /api/product
  - Exemplo de rota pública para produtos.

## 🤝 Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests para melhorar este projeto.

## Licença
Este projeto está licenciado sob a MIT License.

## 🟢 Author

| [<img src="https://avatars3.githubusercontent.com/u/106082564?s=96&v=4"><br><sub>Kleuton Novais</sub>](https://github.com/kleutons) |
| :---------------------------------------------------------------------------------------------------------------------------------------: |
|                                            [Linkedin](https://www.linkedin.com/in/kleuton-novais/)    