/* =========================================
   PANTALLAS
========================================= */

let pantallaActual = 1;

const totalPantallas = 7;


function siguientePantalla() {

    if (pantallaActual >= totalPantallas) {
        return;
    }


    const pantallaAnterior =
        document.getElementById(
            "pantalla" + pantallaActual
        );


    if (!pantallaAnterior) {
        return;
    }


    pantallaAnterior.classList.remove(
        "activa"
    );


    pantallaActual++;


    const nuevaPantalla =
        document.getElementById(
            "pantalla" + pantallaActual
        );


    if (!nuevaPantalla) {
        return;
    }


    setTimeout(
        function () {

            nuevaPantalla.classList.add(
                "activa"
            );


            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        },
        180
    );

}



/* =========================================
   INICIO
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        configurarCarrusel();

        configurarSobre();

        configurarCarta();

    }
);



/* =========================================
   CARRUSEL
========================================= */

function configurarCarrusel() {


    const track =
        document.getElementById(
            "carruselTrack"
        );


    const viewport =
        document.getElementById(
            "carruselViewport"
        );


    const slides =
        document.querySelectorAll(
            ".slide"
        );


    const puntos =
        document.querySelectorAll(
            ".punto"
        );


    const anterior =
        document.getElementById(
            "flechaAnterior"
        );


    const siguiente =
        document.getElementById(
            "flechaSiguiente"
        );


    if (
        !track ||
        !viewport ||
        slides.length === 0
    ) {
        return;
    }


    let fotoActual = 0;

    let inicioX = 0;


    function mostrarFoto(numero) {


        if (numero < 0) {

            numero =
                slides.length - 1;

        }


        if (
            numero >= slides.length
        ) {

            numero = 0;

        }


        fotoActual = numero;


        track.style.transform =
            "translateX(-" +
            fotoActual * 100 +
            "%)";


        puntos.forEach(
            function (
                punto,
                indice
            ) {

                punto.classList.toggle(
                    "activo",
                    indice === fotoActual
                );

            }
        );

    }



    if (anterior) {

        anterior.addEventListener(
            "click",
            function () {

                mostrarFoto(
                    fotoActual - 1
                );

            }
        );

    }



    if (siguiente) {

        siguiente.addEventListener(
            "click",
            function () {

                mostrarFoto(
                    fotoActual + 1
                );

            }
        );

    }



    puntos.forEach(
        function (punto) {

            punto.addEventListener(
                "click",
                function () {

                    const numero =
                        Number(
                            punto.dataset.foto
                        );

                    mostrarFoto(numero);

                }
            );

        }
    );



    /* DESLIZAR CON EL DEDO */

    viewport.addEventListener(
        "touchstart",
        function (evento) {

            inicioX =
                evento.touches[0]
                    .clientX;

        },
        {
            passive: true
        }
    );


    viewport.addEventListener(
        "touchend",
        function (evento) {

            const finalX =
                evento.changedTouches[0]
                    .clientX;


            const diferencia =
                inicioX - finalX;


            if (
                Math.abs(diferencia)
                < 45
            ) {

                return;

            }


            if (diferencia > 0) {

                mostrarFoto(
                    fotoActual + 1
                );

            }

            else {

                mostrarFoto(
                    fotoActual - 1
                );

            }

        },
        {
            passive: true
        }
    );



    /* FLECHAS DEL TECLADO */

    document.addEventListener(
        "keydown",
        function (evento) {


            if (
                pantallaActual !== 7
            ) {
                return;
            }


            if (
                evento.key ===
                "ArrowRight"
            ) {

                mostrarFoto(
                    fotoActual + 1
                );

            }


            if (
                evento.key ===
                "ArrowLeft"
            ) {

                mostrarFoto(
                    fotoActual - 1
                );

            }

        }
    );


    mostrarFoto(0);

}



/* =========================================
   SOBRE
========================================= */

let sobreAbierto = false;

let animacionSobre = false;


function configurarSobre() {


    const sobre =
        document.getElementById(
            "sobre"
        );


    const carta =
        document.getElementById(
            "cartaPreview"
        );


    if (!sobre) {
        return;
    }


    sobre.addEventListener(
        "click",
        function (evento) {


            if (
                carta &&
                carta.contains(
                    evento.target
                )
            ) {
                return;
            }


            abrirSobre();

        }
    );


    sobre.addEventListener(
        "keydown",
        function (evento) {


            if (
                evento.key ===
                "Enter" ||
                evento.key ===
                " "
            ) {

                evento.preventDefault();

                abrirSobre();

            }

        }
    );

}



function abrirSobre() {


    if (
        sobreAbierto ||
        animacionSobre
    ) {
        return;
    }


    const sobre =
        document.getElementById(
            "sobre"
        );


    const instruccion =
        document.getElementById(
            "instruccionSobre"
        );


    if (!sobre) {
        return;
    }


    animacionSobre = true;

    sobreAbierto = true;


    sobre.classList.add(
        "abierto"
    );


    if (instruccion) {

        instruccion.textContent =
            "La carta es para ti...";

    }


    setTimeout(
        function () {

            animacionSobre = false;

        },
        1800
    );

}



/* =========================================
   CARTA
========================================= */

function configurarCarta() {


    const cartaPreview =
        document.getElementById(
            "cartaPreview"
        );


    const modal =
        document.getElementById(
            "cartaModal"
        );


    const cartaGrande =
        document.getElementById(
            "cartaGrande"
        );


    const cerrar =
        document.getElementById(
            "cerrarCarta"
        );


    if (
        !cartaPreview ||
        !modal ||
        !cartaGrande
    ) {
        return;
    }



    cartaPreview.addEventListener(
        "click",
        function (evento) {

            evento.stopPropagation();


            if (
                !sobreAbierto ||
                animacionSobre
            ) {
                return;
            }


            abrirCartaGrande();

        }
    );



    cartaGrande.addEventListener(
        "click",
        function (evento) {


            if (
                evento.target.closest(
                    "#cerrarCarta"
                )
            ) {
                return;
            }


            guardarCarta();

        }
    );



    if (cerrar) {

        cerrar.addEventListener(
            "click",
            function (evento) {

                evento.stopPropagation();

                guardarCarta();

            }
        );

    }



    modal.addEventListener(
        "click",
        function (evento) {


            if (
                evento.target === modal
            ) {

                guardarCarta();

            }

        }
    );

}



/* =========================================
   ABRIR CARTA GRANDE
========================================= */

function abrirCartaGrande() {


    const modal =
        document.getElementById(
            "cartaModal"
        );


    if (!modal) {
        return;
    }


    modal.classList.add(
        "visible"
    );


    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}



/* =========================================
   GUARDAR CARTA
========================================= */

function guardarCarta() {


    if (animacionSobre) {
        return;
    }


    const modal =
        document.getElementById(
            "cartaModal"
        );


    const sobre =
        document.getElementById(
            "sobre"
        );


    const instruccion =
        document.getElementById(
            "instruccionSobre"
        );


    if (
        !modal ||
        !sobre
    ) {
        return;
    }


    animacionSobre = true;


    /* CERRAMOS CARTA GRANDE */

    modal.classList.remove(
        "visible"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";


    /* LA CARTA VUELVE AL SOBRE */

    setTimeout(
        function () {

            sobre.classList.add(
                "guardando"
            );

        },
        300
    );


    /* CERRAMOS SOLAPA */

    setTimeout(
        function () {

            sobre.classList.remove(
                "abierto"
            );

        },
        1200
    );


    /* REAPARECE EL SELLO */

    setTimeout(
        function () {

            sobre.classList.remove(
                "guardando"
            );


            sobreAbierto = false;

            animacionSobre = false;


            if (instruccion) {

                instruccion.textContent =
                    "Toca el sobre";

            }

        },
        2100
    );

}