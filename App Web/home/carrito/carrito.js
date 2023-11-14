export class CarritoComponent extends HTMLElement {
constructor() {
super();
}

connectedCallback() {
const shadow = this.attachShadow({ mode: "open" });
this.#render(shadow);
this.#agregarEstilos(shadow);
}

#render(shadow) {
// Inserta el HTML dentro del Shadow DOM
shadow.innerHTML = `
<link rel="stylesheet" href="../css/style.css">
<div class="container-carrito">
    <div class="carrito-header">
        <div class="slogan-carrito">
            <p>TODOS LOS EVENTOS A TU ALCANCE</p>
        </div>
        <div class="slogaan-logo"><img src="../images/1page-img1.jpg" alt=""></div>
    </div>

    <div class="carrito-info-event">
        <div class="image-event">
            <img src="../images/1page-img1.jpg" alt="">
        </div>
        <div class="column-event">
            <p>CHIVAS VS CRUZ AZUL</p>
            <p>10/11/23</p>
            <p>GUADALAJARA</p>
        </div>
        <div class="column-event">
            <p>BOLETOS DISPONIBLES 43,000</p>
            <p>BOLETOS VENDIDOS 20,000</p>
            <p>TOTAL $600</p>
        </div>
    </div>
    <button style="background-color: orange; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin-top: 20px;">Mi Botón</button>
</div>
`;
}

#agregarEstilos(shadow) {
// Agrega estilos específicos al Shadow DOM
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
}