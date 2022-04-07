'use strict';

//atribuindo a variável o input de um novo item do html
let novoItem = document.getElementById('novoItem')
//dando foco ao campo de criar novo elemento
novoItem.focus()

async function buscarAPI(){
    //await espera que o fetch fazer a busca e depois atribui a variavel resposta | await só funciona em funções assíncronas por isso a async
    try {
        const resposta = await fetch('http://localhost:6969/tasks')

        //resposta retorna bastante informações, e o que queremos está no body, corpo da resposta. para pegas esses dados atribuimos a uma var data
        const data = await resposta.json()
        //console.log(data)

        show(data)
    } catch (error) {
        console.log(error)
    }

}

function show(data){

    let output = ''
    let count = 0

    for(let user of data){
        count +=  1
    }

    for(let i =0; i < count; i++){
        //console.log(data[i].tarefa)
        
        criarItem(data[i].tarefa, data[i].status, data[i].id)
    }

    console.log(output)
  
}



const setBanco = (banco) => localStorage.setItem('todolist', JSON.stringify(banco))


//Função usada para criar uma tarefa nova no todolist, a função recebe o nome da tarefa, o seu status que pode ser 
//ja realizado que seria o checked, ou vazio, além disso, recebe também um indice do array para o bom funcionamento
//de outras funções do js.
const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label')
    item.classList.add('todo__item')
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice = ${indice}>
            <div>${tarefa}</div>
        <input type="button" value="X" data-indice = ${indice}>

    `  
    //aqui eu estou adicionando um filho que é o item criado acima, dentro da div pai todolist
    document.getElementById('todolist').appendChild(item)
    


}



//nesta função estou tratando o evento Enter do teclado, para que quando precionado
//acione a criação da nova tarefa
//buscando o banco com a função getBanco descrita anteriormente
//fazendo a alteração no array que foi buscado
//e por fim fazendo o upload das alterações com a função SetBanco também já descrita
const enter = (event) => {
    console.log(event.key)
    
    const txt = event.target.value

    if (event.key == 'Enter'){

        window.location = 'http://localhost:6969/create/' + txt
        atualizarTela()
        event.target.value = '' //basicamente limpa o campo input
    }
}



//essa função é chamada pela função Atualizar tela, que é chamada sempre que há alguma alteração
//como a adição ou exclusão de uma tarefa, e também quando uma tarefa é marcada como checked.
//basicamente manipula o html para remover todos itens do pai todolist que é onde fica as tarefas(filhos)
//isso ocorre para que na tela não seja recarrecado/duplicado esses elementos em html.
const limparTarefa = () =>{
    const todolist = document.getElementById('todolist')
    //aqui diz que enquanto existe o primeiro filho ele remove o ultimo
    while(todolist.firstChild){
        todolist.removeChild(todolist.lastChild)
    }
}


const atualizarTela = () => {
    limparTarefa()
    buscarAPI()
}

//Função responsável pela Exclusão de tarefas. Recebe o indice da tarefa que será excluida
//busca o banco no localstorage, lembrando que nessa busca ocorre uma conversao para array
//a partir disos splice exclui o item do indice que veio junto com a função
//depois faz o upload e atualiza a tela.
const removerItem = (id) => {
    
    window.location = 'http://localhost:6969/remove/' + id

    atualizarTela()
}

//Função usada para identificar quando é marcado uma tarefa como feita | checked
//assim como nas outras, busca o banco, muda o a propriedade status do item do indice especificado dentro do array
//faz o upload e atualiza a tela novamente.
const atualizarItem = (id) => {
    
    window.location = 'http://localhost:6969/update/' + id

    atualizarTela()
}

//Parte importante do código
//aqui eu trago na função o evento do click dentro de um item/tarefa
//e trato de identificar onde foi esse click, pois se ele tiver sido dentro da div/checkbox, eu 
//chamo a função atualizarItem que muda o status do item no localStorage para checked.
//porem se caso o elemento clicado for o botão dentro da div já sei que é para excluir
//e chamo a função remover item passando o indice de onde clicado para a remoção
//essa passagem do indice também acontece no atualizarItem.
const clickItem = (event) => {
    const elemento = event.target
    console.log(elemento.dataset.indice)

    if (elemento.type == 'button'){
        const indice = elemento.dataset.indice

        removerItem(indice)

    } else if (elemento.type == 'checkbox'){
        const indice = elemento.dataset.indice

        atualizarItem(indice)
    }
}

//aqui o js fica escutando quando o usuario teclar enter no input e chamo a função que trata esse evento Enter
novoItem.addEventListener('keypress', enter)
//basicamente estou ouvindo os eventos da div todolist, e chamando a função clickItem
document.getElementById('todolist').addEventListener('click', clickItem)


atualizarTela()