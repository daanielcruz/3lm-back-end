# :computer: Desafio 3lm (Back-end)!
Este repo faz parte do processo seletivo da 3lm.

Deploy front-end: https://front-end3lm.herokuapp.com/ <br />
Deploy back-end: https://back-end3lm.herokuapp.com/

## :rocket: Algumas tecnologias utilizadas:


- TypeScript
- Bcrypt
- Express
- JWT
- Mongoose/MongoDB
- Winston

Cique e veja a source do Front-end: https://github.com/daanielcruz/3lm-front-end

## :question: Como executar:

Para criar uma conta de admin (login area) deve-se enviar uma req POST para o endpoint /admin com email e password, ex:
```bash
{
	"email": "test@test.com",
	"password": "123"
}
```

Configure as variavéis de ambiente MONGODB (uri da database) e SECRET (hash para o jwt), conforme o .env.sample!

Documentação in progress...

Para clonar e rodar esta aplicação, você vai precisar de Git, Node.js e Yarn =)
```bash
## Clone este repositório
$ git clone https://github.com/daanielcruz/3lm-back-end

## Entre no repositório
$ cd 3lm-back-end

## Instale as dependências
$ yarn install

## Inicie o servidor de desenvolvimento
$ yarn dev:server

## Para buildar digite o comando
$ yarn build
```
