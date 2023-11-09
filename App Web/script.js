// Aquí van todos los imports de los micro-frontends...

import { HomeComponent } from "./home/home.js";
import { MovieComponent } from "./home/movies/movies.js";
import { NavBarComponent } from "./home/navbar/navbar.js";
import { FooterComponent } from "./home/footer/footer.js";

window.customElements.define('home-info', HomeComponent);
window.customElements.define('movie-info', MovieComponent);
window.customElements.define('navbar-info', NavBarComponent);
window.customElements.define('footer-info', FooterComponent);