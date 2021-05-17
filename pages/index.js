import React from 'react'
import DetallesProducto from '../components/layout/DetallesProducto'
import Layout from "../components/layout/Layout"
import useProducto from '../hooks/useProducto'
const Index = () => {


    const { productos } = useProducto('creado')
    return (
        <Layout>
            <div className="listado-productos">
                <div className="contenedor">
                    <ul className="bg-white">
                        {productos.map(producto => (
                            <DetallesProducto
                                key={producto.id}
                                producto={producto}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default Index
