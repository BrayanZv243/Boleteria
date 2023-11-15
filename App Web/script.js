// Aquí van todos los imports de los micro-frontends...

import { HomeComponent } from "./home/home.js";
import { BoleteriaComponent } from "./home/boleteria/boleteria.js";
import { SeleccionComponent } from "./seleccion/seleccion.js";
import { AcercaDeComponent } from "./acerca-de/acerca-de.js";
import { ContactoComponent } from "./contacto/contacto.js";
import { NavBarComponent } from "./navbar/navbar.js";
import { FooterComponent } from "./footer/footer.js";
import { CarritoComponent } from "./carrito/carrito.js";

// Se definen los micro-frontends genéricos.
window.customElements.define('navbar-info', NavBarComponent);
window.customElements.define('footer-info', FooterComponent);

// Home
window.customElements.define('home-info', HomeComponent);
window.customElements.define('boleteria-info', BoleteriaComponent);

// Selección
window.customElements.define('seleccion-info', SeleccionComponent);

// Contacto
window.customElements.define('contacto-info', ContactoComponent);

// Acerca de
window.customElements.define('acerca-info', AcercaDeComponent);

//Carrito 
window.customElements.define('carrito-info', CarritoComponent);