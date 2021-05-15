import React, { useEffect, useState, useContext } from 'react'
import DetallesProducto from '../components/layout/DetallesProducto'
import Layout from "../components/layout/Layout"
import { FirebaseContext } from '../firebase'
const Index = () => {

    const [productos, guardarProductos] = useState([])
    const { firebase } = useContext(FirebaseContext)

    useEffect(() => {
        const obtenerProductos = () => {
            firebase.db.collection('producto').orderBy('creado', 'desc').onSnapshot(manejarSnapshot)
        }
        obtenerProductos()
    }, [])

    function manejarSnapshot(snapshot) {
        const productos = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }

        })
        guardarProductos(productos)
    }

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
