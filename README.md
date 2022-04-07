# Aplicando API ao projeto TodoList

## API

### Para consumir dados da api

* Fazer requisição na rota /tasks

Exemplo:

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

### Criar Nova Task 

* para criar uma nova task no banco de dados usando a api, passar para a rota `/create/:taskname` sendo taskname o nome da nova task

Exemplo: 
    ```
    function CriarNovaTask(newtask){
        window.location = 'http://server:6969/create' + newtask
    }
    ```

### Remover uma task no DB via api

* Enviar o id da task que deseja excluir para a rota `/remove/:id`

Exemplo: 
```
    function removerTask(idtask){
        window.location = 'http://localhost:6969/remove/' + idtask
    }
    

```
### Atualizar o status de uma task

* Basta enviar o id da task para a rota `/update/:id` 

obs: não é necessário mandar o status atual, isso será verificado pelo servidor api.

Exemplo: 

```
    function atualizarStatus(){
            window.location = 'http://localhost:6969/update/' + id

    }
```

----------------------------------------------------
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

