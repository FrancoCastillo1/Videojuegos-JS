import generateCartForMode from "./main.js";

const main = document.querySelector(".mainMenu")

let controllerCarts;
let mesaElement;
const gradosTransform = [120,80,40,150,230,90,180,340]
let infoDiv;
let restarTiempoInterval;
let firtsRender = true;
let jugadores;

function tiempoDeEsperaJugador(jugador){
    let time = 60
    restarTiempoInterval = setInterval(() =>{
        time--
        infoDiv.innerHTML = `Turno de: ${jugador}, tiempo:${time}`
        if(time == 0){
            clearInterval(restarTiempoInterval)
        }
    } ,1000)
    return time
}


function createScenery(array,carta){
    console.log("poqre", carta)
    main.classList = "mainJuego"
    const mesa = document.createElement("div")
    mesa.classList = "mesa"
    const divCartaRandomMesa = `<div class="cartUno" style="background-color:${carta.color}"><span>${carta.numero}</span> </div>`
    console.log("veam",divCartaRandomMesa)
    mesa.innerHTML = `<div class="cartsRandom quitCart">
    <img src="https://imagenes.20minutos.es/files/image_656_558/uploads/imagenes/2021/10/19/simbolo-de-xd.png"/>
    </div> 
    ${divCartaRandomMesa}`
    mesaElement = mesa
    main.appendChild(mesa) 

   jugadores = array.map((item,i) => i%2 != 0 && item).filter(item => item !== false)
    const carts = array.map((item,i) => i%2 == 0 && item).filter(item => item !== false)

    for(let i =0;i< jugadores.length;i++){
        const jugadorPosition = document.createElement("DIV")
        jugadorPosition.classList = `jugadorPosition id${i}`
        const asientos = document.createElement("div")
        asientos.classList = `asiento`
        
        jugadorPosition.appendChild(asientos)
        main.appendChild(jugadorPosition)  
    }
    
    carts.forEach((cartsArray,i) =>{
        const jugador = document.querySelectorAll(".jugadorPosition")[i]
        const divCarts = document.createElement("DIV")
        divCarts.classList = "divCart"
        
        cartsArray.forEach(cart =>{
            const cartE = document.createElement("DIV")
            cartE.classList = "cartUno"
            cartE.innerHTML =`<span>${cart.numero}</span>` 
            cartE.style.backgroundColor = cart.color 
            divCarts.appendChild(cartE)
        })
       jugador 
       jugador.appendChild(divCarts) 
    })

    const divInfo = document.createElement("DIV")
    divInfo.classList = "infoClass"
    infoDiv = divInfo
    main.appendChild(divInfo)

    const randomPlayer = jugadores[Math.floor(Math.random() * jugadores.length)]
     return randomPlayer
    
}

function sacarCarta(jugador){
    const generarNuevaCarta = generateCartForMode(1)[0]
    let documento;
    if(jugador == "Bot") documento = document.querySelector(".id1")
    else documento = document.querySelector(".id0")

    const divCart = documento.childNodes[1]

    const divCartaRandomNueva  = document.createElement("DIV")
    divCartaRandomNueva.classList = "cartUno"
    divCartaRandomNueva.style.backgroundColor = generarNuevaCarta.color
    divCartaRandomNueva.innerHTML = `<span>${generarNuevaCarta.numero}</span>`

    divCart.appendChild(divCartaRandomNueva)
    clearInterval(restarTiempoInterval)

    const jugadorReal = jugadores[0]
    jugarFunction("","",jugador == "Bot"?jugadorReal:"Bot")
}

function playBot(){
    const jugador = document.querySelector(".id1 .divCart")
    tiempoDeEsperaJugador("Bot")
    const childJugador = Array.from(jugador.children)
    const cartMesa = Array.from(mesaElement.childNodes).at(-1)
    const filter = childJugador.find(item => item.innerText == cartMesa.innerText || item.style.backgroundColor ==  cartMesa.style.backgroundColor)
    filter && filter.classList.add("position")

    if(!filter) sacarCarta("Bot")
    setTimeout(() =>{
       clearInterval(restarTiempoInterval)
       filter && mesaElement.appendChild(filter)
       const jugadorReal = jugadores[0]
       return jugarFunction("","",jugadorReal)
    } ,1100) 
}

function jugarFunction(arrayPlayer,cartaEnLaMesa,next){
    const playerRandom = firtsRender && createScenery(arrayPlayer,cartaEnLaMesa)
    firtsRender = false
    if(playerRandom == "Bot" || next =="Bot") return playBot()
    const carts = document.querySelectorAll(".cartUno")
    const sacarCart = document.querySelector(".quitCart")

    tiempoDeEsperaJugador(next ?? playerRandom)

    sacarCart.addEventListener("click",sacarCarta)
    carts.forEach(item => item.addEventListener("click",handleClickCart))
}

function handleClickCart(e){
    console.log("hubo un click!")
    if(controllerCarts !== e.target && e.target.nodeName == "DIV"){
       /*  controllerCarts.classList = "" */
        controllerCarts = e.target
        return controllerCarts.classList = "cartUno selected"
    }
    const mesaElementLastChild = Array.from(mesaElement.childNodes).at(-1)/* [mesaElement.length -1] */
    console.log("2",mesaElementLastChild)
    console.log("queuee",controllerCarts.innerText)
    const numeroMesa = mesaElementLastChild.innerText
    const contoladorNumero = controllerCarts.innerText
    const colorMesa = mesaElementLastChild.style.backgroundColor
    console.log("gg", colorMesa)
    const colorControlador = controllerCarts.style.backgroundColor

    if(numeroMesa == contoladorNumero || colorMesa == colorControlador ){
        mesaElement.appendChild(controllerCarts)
        controllerCarts.classList.add("position")
        clearInterval(restarTiempoInterval)
        jugarFunction("","","Bot")
        return controllerCarts.style.transform = `(${gradosTransform})deg`
    }
    return alert("No coincide ni el color ni el número")
}




export default jugarFunction