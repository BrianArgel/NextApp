import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import Router from 'next/router'
import firebase from '../firebase'
import 'firebase/auth'

// validaciones
import useValidacion from '../hooks/useValidacion'
import validarCrearCuenta from '../validacion/validarCrearCuenta'

const STATE_INICIAL = {
    nombre: '',
    email: '',
    password: ''
}

const populares = () => {
    return (
        <Layout>
            <h1>Populares</h1>
        </Layout>
    )
}

export default populares
