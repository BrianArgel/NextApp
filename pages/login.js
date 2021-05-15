import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import Router from 'next/router'
import firebase from '../firebase'
import 'firebase/auth'

// validaciones
import useValidacion from '../hooks/useValidacion'
import validarCrearCuenta from '../validacion/validarIniciarSesion'

const STATE_INICIAL = {
    email: '',
    password: ''
}

const Login = () => {
    const [error, guardarError] = useState('')


    const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(STATE_INICIAL, validarCrearCuenta, iniciarSesion)
    const { email, password } = valores;
    async function iniciarSesion() {
        try {
            const usuario = await firebase.login(email, password);
            console.log(usuario)
            Router.push("/")
        } catch (error) {
            guardarError("Hubo un error al autenticar")
        }
    }
    return (
        <Layout>
            <>
                <h1 className="title">Iniciar Sesion</h1>
                <form className="formulario"
                    onSubmit={handleSubmit}
                    noValidate
                >

                    <div className="campo">
                        <label htmlFor="nombre" className="label">Email</label>
                        <input
                            className="inputs"
                            type="text"
                            id="email"
                            placeholder="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    {errores.email && <p className="error">{errores.email}</p>}
                    <div className="campo">
                        <label htmlFor="nombre" className="label">Password</label>
                        <input
                            className="inputs"
                            type="password"
                            id="password"
                            placeholder="Tu contraseña"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    {errores.password && <p className="error">{errores.password}</p>}
                    {error && <p className="error">{error}</p>}
                    <input
                        className="inputSubmit"
                        type="submit"
                        value="Inicar Sesion"
                    />
                </form>

            </>
        </Layout>
    )
}


export default Login
