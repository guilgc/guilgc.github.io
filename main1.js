let xhr = new XMLHttpRequest()

let corpo = document.querySelector('section')

var repositorioJson = localStorage.getItem("repositorio")

if(repositorioJson == null){
    repositorioJson = []
}

var repositorio = JSON.parse(repositorioJson)

let url = `https://api.github.com/users/${}/` + repositorio[0].nome;

xhr.open('GET', url)


xhr.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
        let dadosJSONText = xhr.responseText
        let dadosJSONObj = JSON.parse(dadosJSONText)
            
        corpo.innerHTML += 
        
            `<h1>Username:`+dadosJSONObj.owner.login+`</h1>
            <p>Id do Repositório: `+dadosJSONObj.id+`</p>
            <p"><img src="images/otavio.jpg"></img></p>
            <a href="`+dadosJSONObj.following_url+`">Link para seguidores</a>
            <p>Descrição do Repositório: `+dadosJSONObj.description+`</p>
            <a href="`+dadosJSONObj.collaborators_url+`">Link para Colaboradores</a>
            <a href="`+dadosJSONObj.branches_url+`">Link para Branchs</a>
            <a href="`+dadosJSONObj.commits_url+`">Link para Branchs</a>
            <p>Linguagem Predominante: `+dadosJSONObj.language+`</p>
            <iframe style="height:220px"src="images/`+dadosJSONObj.language+`.txt"></iframe>
            <img src="images/`+dadosJSONObj.language +`.png"></img>`
    }
}
xhr.send();