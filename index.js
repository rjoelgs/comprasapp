const formulario = document.querySelector('#formulario');
const listado = document.querySelector('#listado');
const warning = document.querySelector('#warning');
const success = document.querySelector('#success');
const confirmbtn = document.querySelector('#confirm');

let articulos = [];


//event listeners
cargarEventListeners();

function cargarEventListeners(){
    document.querySelector('#solicitar').addEventListener('click', agregarArticulo);
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
        estado: false,
        id: Date.now()
    }

    if(articulo.uds===''| articulo.producto===''| articulo.descripcion===''|articulo.precio===''){
        warning.setAttribute('style','display:block');
        return
    }
    else{
        success.setAttribute('style','display:block');
        setTimeout(()=>{
            success.setAttribute('style','display:none');
          }, 1000);             

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
            if(element.estado){
                listado.innerHTML += `
                <div id="contenedorT" class="card border border-success bg-success bg-opacity-10 mb-2">
                <h3 class="card-title text-info">${element.producto}</h3>
                <h4 class="card-subtitle mb-2 text-muted">${element.descripcion}</h4>
                <h5 class="card-text mb-2 text-warning">${element.uds} unidades</h5>   
                <h5 class="card-text mb-3 text-warning">${element.precio} pesos  </h5>
                <img id="confirm" class="position-absolute bottom-0 end-0" width="30px" src="/assets/check.svg" alt="">
                <img id="delete" style="width:30px; position:absolute; bottom:0; right:30px" src="/assets/delete.svg" alt="">  
                <img id="edit" style="width:30px; position:absolute; bottom:0; right:60px" src="/assets/edit.svg" alt="">   
                </div>
                `

            }

            else{
          listado.innerHTML += `
          <div id="contenedorT" class="card border border-danger bg-danger bg-opacity-10 mb-2">
          <h3 class="card-title text-info">${element.producto}</h3>
          <h4 class="card-subtitle mb-2 text-muted">${element.descripcion}</h4>
          <h5 class="card-text mb-2 text-warning">${element.uds} unidades</h5>   
          <h5 class="card-text mb-3 text-warning">${element.precio} pesos  </h5>
          <img id="confirm" class="position-absolute bottom-0 end-0" width="30px" src="/assets/check.svg" alt="">
          <img id="delete" style="width:30px; position:absolute; bottom:0; right:30px" src="/assets/delete.svg" alt="">  
          <img id="edit" style="width:30px; position:absolute; bottom:0; right:60px" src="/assets/edit.svg" alt="">   
          </div>
          `}
        });
    }

}

function modificando (e){
    e.preventDefault()
    const textoComparativo = e.path[1].childNodes[1].childNodes[0].data
    
    
    // console.log(e.target.getAttribute('id'))
    if(e.target.id.includes('delete')){
        borrar(textoComparativo)}

    else if(e.target.id.includes('confirm')){
        confirmar(textoComparativo)}

        else if(e.target.id.includes('edit')){
            editar(textoComparativo)}
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

const confirmar = (texto)=>{

    let indexArray = articulos.findIndex((evento)=>{
      return evento.producto === texto
    });
    
    articulos[indexArray].estado = true;

    guardarLocalStorage();  
}

const editar = (texto)=>{

    let indexArray= articulos.findIndex((evento)=>{
        return evento.producto === texto
    });

    console.log(indexArray);

    document.querySelector('#unidades').value = articulos[indexArray].uds
    document.querySelector('#producto').value = articulos[indexArray].producto
    document.querySelector('#descripcion').value = articulos[indexArray].descripcion
    document.querySelector('#precio').value = articulos[indexArray].precio
    document.querySelector('#id').innerHTML = articulos[indexArray].id
    
    document.querySelector('#solicitar').style.display = 'none'
    document.querySelector('#actualizar').style.display = 'block'

}

document.querySelector('#actualizar').addEventListener('click', actualizar);

function actualizar (e){
    e.preventDefault();
    let unidades =document.querySelector('#unidades').value
    let producto = document.querySelector('#producto').value
    let descripcion = document.querySelector('#descripcion').value
    let precio = document.querySelector('#precio').value
    let id = document.querySelector('#id').innerHTML

    let indexArray = articulos.findIndex((elemento)=>
    elemento.id == id);

    document.querySelector('#solicitar').style.display = 'block'
    document.querySelector('#actualizar').style.display = 'none'

    formulario.reset()

    articulos[indexArray].uds = unidades
    articulos[indexArray].producto = producto
    articulos[indexArray].descripcion = descripcion
    articulos[indexArray].precio = precio
    guardarLocalStorage()
}