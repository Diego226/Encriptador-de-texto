
let encriptaciones = {
    'a': 'ai',
    'e': 'enter',
    'i': 'imes',
    'o': 'ober',
    'u': 'ufat'
};

function encriptarbtn() {
    if (document.getElementById('textarea').value.trim() === '') {

        mostrarAviso('Ingresa un texto para encriptar');
    }else{
        var textoCreado = document.getElementById('textarea').value;
        //convertir en minusculas:
        textoCreado = textoCreado.toLowerCase();
        //Eliminar diacríticos excepto la ñ
        textoCreado = eliminarDiacriticos(textoCreado);
        document.getElementById('resultados').innerText= encriptar(textoCreado);
        let div = document.getElementById('resultados');
        div.style.overflow = 'auto';
        //div.style.textAlign = 'left';
        div.style.fontSize= '1rem';
    }
    
}
function desencriptarbtn() {
    if (document.getElementById('textarea').value.trim() === '') {

        mostrarAviso('Ingresa un texto para Desencriptar');
    }else{
        var textoCreado = document.getElementById('textarea').value;
        document.getElementById('resultados').innerText= desencriptar(textoCreado);    
    }
    
}

//limpiar
const contenidoOriginal = document.getElementById('resultados').innerHTML;
function limpiarbtn(){
    document.getElementById('textarea').value = null;
    document.getElementById('resultados').innerHTML = contenidoOriginal;
}

//copiar
async function copiarbtn() {
    try {
        let texto = document.getElementById("resultados").innerText;
        await navigator.clipboard.writeText(texto);
        //alert("texto copiado al portapapeles");
        mostrarAviso('Texto Copiado.');
    } catch (err) {
        console.error("Error al copiar al portapapeles: ", err);
    }
}

//pegar
function pegarbtn() {
    limpiarbtn()
    let textarea = document.getElementById('textarea');
    navigator.clipboard.readText()
        .then(text => {
            textarea.value = text;
        })
        .catch(err => {
            console.error('Error al leer el portapapeles: ', err);
        });
}

//##################
//encriptar
function encriptar(texto) {
    let resultado = "";
    for (let i = 0; i < texto.length; i++) {
        const char = texto[i];
        if (encriptaciones[char]) {
            resultado += encriptaciones[char];
        } else {
            resultado += char;
        }
    }
    return resultado;
}

//desencriptar
function desencriptar(parrafo){
    let cadena1=parrafo.length;
    let i=0;
    while(i < cadena1){
    parrafo= parrafo.replace(/ai/g, "a");
    parrafo = parrafo.replace(/enter/g, "e");
    parrafo = parrafo.replace(/imes/g, "i");
    parrafo = parrafo.replace(/ober/g, "o");
    parrafo = parrafo.replace(/ufat/g, "u");  
    i++;
  }
  return parrafo;
  }
  function mostrarAviso(mensaje) {
    let aviso = document.getElementById('avisoss');
    aviso.textContent = mensaje;
    aviso.style.display = 'block';
    setTimeout(() => {
        aviso.style.display = 'none';
    }, 1500);
}

function eliminarDiacriticos(text) {
    return text
           .normalize('NFD')
           .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
           .normalize();
}