import { CarritoCompraService } from "../servicios/CarritoCompraService.js";
import { EventosService } from "../servicios/EventosService.js";
import { CookiesService } from "../servicios/CookiesService.js";

export class CarritoComponent extends HTMLElement {

    #carritoServices = new CarritoCompraService();
    #eventosServices = new EventosService();
    #cookiesServices = new CookiesService();

    constructor() {
        super();
        this.boletosEnCarrito;
        this.carritoCompra;
        this.idUsuario;
        this.token;
    }

    async connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        this.token = this.#cookiesServices.getCookieSession('cookieSesion');
        this.idUsuario = this.#cookiesServices.decodeJwt(this.token).idUsuario;
        this.carritoCompra = await this.#obtenerCarritoCompraPorIDUsuario();
        this.boletosEnCarrito = await this.#obtenerBoletosEnCarritoCompra();

        await this.#render(shadow);
        this.#agregarEstilos(shadow);

        // Obtener todos los elementos con la clase 'event-container'
        const cardsEventos = shadow.querySelectorAll('.event-container');
        const cardPagarCarrito = shadow.querySelector('#pagarCarrito');
        

        // Agregar el evento click a cada elemento
        cardsEventos.forEach(card => {
            card.addEventListener('click', () => {
                // Obtener el idBoleto del atributo data-idboleto
                const idBoleto = card.getAttribute('data-idboleto');
                
                if(idBoleto) {
                    // Llamar a la función de manejo de clics con el idBoleto
                    this.#handleDeleteBoletoDeCarrito(idBoleto);
                }

                const selectElement = card.querySelector('select');
                if (selectElement) {
                    selectElement.addEventListener('click', (event) => {
                        event.stopPropagation(); // Detener la propagación del evento
                    });
                }
                
            });
        });

        cardPagarCarrito.addEventListener('click', () => this.#handlePagarCarrito(shadow));
    }

    async #obtenerBoletosEnCarritoCompra() {
        return await this.#carritoServices.getBoletosDeUnCarritoCompra(this.token, this.carritoCompra.idCarrito_Compra);
    }

    async #obtenerCarritoCompraPorIDUsuario() {
        return await this.#carritoServices.getCarritoCompraPorIDUsuario(this.token, this.idUsuario);
    }

    async #render(shadow) {
        // Inserta el HTML dentro del Shadow DOM
        shadow.innerHTML = `
<body id="page1">
    <div class="tail-top">
        <div class="tail-bottom">
            <div id="main">
                <div class="container-carrito">
                    <div class="carrito-info-event">
                        ${await this.#cargarEventosEnCarrito()}
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
`;
    }

    async #cargarEventosEnCarrito() {
        let htmlCarritoBoletos = await Promise.all(this.boletosEnCarrito.map(async (boleto) => {
            const evento = await this.#obtenerEventoPorID(boleto.idBoleto_boleto.idEvento);
            return `<br><br><br><br>
            <div class="event-container" data-idboleto="${boleto.idBoleto}">
                <div class="image-event">
                    <img src="/App Web/images/eventos/${evento.nombreImagen}" alt="">
                </div>
                <div class="event-details">
                    <div class="column-event">
                        <p>${evento.nombre}</p>
                        <p>${this.#formatearFecha(evento.fecha)}</p>
                        <p>${evento.lugar}</p>
                    </div>
                    <div class="column-event">
                        <p>BOLETOS DISPONIBLES: ${evento.numBoletosDisponibles}</p>
                        <p>BOLETOS VENDIDOS: ${evento.numBoletosVendidos}</p>
                        <p>PRECIO: $${boleto.idBoleto_boleto.precio} MXN</p>
                    </div>
                </div>
            </div>`;
        }));

        const subtotal = parseFloat(this.boletosEnCarrito.reduce((acumulador, boleto) => acumulador + parseFloat(boleto.idBoleto_boleto.precio), 0)).toFixed(2);
        const iva = parseFloat((subtotal * 0.16)).toFixed(2);
        const total = parseFloat((parseFloat(subtotal) + parseFloat(iva))).toFixed(2);
        // Agregamos la tarjeta para pagar
        htmlCarritoBoletos += `
            <br><br><br><br><br><br><br>
            <div class="event-container" id="pagarCarrito">
                <div class="image-event">
                    <img src="/App Web/images/icono-boleteria2.png" alt="">
                </div>
                <div class="event-details">
                    <div class="column-event">
                        <p>SUBTOTAL: $${subtotal} MXN</p>
                        <p>IVA (16%): $${iva} MXN</p>
                        <p>TOTAL: $${total} MXN</p>
                        <select id="metodoPago">
                            <option selected value="0">Método de pago</option>
                            <option value="BBVA">BBVA</option>
                            <option value="BANCOMER">Bancomer</option>
                            <option value="SANTANDER">Santander</option>
                            <option value="PAYPAL">PayPal</option>
                        </select>
                    </div>
                </div>
            </div>
            <br><br><br><br><br><br><br>
            `;

        return htmlCarritoBoletos;
    }

    #handlePagarCarrito(shadow){
        const metodoPago = shadow.querySelector('#metodoPago').value;
        console.log(metodoPago)
        if(metodoPago == '0'){
            alert('Seleccione un método de pago, por favor.');
            return;
        }

        let confirmacion = confirm(`Estás a punto de realizar el pago de tu carrito, con método de pago ${metodoPago}`);

        if(!confirmacion) return;

        // Aquí se realiza la compra, Se borran todos los articulos del carrito
        // y se guarda el pago con los datos correspondientes.
        // También se actualizan los boletos comprados de 'DISPONIBLE' a 'VENDIDO'.
        // En compras_has_boletos se guardan todos los boletos que se compraron con
        // el id de compra único.
    }

    #handleDeleteBoletoDeCarrito(idBoleto) {
        // Aquí puedes hacer lo que quieras con el idBoleto, por ejemplo, guardarlo
        console.log('Se hizo clic en el evento. IdBoleto:', idBoleto);
    }

    async #obtenerEventoPorID(idEvento) {
        return await this.#eventosServices.getEventoPorID(this.token, idEvento);
    }

    #formatearFecha(fechaISO) {
        const opciones = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };

        // Convertir la cadena ISO a un objeto de fecha
        const fecha = new Date(fechaISO);

        // Restar 7 horas
        fecha.setHours(fecha.getHours() + 7);

        // Formatear la fecha según las opciones proporcionadas
        const fechaFormateada = fecha.toLocaleString('es-ES', opciones);

        return fechaFormateada;
    }

    #agregarEstilos(shadow) {
        // "../css/style.css"
        // Agrega estilos específicos al Shadow DOM
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "/App Web/carrito/carrito.css");

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