const simonC = document.querySelector(".simonContainer")
const colors = document.querySelectorAll(".colors")
const aciertosHTML = document.querySelector(".aciertos")
const button = document.querySelector("#jugar")

/* let timer = 60

const intervalT = setInterval(()=>{
    timer--
    if(timer == 0) clearInterval(intervalT)
} ,1000) */

let recordar = []
let aciertos = 0

 function random(){
    const randomM = Math.floor(Math.random() * colors.length)
    const acceder = colors[randomM]
    recordar.push(acceder)
    return recordar
}


/* function removeEvent(callback){
    colors.forEach((color)=>{
        color.removeEventListener("click",callback)
        console.log("djfd")
    })
} pronto encontrare la solucion*/

function victory(aciertos){
    const aciertosAnteriores = JSON.parse(localStorage.getItem("record"))
   /*  removeEvent(callback) */
    aciertosAnteriores < aciertos && localStorage.setItem("record",aciertos)
    alert(`Felicidades, haz ganado  ${aciertosAnteriores < aciertos?" y superado tu record":""}`)
}


let divYellow = `<div class="bolita"></div>`
function evtUser(){
    button.addEventListener("click",()=>{
      const array = random()
       array.forEach((item,i)=>{
           setTimeout(()=> {
              item.innerHTML = divYellow
              setTimeout(()=>{item.innerHTML = "" } ,500)
               // este setTimeOut no tiene nada raro, sigue tal cual el algoritmo de js, al pasar 0,7s se elimina el hijo del item.No se complementa como si fuera con el for ya que SUPONGO porque está aderido a un setTimeout.
                /* const bolita = document.querySelector(".bolita")
                bolita.addEventListener("click",(e)=>{
                  console.log("is click",e)
                   if(!e.target) return alert("has perdido el juego :(")
                   aciertos = aciertos + 1
                   aciertosHTML.innerHTML = aciertos
               }) */
            },i * 1100)
            //digamos que el setTiemeOut funciona raro dentro deun for ya que no se la tarda la iteracion si no que sigue su ritmo, por eso multiplico la cantidad de iteraciones por el numero que se tardará ne aparecer cada setTimeOut.Como si fuera un setInterval(pero si a este lo ponemos en el for se repite cada iteracion.)
        })
        let ite = 0
        let a = true /* la unica forma de parar todos los eventos es haciendo esto, no con el removeEventListener de un forEach, ya que ese eliminara el evento el cual fue presionado, no todos los eventos del arreglo */
        setTimeout(()=>{
            colors.forEach((color)=>{
                console.log(a)
                color.addEventListener("click",function adivinar({target}){
                    if(a){ /* si no es null, deja pasar */
                       console.log("recone el evento")
                       if(target != array[ite]){
                           console.log("ssssss",target)
                           a = null /* le asignamos null para que no se ejecute el contenido del addEventListener en caso que perdamos */
                           setTimeout(()=>window.location.reload(),2000)
                           console.log(array[ite],"press",target)
                           ite = 0
                           return alert("has perdido el juego")
                       }else{
                           ite++
                           aciertos++  
                           console.log("acierta")
                           console.log("veamos",ite,"y",array.length)      
                           target.style.classList = "classHover"
                           if(target == array.at(-1) && ite == array.length){
                               ite = 0  
                               a = null
                               console.log(array[ite],"es")
                               return victory(aciertos)
                           } 
                       }
                    } 
                    })
            },1400 * array.length) 
            })
    })
}
evtUser()