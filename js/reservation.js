window.addEventListener("load", init, false);

//method to get date in "yyyy-mm-dd" format
Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear();
    var mm = this.getMonth() < 9 ? "-0" + (this.getMonth() + 1) : "-" + (this.getMonth() + 1);
    var dd  = this.getDate() < 10 ? "-0" + this.getDate() : "-" + this.getDate();
    return yyyy + mm + dd;
};






function init() {
    setTimeout(scroll, 1000);

    function scroll() {
        var url = window.location.href;
        var index = url.indexOf("#")
        if (index > 0) {
            url = url.substring(0, index);
        };
        window.location.replace(url + "#reservation-block");
    }
};