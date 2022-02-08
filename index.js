const formulario = document.querySelector('#formulario');
const listado = document.querySelector('#listado');
const warning = document.querySelector('#warning');
const success = document.querySelector('#success');
const confirmbtn = document.querySelector('#confirm');

let articulos = [];


//event listeners
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

    if(articulo.uds===''| articulo.producto===''| articulo.descripcion===''|articulo.precio===''){
        warning.setAttribute('style','display:block');
        return
    }
    else{

        warning.setAttribute('style', 'display:none');

        articulos.unshift(articulo);

        formulario.reset()
    
        guardarLocal()

    }


}



function guardarLocal (){
    localStorage.setItem('producto', JSON.stringify(articulos));

    agregarHtml();
    
}

//agregando HTML
function agregarHtml(){
    listado.innerHTML='';

    articulos = JSON.parse(localStorage.getItem('producto'));

    if (articulos === null){
        articulos = [];
    }
    else {
        articulos.forEach(element => {
          listado.innerHTML += `
          <div class="card">
          <h3 class="card-title text-info">${element.producto}</h3>
          <h4 class="card-subtitle mb-2 text-muted">${element.descripcion}</h4>
          <h5 class="card-text mb-2 text-warning">${element.uds} unidades</h5>   
          <h5 class="card-text mb-3 text-warning">${element.precio} pesos</h5>
          <img id="confirm" class="position-absolute bottom-0 end-0" style="width:30px" src="/assets/check.svg" alt="">     
          </div>
          `
        });
    }

    



}






