var t = 9;
var x = 0;
var char =" ";
var pc = "X";
var player = "O";
var p = document.getElementsByClassName("p");
var DATA = new Array(3);
var data = new Array(3);
var n=0;
var l=0;
var k=0;
var m=0;
var a=0;
var b=0;
var value=0;
function checkwin(XorO) {
    n=0;
    l=0;
    for( let i=0; i<3 ; i++ ){
        k=0;
        m=0;
        if (DATA[i][i]==XorO) {
            n=n+1;
        }
        if (DATA[i][2-i]==XorO) {
            l=l+1;
        }
        for( let j=0 ; j<3 ; j++ ){
            if (DATA[i][j]==XorO)
                k=k+1;
            if (DATA[j][i]==XorO)
                m=m+1;
        }
        if (k==3 || m==3 || n==3 || l==3){
            return XorO;
        }
    }
    return " ";
}
/*func for selecting corner as pc's move by receiving a random no. "a"*/
function cornerassign(z){
    XandY=[[0,0],[0,2],[2,0],[2,2]];
    for( let i=0 ; i<4 ; i++){
        if (DATA[XandY[z][0]][XandY[z][1]]==" "){
            DATA[XandY[z][0]][XandY[z][1]]=pc;
            return;
        }
        else {
            z=(z+1)%4;
        }
    }
    /*if no corner is available check for any free slots*/
    for( let i=0 ; i<3 ; i++ ){
        for( let j=0; j<3 ; j++){
            if (DATA[i][j]==" "){
                DATA[i][j]=pc;
                return;
            }
        }
    }
}
function pcmove(){
    /*check for pc win move*/
    for( let i=0; i<3; i++){
        for( let j=0; j<3; j++) {
            if (DATA[i][j] == " ") {
                DATA[i][j] = pc;
                if (pc == checkwin(pc)){
                    return;
                }
                else {
                    DATA[i][j]=" ";
                }
            }
        }
    }   
    /*check for player win move*/
    for( let i=0; i<3; i++){
        for( let j=0; j<3; j++){
            if (DATA[i][j]==" "){
                DATA[i][j] = player;
                if (player == checkwin(player)){
                    DATA[i][j]=pc;
                    return;
                }
                else {
                    DATA[i][j] = " ";
                }
            }
        }
    }
    /*loop to look for 2 step wins*/
    for( let i=0; i<3; i++){
        for( let j=0; j<3; j++){
            g=0;
            if (DATA[i][j]==" "){
                DATA[i][j]=pc;
                for( let q=0; q<3; q++ ){
                    for(let w=0; w<3; w++){
                        if (DATA[q][w]==" "){
                            DATA[q][w]=pc;
                            if (pc == checkwin(pc)){
                                g+=1;
                            }
                            DATA[q][w]=" ";
                            if (g>=2){
                                return;
                            }
                        }
                    }
                }
                DATA[i][j]=" ";
            }
        }
    }
    if (DATA[1][1] == " "){
        DATA[1][1] = pc;
        return;
    }
    value=0;
    data=[...DATA];
    for( let i=0; i<3; i++){
        for( let j=0; j<3; j++){
            g=0;
            if (DATA[i][j]==" "){
                DATA[i][j]=player;
                for( let q=0; q<3; q++ ){
                    for(let w=0; w<3; w++){
                        if (DATA[q][w]==" "){
                            DATA[q][w]=player;
                            if (player == checkwin(player)){
                                g+=1;
                            }
                            DATA[q][w]=" ";
                            if (g>=2){
                                g=0;
                                value++;
                                a=i;
                                b=j;
                            }
                        }
                    }
                }
                DATA[i][j]=" ";
            }
        }
    }
    if (value == 1) {
        DATA[a][b]=pc;
        return;
    }
    else {
        DATA=[...data];
    }
    /*if no winning cases observed try centre slot*/
    if(DATA[1][1] == "O"){
        z = Math.ceil(3*Math.random());
        sideassign(z);
        return;
    }
    else
    {
    /*if centre unavailable random free corner is selected*/
    z = Math.ceil(3*Math.random());
    cornerassign(z);
    return;
    }
}
function sideassign(z){
    XandY=[[0,1],[1,0],[2,1],[1,2]];
    for( let i=0 ; i<4 ; i++){
        if (DATA[XandY[z][0]][XandY[z][1]]==" "){
            DATA[XandY[z][0]][XandY[z][1]]=pc;
            return;
        }
        else{
            z=(z+1)%4;
        }
    }
    return;
}
function starter(){
    DATA = [[" "," "," "],[" "," "," "],[" "," "," "]];
    gameboard();
    for(let i=0 ; i<9 ; i++){
        p[i].addEventListener("click",function(){
            playermove(i);
            this.removeEventListener("click",arguments.callee);
        });
    }
    while(x==0) {
        player = prompt("Select your coin : ","X")
        if (player == "X" || player == "O"){
            alert(`You have selected: ${player}`);
            x=1;
        }
        else {
            alert("Input not recognised!!");
            continue;
        }
        if (player == "X") {
            pc = "O";
        }
        else {
            pc= "X";
        }
        /*this "if" decides who goes first*/
        if (pc == "X"){
            pcmove();
            t--;
            gameboard();
        }
    }
}
function gameboard(){
    for( let i=0; i<9 ; i++){
        n = i%3;
        m = (i-i%3)/3;
        p[i].innerHTML = DATA[m][n];
    }
}
/*func for player move execution*/
function playermove(a){
    n = a%3;
    m = (a-a%3)/3;
    if (DATA[m][n] != " ") {
    }
    else{
        DATA[m][n] = player;
        t--;
        gameboard();
        if (player == checkwin(player)){
            setTimeout(function(){alert(`Player (${player}) wins!`);},10);
            t=0;
        }
        if(t != 0){
            pcmove();
            t--;
            gameboard();
        }
        if (pc == checkwin(pc)) {
            setTimeout(function(){alert(`PC (${pc}) wins!`);},10);
            t=0;
        }
    }
    gameboard();
    /*Ask the player if he would like to try again*/
    setTimeout(function(){
        while(t==0){
            char = prompt("\n Would you like to play again(Y/N):","Y");
            if (char=="Y") {
                x = 0;
                t = 9;
                starter();
            }
            else if (char=="N"){
                t = 1;
            }
            else {
                alert("Invalid input!!");
            }
        }
    },1000);
}
window.onload = function() {
    starter();
}