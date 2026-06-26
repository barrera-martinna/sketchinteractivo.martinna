
let estado = 0;

//guarda la imagen de inicio e intermediaria
let a1;

//guardan las secuencias de imagenes que se ejecutaran con cada interacción 
let clickImagenes = [];
let scrollImagenes = [];
let mouseImagenes = [];

//contador de fotogramas para saber que imagen de la secuencia se debe mostrar en tal fotograma y asi. empezara en cero y cuando haga click se comenzara a reproducir 
let clickFrame = 0;
let scrollFrame = 0;
let mouseFrame = 0;

//funcion para cargar las imagenes en el sketch
function preload() {

  // imagen intermediaria con textoss
  a1 = loadImage("a1.jpg");

  // secuencia de imagenes de casa y globos (se necesita interaccion con el click) clickImagenes[] son el array con el orden de la secuencia, luego cargar imagen (loadImage) y luego se escribe el nombre del archivo 
  clickImagenes[0] = loadImage("C1.jpg");
  clickImagenes[1] = loadImage("C2.jpg");
  clickImagenes[2] = loadImage("C3.jpg");
  clickImagenes[3] = loadImage("C4.jpg");
  clickImagenes[4] = loadImage("C5.jpg");
  clickImagenes[5] = loadImage("C6.jpg");
  clickImagenes[6] = loadImage("C7.jpg");
  clickImagenes[7] = loadImage("C8.jpg");
  clickImagenes[8] = loadImage("C9.jpg");

  //secuencia de imagenes en donde la casa sube con interacción de scroll
  scrollImagenes[0] = loadImage("scroll1.jpg");
  scrollImagenes[1] = loadImage("scroll2.jpg");
  scrollImagenes[2] = loadImage("scroll3.jpg");

  //secuencia de imagenes de russsel cayendo del aire, se ejecutan con la interaccion de mover el coursor del mouse en el eje x 
  mouseImagenes[0] = loadImage("M1.jpg");
  mouseImagenes[1] = loadImage("M2.jpg");
  mouseImagenes[2] = loadImage("M3.jpg");
  mouseImagenes[3] = loadImage("M4.jpg");
  mouseImagenes[4] = loadImage("M5.jpg");

}

function setup() {

  createCanvas(windowWidth, windowHeight);

  textAlign(CENTER, CENTER);

}

function draw() {

  //da igual el color de fondo porque las imagenes van encima a pantalla completa 
  background(220);
  
// if es la condicional para la variable de estado en donde le dice, si la variable estado esta en cero ejecutara la imagen a1 situandola en el 0,0 y del alto y ancho de la pantalla 
  if (estado == 0) {

    image(a1, 0, 0, width, height);

    mostrarTexto("CLICKEA DONDE QUIERAS");

  }

//condicional para la variable de estado
//si la variable estado ahora es igual a 1, se ejecutara la secuencia de clickImagenes indica la secuencia de imagenes que queremos mostrar, en donde las imagenes se ubican en 0, 0, y luego se expanden en el ancho y alto de la pantalla 
  else if (estado == 1) {

    image(clickImagenes[clickFrame],0,0,width,height);
  }

//si el estado es igual a 2 se ejecuta la imagen intermedia cn su texto que avisa la interaccion necesaria 
  else if (estado == 2) {

    image(a1, 0, 0, width, height);

    mostrarTexto("HAZ SCROLL HACIA ARRIBA");
}

    //condicion para la variable estado, si es igual a 3, se ejecuta la secuencia de imagenes de la variable scrollImagenes y el scrollFrame vacontando los frames para ir pasando la secuencia de imagenes 
  else if (estado == 3) {

    image(scrollImagenes[scrollFrame], 0, 0, width, height);
  }

//cuando la variable es igual a 4, se ejecuta la imagen y el texto que invita a la interacion del mouse
  else if (estado == 4) {

    image(a1, 0, 0, width, height);

    mostrarTexto("MUEVE EL MOUSE HORIZONTALMENTE");

    // cuando el usuario mueva el mouse horizontalmente se activara el estado 5 cuando el coursor vaya a la derecha 
    if ((mouseX - pmouseX) > 2) {

      estado = 5;}
  }
    
   //si la variable estado es igual a 5 se ejecutara todo lo siguiente dentro de las llaves, la condicional de interaccion para el cursor del mouse en eje x 
  else if (estado == 5) {

   //permite mostrar la secuencia de imagenes 
   image( mouseImagenes[mouseFrame], 0, 0, width, height);
  
  }
    
//estado 6 y final del relato interactivo, si la variable estado es 6 ejecuta la imagen intermediara y el texto que dice "FIN" 
  else if (estado == 6) {

    image(a1, 0, 0, width, height);

    mostrarTexto("FIN");

  }

}

//cuando el usuario hace click se ejecuta esta funcion 
function mousePressed() {

  //si se hace click estando en el estado 0, se reiniciara el contador de clicks y permitira cambiar a el estado 1, en donde apareceran los globos con cada click
  if (estado == 0) {

    clickFrame = 0;
    estado = 1;

    return;

  }

  // si la variable estado es 1, se activa con el clickFrame la secuencia de imagenes de la variable clickImagenes   
  if (estado == 1) {
     clickFrame++;

    //con el .length se define la cantidad de imagenes, asi se ejecuta la secuencia exacta y no avanza sin parar buscando imagenes q ya no existen
    //al llegar al final ejecuta las llaves (el estado 2)
    if (clickFrame >= clickImagenes.length) {
       estado = 2;
       }
    }
}

//esta en el estado 2, hace scroll y activa la funcion mouseWheel cambiando al estado 3, 
function mouseWheel(event) {

  // entrar a secuencia scroll (estado3) el return es para que no siga leyendo mas allá del codigue, agregandole el false hace que el scroll se ejecute en la animacion pero no en la webb con su funcion predeterminada 
  if (estado == 2) {
   estado = 3;
    return false;
}

  // esta condicion permite que el scroll avance hacia arriba, 
  //el delta mide para donde se mueve la rueda del mouse
  //y la && es como que exigue q se ejecuten dos condiciones
  // entonces aca le dice si estas en el estado 3 y haces scroll hacia arriba, va a ir pasando la secuencia de scrollImagenes
  if (estado == 3 && event.delta < 0) {
    scrollFrame++;

    //el length hace que se ejecute la secuencia justa y existente de imagenes en scrollImagenes
    //si ya no quedan mas fotos, se pasa al estado 4
    if (scrollFrame >= scrollImagenes.length) {
       estado = 4;
    }

  }

  return false;

}
function mouseMoved(){

  //se ejecutara si la variable estado vale 5
  if (estado == 5) {
    //a la posicion actual se le resta la posicion anterior, si el resultado 
    //es mayor que 2, significa que se movio hacia la derecha y le suma uno al contador
    if (mouseX - pmouseX > 2) {
      mouseFrame++;
    }
    
    // Al llegar al final de la secuencia de mouseImagenes, pasa al estado 6
    if (mouseFrame >= mouseImagenes.length){
      estado = 6;
    }
  }
}


//funcion de textos
function mostrarTexto(mensaje) {

  fill(255);
  stroke(0);
  strokeWeight(4);
  textSize(40);
  text(mensaje, width / 2, height - 80);

}


//funcion para que el sketch sea adaptable a las pantallas 
function windowResized() {

  resizeCanvas( windowWidth, windowHeight);

}

//inspiracion escena de up cuando la casa esta volando y quedan colgando de una soga, russel, carl y el perro 