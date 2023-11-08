// Aquí van todos los imports de los micro-frontends...

import { HomeComponent } from "./home/home.js";

window.customElements.define('home-info', HomeComponent);
