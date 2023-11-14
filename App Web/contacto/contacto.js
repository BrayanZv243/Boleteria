
export class ContactoComponent extends HTMLElement {
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
                <div id="content">
        <div class="line-hor"></div>
        <div class="box">
          <div class="border-right">
            <div class="border-left">
              <div class="inner">
                <h3>Our <span>Contacts</span></h3>
                <div class="address">
                  <div class="fleft"><span>Zip Code:</span>50122<br />
                    <span>Country:</span>USA<br />
                    <span>Telephone:</span>+354 5635600<br />
                    <span>Fax:</span>+354 5635610</div>
                  <div class="extra-wrap"><span>Miscellaneous info:</span><br />
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <h3>Contact <span>Form</span></h3>
          <form id="contacts-form" action="#">
            <fieldset>
              <div class="field">
                <label>Your Name:</label>
                <input type="text" value=""/>
              </div>
              <div class="field">
                <label>Your E-mail:</label>
                <input type="text" value=""/>
              </div>
              <div class="field">
                <label>Your Website:</label>
                <input type="text" value=""/>
              </div>
              <div class="field">
                <label>Your Message:</label>
                <textarea cols="1" rows="1"></textarea>
              </div>
              <div class="wrapper"> <a href="#" class="link2"> <span> <span>Send Your Message</span> </span> </a> </div>
            </fieldset>
          </form>
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