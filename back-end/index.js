const express = require('express')
const cors = require('cors')
const newtask = require('./DB/models/task')

//config
    const app = express()
    app.use(cors())
    


//rotas
    //tasks response
        app.get('/tasks', (req, res) => {
            //get data from db
                newtask.findAll({order: [['id', 'DESC']]}).then(function(tasks){
                    //var data is the data that we will send to front-end
                    var data = []

                    //count how much objects have in tasks
                    var count = 0
                    for(let task of tasks){
                        count += 1 
                    }

                    let i = 0
                    while(i  < count){
                        data.push({
                            tarefa: tasks[i].nome,
                            status: tasks[i].state
                        })
                        i += 1
                    }
                    //console.log(data)

                    return res.json(data)
                })
        })

    //create a newtask //
        app.get('/create/:taskname', (req, res) => {
            newtask.create ({
                nome: req.params.taskname,
                state: ''
            }).then(function(){
                res.send('criado')
            }).catch(function(error){
                console.error(error)
            })
        })
    
app.listen('6969', function(){
    console.log('Server on..')
})