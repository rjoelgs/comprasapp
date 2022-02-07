const formulario = document.querySelector('#formulario');
//

let articulos = [];

cargarEventListeners();

function cargarEventListeners(){
    formulario.addEventListener('submit', agregarArticulo);
    document.addEventListener('DOMContentLoaded', agregarHtml);
}

function agregarArticulo(e){
    e.preventDefault();

    const articulo = {
        uds: document.querySelector('#unidades').value,
        producto : document.querySelector('#producto').value,
        descripcion: document.querySelector('#descripcion').value,
        precio: document.querySelector('#precio').value,
        estado: false
    }

    articulos.push(articulo);

    formulario.reset()

    guardarLocal()
}


function guardarLocal (){
    localStorage.setItem('producto', JSON.stringify(articulos));
}

//agregando HTML







