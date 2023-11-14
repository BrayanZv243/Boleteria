
export class NavBarComponent extends HTMLElement {
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
    <div class="tail-top">
        <div class="tail-bottom">
            <div id="main">
                <div id="header">
                    <div class="row-1">
                        <div class="fleft"><a href="#">Cinema <span>World</span></a></div>
                        <ul>
                            <li><a href="#"><img src="home/images/icon1-act.gif" alt="" /></a></li>
                            <li><a href="#"><img src="home/images/icon2.gif" alt="" /></a></li>
                            <li><a href="#"><img src="home/images/icon3.gif" alt="" /></a></li>
                        </ul>
                    </div>
                    <div class="row-2">
                        <ul>
                            <li><a href="index.html" class="active">Home</a></li>
                            <li><a href="about-us.html">About</a></li>
                            <li><a href="seleccion.html">Seleccion</a></li>
                            <li><a href="contact-us.html">Contacts</a></li>
                            <li class="last"><a href="sitemap.html">Sitemap</a></li>
                            <li class=""><a href="carrito.html">Carrito</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
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