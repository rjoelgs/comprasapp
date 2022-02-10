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
    listado.addEventListener('click', modificando)
    
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
    
        guardarLocalStorage()

    }


}



function guardarLocalStorage (){
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
          <div id="contenedorT" class="card border border-danger mb-2">
          <h3 class="card-title text-info">${element.producto}</h3>
          <h4 class="card-subtitle mb-2 text-muted">${element.descripcion}</h4>
          <h5 class="card-text mb-2 text-warning">${element.uds} unidades</h5>   
          <h5 class="card-text mb-3 text-warning">${element.precio} pesos ${element.estado}</h5>
          <img id="confirm" class="position-absolute bottom-0 end-0" width="30px" src="/assets/check.svg" alt="">
          <img id="delete" style="width:30px; position:absolute; bottom:0; right:30px" src="/assets/delete.svg" alt="">  
          <img id="edit" style="width:30px; position:absolute; bottom:0; right:60px" src="/assets/edit.svg" alt="">   
          </div>
          `
        });
    }

}

function modificando (e){
    e.preventDefault()
    const textoComparativo = e.path[1].childNodes[1].childNodes[0].data
    
    
    // console.log(e.target.getAttribute('id'))
    if(e.target.id.includes('delete')){
        borrar(textoComparativo)}

    else if(e.target.id.contains('confirm')){
        
    }
}


const borrar =(texto)=>{
    let indexArray;

    articulos.forEach((evento, index)=>{
        if (texto === evento.producto){
            indexArray = index
        }
    });

   articulos.splice(indexArray, 1);

   guardarLocalStorage();
}

