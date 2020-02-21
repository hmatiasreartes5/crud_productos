import React from 'react';

const header = () => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-conten-between">
            <div className="container">
                <h1>CRUD CON REACT, REDUX, REST API & AXIOS</h1>
            </div>

            <a href="/productos/nuevo" className="btn btn-danger nuevo-post d-block d-md-inline-block"
            >Agregar Producto &#43;</a>
        </nav>
     );
}
 
export default header;