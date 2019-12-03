window.onload = function() {
    posx = 1;
    posy = 1;
    vx = 3;
    vy = 10;
    vinitial=10;
    timer=0;
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
        timer = timer + 0.01;
        vy = vy - 0.1;
        if( posx >= wt-(ht/20)-54 || posx <= 0) {
            vx *= -1;
        }
        if (posy >= ht-(ht/20)-54 || posy <= 0) {
            vy = vinitial*0.9 ;
            vinitial = vy;
        }
        posx += vx;
        posy += vy;
        if(posy <= 0){
            posy = 0;
        }
        ball[0].style.left = posx;
        ball[0].style.bottom = posy;          
    }
}
/*uses css from PG3*/