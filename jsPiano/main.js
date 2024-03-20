let array = [
  { letra: "S", sonido: new Audio("./sonidos/ES_Piano Chord 174 - SFX Producer.mp3") },
  { letra: "D", sonido: new Audio("./sonidos/ES_Piano Chord 176-SFX Producer.mp3") },
  { letra: "F", sonido: new Audio("./sonidos/ES_Piano Chord 177-SFX Producer.mp3") },
  { letra: "G", sonido: new Audio("./sonidos/ES_Piano Chord 232-SFX Producer.mp3") },
  { letra: "H", sonido: new Audio("./sonidos/ES_Piano Chord 238-SFX Producer.mp3") },
  { letra: "J", sonido: new Audio("./sonidos/ES_Piano Chord 321 - SFX Producer.mp3") },
  { letra: "K", sonido: new Audio("./sonidos") },
  { letra: "L", sonido: new Audio("./sonidos") },
];

const container = document.querySelector(".containerTecla")
array.forEach((item)=>{
    container.innerHTML += `<div class="item">${item.letra}</div>`
})
const documentI = document.querySelectorAll(".item")
documentI.forEach((itemD)=>{
    document.addEventListener("keyup",(e)=>{
       if(e.key == itemD.innerHTML.toLowerCase()){
          const encontrar = array.find((item)=> item.letra == itemD.innerHTML)
            encontrar.sonido.play()
            setTimeout(()=>{
                encontrar.sonido.pause()
                encontrar.sonido.currentTime = 0   
            },3000)
       }
    })
})

