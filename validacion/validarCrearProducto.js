export default function validarCrearCuenta(valores) {
    let errores = {}
    //valida nombre
    if (!valores.nombre) {
        errores.nombre = "El Nombre es obligatorio"
    }

    //empresa
    if (!valores.empresa) {
        errores.empresa = "El nombre de la empresa es obligatorio"
    }

    //validar url
    if (!valores.url) {
        errores.url = "Se Necesita"
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
        errores.url = "Url No valida"
    }

    //valores descripcion
    if (!valores.descripcion) {
        errores.descripcion = "Agrega Una descripcion"
    }

    return errores
}