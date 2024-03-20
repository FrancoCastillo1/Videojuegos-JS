const palabrita = document.querySelector(".palabraRandom")
const persona = document.querySelector(".persona")


const arrayAhorcado = [ `<div class="cabeza"></div>`,`<div class="piernaDerecha"></div>`, `<div class="piernaIzquierda"></div>`,`<div class="brazoIzquierdo"></div>`,`<div class="brazoDerecho"></div>` ]

const palabras = ["ventilador", "guitarra", "bicicleta", "arcoiris", "cocodrilo", "invierno", "naturaleza", "camaleón", "ordenador", "manzana", "cascada", "elefante", "amarillo", "limón", "oso", "teléfono", "ratón", "sol", "espejo", "libélula", "carpintero", "cámara", "estrella", "violeta", "chocolate", "lluvia", "hamburguesa", "música", "escalera", "mesa", "silla", "sábado", "mago", "gusano", "trueno", "bebé", "lápiz", "computadora", "fresa", "pistola", "cangrejo", "gafas", "banco", "teclado", "pingüino", "sandía", "puerta", "rompecabezas", "rana", "árbol", "fuego", "plátano", "gorro", "mariposa", "pijama", "telescopio", "círculo", "flor", "televisión", "zapato", "bolígrafo", "oso panda", "cuaderno", "tigre", "castillo", "reloj", "cama", "diente", "hierba", "pluma", "flauta", "abuela", "cine", "conejo", "pintura", "café", "pulgar", "galleta", "serpiente", "pastel", "fútbol", "bote", "mago", "pájaro", "fantasma", "burro", "queso", "ping-pong", "bicicleta", "gusano", "helicóptero", "muñeca", "cometa", "águila", "pintor", "antena", "mar", "montaña", "panda", "globo", "puente", "tenedor", "tarjeta", "vaca", "guitarra", "río", "conejo", "luna", "gato", "elefante", "taza", "fresa", "caracol", "arco iris", "paraguas", "azul", "globo terráqueo", "saxofón", "lámpara", "nido", "naranja", "bicicleta", "ciruela", "delfín", "caballo", "zapatilla", "casa", "sol", "torre", "huevo", "libro", "luz", "cerdo", "pavo", "mariposa", "árbol", "ojo", "cuerda", "perro", "piano", "pulpo", "pan", "cuaderno", "cactus", "camión", "bolsa", "agua", "cuchillo", "zapato", "gusano", "ballena", "reloj", "oso", ]

let copia = []
let oculto = []
const select = palabras[Math.floor(Math.random() * palabras.length)]
console.log(select)
function ahorcado(){
   for(let i =0;i<select.length;i++){
       i == select.length && oculto.push(`${select[i]}`)
        if(i%3 === 0 || i%7 ===0){
            oculto.push(`${select[i]}`)
        }
    }
   palabrita.style.gridTemplateColumns = `repeat(${select.length},1fr)`
   for(let i = 0;i < select.length;i++){
    console.log("ssss",select[i],select.length,"s",i)
      const findI = oculto.find((item) => item === select[i])
      if(findI){
            copia.push(select[i])
            continue // como early "return" podrias usar el continue en vez de un else(y en caso de no ser un for(por ejemplo, una funcion con una petición http) hay usa return en el if pero si no podes usar el continue en un for y funcionaria como un  "return")
      }
      copia.push("")
   }
   console.log("esta",copia)
   const newMap = copia.map((item) => `<div class="letra">${item}</div>`)
   console.log(newMap)
   palabrita.innerHTML = newMap.join("")
}
ahorcado()
let i = 0
document.addEventListener("keyup",({key}) =>{
    console.log("saber",key)
    let array =[]
    const stringA = Array.from(select)
     const encontrar = stringA.find((item)=> item == key)
     if(!encontrar){
       if(i == arrayAhorcado.length) return alert("perdiste")
         persona.innerHTML += array[i]
        return i++
     } //hacerlo luego
      for(let i =0;i < select.length;i++){
         const filter = oculto.find((item)=>item == select[i])
         console.log("is",select[i] == key)
         if(select[i] == key){
           oculto.push(key)
           array.push(key)
           continue
         }
         if(filter){
            array.push(select[i])
            continue
         }
         array.push("")
        /* const encontrar = oculto.find((item) => item == stringA[i]) */
      }
      console.log(array,"sss",oculto)
     const map = array.map((item) => `<div class="letra">${item}</div>`).join("") 
    /*  palabrita.innerHTML = "" */
    palabrita.innerHTML = map
})