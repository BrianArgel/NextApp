import React, { useEffect, useState } from 'react'
import firebase from '../firebase'

function useAutenticacion() {

    const [usuarioAutenticado, guardarUsuarioAutenticado] = useState(null)

    useEffect(() => {
        const onsuscribe = firebase.auth.onAuthStateChanged(usuario => {
            if (usuario) {
                guardarUsuarioAutenticado(usuario)
            } else {
                guardarUsuarioAutenticado(null)
            }
        })

        return onsuscribe;

    }, [])

    return usuarioAutenticado;
}

export default useAutenticacion