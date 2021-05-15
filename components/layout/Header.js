import React, { useContext } from 'react'
import Buscar from '../ui/Buscar'
import Navegacion from './Navegacion'
import Link from 'next/link'
import FileUploader from 'react-firebase-file-uploader'
import { FirebaseContext } from '../../firebase'

const Header = () => {
	const { usuario, firebase } = useContext(FirebaseContext)

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
							<p className="user"> Hola: {usuario.displayName}</p>
							<button type="button"
								onClick={() => firebase.cerrarSesion()}
								className="boton2">Cerrar Sesion</button>

						</>
					) : (
						<>
							<button className="boton2">
								<Link href="/login" >Login</Link>
							</button>
							<button className="boton">
								<Link href="/crear-cuenta" className="boton">Crear Cuenta</Link>
							</button>
						</>

					)}

				</div>

			</div>
		</header>
	)
}

export default Header
