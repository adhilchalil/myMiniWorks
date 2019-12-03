window.onload = function() {
    posx = 0;
    posy = 0;
    unitx = -2;
    unity = -4;
    var ball = document.getElementsByClassName("ball");
    var container = document.getElementsByClassName("container");
    var ht=window.innerHeight;
    var wt=window.innerWidth;
    container[0].style.height = ht-50;
    container[0].style.width = wt-50;
    var t = setInterval(move, 10);
    ball[0].style.height=ht/20;
    ball[0].style.width=ht/20;
    function move()
    {
        if( posx >= wt-(ht/20)-54 || posx <= 0) {
            unitx *= -1;
        }
        if (posy >= ht-(ht/20)-54 || posy <= 0) {
            unity *= -1;
        }
        posx += unitx;
        posy += unity;
        ball[0].style.left = posx;
        ball[0].style.bottom = posy;          
    }
}