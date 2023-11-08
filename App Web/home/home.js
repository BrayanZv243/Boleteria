
export class HomeComponent extends HTMLElement {
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
            <li><a href="articles.html">Articles</a></li>
            <li><a href="contact-us.html">Contacts</a></li>
            <li class="last"><a href="sitemap.html">Sitemap</a></li>
          </ul>
        </div>
      </div>
      <div id="content">
        <div id="slogan">
          <div class="image png"></div>
          <div class="inside">
            <h2>We are breaking<span>All Limitations</span></h2>
            <p>Lorem ipsum dolor consectetur adipisicing elit, sed do eiusmod tempor incididunt labore etolore magna aliqua enim minim veniam quis nostrud exercitation ullamco laboris.</p>
            <div class="wrapper"><a href="#" class="link1"><span><span>Learn More</span></span></a></div>
          </div>
        </div>
        <div class="box">
          <div class="border-right">
            <div class="border-left">
              <div class="inner">
                <h3>Welcome to <b>Cinema</b> <span>World</span></h3>
                <p class="blanco">Felitsed vel inte vivamus ant sed sapientesque ero id auctor tincidunt. Enimin ulla mi et nibh turien augue habitudin platea sed orci. Intedonec quis sed condis donec urna lacilis leo quismodo wisi quis.</p>
                <div class="img-box1"><img src="home/images/1page-img1.jpg" alt="" /><p class="blanco">Fauctororci cursuspendrerisque ipsum elit congue nibh proin nulla eu urna et. Tordolorem metus fringilla sem facinia sapien in in malesuada vitae quismodo. Ipsumut tellentegest nunc pede id sem gravida natis justo maecenas eu. </p></div>
                <p class="blanco">Doneccursus et amet a mattitor condisse laoreet accum wisis sapibulum orci. Cursuscondimentum dolorem pulvinare lacus amet commod tincidunt tellus quisque donec natibus.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <h3>Fresh <span>Movies</span></h3>
          <ul class="movies">
            <li>
              <h4>Toy Story 3</h4>
              <img src="home/images/1page-img2.jpg" alt="" />
              <p class="blanco">Egetnunc nunc mattitor curabiturpiscipis nec ac hac pellus sem intesque sociis. Metusmetuer hendimentesque diam at orbi sempor.</p>
              <div class="wrapper"><a href="#" class="link2"><span><span>Read More</span></span></a></div>
            </li>
            <li>
              <h4>Prince of Percia: Sands of Time</h4>
              <img src="home/images/1page-img3.jpg" alt="" />
              <p class="blanco">Dolorem malesuada anterdum quis vitae. Cursustellentesque enim justo vestasse vitae trices phasellus leo sociis leo magnisl. Malestibulusnatis. </p>
              <div class="wrapper"><a href="#" class="link2"><span><span>Read More</span></span></a></div>
            </li>
            <li class="last">
              <h4>The Twilight Saga: Eclipse</h4>
              <img src="home/images/1page-img4.jpg" alt="" />
              <p class="blanco">Quisque felit odio ut nunc convallis semper sente ris feugiat. Odionam leo phasellentum id vitantesque nunc tor quisque a maecenatibus pellus.</p>
              <div class="wrapper"><a href="#" class="link2"><span><span>Read More</span></span></a></div>
            </li>
            <li class="clear">&nbsp;</li>
          </ul>
        </div>
      </div>
      <div id="footer">
        <div class="left">
          <div class="right">
            <div class="footerlink">
              <p class="lf">Copyright &copy; 2010 <a href="#">SiteName</a> - All Rights Reserved</p>
              <p class="rf">Design by <a href="http://www.templatemonster.com/">TemplateMonster</a></p>
              <div style="clear:both;"></div>
            </div>
          </div>
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