# Projeto API de Livros 📚

Este projeto é um desafio de uma API para gerenciamento de livros. Ele foi desenvolvido usando Node.js, Express e MySQL no back-end e utiliza HTML, Tailwind CSS e Axios no front-end. O objetivo é permitir a criação, listagem, atualização e exclusão de livros, além de aplicar filtros por nome e status de leitura.

## Estrutura do Banco de Dados

Para executar este projeto, é necessário criar um banco de dados MySQL com uma tabela chamada `api-livros` com as seguintes colunas:

- `id`: INT, chave primária, auto-incrementada.
- `livro`: VARCHAR(255), nome do livro.
- `autor`: VARCHAR(255), autor do livro.
- `data`: DATE, data de lançamento do livro.
- `status`: BOOL, status de leitura do livro (`0` para "não lido" e `1` para "lido").

## Instalação e Execução

1. Clone este repositório:
    ```bash
    $ git clone https://github.com/FilipeAraujoQ/desafio-back-end.git
    ```

2. Acesse a pasta do projeto:
    ```bash
    $ cd desafio-back-end
    ```

3. Baixe as dependências:
    ```bash
    $ npm install
    ```

4. Execute a API:
    ```bash
    $ npm run start
    ```

5. Abra o arquivo `index.html` na pasta `front` para visualizar a Landing Page e a Tela de Login. Pode ser aberto diretamente no navegador ou usando o servidor local.

