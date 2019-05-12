window.addEventListener("load", init, false);

function init() {

    var counter = 0;
    var slides = document.getElementsByClassName("main_slider");
    var texts = document.getElementsByClassName("main_block");
    var bars = document.getElementsByClassName("bar");
    var arrows = document.getElementsByClassName("arrow");
    var clicked;
    var totalSlides = slides.length;

    document.getElementById("check_button").addEventListener("click", startReservationProcess);
    arrows[0].addEventListener("click", function() { counter - 2; if (counter < 0) { counter = totalSlides - 1 }; clicked = Date.now(); mainSlider() });
    arrows[1].addEventListener("click", function() { clicked = Date.now(); mainSlider() });

    setInterval(autoSlider, 5000);
    miniSlider();

    function startReservationProcess() {
        window.sessionStorage.flag = "index";
        window.sessionStorage.checkIN = document.getElementById("check-in").value;
        window.sessionStorage.checkOUT = document.getElementById("check-out").value;
        window.sessionStorage.adults = document.getElementById("adults").value;
        window.sessionStorage.children = document.getElementById("children").value;
        window.location.assign("reservation.html");
    };

    function mainSlider() {
        
        var next = (counter + 1) == totalSlides ? 0 : counter + 1;

        slides[counter].style.opacity = 0;
        slides[next].style.opacity = 1;
        
        texts[counter].style.opacity = 0;
        texts[counter].style.display = "none";
        texts[next].style.display = "block"; setTimeout(function() {texts[next].style.opacity = 1}, 100);

        bars[counter].classList.remove("active");
        bars[next].classList.add("active");

        ++counter;
        if (counter == totalSlides) {
            counter = 0;
        };

    };

    function autoSlider() {
        if (clicked == undefined || Date.now() - clicked > 10000) mainSlider();
    };

    function miniSlider() {
        var elem =  document.getElementsByClassName("room_preview")[0];
        var styles = window.getComputedStyle(elem);
        var width = styles.getPropertyValue("width");
        var margin = styles.getPropertyValue("margin-right");
        var slideWidth = +width.substring(0, width.indexOf("px")) + +margin.substring(0, margin.indexOf("px"));
        var arrowsContainer = document.getElementById("rooms_navigation");
        arrowsContainer.children[0].addEventListener("click", left);
        arrowsContainer.children[1].addEventListener("click", right);
        var containerStyles = window.getComputedStyle(document.getElementsByClassName("container")[0]);
        var containerWidth = containerStyles.getPropertyValue("width")
        var slidesAmount = 6 - Math.round(+containerWidth.substring(0, containerWidth.indexOf("px")) / slideWidth);
        alert(slidesAmount);
        var position = 0;
       
        function right() {
            if (position < slidesAmount) {
                ++position
                elem.parentElement.style.left = "-" + slideWidth * position + "px";
                arrowsContainer.children[0].style.color = "black";
                alert(1);
            };
            if (position == slidesAmount) arrowsContainer.children[1].style.color = "gray"; 
        };

        function left() {
            if (position > 0) {
                --position
                elem.parentElement.style.left = "-" + slideWidth * position + "px";
                arrowsContainer.children[1].style.color = "black"; 
            };
            if (position == 0) arrowsContainer.children[0].style.color = "gray"; 
        };

        function setupSlider() {
            elem =  document.getElementsByClassName("room_preview")[0];
            styles = window.getComputedStyle(elem);
            width = styles.getPropertyValue("width");
            margin = styles.getPropertyValue("margin-right");
            slideWidth = +width.substring(0, width.indexOf("px")) + +margin.substring(0, margin.indexOf("px"));
            containerStyles = window.getComputedStyle(document.getElementsByClassName("container")[0]);
            containerWidth = containerStyles.getPropertyValue("width")
            slidesAmount = 6 - Math.round(+containerWidth.substring(0, containerWidth.indexOf("px")) / slideWidth);
            position = 0;
        };

        window.addEventListener("resize", setupSlider);

    };

};
