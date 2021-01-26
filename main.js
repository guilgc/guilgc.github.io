const botaoenter = document.getElementById('input');

botaoenter.addEventListener('keypress', (e)=> {
    if (e.keyCode ===13) {
        pesquisar();
    }
});

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
            fotouser.innerHTML += `<div id='foto'><img src="${fotourl}">
            <h1>${nameUser}</h1></div>            
            `
            
            for (let i = 0; i < dataJSONObj.length; i++) {
                const imgCard = dataJSONObj[i].language
                const cloneRepo = dataJSONObj[i].clone_url
                
                const linkRepo = dataJSONObj[i].html_url;
                const name = dataJSONObj[i].name;
                projetos.innerHTML +=
                `              
                <div class="box">        
                <div class="linguagem">
                <img src="imagens/${imgCard}.svg" alt="imagem de fundo dos cards">
                </div>
                <div class="content">
                <h2>${name}</h2>
                
                <a target="_blank" href="${linkRepo}">ir para o repositório</a>
                <button class="btn-card" onclick="clone('git clone ${cloneRepo}')">Clonar o repositório</button>
                
                </div>
                </div>
                `
            }
        }
    }
    xhr.send();
    
    clear();
}

function clear() {
    const repos = document.querySelector('#div1')
    repos.innerHTML = ""
    const fotouserr = document.getElementById('divfoto')
    fotouserr.innerHTML = ""
}

function clone(url) {
    const input = document.createElement("input");
    input.value = url;
    input.id = "input";
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
}
