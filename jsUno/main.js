import jugarFunction from "./juego.js"

const main = document.querySelector(".mainMenu")
const cartsForMode = document.querySelector(".carts")
const selectOp = document.querySelectorAll(".selectOp")
const jugar = document.querySelector("#jugar")

const arrayN = []
const arrayE = [{numero:"+4",color:"black"}]
const tipos = ["selvático", "bosque", "argentina", "gears of war", "xbox", "gta", "red dead redemption"]
const colores = ["red", "blue", "green", "yellow"]

let mode;

const saberJugador = prompt("Introduce tu nombre")

const handleClick = (e) => mode = e.target.innerText

selectOp.forEach(item => item.addEventListener("click", handleClick))

function cartsForSelect(){
    const select = document.createElement("select")
    select.classList = "selectIn"
    for(let i =0;i<10;i++){
        const option = document.createElement("option")
        option.innerHTML = i
        select.appendChild(option)
    }
    cartsForMode.appendChild(select)
}
cartsForSelect()
function generateCarts(){
    for(let i =0;i<10;i++){
        arrayN.push({numero:i,tipo:"default"})
        arrayE.length <6 && arrayE.push({numero:"+2",color:colores[i]})
    }
}
generateCarts()

function generateCartForMode(mode){
    const numeros = []
    const typeNumber = Number(mode)
    for(let i =0;i < typeNumber;i++){
        const randomColor = colores[Math.floor(Math.random() * colores.length)]
        const numeberRandom = arrayN[Math.floor(Math.random() * arrayN.length)]
        numeros.push({numero:numeberRandom.numero,color:randomColor, type:"default"})
    }
    return numeros
}

function play(){
    const arrayPlayers = []
    const select = document.querySelector(".selectIn")
    if(mode == "Cooperativo") for(let i =0;i<2;i++)arrayPlayers.push(generateCartForMode(select.value),i == 0?saberJugador:"Bot")
    main.innerHTML = ""
    const cartaEnLaMesa = generateCartForMode(1)[0]
    console.log("esss", cartaEnLaMesa)
    jugarFunction(arrayPlayers,cartaEnLaMesa)
}

jugar.addEventListener("click",play)

export default generateCartForMode
