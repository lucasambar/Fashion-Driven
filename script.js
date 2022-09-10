//escopo global
let contador = 0;
let usuario = prompt("Qual o seu nome?")
let url, model, neck, material;

function selecionaModelo (item) {
    let modelos = document.querySelectorAll(".modelo")
    modelos.forEach( (i) => {
        if (i.classList.contains("selecionado")) {
            i.classList.remove("selecionado")
            contador -= 1
        }
    })

    let img = item.querySelector(".img")
    img.classList.add("selecionado")
    contador += 1

    if  (img.classList.contains("tshirt")) {
        model = "t-shirt"
    }
    if  (img.classList.contains("camiseta")) {
        model = "top-tank"
    }
    if  (img.classList.contains("manga")) {
        model = "long"
    }

    pedidoPronto()
}

function selecionaGola(item) {
    let golas = document.querySelectorAll(".gola")
    golas.forEach( (i) => {
        if (i.classList.contains("selecionado")) {
            i.classList.remove("selecionado")
            contador -= 1
        }
    })


    let img = item.querySelector(".img")
    img.classList.add("selecionado")
    contador += 1

    if  (img.classList.contains("v")) {
        neck = "t-v-neck"
    }
    if  (img.classList.contains("redonda")) {
        neck = "round"
    }
    if  (img.classList.contains("polo")) {
        neck = "polo"
    }

    pedidoPronto()
}

function selecionaTecido(item) {
    let tecidos = document.querySelectorAll(".tecido")
    tecidos.forEach( (i) => {
        if (i.classList.contains("selecionado")) {
            i.classList.remove("selecionado")
            contador -= 1
        }
    })


    let img = item.querySelector(".img")
    img.classList.add("selecionado")
    contador += 1

    if  (img.classList.contains("seda")) {
        material = "silk"
    }
    if  (img.classList.contains("algodao")) {
        material = "cotton"
    }
    if  (img.classList.contains("poli")) {
        material = "polyester"
    }

    pedidoPronto()
}

function link(input) {
    console.log ("oi")
    url = input.value;
    let pattern = /^https:\/\//i;

    if (!pattern.test(url)) {
        alert("URL da imagem inválido!")
        return
    }

    contador += 1
    pedidoPronto()
}

function pedidoPronto () {
    console.log(contador)
    if (contador !== 4) {
        return
    }

    let botao = document.querySelector(".button")
    botao.classList.remove("naopedir")
    botao.classList.add("pedir")
}

function pedir() {
    let botao = document.querySelector(".button")
    if (botao.classList.contains("selecionado"))  {
       return
    }
    
    let objeto = {
        "model": model,
        "neck": neck,
        "material": material,
        "image": url,
        "owner": usuario,
        "author": usuario
    }

    let promessa = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", objeto)
    promessa.then(() => {alert("Encomenda enviada com sucesso!");anteriores()})
    promessa.catch((erro) => {alert("Ops! Algo deu errad0, tente novamente mais tarde!")})
}

let arr, objeto;

anteriores()
function anteriores () {
    let promessa = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts")
    promessa.then(renderizaAnteriores)
    promessa.catch((erro)=>{console.log(erro)})
}
function renderizaAnteriores (objeto) {
    arr = objeto.data
    console.log(arr)
    let div = document.querySelector(".anteriores")

    div.innerHTML = ``
    arr.forEach((i) => {
        div.innerHTML += `
        <div class="produto" onclick="pedirAnterior(${i.id})">
            <img src="${i.image}">
            <h2><strong>Criador:</strong> ${i.owner}</h2>
        </div>
        `
    })
}

function pedirAnterior (id) {
    let confirme = confirm("Deseja fazer o pedido dessa camiseta já existente?")
    if (confirme) {
        arr.forEach((i) => {
            if(i.id === id) {
                objeto = {
                    "model": i.model,
                    "neck": i.neck,
                    "material": i.material,
                    "image": i.image,
                    "owner": usuario,
                    "author": i.owner	
                }
            }
        })

        let promessa = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts",objeto)
        promessa.then(() => {alert("Encomenda enviada com sucesso!");anteriores()})
        promessa.catch(() => {alert("Ops! Algo deu errad0, tente novamente mais tarde!")})
    }
}