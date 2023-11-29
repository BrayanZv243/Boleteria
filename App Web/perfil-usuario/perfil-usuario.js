import { UsuariosService } from "../servicios/UsuarioService.js";

export class PerfilUsuarioComponent extends HTMLElement {

    #usuarioService = new UsuariosService();

    constructor() {
        super()
        this.token;
        this.usuario;
    }

    #getCookieSession(cookieName) {
        const name = cookieName + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');

        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i].trim();
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }

        return null;
    }


    #decodeJwt(token) {
        // Dividir el token en partes (encabezado, payload, firma)
        var parts = token.split('.');
        var decodedPayload = null;

        if (parts.length === 3) {
            // Decodificar la parte de carga útil (payload)
            var payload = parts[1];
            decodedPayload = JSON.parse(atob(payload));
        }

        return decodedPayload;
    }

    async connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });

        try {
            this.token = this.#getCookieSession('cookieSesion');
            // Obtenemos los datos del usuario con su ID dado su token en la cookie.
            this.usuario = await this.#usuarioService.getUsuarioPorID(this.token, this.#decodeJwt(this.token).idUsuario);
        } catch (error) {
            // Ocurrió un error al obtener los datos del usuario, se le pide que favor inicie sesión de nuevo
            alert('Sesión expirada, inicie sesión de nuevo por favor.');
            window.location.href = "iniciar-sesion.html"
        }

        this.#render(shadow, this.usuario);
        this.#agregarEstilos(shadow);
        const administrarCuenta = shadow.querySelector('#miFormulario');
        administrarCuenta.addEventListener('submit', (event) => {
            event.preventDefault(); // Evita la recarga automática de la página

            const submitButton = event.submitter;

            if (submitButton.id === 'actualizarUsuario') {
                // Realizar la lógica de actualización
                this.#handleActualizarCuenta(event);
            } else if (submitButton.id === 'eliminarUsuario') {
                // Realizar la lógica de eliminación
                this.#handleEliminarCuenta(event);
            }
        });


    }

    #render(shadow, usuario) {
        // Aquí se va a insertar todo el HTML

        shadow.innerHTML += `
            
  <body id="page4">
    <!-- START PAGE SOURCE -->
    <div class="tail-top">
        <div class="tail-bottom">
            <div id="main">
                <div id="content">
                    <div class="line-hor"></div>
                    <div class="box">
                        <div class="border-right">
                            <div class="border-left">
                                <div class="caja">
                                    <div class="bienvenida">
                                        <img src="/App Web/images/icono-boleteria2.png" class="icono">
                                        <h2>Bienvenido a tu Perfil, ${usuario.nombre}</h2>
                                    </div>
                                        <form id="miFormulario">
                                            <div class="contenido">
                                                <input type="text" name="" id="nombreUsuario" placeholder="Nombre" value="${usuario.nombre}" required>
                                                <input type="text" name="" id="apellidoUsuario" placeholder="Apellido" value="${usuario.apellido}" required>
                                                <input type="number" name="" id="edadUsuario" placeholder="Edad" value="${usuario.edad}" required>
                                                <input type="number" name="" id="telefonoUsuario" placeholder="Teléfono" value="${usuario.telefono}" required>
                                                <input type="email" name="" id="correo" placeholder="Correo Email" value="${usuario.correo}" required>
                                                <input type="password" name="" id="contraseña" placeholder="Contraseña" value="${usuario.contraseña}" required>
                                                <input type="password" name="" id="contraseñaConfirmar" placeholder="Confirmar Contraseña" value="${usuario.contraseña}" required>
                                                <button type="submit" id="actualizarUsuario" class="btn-comprar">Actualizar Cuenta</button>
                                                <button type="submit" id="eliminarUsuario" class="btn-eliminar">Eliminar Cuenta</button>

                                            </div>
                                        </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- END PAGE SOURCE -->
</body>
        `
    }

    async #handleActualizarCuenta(event) {
        const nombre = this.shadowRoot.getElementById('nombreUsuario').value;
        const apellido = this.shadowRoot.getElementById('apellidoUsuario').value;
        const edad = this.shadowRoot.getElementById('edadUsuario').value;
        const telefono = this.shadowRoot.getElementById('telefonoUsuario').value;
        const correo = this.shadowRoot.getElementById('correo').value;
        const contraseña = this.shadowRoot.getElementById('contraseña').value;

        if (!this.#validarFormulario()) {
            return false;
        }

        const data = {
            nombre,
            apellido,
            edad,
            telefono,
            correo,
            contraseña
        }

        const res = await this.#actualizarUsuario(this.usuario.idUsuario, data);

        if (!res && res.message) {
            alert(res.message);
            return;
        }
        alert('Se actualizó el usuario correctamente');
        location.reload();
    }

    async #handleEliminarCuenta(evento) {
        var confirmacion1 = confirm("¿Estás seguro de que quieres eliminar tu cuenta? Esta acción es irreversible");

        if (!confirmacion1) {
            // El usuario hizo clic en "Cancelar" en la primera confirmación
            alert("Sabía decisión caballero");
            return;
        }

        var confirmacion2 = confirm("¡¿ESTÁS REALMENTE SEGURO?! ¡ES IRREVERSIBLE DE VERDAD!");
        if (!confirmacion2) {
            // El usuario hizo clic en "Cancelar" en la segunda confirmación
            alert("Sabía decisión caballero");
            return;
        }

        var confirmacion3 = confirm("NO ES BROMA, NO HAY VUELTA ATRÁS AL ELIMINAR TU CUENTA");

        if (confirmacion3) {
            // El usuario ha confirmado eliminar la cuenta
            const res = this.#eliminarUsuario(this.usuario.idUsuario);
            if (!res && res.message) {
                alert(res.message);
                return;
            }

            alert('Se eliminó tu cuenta, Esperamos verte de nuevo algún día :(');

            // Eliminamos la cookie con el token JWT.
            this.#eliminarCookie('cookieSesion');

            // Redireccionamos al login
            window.location.href = "iniciar-sesion.html"

        } else {
            // El usuario hizo clic en "Cancelar" en la tercera confirmación
            alert("Sabía decisión caballero");
        }
    }

    async #eliminarUsuario(idUsuario) {
        const res = await this.#usuarioService.deleteUsuario(this.token, idUsuario);
        const json = JSON.stringify(res);
        const evento = JSON.parse(json);

        if (evento && evento.status == 'fail') {
            alert(evento.message);
            return;
        }
        if (res && res.statusCode == 403) {
            window.location.href = "/App Web/iniciar-sesion.html"
            return;
        }

        return res;

    }

    async #actualizarUsuario(idUsuario, dataUpdate) {
        const res = await this.#usuarioService.putUsuario(this.token, idUsuario, dataUpdate);
        const json = JSON.stringify(res);
        const evento = JSON.parse(json);

        if (evento && evento.status == 'fail') {
            alert(evento.message);
            return;
        }
        if (res && res.statusCode == 403) {
            window.location.href = "/App Web/iniciar-sesion.html"
            return;
        }

        return res;

    }

    #eliminarCookie(nombreCookie) {
        // Establece la fecha de expiración en el pasado
        document.cookie = `${nombreCookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }



    #validarFormulario() {
        // Obtener referencias a los elementos del formulario
        const nombreUsuario = this.shadowRoot.getElementById('nombreUsuario');
        const apellidoUsuario = this.shadowRoot.getElementById('apellidoUsuario');
        const edadUsuario = this.shadowRoot.getElementById('edadUsuario');
        const telefonoUsuario = this.shadowRoot.getElementById('telefonoUsuario');
        const correo = this.shadowRoot.getElementById('correo');
        const contraseña = this.shadowRoot.getElementById('contraseña');
        const contraseñaConfirmar = this.shadowRoot.getElementById('contraseñaConfirmar');

        // Realizar validaciones
        if (!nombreUsuario.value.trim()) {
            alert('Por favor, ingrese un nombre válido.');
            return false;
        }

        if (!apellidoUsuario.value.trim()) {
            alert('Por favor, ingrese un apellido válido.');
            return false;
        }

        if (isNaN(edadUsuario.value) || edadUsuario.value <= 0) {
            alert('Por favor, ingrese una edad válida.');
            return false;
        }

        if (isNaN(telefonoUsuario.value) || telefonoUsuario.value <= 0) {
            alert('Por favor, ingrese un número de teléfono válido.');
            return false;
        }

        if (!correo.value.trim() || !/\S+@\S+\.\S+/.test(correo.value)) {
            alert('Por favor, ingrese un correo electrónico válido.');
            return false;
        }

        if (contraseña.value.length < 8) {
            alert('La contraseña debe tener al menos 8 caracteres.');
            return false;
        }

        if (contraseña.value !== contraseñaConfirmar.value) {
            alert('Las contraseñas no coinciden.');
            return false;
        }

        return true;
    }




    // Se agregan los estilos al HTML.
    #agregarEstilos(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "/App Web/sesion/sesion.css");

        let link2 = document.createElement("link");
        link2.setAttribute("rel", "stylesheet");
        link2.setAttribute("href", "/App Web/css/style.css");

        let link3 = document.createElement("link");
        link3.setAttribute("rel", "stylesheet");
        link3.setAttribute("href", "/App Web/css/ie6.css");


        shadow.appendChild(link);
        shadow.appendChild(link2);
        shadow.appendChild(link3);

    }
}