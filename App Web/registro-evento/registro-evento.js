import { EventosService } from "../servicios/EventosService.js";
import { AsientosService } from "../servicios/AsientosService.js";
import { BoletosService } from "../servicios/BoletosService.js";

export class RegistroEventoComponent extends HTMLElement {

    #eventoServicio = new EventosService();
    #asientosService = new AsientosService();
    #boletosService = new BoletosService();

    constructor() {
        super()
        this.token;
        this.asientos = [];
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

    async #getAsientos(token){
        this.asientos = await this.#asientosService.getAsientos(token);
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        this.token = this.#getCookieSession('cookieSesion');
        
        this.#getAsientos(this.token)
            .then(()=> {
                this.#render(shadow);
                this.#agregarEstilos(shadow);
                this.#agregarJS(shadow);

                // Agregar el controlador de eventos al formulario
                const formulario = shadow.querySelector('form');
                formulario.addEventListener('submit', (event) => this.#handleFormSubmit(event));
            })
            .catch((err) => {
                console.log(err);
                alert(err);
            });
    }

    #render(shadow) {
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
                                        <h2>Registra tu evento</h2>
                                    </div>
                                        <form>
                                            <div class="contenido">
                                                <input type="text" name="" id="nombre-evento" placeholder="Nombre" required>
                                                <input type="text" name="" id="lugar-evento" placeholder="Lugar" required>
                                                <select id="tipo-evento" name="tipoEvento">
                                                    <option value="CONCIERTO">Concierto</option>
                                                    <option value="DEPORTE">Deporte</option>
                                                    <option value="CONFERENCIA">Conferencia</option>
                                                    <option value="ARTE Y CULTURA">Arte y Cultura</option>
                                                    <option value="ENTRETENIMIENTO">Entretenimiento en Vivo</option>
                                                </select>
                                                <label for="fechaEvento" class="registro">Fecha del Evento:</label>
                                                <input type="datetime-local" id="fecha-evento" name="fecha-evento">

                                                <input type="number" name="" id="boletos-evento" placeholder="Boletos a Vender (MAX:${this.asientos.length})" required min="0" max="${this.asientos.length}">
                                                <input type="number" name="" id="precio-boleto-evento" placeholder="Precio del Boleto MXN" required>

                                                <label for="imagen" class="registro">Selecciona una imagen:</label>
                                                <input type="file" id="imagen-evento" name="imagen" accept="image/*">
                                                <button type="submit" class="btn-comprar">Registrar Evento</button>


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

    #handleFormSubmit(event) {
        // Prevenir el envío predeterminado del formulario
        event.preventDefault();

        // Obtener los valores del formulario
        const nombre = this.shadowRoot.querySelector('#nombre-evento').value;
        const lugar = this.shadowRoot.querySelector('#lugar-evento').value;
        const tipo = this.shadowRoot.querySelector('#tipo-evento').value;
        const fecha = this.shadowRoot.querySelector('#fecha-evento').value;
        const numBoletosDisponibles = parseInt(this.shadowRoot.querySelector('#boletos-evento').value,10);

        const precioBoleto = parseInt(this.shadowRoot.querySelector('#precio-boleto-evento').value, 10);

        // Obtener el archivo de imagen
        const imagenInput = this.shadowRoot.querySelector('#imagen-evento');
        const img = imagenInput.files[0];

        if(img){
            
            const nombreImagen = img.name;
            const formData = new FormData();
            
            formData.append('image', img);

            const data = {
                nombre,
                lugar,
                tipo,
                fecha,
                numBoletosDisponibles,
                nombreImagen
            }

            // Llamar a la función #registrarEvento con los valores
            this.#registrarEvento(data, formData, precioBoleto);
        } else {
            alert('Seleccione un archivo')
        }
        
    }


    async #registrarEvento(data, formData, precioBoleto) {

        const res = await this.#eventoServicio.postEvento(data, formData, this.token);
        const json = JSON.stringify(res);
        const evento = JSON.parse(json);
        
        if(evento && evento.status == 'fail'){
            alert(evento.message);
            return;
        }

        if(res && res.statusCode == 403){
            window.location.href = "/App Web/iniciar-sesion.html"
        } else {
            const res = await this.#registrarBoletos(data, evento.idEvento, precioBoleto);
            if(res){
                alert('Se creó el evento y sus boletos de forma exitosa');
            } else {
                alert(res.mensaje);
            }
            
        }
        
    }

    async #registrarBoletos(data, idEvento, precio){
        return await this.#boletosService.postBoleto(data, this.token, idEvento, precio, this.asientos);
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

    #agregarJS(shadow) {
        let link = document.createElement("link");
        link.setAttribute("type", "text/javascript");
        link.setAttribute("href", "/App Web/js/jquery-1.4.2.min.js");

        let link2 = document.createElement("link");
        link2.setAttribute("type", "text/javascript");
        link2.setAttribute("href", "/App Web/js/cufon-yui.js");

        let link3 = document.createElement("link");
        link3.setAttribute("type", "text/javascript");
        link3.setAttribute("href", "/App Web/js/cufon-replace.js");

        let link4 = document.createElement("link");
        link4.setAttribute("type", "text/javascript");
        link4.setAttribute("href", "/App Web/js/Gill_Sans_400.font.js");

        let link5 = document.createElement("link");
        link5.setAttribute("type", "text/javascript");
        link5.setAttribute("href", "/App Web/js/script.js");

        let link6 = document.createElement("link");
        link6.setAttribute("type", "text/javascript");
        link6.setAttribute("href", "/App Web/js/ie_png.js");

        shadow.appendChild(link);
        shadow.appendChild(link2);
        shadow.appendChild(link3);
        shadow.appendChild(link4);
        shadow.appendChild(link5);
        shadow.appendChild(link6);
    }
}