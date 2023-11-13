export class SeleccionComponent extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    this.#render(shadow);
    this.#agregarEstilos(shadow);
    this.#agregarJS(shadow);
  }

  #render(shadow) {
    // Aquí se va a insertar todo el HTML
    shadow.innerHTML += `
            
  <body id="page4">
    <!-- START PAGE SOURCE -->
    <div class="tail-top">
        <div class="tail-bottom">
            <div id="main">
                <div id="header">
                    <div class="row-1">
                        <div class="fleft"><a href="#">Selecciona tus <span>Boletos</span></a></div>

                    </div>

                </div>
                <div id="content">
                    <div class="line-hor"></div>
                    <div class="box">
                        <div class="border-right">
                            <div class="border-left">
                                <img src="/App Web/images/asientos.png" alt="" class="img-asientos" />
                                <div class="caja">

                                    <h3>Nombre <span>Evento</span></h3>

                                    <div class="contenido">
                                        <!-- Todos los elementos del formulario y el botón -->

                                        <select id="fila" name="fila">
                                            <option selected value="0">Fila</option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="Z">Z</option>

                                        </select>

                                        <select id="numero" name="numero">
                                            <option selected value="0">Número Fila</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="100">100</option>

                                        </select>

                                        <select>
                                            <option selected value="0">Método de pago</option>
                                            <option value="1">BBVA</option>
                                            <option value="2">Bancomer</option>
                                            <option value="3">Santander</option>
                                            <option value="3">PayPal</option>
                                        </select>


                                        <select id="tipo-boletos" name="tipo-boletos">
                                            <option selected value="0">Tipo de Boleto</option>
                                            <option value="Normal">Normal</option>
                                            <option value="VIP">VIP</option>
                                        </select>

                                        <button type="submit" class="btn-comprar">Comprar Boleto</button>
                                    </div>

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

  // Se agregan los estilos al HTML.
  #agregarEstilos(shadow) {
    let link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "/App Web/seleccion/seleccion.css");

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