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
            
        <body id="page1">
        <!-- START PAGE SOURCE -->
        <div class="tail-top">
          <div class="tail-bottom">
            <div id="main">
              <div id="content">
                <div class="content">
                  
                  <img src="home/images/asientos.png" alt="" />
                
                  
                  <div class="formulario">
                    <label for="numero-asientos">Número de Asientos:</label>
                    <input type="text" id="numero-asientos" name="numero-asientos" />
      
                    <label for="metodo-pago">Método de Pago:</label>
                    <select id="metodo-pago" name="metodo-pago">
                      <option value="tarjeta-debito">Tarjeta de Débito</option>
                      <option value="tarjeta-credito">Tarjeta de Crédito</option>
                    </select>
      
                    <label for="tipo-boletos">Tipo de Boletos:</label>
                    <select id="tipo-boletos" name="tipo-boletos">
                      <option value="VIP">VIP</option>
                      <option value="Normal">Normal</option>
                    </select>
      
                    <label for="fila">Fila:</label>
                    <select id="fila" name="fila">
                      
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="Z">Z</option>
    
                    </select>
      
                    <label for="numero">Número:</label>
                    <select id="numero" name="numero">
                      
                      <option value="1">1</option>
                      <option value="2">2</option>  
                      <option value="100">100</option>
    
                    </select>
                  </div>
      
                  <button type="submit">Comprar Boletos</button>
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

    // Se agregan los estilos al HTML.
    #agregarEstilos(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./home/home.css");

        let link2 = document.createElement("link");
        link2.setAttribute("rel", "stylesheet");
        link2.setAttribute("href", "./home/css/style.css");

        let link3 = document.createElement("link");
        link3.setAttribute("rel", "stylesheet");
        link3.setAttribute("href", "./home/css/ie6.css");


        shadow.appendChild(link);
        shadow.appendChild(link2);
        shadow.appendChild(link3);
        
    }

    #agregarJS(shadow) {
        let link = document.createElement("link");
        link.setAttribute("type", "text/javascript");
        link.setAttribute("href", "./home/js/jquery-1.4.2.min.js");

        let link2 = document.createElement("link");
        link2.setAttribute("type", "text/javascript");
        link2.setAttribute("href", "./home/js/cufon-yui.js");

        let link3 = document.createElement("link");
        link3.setAttribute("type", "text/javascript");
        link3.setAttribute("href", "./home/js/cufon-replace.js");

        let link4 = document.createElement("link");
        link4.setAttribute("type", "text/javascript");
        link4.setAttribute("href", "./home/js/Gill_Sans_400.font.js");

        let link5 = document.createElement("link");
        link5.setAttribute("type", "text/javascript");
        link5.setAttribute("href", "./home/js/script.js");

        let link6 = document.createElement("link");
        link6.setAttribute("type", "text/javascript");
        link6.setAttribute("href", "./home/js/ie_png.js");

        shadow.appendChild(link);
        shadow.appendChild(link2);
        shadow.appendChild(link3);
        shadow.appendChild(link4);
        shadow.appendChild(link5);
        shadow.appendChild(link6);
    }
}