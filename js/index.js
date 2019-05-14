window.addEventListener("load", init, false);

function init() {

    var counter = 0;
    var slides = document.getElementsByClassName("main_slider");
    var texts = document.getElementsByClassName("main_block");
    var bars = document.getElementsByClassName("bar");
    var arrows = document.getElementsByClassName("arrow");
    var clicked;
    var totalSlides = slides.length;
    var margin;

    document.getElementById("check_button").addEventListener("click", startReservationProcess);
    arrows[0].addEventListener("click", function() { counter - 2; if (counter < 0) { counter = totalSlides - 1 }; clicked = Date.now(); mainSlider() });
    arrows[1].addEventListener("click", function() { clicked = Date.now(); mainSlider() });

    setInterval(autoSlider, 5000);
    adaptiveSliderSetting();
    window.addEventListener("resize", adaptiveSliderSetting);
    miniSlider();
    menuPagination();

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
        // var margin = styles.getPropertyValue("margin-right");
        // var slideWidth = +width.substring(0, width.indexOf("px")) + +margin.substring(0, margin.indexOf("px"));
        var slideWidth = +width.substring(0, width.indexOf("px")) + +margin;
        var arrowsContainer = document.getElementById("rooms_navigation");
        arrowsContainer.children[0].addEventListener("click", left);
        arrowsContainer.children[1].addEventListener("click", right);
        var containerStyles = window.getComputedStyle(document.getElementsByClassName("container")[0]);
        var containerWidth = containerStyles.getPropertyValue("width")
        var slidesAmount = 6 - Math.round(+containerWidth.substring(0, containerWidth.indexOf("px")) / slideWidth);
        var position = 0;
       
        function right() {
            if (position < slidesAmount) {
                ++position
                elem.parentElement.style.left = "-" + slideWidth * position + "px";
                arrowsContainer.children[0].style.color = "black";
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
            // margin = styles.getPropertyValue("margin-right");
            // slideWidth = +width.substring(0, width.indexOf("px")) + +margin.substring(0, margin.indexOf("px"));
            slideWidth = +width.substring(0, width.indexOf("px")) + +margin;
            containerStyles = window.getComputedStyle(document.getElementsByClassName("container")[0]);
            containerWidth = containerStyles.getPropertyValue("width")
            slidesAmount = 6 - Math.round(+containerWidth.substring(0, containerWidth.indexOf("px")) / slideWidth);
            position = 0;
            elem.parentElement.style.left = "-" + slideWidth * position + "px";
            arrowsContainer.children[0].style.color = "gray"; 
            arrowsContainer.children[1].style.color = "black"; 


        };

        window.addEventListener("resize", setupSlider);

    };

    function menuPagination() {
        var page1 = document.getElementById("menu_page1");
        var page2 = document.getElementById("menu_page2");
        var page3 = document.getElementById("menu_page3");
        var ul = document.getElementById("menu_navigation");
        ul.addEventListener("click", swapPage);
        var current = ul.children[0];

        function swapPage(e) {
            current.classList.remove("selected");
            current = e.target;
            current.classList.add("selected");
            switch (e.target.id) {
                case "page1": { 
                    page2.style.display = "none";
                    page3.style.display = "none";
                    page1.style.display = "flex";
                    break;
                };
                case "page2": { 
                    page1.style.display = "none";
                    page3.style.display = "none";
                    page2.style.display = "flex";
                    break;
                };
                case "page3": { 
                    page1.style.display = "none";
                    page2.style.display = "none";
                    page3.style.display = "flex";
                    break;
                };
            };
        };
    };

    function adaptiveSliderSetting() {
        var container = document.getElementsByClassName("container")[0];
        var roomElem = document.getElementsByClassName("room_preview")[0];
        var wrapper = document.getElementsByClassName("rooms_overview")[0];
        var containerStyles = window.getComputedStyle(container);
        var roomElemStyles = window.getComputedStyle(roomElem);
        var containerWidth = containerStyles.getPropertyValue("width");
        containerWidth = containerWidth.substring(0, containerWidth.indexOf("px"));
        var roomElemWidth = roomElemStyles.getPropertyValue("width");
        roomElemWidth = roomElemWidth.substring(0, roomElemWidth.indexOf("px"));
        var visibleElems = Math.floor(containerWidth / roomElemWidth);
        var visibleElemsWidth = roomElemWidth * visibleElems;
        var visibleElemsTotalMargin = containerWidth - visibleElemsWidth;
        margin = visibleElems != 1 ? Math.ceil(visibleElemsTotalMargin / (visibleElems - 1)) : visibleElemsTotalMargin;
        visibleElems != 1 ? wrapper.style.paddingLeft = 0 : wrapper.style.paddingLeft = margin / 2 + "px"
        var box = document.getElementsByClassName("rooms_overview")[0];
        box.style.width = (margin + +roomElemWidth) * 6 - margin + "px";
        console.log(visibleElemsTotalMargin)
    };

    // adaptiveSliderSetting();
    // window.addEventListener("resize", adaptiveSliderSetting);


    document.getElementById("menu_button").addEventListener("click", toogleMenu);

    function toogleMenu() {
        var ul = document.getElementById("main_navigation");
        if (ul.style.display == "none") {
            ul.style.display = "block";
        } else {
            ul.style.display = "none";
        };
    };

};
