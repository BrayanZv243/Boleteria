
export class BoleteriaComponent extends HTMLElement {
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
          <h3>Explora los <span>Eventos</span></h3>
          <ul class="movies">
            <li>
              <h4>Chivas vs América</h4>
              <img src="./images/1page-img2.jpg" alt="" width="286" height="190"/>
              <p class="blanco">¡Vive la emoción del clásico en vivo!</p>
              <div class="wrapper"><a href="#" class="link2"><span><span>Añadir al carrito</span></span></a></div>
            </li>
            <li>
              <h4>Luis Miguel En VIVO</h4>
              <img src="./images/1page-img3.jpg" alt="" width="286" height="190"/>
              <p class="blanco">¡Disfruta del nuevo album de Luis Miguel totalmente en vivo, totalmente en directo!</p>
              <div class="wrapper"><a href="#" class="link2"><span><span>Añadir al carrito</span></span></a></div>
            </li>
            <li class="last">
              <h4>El gallo de oro</h4>
              <img src="./images/1page-img4.jpg" alt="" width="286" height="190"/>
              <p class="blanco">Ven a vivir la resurrección del gallo de oro con sus nuevas canciones 2023.</p>
              <div class="wrapper"><a href="#" class="link2"><span><span>Añadir al carrito</span></span></a></div>
            </li>
            <li class="clear">&nbsp;</li>
          </ul>
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