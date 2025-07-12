/*===================================================HERRAMIENTAS GLOBALES=====================================================================*/

const pruebaDiv = document.getElementById("pruebaID")
const botonVentana1 = document.getElementById("ventanaEmergente")
const textoAlerta = document.getElementById("textoAler")
const textoConfirmar = document.getElementById("textoConf")
const textoAlerta2 = document.getElementById("textoAler2")
const textoConfirmar2 = document.getElementById("textoConf2")
const ventanaFiltrar = document.getElementById("ventanaFiltrarr")
const ventanaFiltrar2  = document.getElementById("ventanaFiltrarr2")
const ocultarVentana1 = document.getElementById("ocultarVentana")
const ocultarAlerta = document.getElementById("ocultarAlertaID")
const botonCarrito = document.getElementById("botonCarritoID")
const ventanaCarro = document.getElementById("ventanaCarroID")
const botonOcultarVentCarr = document.getElementById("botonOcultarVC")
const vaciarCarrito = document.getElementById("vaciarCarritoID")
const textoCarro = document.getElementById("textoCarrito")


ocultarAlerta.addEventListener("click", ()=>{
    pruebaDiv.style.display = "none";
    setTimeout(() => botonCarrito.classList.remove("carritoCargado"), 2000)
})


botonVentana1.addEventListener("click", () => {
    ventanaFiltrar.classList.add("mostrar")
})
ocultarVentana1.addEventListener("click", () => {
    ventanaFiltrar.classList.remove("mostrar")
})

botonCarrito.addEventListener("click", ()=>{
    ventanaFiltrar2.classList.add("mostrar2")
})
botonOcultarVentCarr.addEventListener("click", ()=>{
    ventanaFiltrar2.classList.remove("mostrar2")
})

vaciarCarrito.addEventListener("click", ()=>{
    ventanaCarro.innerHTML = "";
    ventanaCarro.append(textoCarro)
    textoCarro.innerHTML = "Carrito Vacio"
})
function carritoVacio(){
    if(ventanaCarro.childElementCount < 2){
        textoCarro.innerText = "Carrito Vacio"
    }
}

/*=================================================MÉTODOS PARA LOS PRODUCTOS=======================================================*/

class Métodos{
    #existencias = 0
    #enVenta = 0
    clon = ""

    mostrarExistencias(){
        textoAlerta.innerHTML = ""
        textoAlerta.innerHTML = `La cantidad de existencias actuales de ${this.Name} es de ${this.#existencias}`
    }
    mostrarEnVentas(){
        textoAlerta2.innerHTML = ""
        textoAlerta2.innerHTML= `La cantidad de articulos en venta de ${this.Name} es de ${this.#enVenta}`
    }
   get agregarStocks(){
        return this.#existencias
    }
    set agregarStocks(value){
        if(typeof value !== "number" || Number.isNaN(value) || value <= 0){
           throw new Error `El número del stock debe ser mayor a 0`
        }
        this.#existencias += value
    }
       get ponerEnVenta(){
        return this.#enVenta
    }
    set ponerEnVenta(value){
        if(typeof value !== "number" || Number.isNaN(value) || value <= 0){
           throw new Error `El número seleccionado debe ser mayor a 0`
        }else if(this.#existencias <= 0){
            throw new Error `No contamos con producto en existencias`
        }
        this.#enVenta += value
        this.#existencias -= value
    }
        agregarCarrito(boton){
        let clon
        textoAlerta.innerHTML = ""
        textoAlerta2.innerHTML = ""
        textoConfirmar.innerHTML = ""
        textoAlerta2.innerHTML = ""
        if(this.#enVenta <= 0){
            pruebaDiv.style.display = "block"
            textoAlerta.innerHTML = `${this.Descripción} por el momento se encuentra agotado`
        }else{
            pruebaDiv.style.display = "block"
            textoAlerta.innerHTML = `Has agregado 1 ${this.Descripción} a tu carrito`
            this.#enVenta--
            const divProducto = boton.closest(".producto-card");
             clon = divProducto.cloneNode(true);
            clon.classList.remove("producto-card")
            clon.classList.add("producto-card2")
            const botonEliminar = clon.querySelector(".botonAddtoCarro");
            console.log(clon)
            if (botonEliminar) {
                const moveToCarro = document.createElement("button")
                moveToCarro.innerText = "Eliminar del Carrito"
                moveToCarro.addEventListener("click", () =>{
                clon.remove()
                carritoVacio()
                })
            botonEliminar.replaceWith(moveToCarro)
            }
            textoCarro.innerHTML = ""
            ventanaCarro.append(clon)
            botonCarrito.classList.add("carritoCargado")
        }
    }
};
/*===================================================CREACIÓN DE PRODUCTOS==============================================================================*/

class Stocks extends Métodos{
    static productosEnExistencias = []
    #textoDescripcion = "";
    #imagenMostrar = ""
    constructor(name, descripción, precio, imagen, tipo){
        super()
        this.Name = name
        this.Descripción = descripción
        this.Precio = precio
        this.Tipo = tipo
        this.imagen = imagen
        Stocks.productosEnExistencias.push(this)
    }
    asignarTexto(){
        let array = Object.entries(this)
        let descripción = []
        let lineaFormada;
        for(let i = 0; i < array.length - 2; i++){
            const clave = array[i][0]
            const valor = array[i][1]
             if(i === 0){
                lineaFormada = `${valor}`
             }else{
            lineaFormada = `${clave}:      ${valor}`
             }
            descripción.push(lineaFormada)
        }
        this.#textoDescripcion = descripción.join("<br><br>")
    }
    asignarImg(){
        this.#imagenMostrar = this.imagen
    }
    exponer(){
        this.asignarTexto()
        this.asignarImg()
        this.render(this.imagen, this.#textoDescripcion)
    }
}


/*==================================================MIXINS PARA LOS PRODUCTOS====================================================================================*/
let RenderMixin = {
    render(img, text) {

    let contenedor = document.createElement("div")
    contenedor.classList.add("producto-card")
    contenedor.setAttribute("data-tipo", this.Tipo)

    let imagen = document.createElement("img")
    let texto = document.createElement("p")
    let botonC = document.createElement("button")

    botonC.innerText = "Agregar Al Carrito"
    
    botonC.classList.add("botonAddtoCarro")
    botonC.addEventListener("click", (e) => {
        this.agregarCarrito(e.target);
    }
    )

    imagen.src = img
    texto.innerHTML = text

    contenedor.append(imagen)
    contenedor.append(texto)
    contenedor.append(botonC)
    
    const contenedorPadre = document.getElementById("productos-container")
    contenedorPadre.append(contenedor)
}
};
Object.assign(Métodos.prototype, RenderMixin)
/*========================================================================================================================================================*/




const botonFilCamisa = document.getElementById("botonCamisaManID");
const botonFilCamiseta = document.getElementById("botonCamisetaManID");
const botonFilPantalon = document.getElementById("botonPantalonManID")
const botonConjuntoMan = document.getElementById("botonConjuntoManID")
const botonShortsMan = document.getElementById("botonShortsManID")
const botonMostrarTodo = document.getElementById("botonMostrarTodoID")

botonFilCamisa.addEventListener("click", () => filtrarPrendas("Camisa Hombre"))
botonFilCamiseta.addEventListener("click", () => filtrarPrendas("Camiseta Hombre"))
botonFilPantalon.addEventListener("click", () => filtrarPrendas("Pantalones Hombre"))
botonConjuntoMan.addEventListener("click", () => filtrarPrendas("Conjunto Hombre"))
botonShortsMan.addEventListener("click", ()=> filtrarPrendas("Shorts Hombre"))

botonMostrarTodo.addEventListener("click", ()=>{
    document.querySelectorAll(".producto-card").forEach(card =>{
        card.style.display = "block"
        ventanaFiltrar.classList.remove("mostrar")
    })
})

function filtrarPrendas(tipoSeleccionado){
function ocultar(){
    document.querySelectorAll(".producto-card").forEach(card =>{
        card.style.display = "none"
    })
}

function filtrar(){
    document.querySelectorAll(".producto-card").forEach(card =>{
        const tipo = card.getAttribute("data-tipo")
        if(tipoSeleccionado === tipo){
            card.style.display = "block"
        }
    })
}
ocultar()
filtrar()
ventanaFiltrar.classList.remove("mostrar")
};



/*==========================================================================================================================================================*/
const camisaNike = new Stocks("Camisa Nike", "Camiseta Nike Con Estilo", "$25.00", "imagenes/camisaNike.jpg", "Camiseta Hombre")
camisaNike.exponer()
const camisaTigre = new Stocks("Camisa Bershka", "Camisa Vintage Tiger", "$35.00", "imagenes/camisaBerTigre.jpg", "Camisa Hombre")
camisaTigre.exponer()
const camisaAdidas = new Stocks("Camisa Adidas", "Camiseta Adidas Con Estilo", "$35.00", "imagenes/camisaAdidas.jpg", "Camiseta Hombre")
camisaAdidas.exponer()
const PantalonesCuadriculados = new Stocks("Pantalones Bershka", "Pantalones Con Diseño De Cuadros", "$50.00", "imagenes/pantalonescuadrados.jpg", "Pantalones Hombre")
PantalonesCuadriculados.exponer()
const camisaRayada = new Stocks("Camisa Bershka", "Camisa Con Estilo a Rayas", "$30.00", "imagenes/camisaBerRayada.jpg", "Camisa Hombre")
camisaRayada.exponer()
const camisaMangas = new Stocks("Camisa Bershka", "Camisa Con Mangas", "$40.00", "imagenes/camisaBerMangas.jpg", "Camisa Hombre")
camisaMangas.exponer()
const conjuntoBerMorado = new Stocks("Conjunto Bershka", "Conjunto StreetWear", "$80.00", "imagenes/conjuntoBerMorado.jpg", "Conjunto Hombre")
conjuntoBerMorado.exponer()
const shortsBerCafe = new Stocks("Shorts Bershka", "Shorts Clásicos", "$25.00", "imagenes/shortBerCafe.jpg", "Shorts Hombre")
shortsBerCafe.exponer()
shortsBerCafe.agregarStocks = 100
shortsBerCafe.ponerEnVenta = 50
const conjuntoNegro = new Stocks("Conjunto Bershka", "Conjunto AllBlack", "$85.00", "imagenes/conjuntonegroBer.jpg", "Conjunto Hombre")
conjuntoNegro.exponer()
const PantalonCaqui = new Stocks("Pantalones Bershka", "Pantalones Clásicos", "$35.00", "imagenes/PantalonCaquiBer.jpg", "Pantalones Hombre")
PantalonCaqui.exponer()
const VaquerosBer = new Stocks("Vaqueros Bershka", "Vaqueros Clásicos", "$45.00", "imagenes/VaquerosBer.jpg", "Pantalones Hombre")
VaquerosBer.exponer()
const CamisaCaquiBer = new Stocks("Camisa Bershka", "Camisa Clásica", "$35.00", "imagenes/CamisaCaquiBer.jpg", "Camisa Hombre")
CamisaCaquiBer.exponer()
const shortsBlancosBer = new Stocks("Shorts Bershka", "Shorts Con Diseño", "$30.00", "imagenes/shortsBlancosBer.jpg", "Shorts Hombre")
shortsBlancosBer.exponer()

/*=============================================================================================================================================================*/
camisaNike.agregarStocks = 100
camisaNike.ponerEnVenta = 50
camisaAdidas.agregarStocks = 100
camisaAdidas.ponerEnVenta = 50
camisaTigre.agregarStocks = 100
camisaTigre.ponerEnVenta = 50
PantalonesCuadriculados.agregarStocks = 100
PantalonesCuadriculados.ponerEnVenta = 50
camisaRayada.agregarStocks = 100
camisaRayada.ponerEnVenta = 50
conjuntoBerMorado.agregarStocks = 100
conjuntoBerMorado.ponerEnVenta = 50
conjuntoNegro.agregarStocks = 100
conjuntoNegro.ponerEnVenta = 50
camisaMangas.agregarStocks = 100
camisaMangas.ponerEnVenta = 50
PantalonCaqui.agregarStocks = 100
PantalonCaqui.ponerEnVenta = 50
VaquerosBer.agregarStocks = 100
VaquerosBer.ponerEnVenta = 50
shortsBlancosBer.agregarStocks = 100
shortsBlancosBer.ponerEnVenta = 50