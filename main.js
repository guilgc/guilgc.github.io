const botaoenter = document.getElementById('input');


//função para o enter ativar a função pesquisar
botaoenter.addEventListener('keypress', (e)=> {
    if (e.keyCode ===13) {
        pesquisar();
        
    }
});

function semusuario(){
        alert ('Usuário não encontrado')
}

//função para fazer a requisição em cima do 'user' digitado e aparecer todos os detalhes de cada repositório
function pesquisar() {
    const usuario = document.getElementById('input').value
    let xhr = new XMLHttpRequest();
    let fotouser = document.querySelector('#divfoto');
    let projetos = document.querySelector('#div1');
    let url = `https://api.github.com/users/${usuario}/repos`;
    
    xhr.open('GET', url)
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let dataJSONText = xhr.responseText
            let dataJSONObj = JSON.parse(dataJSONText);
            
            const fotourl = dataJSONObj[0].owner.avatar_url
            const nameUser = dataJSONObj[0].owner.login
            fotouser.innerHTML += `
            <div id='foto'>
            <img src="${fotourl}">
            <h1>${nameUser}</h1>
            <a class="link1" target="_blank" href="https://github.com/${nameUser}?tab=following">Pessoas que segue</a>
            </div>            
            `
            
            for (let i = 0; i < dataJSONObj.length; i++) {
                const imgCard = dataJSONObj[i].language
                const cloneRepo = dataJSONObj[i].clone_url
                
                const linkRepo = dataJSONObj[i].html_url;
                const name = dataJSONObj[i].name;
                const seguidores = dataJSONObj[i].following_url;
                const id = dataJSONObj[i].id;
                const repo = dataJSONObj[i].default_branch;
                const desc = dataJSONObj[i].description ?? 'Sem descrição';
                const linguagem = dataJSONObj[i].language ?? 'Sem linguagem predominante';
                
                projetos.innerHTML +=
                `              
                <div class="box">        
                <div class="linguagem">
                <img id="linguagem" src="imagens/${imgCard}.svg" alt="imagem de fundo dos cards">
                </div>
                <div class="content">
                <h2>Repositório: ${name}</h2>
                <br>
                <a target="_blank" class="link" href="${linkRepo}">Clique para ir ao repositório</a>
                <br>
                <button onclick="clone('git clone ${cloneRepo}')">Clonar o repositório</button>
                <br>         
                <p>Id do Repositório: ${id}</p>
                <a class="link" target="_blank" href="https://github.com/${nameUser}/${name}/branches">Branches</a>
                <a class="link" target="_blank" href="https://github.com/${nameUser}/${name}/commits/${repo}">Commits</a>
                <p>Descrição: ${desc}</p>
                <p id="lingua">Linguagens: ${linguagem}</p>
                            
                </div>
                </div>
                `
                
            }
        }
        
    }
   
    xhr.send();
    
    esvazia();
}

//função para esvaziar o corpo da pagina quando tiver nova pesquisa
function esvazia() {
    const repos = document.querySelector('#div1')
    repos.innerHTML = ""
    const fotouserr = document.getElementById('divfoto')
    fotouserr.innerHTML = ""
}

//função para clonar o repositório
function clonar(url) {
    const input = document.createElement("input");
    input.value = url;
    input.id = "input";
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
}