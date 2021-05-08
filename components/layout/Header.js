import React from 'react'
import Buscar from '../ui/Buscar'
import Navegacion from './Navegacion'
import Link from 'next/link'

const Header = () => {

    const usuario = true;
    return (
        <header className="header">
            <div className="contenedor-header">
                <div className="contenedor-search">
                    <p className="logo">P</p>
                    <Buscar />
                    <Navegacion />
                </div>
                <div className="content-user">


                    {usuario ? (
                        <>
                            <p className="user"> Hola: Brian</p>
                            <button type="button" className="boton2">Cerrar Sesion</button>

                        </>
                    ) : (
                        <>
                            <button className="boton2">
                                <Link href="" >Login</Link>
                            </button>
                            <button className="boton">
                                <Link href="" className="boton">Crear Cuenta</Link>
                            </button>
                        </>

                    )}

                </div>

            </div>
        </header>
    )
}

export default Header
