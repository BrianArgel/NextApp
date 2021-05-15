import React, { useContext } from 'react'
import Link from 'next/link'
import { FirebaseContext } from '../../firebase'

const Navegacion = () => {
    const { usuario, firebase } = useContext(FirebaseContext)
    return (
        <nav>
            <Link href="/">Inicio</Link>
            <Link href="/populares">Populares</Link>
            {usuario ? (
                <Link href="/nuevo-producto">Nuevo Producto</Link>
            ) : null}

        </nav>
    )
}

export default Navegacion
