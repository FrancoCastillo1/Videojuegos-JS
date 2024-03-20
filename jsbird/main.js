const structure = document.querySelector(".structure")
const enemigos = document.querySelector(".enemigos")

const enemis = "https://upload.wikimedia.org/wikipedia/commons/9/93/Mario_pipe.png"
const event = []
let conteo = 50
let controller = true

const alturas = [64,50,55,40,45]
const rotate = [0,180]

/* enemis.forEach((enemi) =>  enemigos.innerHTML += `<img src="${enemi}" class="enemi" />` ) */
const hdhd = "30%"
const parse = parseInt(hdhd)
console.log("wqow",parse)
console.log("hello1",10 < "30%")

const functionI = (enemi)=> {
    let count = 80
    const interval = setInterval(()=>{

        const pajarito = document.querySelector(".pajarito")

        const {style} = enemi
        let suma = parseInt(pajarito.style.top) + 10
        const height = parseInt(style.height)
        let resta = suma - 5

        console.log(height ,"y",resta ,"antes" + pajarito.style.top)
        if((style.left == `0%`) && ((suma <= height) && (style.bottom !="0px") || (resta > height) && (style.bottom =="0px"))){
            controller = false
            alert("murio")
        }
        if(count == 0){
            enemigos.removeChild(enemi);
            return clearInterval(interval)
        } 
        count= count - 10
        enemi.style.left = `${count}%`
    },620)
}

const intervalE = setInterval(()=>{
    if(!controller) return clearInterval(intervalE)
    const style = {
        height:`${alturas[Math.floor(Math.random() * alturas.length)]}%`,
        transform:`rotate(${rotate[Math.floor(Math.random() * rotate.length)]}deg)`,
    }
    const json = JSON.stringify(style).replace(/["{}]/g, '').replace(/,/g, ';');
    const newImg = document.createElement("img")
    newImg.src = enemis
    newImg.classList = "enemi"
    newImg.style = json
    newImg.style.bottom = style.transform == "rotate(0deg)" && "0"
    enemigos.appendChild(newImg)
    const array = document.querySelectorAll(".enemi")
    const ultimo = Array.from(array).at(-1)
    functionI(ultimo)
} ,4200)

const functionP = () =>{
    const interval = setInterval(() =>{
         conteo += 5
         const elPajaro = document.querySelector(".pajarito")
         let object = {top:`${conteo}%`,transform:`rotate(45deg)`}
         const json = JSON.stringify(object).replace(/["{}]/g, '').replace(/,/g, ';')
         elPajaro.style = json
         if(conteo >=70){
            conteo = 65
            controller = false
            return clearInterval(interval)
            /*  alert("perdiste") */
         }
     },1300)
     return conteo
}
functionP()
document.addEventListener("keyup",(e) =>{
    if(controller){
        const elPajaro = document.querySelector(".pajarito")
        if(e.code == "ArrowDown") conteo +=5
        if(e.code == "ArrowUp") conteo -= 5

        let object = {top:`${conteo <= 10?20:conteo}%`,transform:e.code == "ArrowDown"?`rotate(45deg)`:`rotate(-45deg)`}
        const json = JSON.stringify(object).replace(/["{}]/g, '').replace(/,/g, ';'); 
        if(conteo <= 15)return elPajaro.style = json
        elPajaro.style = json  
    }
})
