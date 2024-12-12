const btnAgregar = document.getElementById('btnAgregar');
const txtNumber = document.getElementById('Number');
const txtName = document.getElementById('Name');
const tablaListaCompras = document.getElementById('tablaListaCompras');
const cuerpoTabla = tablaListaCompras.getElementsByTagName('tbody').item(0);
const btnClear = document.getElementById('btnClear');
const productosTotal = document.getElementById('productosTotal');
const precioTotal = document.getElementById('precioTotal');
const contadorProductos = document.getElementById('contadorProductos');

const alertValidaciones = document.getElementById('alertValidaciones');
const alertValidacionesTexto = document.getElementById('alertValidacionesTexto');

let cont = 0
let costoTotal = 0;
let totalEnProductos = 0;

let datos = [];

function validarCantidad (){
    if (txtNumber.value.length <= 0){ // length <=0
        return false;
    }
    if(isNaN(txtNumber.value)){ // sea número
        return false;
    }
    if(Number(txtNumber.value)<=0){ // sea mayor a 0
        return false;
    }
    return true   
}
function getPrecio(){
    return Math.round(Math.random()*10000)/100;
}
//btnAgregar click
btnAgregar.addEventListener('click', function(event){
    event.preventDefault();
    let isValid = true; //bandera al ser true permite agregar los datos a la tabla.
    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    txtName.style.border ='';
    alertValidacionesTexto.innerHTML='';
    alertValidacionesTexto.style.display='none';
    txtNumber.style.border='';

    if (txtName.value.length<3){ // lenght <3
        /* 1. Mostrar alerta de error.
           2. Borde de color rojo.*/
        txtName.style.border = 'solid red medium';
        alertValidaciones.innerHTML='<strong>El Nombre del producto no es correcto</strong>';
        alertValidaciones.style.display='block';
        isValid = false;
        
    }
    if (! validarCantidad()){
        txtNumber.style.border = 'solid red medium';
        alertValidaciones.innerHTML += '<br><strong>La cantidad es incorrecta</strong>';
        alertValidaciones.style.display ='block';
        isValid = false;
    }
    if (isValid){ // Agregar datos a la tabla.

        cont++;
        let precio = getPrecio();
        let row = `<tr>
                        <td>${cont}</td>
                        <td>${txtName.value}</td>
                        <td>${txtNumber.value}</td>
                        <td>${precio}</td>
                    </tr>`;

        let elemento = {'cont': cont, 
                        'nombre': txtName.value, 
                        'cantidad': txtNumber.value,
                        'precio': precio};
        datos.push(elemento);
        localStorage.setItem('datos', JSON.stringify(datos));

        cuerpoTabla.insertAdjacentHTML('beforeend', row);
        costoTotal += precio * Number(txtNumber.value);
        precioTotal.innerText = '$' + costoTotal.toFixed(2);
        contadorProductos.innerText = cont;
        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;

        localStorage.setItem('costoTotal', costoTotal);
        localStorage.setItem('totalEnProductos', totalEnProductos);
        localStorage.setItem('cont', cont);
        

        txtName.value='';
        txtNumber.value='';
        txtName.focus();
    }
})
btnClear.addEventListener('click', function(event){
    event.preventDefault();
    txtName.value = '';
    txtNumber.value = '';

    cont = 0
    costoTotal = 0;
    totalEnProductos = 0;
    precioTotal.innerText = '$' + costoTotal;
    contadorProductos.innerText = cont;
    productosTotal.innerText = totalEnProductos;
    cuerpoTabla.innerHTML='';

    txtName.style.border ='';
    alertValidacionesTexto.innerHTML='';
    alertValidacionesTexto.style.display='none';
    txtNumber.style.border='';
    alertValidaciones.innerHTML='';
    alertValidaciones.style.display='none';
    txtName.focus();
})
window.addEventListener('load', function(event){
    if (this.localStorage.getItem('costoTotal')!=null){
        costoTotal = Number(this.localStorage.getItem('costoTotal'))
    };
    if (this.localStorage.getItem('totalEnProductos')!=null){
        totalEnProductos = Number(this.localStorage.getItem('totalEnProductos'))
    };
    if (this.localStorage.getItem('cont')!=null){
        cont = Number(this.localStorage.getItem('cont'))
    };
    if (this.localStorage.getItem('datos')!=null){
        datos = JSON.parse(this.localStorage.getItem('datos'))
    };
    datos.forEach((r)=>{
        let row = `<tr>
                        <td>${r.cont}</td>
                        <td>${r.nombre}</td>
                        <td>${r.cantidad}</td>
                        <td>${r.precio}</td>
                    </tr>`;
        cuerpoTabla.insertAdjacentHTML('beforeend', row)
    });
    precioTotal.innerText = '$' + costoTotal.toFixed(2);
    contadorProductos.innerText = cont;
    productosTotal.innerText = totalEnProductos;
});
