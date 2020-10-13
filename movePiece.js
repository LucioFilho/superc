//move piece
function animePiece(leaving, landing, piecesToMove) {
    let extPP = extPiecesPosition[leaving];
    let midPP = midPiecesPosition[leaving];
    let intPP = intPiecesPosition[leaving];

    switch (piecesToMove) {
        case "EMI":
            extPiecesPosition[leaving] = 0;
            midPiecesPosition[leaving] = 0;
            intPiecesPosition[leaving] = 0;
            extPiecesPosition[landing - 1] = extPP;
            midPiecesPosition[landing - 1] = midPP;
            intPiecesPosition[landing - 1] = intPP;
            break;
        case "E":
            extPiecesPosition[leaving] = 0;
            extPiecesPosition[landing - 1] = extPP;
            break;
        case "M":
            midPiecesPosition[leaving] = 0;
            midPiecesPosition[landing - 1] = midPP;
            break;
        case "I":
            intPiecesPosition[leaving] = 0;
            intPiecesPosition[landing - 1] = intPP;
            break;
        default:
            break;
    }

    let leavingX;
    let leavingY;
    let landX;
    let landY;
    let speedX;
    let speedY;
    let leavingXExt;
    let leavingXMid;
    let leavingXInt;
    let leavingYExt;
    let leavingYMid;
    let leavingYInt;

    if (piecesToMove === "EMI" || piecesToMove === "E") {
        leavingXExt = parseInt(document.getElementById("extA" + extPP).getAttributeNS(null, "cx"));
        leavingYExt = parseInt(document.getElementById("extA" + extPP).getAttributeNS(null, "cy"));
    }
    if (piecesToMove === "EMI" || piecesToMove === "M") {
        leavingXMid = parseInt(document.getElementById("midA" + midPP).getAttributeNS(null, "cx"));
        leavingYMid = parseInt(document.getElementById("midA" + midPP).getAttributeNS(null, "cy"));
    }
    if (piecesToMove === "EMI" || piecesToMove === "I") {
        leavingXInt = parseInt(document.getElementById("intA" + intPP).getAttributeNS(null, "cx"));
        leavingYInt = parseInt(document.getElementById("intA" + intPP).getAttributeNS(null, "cy"));
    }

    switch (piecesToMove) {
        case "EMI":
        case "E":
            leavingX = leavingXExt;
            leavingY = leavingYExt;
            break;
        case "M":
            leavingX = leavingXMid;
            leavingY = leavingYMid;
            break;
        case "I":
            leavingX = leavingXInt;
            leavingY = leavingYInt;
            break;
    }

    landX = parseInt(document.getElementById("Square" + landing).getAttributeNS(null, "x")) + 30;
    landY = parseInt(document.getElementById("Square" + landing).getAttributeNS(null, "y")) + 30;

    speedX = leavingX > landX ? parseInt((leavingX - landX) / 30) : speedX = leavingX < landX ? parseInt((landX - leavingX) / 30) : 0;
    speedY = leavingY > landY ? parseInt((leavingY - landY) / 30) : speedY = leavingY < landY ? parseInt((landY - leavingY) / 30) : 0;

    //markMoves
    document.getElementById("mMove1").setAttributeNS(null, "x", leavingX - 30);
    document.getElementById("mMove1").setAttributeNS(null, "y", leavingY - 30);

    let animeEMI = function () {
        let travel = setInterval(function () {

            if (leavingX > landX) {
                leavingX -= speedX;
                if (leavingX < landX) {
                    leavingX = landX;
                }
            } else if (leavingX < landX) {
                leavingX += speedX;
                if (leavingX > landX) {
                    leavingX = landX;
                }
            }
            if (piecesToMove === "EMI" || piecesToMove === "E") {
                document.getElementById("extA" + extPP).setAttributeNS(null, "cx", leavingX);
                document.getElementById("extB" + extPP).setAttributeNS(null, "cx", leavingX);
            }
            if (piecesToMove === "EMI" || piecesToMove === "M") {
                document.getElementById("midA" + midPP).setAttributeNS(null, "cx", leavingX);
                document.getElementById("midB" + midPP).setAttributeNS(null, "cx", leavingX);
            }
            if (piecesToMove === "EMI" || piecesToMove === "I") {
                document.getElementById("intA" + intPP).setAttributeNS(null, "cx", leavingX);
                document.getElementById("intB" + intPP).setAttributeNS(null, "cx", leavingX);
            }

            if (leavingY > landY) {
                leavingY -= speedY;
                if (leavingY < landY) {
                    leavingY = landY;
                }
            } else if (leavingY < landY) {
                leavingY += speedY;
                if (leavingY > landY) {
                    leavingY = landY;
                }
            }
            if (piecesToMove === "EMI" || piecesToMove === "E") {
                document.getElementById("extA" + extPP).setAttributeNS(null, "cy", leavingY);
                document.getElementById("extB" + extPP).setAttributeNS(null, "cy", leavingY);
            }
            if (piecesToMove === "EMI" || piecesToMove === "M") {
                document.getElementById("midA" + midPP).setAttributeNS(null, "cy", leavingY);
                document.getElementById("midB" + midPP).setAttributeNS(null, "cy", leavingY);
            }
            if (piecesToMove === "EMI" || piecesToMove === "I") {
                document.getElementById("intA" + intPP).setAttributeNS(null, "cy", leavingY);
                document.getElementById("intB" + intPP).setAttributeNS(null, "cy", leavingY);
            }

            if (leavingX === landX && leavingY === landY) {
                clearInterval(travel);

                //mMove delayed
                document.getElementById("mMove2").setAttributeNS(null, "x", landX - 30);
                document.getElementById("mMove2").setAttributeNS(null, "y", landY - 30);

                if (promoControl === 1) {
                    //pawn's promotion
                    if (piecesPosition[landing - 1] === piecesPosition[landing - 1].toUpperCase()) {
                        pStroke1 = "rgba(0,0,0,1.0)";
                        pStroke2 = "rgba(255,255,255,1.0)";
                    } else {
                        pStroke1 = "rgba(255,255,255,1.0)";
                        pStroke2 = "rgba(0,0,0,1.0)";
                    }

                    if (piecesToMove === "EMI" || piecesToMove === "E") {
                        document.getElementById("extA" + extPiecesPosition[landing - 1]).setAttributeNS(null, "stroke", "transparent");
                        document.getElementById("extB" + extPiecesPosition[landing - 1]).setAttributeNS(null, "stroke", "transparent");
                    }
                    if (piecesToMove === "EMI" || piecesToMove === "M") {
                        document.getElementById("midA" + extPiecesPosition[landing - 1]).setAttributeNS(null, "stroke", "transparent");
                        document.getElementById("midB" + extPiecesPosition[landing - 1]).setAttributeNS(null, "stroke", "transparent");
                    }
                    if (piecesToMove === "EMI" || piecesToMove === "I") {
                        document.getElementById("intA" + extPiecesPosition[landing - 1]).setAttributeNS(null, "fill", "transparent");
                        document.getElementById("intB" + extPiecesPosition[landing - 1]).setAttributeNS(null, "fill", "transparent");
                    }

                    extPiecesPosition[landing - 1] = 0;
                    midPiecesPosition[landing - 1] = promoID;
                    intPiecesPosition[landing - 1] = promoID;

                    document.getElementById("midA" + promoID).setAttributeNS(null, "stroke", pStroke1);
                    document.getElementById("midB" + promoID).setAttributeNS(null, "stroke", pStroke2);
                    document.getElementById("intA" + promoID).setAttributeNS(null, "fill", pStroke1);
                    document.getElementById("intB" + promoID).setAttributeNS(null, "fill", pStroke2);


                    document.getElementById("midA" + promoID).setAttributeNS(null, "cx", landX);
                    document.getElementById("midA" + promoID).setAttributeNS(null, "cy", landY);
                    document.getElementById("midB" + promoID).setAttributeNS(null, "cx", landX);
                    document.getElementById("midB" + promoID).setAttributeNS(null, "cy", landY);

                    document.getElementById("intA" + promoID).setAttributeNS(null, "cx", landX);
                    document.getElementById("intA" + promoID).setAttributeNS(null, "cy", landY);
                    document.getElementById("intB" + promoID).setAttributeNS(null, "cx", landX);
                    document.getElementById("intB" + promoID).setAttributeNS(null, "cy", landY);

                    promoID++;
                    promoControl = 0;
                }
            }
        }, 1);
    }
    animeEMI();
}

function coloringPieces(leaving, landing) {

    let fillColor = "rgba(0,0,0,0.0)";
    let strokeColor = "rgba(0,0,0,0.0)";

    function fillStroke(c) {
        switch (c) {
            case "disable":
                fillColor = "rgba(0,0,0,0.0)";
                strokeColor = "rgba(0,0,0,0.0)";
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

    function coloring(p, q) {
        let pSq;
        if (p === "ext") {
            pSq = extPiecesPosition[landing - 1];
        } else if (p === "mid") {
            pSq = midPiecesPosition[landing - 1];
        } else if (p === "int") {
            pSq = intPiecesPosition[landing - 1];
        }
        document.getElementById(p + "A" + pSq).setAttributeNS(null, q, strokeColor);
        document.getElementById(p + "B" + pSq).setAttributeNS(null, q, fillColor);
    }

    if (piecesPosition[landing - 1] === "C" || piecesPosition[landing - 1] === "c") {
        fillStroke("disable");
        coloring("ext", "stroke");
        coloring("mid", "stroke");
        coloring("int", "fill");
        extPiecesPosition[landing - 1] = 0;
        midPiecesPosition[landing - 1] = 0;
        intPiecesPosition[landing - 1] = 0;

    } else if (piecesPosition[landing - 1] === "P") {
        if (piecesPosition[leaving] === "c" || piecesPosition[leaving] === "p" || piecesPosition[leaving] === "r" || piecesPosition[leaving] === "n") {
            fillStroke("disable");
            coloring("ext", "stroke");
            extPiecesPosition[landing - 1] = 0;
        } else if (piecesPosition[leaving] === "b" || piecesPosition[leaving] === "q") {
            fillStroke("black");
            coloring("ext", "stroke");
        }

    } else if (piecesPosition[landing - 1] === "p") {
        if (piecesPosition[leaving] === "C" || piecesPosition[leaving] === "P" || piecesPosition[leaving] === "R" || piecesPosition[leaving] === "N") {
            fillStroke("disable");
            coloring("ext", "stroke");
            extPiecesPosition[landing - 1] = 0;
        } else if (piecesPosition[leaving] === "B" || piecesPosition[leaving] === "Q") {
            fillStroke("white");
            coloring("ext", "stroke");
        }

    } else if (piecesPosition[landing - 1] === "B") {
        if (piecesPosition[leaving] === "b" || piecesPosition[leaving] === "q") {
            fillStroke("disable");
            coloring("mid", "stroke");
            midPiecesPosition[landing - 1] = 0;
        } else if (piecesPosition[leaving] === "c") {
            if (blackCastlesInCheck.includes(bSqSel)) {
                fillStroke("disable");
                coloring("mid", "stroke");
                midPiecesPosition[landing - 1] = 0;
            } else {
                fillStroke("black");
                coloring("mid", "stroke");
            }
        } else if (piecesPosition[leaving] === "p" || piecesPosition[leaving] === "n" || piecesPosition[leaving] === "r") {
            fillStroke("black");
            coloring("mid", "stroke");
        }

    } else if (piecesPosition[landing - 1] === "b") {
        if (piecesPosition[leaving] === "B" || piecesPosition[leaving] === "Q") {
            fillStroke("disable");
            coloring("mid", "stroke");
            midPiecesPosition[landing - 1] = 0;
        } else if (piecesPosition[leaving] === "C") {
            if (whiteCastlesInCheck.includes(bSqSel)) {
                fillStroke("disable");
                coloring("mid", "stroke");
                midPiecesPosition[landing - 1] = 0;
            } else {
                fillStroke("white");
                coloring("mid", "stroke");
            }
        } else if (piecesPosition[leaving] === "P" || piecesPosition[leaving] === "N" || piecesPosition[leaving] === "R") {
            fillStroke("white");
            coloring("mid", "stroke");
        }

    } else if (piecesPosition[landing - 1] === "Q") {
        if (piecesPosition[leaving] === "b" || piecesPosition[leaving] === "q" || piecesPosition[leaving] === "r" || piecesPosition[leaving] === "c") {
            fillStroke("disable");
            coloring("mid", "stroke");
            coloring("int", "fill");
            midPiecesPosition[landing - 1] = 0;
            intPiecesPosition[landing - 1] = 0;
        } else if (piecesPosition[leaving] === "p" || piecesPosition[leaving] === "n") {
            fillStroke("black");
            coloring("mid", "stroke");
            coloring("int", "fill");
        }

    } else if (piecesPosition[landing - 1] === "q") {
        if (piecesPosition[leaving] === "B" || piecesPosition[leaving] === "C" || piecesPosition[leaving] === "Q" || piecesPosition[leaving] === "R") {
            fillStroke("disable");
            coloring("mid", "stroke");
            coloring("int", "fill");
            midPiecesPosition[landing - 1] = 0;
            intPiecesPosition[landing - 1] = 0;
        } else if (piecesPosition[leaving] === "P" || piecesPosition[leaving] === "N") {
            fillStroke("white");
            coloring("mid", "stroke");
            coloring("int", "fill");
        }

    } else if (piecesPosition[landing - 1] === "R") {
        if (piecesPosition[leaving] === "b" || piecesPosition[leaving] === "q") {
            fillStroke("black");
            coloring("int", "fill");
        } else if (piecesPosition[leaving] === "c" || piecesPosition[leaving] === "p" || piecesPosition[leaving] === "n" || piecesPosition[leaving] === "r") {
            fillStroke("disable");
            coloring("int", "fill");
            intPiecesPosition[landing - 1] = 0;
        }

    } else if (piecesPosition[landing - 1] === "r") {
        if (piecesPosition[leaving] === "B" || piecesPosition[leaving] === "Q") {
            fillStroke("white");
            coloring("int", "fill");
        } else if (piecesPosition[leaving] === "C" || piecesPosition[leaving] === "P" || piecesPosition[leaving] === "N" || piecesPosition[leaving] === "R") {
            fillStroke("disable");
            coloring("int", "fill");
            intPiecesPosition[landing - 1] = 0;
        }

    } else if (piecesPosition[landing - 1] === "N") {
        if (piecesPosition[leaving] === "b" || piecesPosition[leaving] === "q" || piecesPosition[leaving] === "c" || piecesPosition[leaving] === "p" || piecesPosition[leaving] === "n") {
            fillStroke("disable");
            coloring("ext", "stroke");
            coloring("mid", "stroke");
            extPiecesPosition[landing - 1] = 0;
            midPiecesPosition[landing - 1] = 0;
        } else if (piecesPosition[leaving] === "r") {
            fillStroke("black");
            coloring("ext", "stroke");
            coloring("mid", "stroke");
        }

    } else if (piecesPosition[landing - 1] === "n") {
        if (piecesPosition[leaving] === "B" || piecesPosition[leaving] === "Q" || piecesPosition[leaving] === "C" || piecesPosition[leaving] === "P" || piecesPosition[leaving] === "N") {
            fillStroke("disable");
            coloring("ext", "stroke");
            coloring("mid", "stroke");
            extPiecesPosition[landing - 1] = 0;
            midPiecesPosition[landing - 1] = 0;
        } else if (piecesPosition[leaving] === "R") {
            fillStroke("white");
            coloring("ext", "stroke");
            coloring("mid", "stroke");
        }

    }
}

function movingPiece(i) {

    turn = piecesPosition[bSqSel - 1] === piecesPosition[bSqSel - 1].toUpperCase() ? "b" : "W";

    let leaving = bSqSel - 1;
    let landing = i;
    coloringPieces(leaving, landing);
    landingsAgain = 0;
    again = 0;
    switch (piecesPosition[bSqSel - 1]) { //identify leaving piece
        case "C":
            switch (piecesPosition[i - 1]) { //identify if pieces in landing square
                case "O":
                case "c":
                case "n":
                case "r":
                    piecesPosition[bSqSel - 1] = whiteCastlesInCheck.includes(bSqSel) ? "O" : "Q";

                    if (piecesPosition[bSqSel - 1] === "O") {
                        animePiece(leaving, landing, "EMI");
                        if (i < 9 && totalWCastles > 1) {
                            piecesPosition[i - 1] = "Q";
                            promoControl = 1;
                        } else {
                            piecesPosition[i - 1] = "C";
                        }

                    } else if (piecesPosition[bSqSel - 1] === "Q") {
                        animePiece(leaving, landing, "E");

                        if (i < 9) {
                            piecesPosition[i - 1] = "Q";
                            promoControl = 1;
                        } else {
                            piecesPosition[i - 1] = "P";
                        }
                    }
                    break;
                case "p":
                    piecesPosition[bSqSel - 1] = "O";
                    animePiece(leaving, landing, "EMI");
                    piecesPosition[i - 1] = "C";
                    break;
                case "b":
                    piecesPosition[bSqSel - 1] = whiteCastlesInCheck.includes(bSqSel) ? "O" : "Q";

                    if (piecesPosition[bSqSel - 1] === "O") {
                        animePiece(leaving, landing, "EMI");
                        piecesPosition[i - 1] = "C";

                    } else if (piecesPosition[bSqSel - 1] === "Q") {
                        animePiece(leaving, landing, "E");
                        piecesPosition[i - 1] = "N";
                    }
                    break;
                case "q":
                    piecesPosition[bSqSel - 1] = "O";
                    animePiece(leaving, landing, "EMI");
                    piecesPosition[i - 1] = "C";
                    break;
                case "B":
                    piecesPosition[bSqSel - 1] = "Q";
                    animePiece(leaving, landing, "E");
                    piecesPosition[i - 1] = "N";
                    break;
                case "Q":
                    piecesPosition[bSqSel - 1] = "Q";
                    animePiece(leaving, landing, "E");
                    piecesPosition[i - 1] = "C";
                    break;
            }
            break;
        case "c":
            switch (piecesPosition[i - 1]) { //identify if pieces in landing square
                case "O":
                case "C":
                case "N":
                case "R":
                    piecesPosition[bSqSel - 1] = blackCastlesInCheck.includes(bSqSel) ? "O" : "q";

                    if (piecesPosition[bSqSel - 1] === "O") {
                        animePiece(leaving, landing, "EMI");
                        if (i > 56 && totalBCastles > 1) {
                            piecesPosition[i - 1] = "q";
                            promoControl = 1;
                        } else {
                            piecesPosition[i - 1] = "c";
                        }

                    } else if (piecesPosition[bSqSel - 1] === "q") {
                        animePiece(leaving, landing, "E");
                        if (i > 56) {
                            piecesPosition[i - 1] = "q";
                            promoControl = 1;
                        } else {
                            piecesPosition[i - 1] = "p";
                        }
                    }
                    break;
                case "P":
                    piecesPosition[bSqSel - 1] = "O";
                    animePiece(leaving, landing, "EMI");
                    piecesPosition[i - 1] = "c";
                    break;
                case "B":
                    piecesPosition[bSqSel - 1] = blackCastlesInCheck.includes(bSqSel) ? "O" : "q";

                    if (piecesPosition[bSqSel - 1] === "O") {
                        animePiece(leaving, landing, "EMI");
                        piecesPosition[i - 1] = "c";

                    } else if (piecesPosition[bSqSel - 1] === "q") {
                        animePiece(leaving, landing, "E");
                        piecesPosition[i - 1] = "n";
                    }
                    break;
                case "Q":
                    piecesPosition[bSqSel - 1] = "O";
                    animePiece(leaving, landing, "EMI");
                    piecesPosition[i - 1] = "c";
                    break;
                case "b":
                    piecesPosition[bSqSel - 1] = "q";
                    animePiece(leaving, landing, "E");
                    piecesPosition[i - 1] = "n";
                    break;
                case "q":
                    piecesPosition[bSqSel - 1] = "q";
                    animePiece(leaving, landing, "E");
                    piecesPosition[i - 1] = "c";
                    break;
            }
            break;
        case "P":
            switch (piecesPosition[i - 1]) { //identify if pieces in landing square
                case "O":
                case "c":
                case "r":
                case "n":
                case "p":
                    piecesPosition[bSqSel - 1] = "O";
                    animePiece(leaving, landing, "E");

                    if (i < 9) {
                        piecesPosition[i - 1] = "Q";
                        promoControl = 1;
                    } else {
                        if (i < 9) {
                            piecesPosition[i - 1] = "Q";
                            promoControl = 1;
                        } else {
                            piecesPosition[i - 1] = "P";
                        }
                    }

                    break;
                case "q":
                case "Q":
                    piecesPosition[bSqSel - 1] = "O";
                    animePiece(leaving, landing, "E");
                    piecesPosition[i - 1] = "C";
                    break;
                case "B":
                case "b":
                    piecesPosition[bSqSel - 1] = "O";
                    animePiece(leaving, landing, "E");
                    piecesPosition[i - 1] = "N";
                    break;
            }
            break;
        case "p":
            switch (piecesPosition[i - 1]) { //identify if pieces in landing square
                case "O":
                case "C":
                case "R":
                case "N":
                case "P":
                    piecesPosition[bSqSel - 1] = "O";
                    animePiece(leaving, landing, "E");
                    if (i > 56) {
                        piecesPosition[i - 1] = "q";
                        promoControl = 1;
                    } else {
                        piecesPosition[i - 1] = "p";
                    }
                    break;
                case "Q":
                case "q":
                    piecesPosition[bSqSel - 1] = "O";
                    animePiece(leaving, landing, "E");
                    piecesPosition[i - 1] = "c";
                    break;
                case "b":
                case "B":
                    piecesPosition[bSqSel - 1] = "O";
                    animePiece(leaving, landing, "E");
                    piecesPosition[i - 1] = "n";
                    break;
            }
            break;
        case "Q":
            switch (piecesPosition[i - 1]) { //identify if pieces in landing square
                case "O":
                case "c":
                case "b":
                case "n":
                case "q":
                    piecesPosition[bSqSel - 1] = "R";
                    animePiece(leaving, landing, "M");
                    piecesPosition[i - 1] = "B";
                    break;
                case "r":
                case "R":
                    piecesPosition[bSqSel - 1] = "R";
                    animePiece(leaving, landing, "M");
                    piecesPosition[i - 1] = "Q";
                    break;
                case "p":
                case "P":
                    piecesPosition[bSqSel - 1] = "R";
                    animePiece(leaving, landing, "M");
                    piecesPosition[i - 1] = "N";
                    break;
            }
            break;
        case "q":
            switch (piecesPosition[i - 1]) { //identify if pieces in landing square
                case "O":
                case "C":
                case "B":
                case "N":
                case "Q":
                    piecesPosition[bSqSel - 1] = "r";
                    animePiece(leaving, landing, "M");
                    piecesPosition[i - 1] = "b";
                    break;
                case "R":
                case "r":
                    piecesPosition[bSqSel - 1] = "r";
                    animePiece(leaving, landing, "M");
                    piecesPosition[i - 1] = "q";
                    break;
                case "P":
                case "p":
                    piecesPosition[bSqSel - 1] = "r";
                    animePiece(leaving, landing, "M");
                    piecesPosition[i - 1] = "n";
                    break;
            }
            break;
        case "B":
            switch (piecesPosition[i - 1]) { //identify if pieces in landing square
                case "O":
                case "c":
                case "b":
                case "n":
                case "q":
                    piecesPosition[bSqSel - 1] = "O";
                    animePiece(leaving, landing, "M");
                    piecesPosition[i - 1] = "B";
                    break;
                case "r":
                case "R":
                    piecesPosition[bSqSel - 1] = "O";
                    animePiece(leaving, landing, "M");
                    piecesPosition[i - 1] = "Q";
                    break;
                case "p":
                case "P":
                    piecesPosition[bSqSel - 1] = "O";
                    animePiece(leaving, landing, "M");
                    piecesPosition[i - 1] = "N";
                    break;
            }
            break;
        case "b":
            switch (piecesPosition[i - 1]) { //identify if pieces in landing square
                case "O":
                case "C":
                case "B":
                case "N":
                case "Q":
                    piecesPosition[bSqSel - 1] = "O";
                    animePiece(leaving, landing, "M");
                    piecesPosition[i - 1] = "b";
                    break;
                case "R":
                case "r":
                    piecesPosition[bSqSel - 1] = "O";
                    animePiece(leaving, landing, "M");
                    piecesPosition[i - 1] = "q";
                    break;
                case "P":
                case "p":
                    piecesPosition[bSqSel - 1] = "O";
                    animePiece(leaving, landing, "M");
                    piecesPosition[i - 1] = "n";
                    break;
            }
            break;
        case "R":
            switch (piecesPosition[i - 1]) { //identify if pieces in landing square
                case "O":
                case "p":
                case "c":
                case "q":
                case "r":
                    piecesPosition[bSqSel - 1] = "O";
                    animePiece(leaving, landing, "I");
                    piecesPosition[i - 1] = "R";
                    break;
                case "b":
                case "B":
                    piecesPosition[bSqSel - 1] = "O";
                    animePiece(leaving, landing, "I");
                    piecesPosition[i - 1] = "Q";
                    break;
                case "n":
                case "N":
                    piecesPosition[bSqSel - 1] = "O";
                    animePiece(leaving, landing, "I");
                    piecesPosition[i - 1] = "C";
                    break;
            }
            break;
        case "r":
            switch (piecesPosition[i - 1]) { //identify if pieces in landing square
                case "O":
                case "P":
                case "C":
                case "Q":
                case "R":
                    piecesPosition[bSqSel - 1] = "O";
                    animePiece(leaving, landing, "I");
                    piecesPosition[i - 1] = "r";
                    break;
                case "B":
                case "b":
                    piecesPosition[bSqSel - 1] = "O";
                    animePiece(leaving, landing, "I");
                    piecesPosition[i - 1] = "q";
                    break;
                case "N":
                case "n":
                    piecesPosition[bSqSel - 1] = "O";
                    animePiece(leaving, landing, "I");
                    piecesPosition[i - 1] = "c";
                    break;
            }
            break;
        case "N":
            switch (piecesPosition[i - 1]) { //identify if pieces in landing square
                case "O":
                case "p":
                case "c":
                case "r":
                case "n":
                    piecesPosition[bSqSel - 1] = "B";
                    animePiece(leaving, landing, "E");
                    if (i < 9) {
                        piecesPosition[i - 1] = "Q";
                        promoControl = 1;
                    } else {
                        piecesPosition[i - 1] = "P";
                    }
                    break;
                case "b":
                case "B":
                    piecesPosition[bSqSel - 1] = "B";
                    animePiece(leaving, landing, "E");
                    piecesPosition[i - 1] = "N";
                    break;
                case "q":
                case "Q":
                    piecesPosition[bSqSel - 1] = "B";
                    animePiece(leaving, landing, "E");
                    piecesPosition[i - 1] = "C";
                    break;
            }
            break;
        case "n":
            switch (piecesPosition[i - 1]) { //identify if pieces in landing square
                case "O":
                case "P":
                case "C":
                case "R":
                case "N":
                    piecesPosition[bSqSel - 1] = "b";
                    animePiece(leaving, landing, "E");
                    if (i > 56) {
                        piecesPosition[i - 1] = "q";
                        promoControl = 1;
                    } else {
                        piecesPosition[i - 1] = "p";
                    }
                    break;
                case "B":
                case "b":
                    piecesPosition[bSqSel - 1] = "b";
                    animePiece(leaving, landing, "E");
                    piecesPosition[i - 1] = "n";
                    break;
                case "Q":
                case "q":
                    piecesPosition[bSqSel - 1] = "b";
                    animePiece(leaving, landing, "E");
                    piecesPosition[i - 1] = "c";
                    break;
            }
            break;
    }
    castlesInCheck(); //get array with all castles in check
    totalWCastles = 0;
    totalBCastles = 0;
    piecesPosition.forEach(countCastles); //count how many castles on board
    shortCode();
}