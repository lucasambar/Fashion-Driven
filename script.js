//escopo global
let contador = 0;

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
    pedidoPronto()
}

function pedidoPronto () {
    console.log(contador)
    let input = document.querySelector("input").value
    if (contador !== 3) {
        return
    }

    let botao = document.querySelector(".button")
    botao.classList.remove("naopedir")
    botao.classList.add("pedir")
}
