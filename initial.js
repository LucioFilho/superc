const svgNS = "http://www.w3.org/2000/svg";

//take initial pieces position
const initialNotation = "8c48O8C"; //compact code to initial position on board

//temporary code to develop
//const initialNotation = "5cr2cC3Ob3OpON2Or2OR5On4OQ4On3OPBqbObrq3Or8C"; //compact code to initial position on board

const readInitialNotation = initialNotation.split(""); //split the compacted code to work with its letters and numbers
var initialPiecesPosition = ""; //here we insert decoded code

//decipher code
var r = 0;
while (r < readInitialNotation.length) {
    let n = 0;
    let l = 0;
    let c = 0;
    let p = 0;
    if (isNaN(readInitialNotation[r])) {
        n = 1;
        initialPiecesPosition = initialPiecesPosition.concat(readInitialNotation[r]);
    } else if (isNaN(readInitialNotation[r + 1])) {
        l = readInitialNotation[r + 1];
        n = l.repeat(readInitialNotation[r]);
        initialPiecesPosition = initialPiecesPosition.concat(n);
        r++;
    } else {
        l = readInitialNotation[r];
        n = l.concat(readInitialNotation[r + 1]);
        c = readInitialNotation[r + 2];
        p = c.repeat(n);
        initialPiecesPosition = initialPiecesPosition.concat(p);
        r++;
        r++;
    }
    r++;
}

//piecesPosition keep open code to manage moves
var piecesPosition = initialPiecesPosition.split(""); //get deciphered code to work with letters and numbers

//ghost array to test last castle move in check
var ghostPiecesPosition = [];

//compact code to send it
var turnNotation = [];
var move = 0;

function shortCode() {
    let r = 0;
    let shortIt = "";
    let turnPush = "";
    let evenOdd;
    while (r < 64) {
        let c = 1;
        if (piecesPosition[r] === piecesPosition[r + c]) {
            while (piecesPosition[r] === piecesPosition[r + c]) {
                c++;
            }
            shortIt = c + piecesPosition[r];
        } else {
            shortIt = piecesPosition[r];
        }
        r += c;
        turnPush += shortIt;
    }
    turnNotation.push(turnPush);
    evenOdd = move % 2 === 0 ? "b" : "w";
    console.log(evenOdd + " " + turnNotation[move]);
    move++;
}

shortCode();

//declare arrays marks to show/hide
const marksToO = [];
const marksToP = [97, 98, 99];
const marksTop = [127, 128, 129];

const marksToC = [83, 97, 98, 99];
const marksToc = [127, 128, 129, 143];
const marksToX = [97, 98, 99, 112, 114, 127, 128, 129];

const marksToB = [1, 15, 17, 29, 33, 43, 49, 57, 65, 71, 81, 85, 97, 99, 127, 129, 141, 145, 155, 161, 169, 177, 183, 193, 197, 209, 211, 225];
const marksTob = [1, 15, 17, 29, 33, 43, 49, 57, 65, 71, 81, 85, 97, 99, 127, 129, 141, 145, 155, 161, 169, 177, 183, 193, 197, 209, 211, 225];

const marksToBishopNW = [97, 81, 65, 49, 33, 17, 1];
const marksToBishopNE = [99, 85, 71, 57, 43, 29, 15];
const marksToBishopSW = [127, 141, 155, 169, 183, 197, 211];
const marksToBishopSE = [129, 145, 161, 177, 193, 209, 225];

const marksToRookN = [8, 23, 38, 53, 68, 83, 98];
const marksToRookW = [106, 107, 108, 109, 110, 111, 112];
const marksToRookE = [114, 115, 116, 117, 118, 119, 120];
const marksToRookS = [128, 143, 158, 173, 188, 203, 218];

const marksToQ = [1, 8, 15, 17, 23, 29, 33, 38, 43, 49, 53, 57, 65, 68, 71, 81, 83, 85, 97, 98, 99, 106, 107, 108, 109, 110, 111, 112, 114, 115, 116, 117, 118, 119, 120, 127, 128, 129, 141, 143, 145, 155, 158, 161, 169, 173, 177, 183, 188, 193, 197, 203, 209, 211, 218, 225];
const marksToq = [1, 8, 15, 17, 23, 29, 33, 38, 43, 49, 53, 57, 65, 68, 71, 81, 83, 85, 97, 98, 99, 106, 107, 108, 109, 110, 111, 112, 114, 115, 116, 117, 118, 119, 120, 127, 128, 129, 141, 143, 145, 155, 158, 161, 169, 173, 177, 183, 188, 193, 197, 203, 209, 211, 218, 225];

const marksToN = [82, 84, 96, 100, 126, 130, 142, 144];
const marksTon = [82, 84, 96, 100, 126, 130, 142, 144];

const marksToR = [8, 23, 38, 53, 68, 83, 98, 128, 143, 158, 173, 188, 203, 218, 106, 107, 108, 109, 110, 111, 112, 114, 115, 116, 117, 118, 119, 120];
const marksTor = [8, 23, 38, 53, 68, 83, 98, 128, 143, 158, 173, 188, 203, 218, 106, 107, 108, 109, 110, 111, 112, 114, 115, 116, 117, 118, 119, 120];


//control pieces position by id

var extPiecesPosition = [1, 2, 3, 4, 5, 6, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 57, 58, 59, 60, 61, 62, 63, 64];
var midPiecesPosition = [1, 2, 3, 4, 5, 6, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 57, 58, 59, 60, 61, 62, 63, 64];
var intPiecesPosition = [1, 2, 3, 4, 5, 6, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 57, 58, 59, 60, 61, 62, 63, 64];

//get board
const board = document.getElementById("board"); //game board where match happens

//vars to manage loops
var square_x;
var square_y;
var evenOdd;
var rowEvenOdd;
var drawCanvas;
var squareColor;
var fillStyle;
var strokeStyle;
var pieceID1;
var pieceID2;
var pieceRadius1;
var pieceRadius2;
var pieceFill1;
var pieceFill2;
var pieceStroke1;
var pieceStroke2;
var pieceStrokeWidth1;
var pieceStrokeWidth2;
var SquaresToGo;
var again;
var bSqSel;
var turn = "W";
var blackCastlesInCheck = [];
var whiteCastlesInCheck = [];
var whiteLandingsInCheck = [];
var blackLandingsInCheck = [];
var filler = "rgba(200,200,200,0.5)";
var stroker = "rgba(0,0,0,0.3)";
var selectPieceStatus = 0;
var totalWCastles = 0;
var totalBCastles = 0;
var landingsAgain = 0;
var m = 0;
var xMark = 0;
var yMark = 0;
var promoControl = 0;
var promoID = 71;
var cli = 0;
var timer = 0;
var j = 0;
var i = 0;

//board limit collisions BL
function boardLimits() {
    const shapeBoardLimits = document.createElementNS(svgNS, "rect");
    shapeBoardLimits.setAttributeNS(null, "id", "BL");
    shapeBoardLimits.setAttributeNS(null, "width", 480);
    shapeBoardLimits.setAttributeNS(null, "height", 480);
    shapeBoardLimits.setAttributeNS(null, "x", 0);
    shapeBoardLimits.setAttributeNS(null, "y", 0);
    shapeBoardLimits.setAttributeNS(null, "fill", "transparent");
    shapeBoardLimits.setAttributeNS(null, "stroke-width", 1);
    board.appendChild(shapeBoardLimits);
}

boardLimits();

//draw board squares
function drawSquares() {
    let actualSquareColor;
    if (squareColor === "white") {
        actualSquareColor = "rgba(210,225,195,1.0)";
    } else {
        actualSquareColor = "rgba(102,153,51,1.0)";
    }
    const shape1 = document.createElementNS(svgNS, "rect");
    shape1.setAttributeNS(null, "id", drawCanvas);
    shape1.setAttributeNS(null, "width", 60);
    shape1.setAttributeNS(null, "height", 60);
    shape1.setAttributeNS(null, "x", square_x);
    shape1.setAttributeNS(null, "y", square_y);
    shape1.setAttributeNS(null, "fill", actualSquareColor);
    shape1.setAttributeNS(null, "stroke-width", 0);
    shape1.setAttributeNS(null, "shape-rendering", "geometricPrecision");
    board.appendChild(shape1);
}

function drawMarkMoves() {

    const shapeMoves1 = document.createElementNS(svgNS, "rect");
    shapeMoves1.setAttributeNS(null, "id", "mMove1");
    shapeMoves1.setAttributeNS(null, "width", 60);
    shapeMoves1.setAttributeNS(null, "height", 60);
    shapeMoves1.setAttributeNS(null, "x", 600);
    shapeMoves1.setAttributeNS(null, "y", 600);
    shapeMoves1.setAttributeNS(null, "fill", "rgba(255,200,0,0.8)");
    shapeMoves1.setAttributeNS(null, "stroke-width", 0);
    shapeMoves1.setAttributeNS(null, "shape-rendering", "geometricPrecision");
    board.appendChild(shapeMoves1);

    const shapeMoves2 = document.createElementNS(svgNS, "rect");
    shapeMoves2.setAttributeNS(null, "id", "mMove2");
    shapeMoves2.setAttributeNS(null, "width", 60);
    shapeMoves2.setAttributeNS(null, "height", 60);
    shapeMoves2.setAttributeNS(null, "x", 600);
    shapeMoves2.setAttributeNS(null, "y", 600);
    shapeMoves2.setAttributeNS(null, "fill", "rgba(255,200,0,0.8)");
    shapeMoves2.setAttributeNS(null, "stroke-width", 0);
    shapeMoves2.setAttributeNS(null, "shape-rendering", "geometricPrecision");
    board.appendChild(shapeMoves2);
}

//drawPieces
function drawPieces() {
    const shape2 = document.createElementNS(svgNS, "circle");
    shape2.setAttributeNS(null, "id", pieceID1);
    shape2.setAttributeNS(null, "cx", square_x + 30);
    shape2.setAttributeNS(null, "cy", square_y + 30);
    shape2.setAttributeNS(null, "r", pieceRadius1);
    shape2.setAttributeNS(null, "fill", pieceFill1);
    shape2.setAttributeNS(null, "stroke", pieceStroke1);
    shape2.setAttributeNS(null, "stroke-width", pieceStrokeWidth1);
    shape2.setAttributeNS(null, "shape-rendering", "geometricPrecision");
    board.appendChild(shape2);
    const shape3 = document.createElementNS(svgNS, "circle");
    shape3.setAttributeNS(null, "id", pieceID2);
    shape3.setAttributeNS(null, "cx", square_x + 30);
    shape3.setAttributeNS(null, "cy", square_y + 30);
    shape3.setAttributeNS(null, "r", pieceRadius2);
    shape3.setAttributeNS(null, "fill", pieceFill2);
    shape3.setAttributeNS(null, "stroke", pieceStroke2);
    shape3.setAttributeNS(null, "stroke-width", pieceStrokeWidth2);
    shape3.setAttributeNS(null, "shape-rendering", "geometricPrecision");
    board.appendChild(shape3);
}

//set attributes to draw pieces
function setPieces() {
    if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase()) {
        fillStyle = "rgba(0,0,0,1.0)";
        strokeStyle = "rgba(255,255,255,1.0)";
    } else {
        fillStyle = "rgba(255,255,255,1.0)";
        strokeStyle = "rgba(0,0,0,1.0)";
    }
    if (piecesPosition[i - 1] === "q" || piecesPosition[i - 1] === "c" || piecesPosition[i - 1] === "r" || piecesPosition[i - 1] === "Q" || piecesPosition[i - 1] === "C" || piecesPosition[i - 1] === "R") {
        pieceID1 = "intA" + i;
        pieceID2 = "intB" + i;
        pieceRadius1 = 15;
        pieceRadius2 = 14;
        pieceFill1 = strokeStyle;
        pieceFill2 = fillStyle;
        pieceStroke1 = "transparent";
        pieceStroke2 = "transparent";
        pieceStrokeWidth1 = 0;
        pieceStrokeWidth2 = 0;
        drawPieces()
    }

    if (piecesPosition[i - 1] === "q" || piecesPosition[i - 1] === "b" || piecesPosition[i - 1] === "c" || piecesPosition[i - 1] === "n" || piecesPosition[i - 1] === "Q" || piecesPosition[i - 1] === "B" || piecesPosition[i - 1] === "C" || piecesPosition[i - 1] === "N") {
        pieceID1 = "midA" + i;
        pieceID2 = "midB" + i;
        pieceRadius1 = 18;
        pieceRadius2 = 18;
        pieceFill1 = "transparent";
        pieceFill2 = "transparent";
        pieceStroke1 = strokeStyle;
        pieceStroke2 = fillStyle;
        pieceStrokeWidth1 = 8;
        pieceStrokeWidth2 = 6;
        drawPieces()
    }

    if (piecesPosition[i - 1] === "c" || piecesPosition[i - 1] === "p" || piecesPosition[i - 1] === "n" || piecesPosition[i - 1] === "C" || piecesPosition[i - 1] === "P" || piecesPosition[i - 1] === "N") {
        pieceID1 = "extA" + i;
        pieceID2 = "extB" + i;
        pieceRadius1 = 25;
        pieceRadius2 = 25;
        pieceFill1 = "transparent";
        pieceFill2 = "transparent";
        pieceStroke1 = strokeStyle;
        pieceStroke2 = fillStyle;
        pieceStrokeWidth1 = 8;
        pieceStrokeWidth2 = 6;
        drawPieces()
    }
}

function promoPieces() {
    let p = 70;
    let x = 0;
    let idType = "int";

    let pRadius1 = 15;
    let pRadius2 = 14;

    let pFill1 = "rgba(0,0,0,1.0)";
    let pFill2 = "rgba(255,255,255,1.0)";

    let pStroke1 = "transparent";
    let pStroke2 = "transparent";

    let pStrokeWidth1 = 0;
    let pStrokeWidth2 = 0;

    while (p < 86 && x < 2) {
        p++;
        const shapePromo1 = document.createElementNS(svgNS, "circle");
        shapePromo1.setAttributeNS(null, "id", idType + "A" + p);
        shapePromo1.setAttributeNS(null, "cx", 600);
        shapePromo1.setAttributeNS(null, "cy", 600);
        shapePromo1.setAttributeNS(null, "r", pRadius1);
        shapePromo1.setAttributeNS(null, "fill", pFill1);
        shapePromo1.setAttributeNS(null, "stroke", pStroke1);
        shapePromo1.setAttributeNS(null, "stroke-width", pStrokeWidth1);
        shapePromo1.setAttributeNS(null, "shape-rendering", "geometricPrecision");
        board.appendChild(shapePromo1);

        const shapePromo2 = document.createElementNS(svgNS, "circle");
        shapePromo2.setAttributeNS(null, "id", idType + "B" + p);
        shapePromo2.setAttributeNS(null, "cx", 600);
        shapePromo2.setAttributeNS(null, "cy", 600);
        shapePromo2.setAttributeNS(null, "r", pRadius2);
        shapePromo2.setAttributeNS(null, "fill", pFill2);
        shapePromo2.setAttributeNS(null, "stroke", pStroke2);
        shapePromo2.setAttributeNS(null, "stroke-width", pStrokeWidth2);
        shapePromo2.setAttributeNS(null, "shape-rendering", "geometricPrecision");
        board.appendChild(shapePromo2);

        if (p === 86) {
            idType = "mid";
            p = 70;
            x++;
        }

        if (p === 78 && idType === "int") {
            pFill1 = "rgba(255,255,255,1.0)";
            pFill2 = "rgba(0,0,0,1.0)";
        }

        if (p === 70 && idType === "mid") {
            pRadius1 = 18;
            pRadius2 = 18;

            pFill1 = "transparent";
            pFill2 = "transparent";

            pStroke1 = "rgba(0,0,0,1.0)";
            pStroke2 = "rgba(255,255,255,1.0)";

            pStrokeWidth1 = 8;
            pStrokeWidth2 = 6;
        }

        if (p === 78 && idType === "mid") {
            pRadius1 = 18;
            pRadius2 = 18;

            pFill1 = "transparent";
            pFill2 = "transparent";

            pStroke1 = "rgba(255,255,255,1.0)";
            pStroke2 = "rgba(0,0,0,1.0)";

            pStrokeWidth1 = 8;
            pStrokeWidth2 = 6;
        }
    }
}

//draw marks inside mc
function callDrawMarks() {
    //draw marks
    while (m < 225) {
        m++;
        if (m < 16) {
            xMark = (m - 1) * 60;
            yMark = 0;
        } else if (m < 31) {
            xMark = (m - 16) * 60;
            yMark = 60;
        } else if (m < 46) {
            xMark = (m - 31) * 60;
            yMark = 120;
        } else if (m < 61) {
            xMark = (m - 46) * 60;
            yMark = 180;
        } else if (m < 76) {
            xMark = (m - 61) * 60;
            yMark = 240;
        } else if (m < 91) {
            xMark = (m - 76) * 60;
            yMark = 300;
        } else if (m < 106) {
            xMark = (m - 91) * 60;
            yMark = 360;
        } else if (m < 121) {
            xMark = (m - 106) * 60;
            yMark = 420;
        } else if (m < 136) {
            xMark = (m - 121) * 60;
            yMark = 480;
        } else if (m < 151) {
            xMark = (m - 136) * 60;
            yMark = 540;
        } else if (m < 166) {
            xMark = (m - 151) * 60;
            yMark = 600;
        } else if (m < 181) {
            xMark = (m - 166) * 60;
            yMark = 660;
        } else if (m < 196) {
            xMark = (m - 181) * 60;
            yMark = 720;
        } else if (m < 211) {
            xMark = (m - 196) * 60;
            yMark = 780;
        } else if (m < 226) {
            xMark = (m - 211) * 60;
            yMark = 840;
        }
        drawMarks();
    }
}

function drawMarks() {
    const shapeMarks = document.createElementNS(svgNS, "circle");
    shapeMarks.setAttributeNS(null, "id", "Mark" + m);
    shapeMarks.setAttributeNS(null, "cx", xMark + 30);
    shapeMarks.setAttributeNS(null, "cy", yMark + 30);
    shapeMarks.setAttributeNS(null, "r", 10);
    shapeMarks.setAttributeNS(null, "fill", "rgba(100,50,50,0)");
    shapeMarks.setAttributeNS(null, "stroke", "rgba(0,0,0,0)");
    shapeMarks.setAttributeNS(null, "stroke-width", 1);
    shapeMarks.setAttributeNS(null, "shape-rendering", "geometricPrecision");
    board.appendChild(shapeMarks);

    const shapeUnderMarks = document.createElementNS(svgNS, "circle");
    shapeUnderMarks.setAttributeNS(null, "id", "underMark" + m);
    shapeUnderMarks.setAttributeNS(null, "cx", xMark + 30);
    shapeUnderMarks.setAttributeNS(null, "cy", yMark + 30);
    shapeUnderMarks.setAttributeNS(null, "r", 10);
    shapeUnderMarks.setAttributeNS(null, "fill", "rgba(0,0,0,0)");
    shapeUnderMarks.setAttributeNS(null, "stroke", "rgba(0,0,0,0)");
    shapeUnderMarks.setAttributeNS(null, "stroke-width", 1);
    shapeUnderMarks.setAttributeNS(null, "shape-rendering", "optimizeSpeed");
    board.appendChild(shapeUnderMarks);
}

//clear marks
function unClickSquare() {
    let m = 0;
    SquaresToGo = [];
    while (m < 225) {
        m++;
        document.getElementById("Mark" + m).setAttributeNS(null, "fill", "rgba(0,0,0,0.0)");
        document.getElementById("Mark" + m).setAttributeNS(null, "stroke", "rgba(0,0,0,0.0)");
        if (m < 65) {
            document.getElementById("butSquare" + m).setAttributeNS(null, "fill", "rgba(0,0,0,0.0)");
        }
    }
}

//draw buttons to click squares
function drawButtons(i) {
    const shape4 = document.createElementNS(svgNS, "rect");
    shape4.setAttributeNS(null, "id", "but" + drawCanvas);
    shape4.setAttributeNS(null, "width", 60);
    shape4.setAttributeNS(null, "height", 60);
    shape4.setAttributeNS(null, "x", square_x);
    shape4.setAttributeNS(null, "y", square_y);
    shape4.setAttributeNS(null, "fill", "transparent");
    shape4.setAttributeNS(null, "stroke-width", 0);
    board.appendChild(shape4);

    //double click
    function doubleClick() {
        selectPieceStatus = 0;
    }

    function simpleClick() { // click
        if (selectPieceStatus === 0) {
            selectPieceStatus = 1;
            bSqSel = i;
            clickSquare(i);
        } else if (bSqSel === i) { //second click on same square
            bSqSel = i;
            selectPieceStatus = 0;
            unClickSquare();
        } else if (SquaresToGo.includes(i)) { //second click on active squares to move
            selectPieceStatus = 0;
            unClickSquare();
            if ((piecesPosition[bSqSel - 1] === piecesPosition[bSqSel - 1].toUpperCase() && turn === turn.toUpperCase()) || (piecesPosition[bSqSel - 1] === piecesPosition[bSqSel - 1].toLowerCase() && turn === turn.toLowerCase())) {
                if (totalWCastles === 0) {
                    turn = "BLACK WINS";
                }
                if (totalBCastles === 0) {
                    turn = "WHITE WINS";
                }
                if (totalWCastles > 0 && totalBCastles > 0) {
                    movingPiece(i);
                }
            }
            bSqSel = i;
        } else {
            selectPieceStatus = 1;
            bSqSel = i;
            clickSquare(i);
        }
    }

    //execute actions onclick and double click
    function clicker() {
        cli++;
        clearTimeout(timer);
        timer = setTimeout(function () {
            if (cli === 1) {
                simpleClick();
                clearTimeout(timer);
            } else if (cli === 2) {
                doubleClick();
                clearTimeout(timer);
            }
            cli = 0;
        }, 200);
    }

    //clicker
    const el = document.getElementById("but" + drawCanvas);
    el.onclick = function () {
        clicker();
    }
}

//start construct objects
while (i < 64) {
    i++;
    evenOdd = i % 2;
    drawCanvas = "Square" + i;
    //row by row black and white
    if (i < 9) {
        rowEvenOdd = 1;
        square_x = (i - 1) * 60;
        square_y = 0;
    } else if (i < 17) {
        rowEvenOdd = 0;
        square_x = (i - 9) * 60;
        square_y = 60;
    } else if (i < 25) {
        rowEvenOdd = 1;
        square_x = (i - 17) * 60;
        square_y = 120;
    } else if (i < 33) {
        rowEvenOdd = 0;
        square_x = (i - 25) * 60;
        square_y = 180;
    } else if (i < 41) {
        rowEvenOdd = 1;
        square_x = (i - 33) * 60;
        square_y = 240;
    } else if (i < 49) {
        rowEvenOdd = 0;
        square_x = (i - 41) * 60;
        square_y = 300;
    } else if (i < 57) {
        rowEvenOdd = 1;
        square_x = (i - 49) * 60;
        square_y = 360;
    } else {
        rowEvenOdd = 0;
        square_x = (i - 57) * 60;
        square_y = 420;
    }
    //define sequence of colors on board squares
    if (rowEvenOdd === 0) {
        if (evenOdd === 0) {
            squareColor = "white";
        } else {
            squareColor = "black";
        }
    } else {
        if (evenOdd === 1) {
            squareColor = "white";
        } else {
            squareColor = "black";
        }
    }
    //loops to generate objects in Z axis
    if (j === 0) {
        drawSquares();
    } else if (j === 1) {
        drawMarkMoves();
        i = 64;
    } else if (j === 2) {
        setPieces();
    } else if (j === 3) {
        promoPieces();
        i = 64;
    } else if (j === 4) {
        callDrawMarks();
        i = 64;
    } else if (j === 5) {
        drawButtons(i);
    } else {
        i = 65;
    }
    //stop it
    if (i === 64) {
        i = 0;
        j++;
    }
}

//set Colors
function fillerStroker(c) {
    switch (c) {
        case "turnover":
            filler = "rgba(0,200,200,0.5)";
            stroker = "rgba(0,0,0,0.3)";
            break;
        case "empty":
            filler = "rgba(200,200,200,0.5)";
            stroker = "rgba(0,0,0,0.3)";
            break;
        case "take":
            filler = "rgba(255,50,50,0.5)";
            stroker = "rgba(255,50,50,0.5)";
            break;
        case "mate":
            filler = "rgba(255,0,0,0.9)";
            stroker = "rgba(100,0,0,0.9)";
            break;
        case "disable":
            filler = "rgba(0,0,0,0.0)";
            stroker = "rgba(0,0,0,0.0)";
            break;
        case "colorError":
            filler = "rgba(143,19,233,0.7)";
            stroker = "rgba(0,0,0,0.3)";
            break;
        case "square":
            filler = "rgba(0,255,100,0.5)";
            stroker = "rgba(0,0,0,0.0)";
            break;
        case "white":
            fillColor = "rgba(255,255,255,1.0)";
            strokeColor = "rgba(0,0,0,1.0)";
            break;
        case "black":
            fillColor = "rgba(0,0,0,1.0)";
            strokeColor = "rgba(255,255,255,1.0)";
            break;
    }
}

function countCastles(item) {
    if (item === "C") {
        totalWCastles++;
    } else if (item === "c") {
        totalBCastles++;
    }
}

piecesPosition.forEach(countCastles);

castlesInCheck(); //get first array with all castles in check