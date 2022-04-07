# Aplicando API ao projeto TodoList

## API

* para buscar os dados, fazer requisição a rota /tasks exemplo:
    ```
    * async function buscarAPI(){
        try {
            const resposta = await fetch('http://localhost:6969/tasks')

            const data = await resposta.json()
            
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    ```


----------------------
`OBS:` Para o Front-End, utilizei a extensão live server;

Dependências usadas{
    `express`, `nodemon`, `cors`, `sequelize`, `mysql2`
}

### Back-end

* instalar as depencências
    * npm init -y
    * npm install --save express
    * npm install --save nodemon
    * npm install --save cors
    * npm install sequelize mysql2

* habilitar o cors

* criar conexão com o banco de dados
    * criar o modelo de tabela que será utilizado => models

* criar rota da api
    * buscar dados no db
    * processar e responder a req com os dados em json


## Front-End

