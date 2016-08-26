/*global $, jQuery, alert*/

var tid = 500;
var tidBig = 300;
var skift = 0;
var count = 0;
var insertPic = 0;
var bigFlash = 10;
var j = 0;
var animating = 0;
var flashes = 6;
var c;
var ctx;
var thickness = 0;
var once = 0;
var fades = 10;
var mergeAndSplit = 18;
var fillSpeed = 5;

function main() {
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    ctx.fillStyle = "#000";
    console.log("c");
    //doIt();
    //yadaBig();
    //background();
    //bg(3, 500);
    //lines135merge();
    //lines45split();
    //lines135fill();
    //linetest();
    //lines45();
    //wavesVert();
    //yadaFade();
    //lines135drain();
    lines45fall();
}

function clearCanvas() {
    ctx.clearRect(0, 0, c.width, c.height);
}

function bg(iterations, timeBetween) {
    var totalTime = timeBetween * 22; //husk at ændre her
    for (i = 0; i < iterations; i++) {
        //ms2(linesHori, timeBetween * 0 + (i * totalTime));  //0 + 0, 0 + 1800
        //ms2(linesVert, timeBetween * 1 + (i * totalTime));  //300 + 0, 300 + 1800 = 2100
        //ms2(linesHori, timeBetween * 2 + (i * totalTime));
        //ms2(linesVert, timeBetween * 3 + (i * totalTime));
        ms2(lines45, timeBetween * 0 + (i * totalTime));
        ms2(lines135, timeBetween * 1 + (i * totalTime)); 
        ms2(lines45, timeBetween * 2 + (i * totalTime));
        ms2(lines135, timeBetween * 3 + (i * totalTime));
        ms2(lines135fill, timeBetween * 4 + (i * totalTime));  //Giver fill tripple tid ved næste, da det er en lang animation. Husk at totaltime så skal have +1 ift. antallet af animationer.
        ms2(yadaWhiteBlink, timeBetween * 6 + (i * totalTime)); //blink tager også lang tid, så den skal også have mere tid. Fed effekt fåes dog også ved at lade den fortsætte ind i de andre.
        ms2(lines45split, timeBetween * 11 + (i * totalTime)); 
        ms2(lines135, timeBetween * 13 + (i * totalTime));
        ms2(lines45, timeBetween * 14 + (i * totalTime));
        ms2(lines45drain, timeBetween * 15 + (i * totalTime));
        ms2(yadaFade, timeBetween * 16 + (i * totalTime));
        ms2(yadaFade, timeBetween * 19 + (i * totalTime));
        //ms2(wavesHori, timeBetween * 7 + (i * totalTime));
        //ms2(wavesVert, timeBetween * 8 + (i * totalTime));
        
    }
    //ms2(lines45merge, timeBetween * 4 + (1 * totalTime));
}

function ms2(animation, delay) {
    setTimeout(function(){
        $("#myCanvas").css("visibility", "visible");
        ctx.clearRect(0, 0, c.width, c.height);
        animation();
    }, delay);
}

function yadaFade() {
    if (j > 10) {
        j = 0;
        return;
    }
    $("#imgCont").append('<img class="yadaFade fade_' + j + '" src="images/yada_black_small2.png">');//.delay(50).fadeOut(400 + (j * 100), "swing");
    $(".fade_" + j).fadeOut(600, "swing");
    $(".fade_" + j).css({top: Math.random() * 79 + '%', left: Math.random() * 79 + '%'});
    j++;
    setTimeout(yadaFade, 25);
}

//hvis funktionen stadig er igang mens næste funktion bliver kaldt i bg(), bugger den, og overlapper ind i de næste. Dette styres ved tidBig og antal 'flashes'
function yadaWhiteBlink() {
    $("#myCanvas").css("visibility", "hidden");
    if (j === flashes) {
        return;
    }
    if (skift === 0) {
        $("#yadaTight").css("display", "block");
        tidBig = 350;
        skift = 1;
    } else {
        $("#yadaTight").css("display", "none");
        tidBig = 350;
        skift = 0;
    }
    setTimeout(yadaWhiteBlink, tidBig);
    j++;
}

function wavesVert() {
    for (i = 0; i < 15; i++){
        ctx.beginPath();
        ctx.moveTo(-30 + (i * 60), -60);
        for (j = 0; j < 9; j++) {
            ctx.lineTo(0 + (i * 60), -30 + (j * 60));
            ctx.lineTo(-30 + (i * 60), 0 + (j * 60));
        }
        ctx.lineWidth = 20;
        ctx.stroke();
    }
}

function wavesHori() {
    for (i = 0; i < 9; i++){
        ctx.beginPath();
        ctx.moveTo(-30, -30 + (i * 60));
        for (j = 0; j < 14; j++) {
            ctx.lineTo(0 + (j * 60), 0 + (i * 60));
            ctx.lineTo(30 + (j * 60), -30 + (i * 60));
        }
        ctx.lineWidth = 20;
        ctx.stroke();
    }
}

function linesHori() {
    for (i = 0; i < 15; i++){
        ctx.fillRect(0, (i*40), 800, 20);
    }
}

function linesVert() {
    for (i = 0; i < 50; i++){
        ctx.fillRect((i * 40), 0, 20, 450);
    }
}

function lines45() {
    for (i = 0; i < 25; i++){
        ctx.beginPath();
        ctx.moveTo(-470 + (i * 60), -20);
        ctx.lineTo(20 + (i * 60), 470);
        ctx.lineWidth = 20;
        ctx.stroke();
    }
}

function lines135() {
    for (i = 0; i < 25; i++){
        ctx.beginPath();
        ctx.moveTo(-470 + (i * 60), 470);
        ctx.lineTo(20 + (i * 60), -20);
        ctx.lineWidth = 20;
        ctx.stroke();
    }
}

function lines45merge() {
    if (j > 25) {
        j = 0;
        return;
    }
    thickness = 20 + j;
    for (i = 0; i < 25; i++){
        ctx.beginPath();
        ctx.moveTo(-470 + (i * 60), -20);
        ctx.lineTo(20 + (i * 60), 470);
        ctx.lineWidth = thickness;
        ctx.stroke();        
    }
    setTimeout(lines45merge, mergeAndSplit);
    j++;
}

function lines135merge() {
    if (j > 25) {
        j = 0;
        return;
    }
    thickness = 20 + j;
    for (i = 0; i < 25; i++){
        ctx.beginPath();
        ctx.moveTo(-470 + (i * 60), 470);
        ctx.lineTo(20 + (i * 60), -20);
        ctx.lineWidth = thickness;
        ctx.stroke();        
    }
    setTimeout(lines135merge, mergeAndSplit);
    j++;
}

function lines45split() {
    if (j > 25) {
        j = 0;
        return;
    }
    thickness = (45 - j);
    ctx.clearRect(0, 0, c.width, c.height);
    for (i = 0; i < 25; i++){
        ctx.beginPath();
        ctx.moveTo(-470 + (i * 60), -20);
        ctx.lineTo(20 + (i * 60), 470)
        ctx.lineWidth = thickness;
        ctx.stroke();        
    }
    setTimeout(lines45split, mergeAndSplit); 
    j++;
}

function lines135split() {
    if (j > 25) {
        j = 0;
        return;
    }
    thickness = (45 - j);
    ctx.clearRect(0, 0, c.width, c.height);
    for (i = 0; i < 25; i++){
        ctx.beginPath();
        ctx.moveTo(-470 + (i * 60), 470);
        ctx.lineTo(20 + (i * 60), -20);
        ctx.lineWidth = thickness;
        ctx.stroke();        
    }
    setTimeout(lines135split, mergeAndSplit); 
    j++;
}

function lines45fill() {
    if (once !== 1) {
        for (i = 0; i < 25; i++){
            ctx.beginPath();
            ctx.moveTo(-470 + (i * 60), -20);
            ctx.lineTo(20 + (i * 60), 470);
            ctx.lineWidth = 20;
            ctx.stroke();
        }
        once = 1;
    }
    if (j > 70) {
        j = 0;
        once = 0;
        return;
    }
    for (i = 0; i < 25; i++){
            ctx.beginPath();
            ctx.moveTo(-440 + (i * 120), -20);
            ctx.lineTo(-440 + (i * 120) + (j * 7), -20 + (j * 7));
            ctx.lineWidth = 23;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(-10 + (i * 120), 470);
            ctx.lineTo(-10 + (i * 120) - (j * 7), 470 - (j * 7));
            ctx.lineWidth = 23;
            ctx.stroke();
        }
    setTimeout(lines45fill, fillSpeed);
    j++;
}

function lines135fill() {
    if (once !== 1) {
        for (i = 0; i < 25; i++){
            ctx.beginPath();
            ctx.moveTo(-470 + (i * 60), 470);
            ctx.lineTo(20 + (i * 60), -20);
            ctx.lineWidth = 20;
            ctx.stroke();
        }
        once = 1;
    }
    if (j > 70) {
        j = 0;
        once = 0;
        return;
    }
    for (i = 0; i < 25; i++){
            ctx.beginPath();
            ctx.moveTo(-440 + (i * 120), 470);
            ctx.lineTo(-440 + (i * 120) + (j * 7), 470 - (j * 7));
            ctx.lineWidth = 23;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(1310 - (i * 120), -20);
            ctx.lineTo(1310 - (i * 120) - (j * 7), -20 + (j * 7));
            ctx.lineWidth = 23;
            ctx.stroke();
        }
    setTimeout(lines135fill, fillSpeed);
    j++;
}

function lines45drain() {
    if (once !== 1) {
        for (i = 0; i < 25; i++){
            ctx.beginPath();
            ctx.moveTo(-470 + (i * 60), -20);
            ctx.lineTo(20 + (i * 60), 470);
            ctx.lineWidth = 20;
            ctx.stroke();
        }
        once = 1;
    }
    if (j > 70) {
        j = 0;
        once = 0;
        ctx.strokeStyle = "#000";
        return;
    }
    for (i = 0; i < 25; i++){
        ctx.beginPath();
        ctx.moveTo(-470 + (i * 120), -20);
        ctx.lineTo(-470 + (i * 120) + (j * 7), -20 + (j * 7));
        ctx.lineWidth = 23;
        ctx.strokeStyle = "#fff";
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-40 + (i * 120), 470);
        ctx.lineTo(-40 + (i * 120) - (j * 7), 470 - (j * 7));
        ctx.lineWidth = 23;
        ctx.strokeStyle = "#fff";
        ctx.stroke();
        }
    setTimeout(lines45drain, fillSpeed);
    j++;
}

function lines135drain() {
    if (once !== 1) {
        for (i = 0; i < 25; i++){
            ctx.beginPath();
            ctx.moveTo(-470 + (i * 60), 470);
            ctx.lineTo(20 + (i * 60), -20);
            ctx.lineWidth = 20;
            ctx.stroke();
        }
        once = 1;
    }
    if (j > 70) {
        j = 0;
        once = 0;
        ctx.strokeStyle = "#000";
        return;
    }
    for (i = 0; i < 25; i++){
        ctx.beginPath();
        ctx.moveTo(-470 + (i * 120), 470);
        ctx.lineTo(-470 + (i * 120) + (j * 7), 470 - (j * 7));
        ctx.lineWidth = 23;
        ctx.strokeStyle = "#fff";
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(1280 - (i * 120), -20);
        ctx.lineTo(1280 - (i * 120) - (j * 7), -20 + (j * 7));
        ctx.lineWidth = 23;
        ctx.stroke();
        }
    setTimeout(lines135drain, fillSpeed);
    j++;
}

function lines45fall() {
    if (j > 70) {
        j = 0;
        return;
    }
    for (i = 0; i < 25; i++){
        ctx.beginPath();
        ctx.moveTo(-470 + (i * 60), -20);
        ctx.lineTo(-470 + (i * 60) + (j * 7), -20 + (j * 7));
        ctx.lineWidth = 20;
        ctx.stroke();
    }
    setTimeout(lines45fall, 25);
    j++;
}

/* ------------------------------------------------------- Old shit ------------------------------------------------------------- */

function background() {
    ms(stripes45, 0);
    ms(stripes135, 300);
    ms(stripes45, 600); 
    ms(stripes135, 900);
    ms(zigzag45, 1200);
    ms(zigzag135, 1500);
    ms(zigzag45, 1800);
    ms(zigzag135, 2100);
    ms(zigzagVert, 2400);
    ms(zigzagHori, 2700);
    ms(zigzagVert, 3000);
    ms(zigzagHori, 3300);

}

function ms(bgImage, time) {
    setTimeout(function(){
        $("#myCanvas").css("visibility", "hidden");
        bgImage();
        animating = 0;
    }, time);
}

function yadaBig() {
    animating = 1;
    if (j > flashes) {
        animating = 0;
        //background();
        return;
    }
    if (skift === 0) {
        $("#yadaTight").css("display", "none");
        tidBig = 150;
        skift = 1;
    } else {
        $("#yadaTight").css("display", "block");
        tidBig = 250;
        skift = 0;
    }
    setTimeout(yadaBig, tidBig);
    j++;
}

function show(logo) {
    switch (logo) {
    case "white":
        $("#yadaWhite").css("display", "block");
        $("#yadaBlack").css("display", "none");
        break;
    case "black":
        $("#yadaWhite").css("display", "none");
        $("#yadaBlack").css("display", "block");
        break;
    default:
        break;
    }
}

function doIt() {
    console.log("d");
    if (skift === 0) {
        show("black");
        console.log("b");
        skift = 1;
    } else {
        show("white");
        console.log("a");
        skift = 0;
    }
    setTimeout(doIt, tid);
}

function smalls(antal) {
    insertPic = antal;
    if (count === 20) {
        count = 0;
        smallsDel();
        return;
    }
    console.log("a");
    count++;
    $("#imgCont").append('<img class="yadaSmall" src="images/yada_white_small.png">');
    setTimeout(smalls, 50); 
}

function smallsDel() {
    if (count === 5) {
        return;
    }
    count++;
    $('#imgCont img:last-child').remove();
    setTimeout(smallsDel, 50);
}
