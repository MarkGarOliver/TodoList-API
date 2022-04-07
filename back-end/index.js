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
                            id: tasks[i].id,
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
                res.redirect('http://127.0.0.1:5500/front-end/')
            }).catch(function(error){
                console.error(error)
            })

            //res.redirect('http://127.0.0.1:5500/front-end/')
        })

    //remove task
        app.get('/remove/:id', (req, res) => {
            newtask.destroy({where: {id: req.params.id}}).then(function(){

            }).catch(function(error){
                res.send(error)
            })
        })
    //update task
        app.get('/update/:id', (req, res) => {
            newtask.findAll({where: {id: req.params.id}}).then(function(task){

                if(task[0].state == 'checked'){
                    newtask.update(
                        {state: ''},
                        {where: {id: req.params.id}}
                    )
                }else{
                    newtask.update(
                        {state: 'checked'},
                        {where: {id: req.params.id}}
                    )
                }

                res.redirect('http://127.0.0.1:5500/front-end/')
            }).catch(function(error){
                console.log(error)
            })
        })

app.listen('6969', function(){
    console.log('Server on..')
})