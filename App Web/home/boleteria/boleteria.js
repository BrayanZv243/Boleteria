import { EventosService } from "../../servicios/EventosService.js";
import { SessionService } from "../../servicios/SessionService.js";

export class BoleteriaComponent extends HTMLElement {
  #eventosServices = new EventosService();
  #sessionService = new SessionService();
  constructor() {
    super()
    this.eventos = []
    this.tipoUsuario;
  }

  async connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    // Obtenemos la cookie con el token y lo validamos
    const token = this.#getCookieSession('cookieSesion')

    // Para validar se hace la petición a los eventos

    await this.#obtenerEventos(token);
    // Obtenemos el tipo de usuario para asignar los botones.
    this.tipoUsuario = this.#sessionService.getDataToken(token).rol;
    this.#render(shadow);
    this.#agregarEstilos(shadow);
    this.#agregarJS(shadow);
    console.log(this.eventos)
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

  async #obtenerEventos(token) {
    const res = await this.#eventosServices.getEventos(token);
    if (res && !res.mensaje) {
      this.eventos = res;

    } else {
      // Si no es un token válido, lo redireccionamos al login.
      window.location.href = "/App Web/iniciar-sesion.html"
    }
  }

  #render(shadow) {
    const contenidoExtra = this.tipoUsuario == 'ADMIN' ? '<br><br><br><div class="btn-agregarEvento"><a href="registro-evento.html" target="_blank" class="link2"><span><span>Agregar Evento</span ></span ></a ></div>' : '';

    // Aquí se va a insertar todo el HTML
    shadow.innerHTML += `
            
<body id="page1">
<!-- START PAGE SOURCE -->
<div class="tail-top">
  <div class="tail-bottom">
    <div id="main">
      <div id="content">
        <div class="content">
            <h3>Explora los <span>Eventos</span></h3>
          <ul class="movies">
            ${this.#cargarEventosEnDOM()}
          </ul>
          ${contenidoExtra}
        </div>
      </div>
    </div>
  </div>
</div>
<!-- END PAGE SOURCE -->
</body>
</html>
        `
  }

  #cargarEventosEnDOM() {
    let HTMLEvento = ``;

    this.eventos.forEach((evento) => {
      HTMLEvento += `
      <li>
        <h4>${evento.nombre}</h4>
        <img src="./images/eventos/${evento.nombreImagen}" alt=""/>
        <p class="blanco">${evento.lugar} - ${this.#formatearFecha(evento.fecha)}</p>
        <div class="wrapper"><a href='/App Web/seleccion.html?idEvento=${evento.idEvento}&nombre=${evento.nombre}' target="_blank" class="link2"><span><span>Añadir al carrito</span></span></a></div>
      </li>
      `
    });

    return HTMLEvento;
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

  // Se agregan los estilos al HTML.
  #agregarEstilos(shadow) {
    let link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "/App Web/home/home.css");

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