function castlesInCheck() {
    whiteCastlesInCheck = [];
    blackCastlesInCheck = [];


    function blackC(n) {
        if (blackCastlesInCheck.includes(n) === false) {
            blackCastlesInCheck.push(parseInt(n));
            blackCastlesInCheck.sort();
        }
    }
  
    function whiteC(n) {
        if (whiteCastlesInCheck.includes(n) === false) {
            whiteCastlesInCheck.push(parseInt(n));
            whiteCastlesInCheck.sort();
        }
    }

    let tripleCheck = 0;
    let i = 0;
    while (i < 64) {
        i++;
        let marksOnBoardToRookN = [];
        let marksOnBoardToRookE = [];
        let marksOnBoardToRookW = [];
        let marksOnBoardToRookS = [];
        let marksOnBoardToBishopNW = [];
        let marksOnBoardToBishopNE = [];
        let marksOnBoardToBishopSW = [];
        let marksOnBoardToBishopSE = [];
        let undercx113;
        let undercy113;
        let xButSq;
        let yButSq;
        let underxMove;
        let underyMove;
        let marksToType = [];
        let marksOnBoard = [];

        //marks positioning
        undercx113 = document.getElementById("underMark113").getAttribute("cx");
        undercy113 = document.getElementById("underMark113").getAttribute("cy");
        xButSq = document.getElementById("butSquare" + i).getAttribute("x");
        yButSq = document.getElementById("butSquare" + i).getAttribute("y");

        //Marks positioner
        function underxyMover(moverVal) {
            let m = 0;
            while (m < 225) {
                m++;
                if (moverVal === "xNegative") {
                    let actualX = parseInt(document.getElementById("underMark" + m).getAttribute("cx")) - underxMove;
                    document.getElementById("underMark" + m).setAttributeNS(null, "cx", actualX);
                }
                if (moverVal === "yNegative") {
                    let actualY = parseInt(document.getElementById("underMark" + m).getAttribute("cy")) - underyMove;
                    document.getElementById("underMark" + m).setAttributeNS(null, "cy", actualY);
                }
                if (moverVal === "xPositive") {
                    let actualX = parseInt(document.getElementById("underMark" + m).getAttribute("cx")) + underxMove;
                    document.getElementById("underMark" + m).setAttributeNS(null, "cx", actualX);
                }
                if (moverVal === "yPositive") {
                    let actualY = parseInt(document.getElementById("underMark" + m).getAttribute("cy")) + underyMove;
                    document.getElementById("underMark" + m).setAttributeNS(null, "cy", actualY);
                }
            }
        }

        if (xButSq < undercx113 - 30) {
            underxMove = (undercx113 - xButSq) - 30;
            underxyMover("xNegative");
        } else if (xButSq > undercx113 - 30) {
            underxMove = (xButSq - undercx113) + 30;
            underxyMover("xPositive");
        } else {
            underxMove = 0;
        }

        if (yButSq < undercy113 - 30) {
            underyMove = (undercy113 - yButSq) - 30;
            underxyMover("yNegative");
        } else if (yButSq > undercy113 - 30) {
            underyMove = (yButSq - undercy113) + 30;
            underxyMover("yPositive");
        } else {
            underyMove = 0;
        }

        // select only marks by type and inside the board
        if (piecesPosition[i - 1] !== "O") { //check if piece I click is not empty
            if (tripleCheck === 0) { //cover Castles moves exceptions
                let mToType = "marksTo" + piecesPosition[i - 1];
                marksToType = Function("return " + mToType)(); //get array squares pieces can go
            } else if (tripleCheck === 1 || tripleCheck === 2) {
                if (piecesPosition[i - 1] === "C" && whiteCastlesInCheck.includes(i)) {
                    marksToType = marksToX;
                } else if (piecesPosition[i - 1] === "c" && blackCastlesInCheck.includes(i)) {
                    marksToType = marksToX;
                } else if (piecesPosition[i - 1] === "C" && totalBCastles === 1) {
                    marksToType = marksToX;
                } else if (piecesPosition[i - 1] === "c" && totalWCastles === 1) {
                    marksToType = marksToX;
                } else {
                    let mToType = "marksTo" + piecesPosition[i - 1];
                    marksToType = Function("return " + mToType)();
                }
            }

            let p = 0;
            while (p < marksToType.length) { //check Board limit to get only marks inside board
                let markL = parseInt(document.getElementById("underMark" + marksToType[p]).getAttributeNS(null, "cx")) - 5;
                let markR = parseInt(document.getElementById("underMark" + marksToType[p]).getAttributeNS(null, "cx")) + 5;
                let markT = parseInt(document.getElementById("underMark" + marksToType[p]).getAttributeNS(null, "cy")) - 5;
                let markB = parseInt(document.getElementById("underMark" + marksToType[p]).getAttributeNS(null, "cy")) + 5;
                let sqL = parseInt(document.getElementById("BL").getAttributeNS(null, "x"));
                let sqR = parseInt(document.getElementById("BL").getAttributeNS(null, "x")) + 480;
                let sqT = parseInt(document.getElementById("BL").getAttributeNS(null, "y"));
                let sqB = parseInt(document.getElementById("BL").getAttributeNS(null, "y")) + 480;
                if (markL < sqR && markR > sqL && markT < sqB && markB > sqT) {
                    marksOnBoard.push(parseInt(marksToType[p])); //get array marks to be used
                    if (piecesPosition[i - 1] === "B" || piecesPosition[i - 1] === "b" || piecesPosition[i - 1] === "Q" || piecesPosition[i - 1] === "q") {
                        if (marksToBishopNW.includes(marksToType[p])) {
                            marksOnBoardToBishopNW.push(parseInt(marksToType[p]));
                        } else if (marksToBishopNE.includes(marksToType[p])) {
                            marksOnBoardToBishopNE.push(parseInt(marksToType[p]));
                        } else if (marksToBishopSW.includes(marksToType[p])) {
                            marksOnBoardToBishopSW.push(parseInt(marksToType[p]));
                        } else if (marksToBishopSE.includes(marksToType[p])) {
                            marksOnBoardToBishopSE.push(parseInt(marksToType[p]));
                        }
                    }
                    if (piecesPosition[i - 1] === "R" || piecesPosition[i - 1] === "r" || piecesPosition[i - 1] === "Q" || piecesPosition[i - 1] === "q") {
                        if (marksToRookN.includes(marksToType[p])) {
                            marksOnBoardToRookN.push(parseInt(marksToType[p]));
                        } else if (marksToRookS.includes(marksToType[p])) {
                            marksOnBoardToRookS.push(parseInt(marksToType[p]));
                        } else if (marksToRookE.includes(marksToType[p])) {
                            marksOnBoardToRookE.push(parseInt(marksToType[p]));
                        } else if (marksToRookW.includes(marksToType[p])) {
                            marksOnBoardToRookW.push(parseInt(marksToType[p]));
                        }
                    }
                }
                p++;
            }
            marksOnBoardToBishopNW.reverse();
            marksOnBoardToBishopNE.reverse();
            marksOnBoardToRookN.reverse();
            marksOnBoardToRookW.reverse();

            //check collisions for each valid mark against all 64 squares on board, break when find it and jump next.
            let m = 0;
            while (m < marksOnBoard.length) {
                m++;
                let n = 0;
                while (n < 64) {
                    n++;
                    let markL = parseInt(document.getElementById("underMark" + marksOnBoard[m - 1]).getAttributeNS(null, "cx")) - 5;
                    let markR = parseInt(document.getElementById("underMark" + marksOnBoard[m - 1]).getAttributeNS(null, "cx")) + 5;
                    let markT = parseInt(document.getElementById("underMark" + marksOnBoard[m - 1]).getAttributeNS(null, "cy")) - 5;
                    let markB = parseInt(document.getElementById("underMark" + marksOnBoard[m - 1]).getAttributeNS(null, "cy")) + 5;
                    let sqL = parseInt(document.getElementById("Square" + n).getAttributeNS(null, "x"));
                    let sqR = parseInt(document.getElementById("Square" + n).getAttributeNS(null, "x")) + 60;
                    let sqT = parseInt(document.getElementById("Square" + n).getAttributeNS(null, "y"));
                    let sqB = parseInt(document.getElementById("Square" + n).getAttributeNS(null, "y")) + 60;
                    if (markL < sqR && markR > sqL && markT < sqB && markB > sqT) { //check collisions marks/squares
                        if (piecesPosition[i - 1] === "C") { //CASTLE check if type C
                            if (piecesPosition[n - 1] === "c" && n !== i - 16 && (n === i - 7 || n === i - 9)) { //check exceptions to special Castle's not in check diagonal moves
                                blackC(n);
                            }
                            if (piecesPosition[n - 1] === "c" && n !== i - 16 && (whiteCastlesInCheck.includes(i) || totalWCastles === 1)) { //check exceptions to special Castle's not in check diagonal moves
                                blackC(n);
                            }
                            if (piecesPosition[n - 1] === "c" && n !== i - 16 && (blackCastlesInCheck.includes(n) || totalBCastles === 1)) { //check exceptions to special Castle's not in check diagonal moves
                                blackC(n);
                            }
                        } else if (piecesPosition[i - 1] === "c") { //castle check if type c
                            if (piecesPosition[n - 1] === "C" && n !== i + 16 && (n === i + 7 || n === i + 9)) { //check exceptions to special Castle's not in check diagonal moves
                                whiteC(n);
                            }
                            if (piecesPosition[n - 1] === "C" && n !== i + 16 && (blackCastlesInCheck.includes(i) || totalBCastles === 1)) { //check exceptions to special Castle's not in check diagonal moves
                                whiteC(n);
                            }
                            if (piecesPosition[n - 1] === "C" && n !== i + 16 && (whiteCastlesInCheck.includes(n) || totalWCastles === 1)) { //check exceptions to special Castle's not in check diagonal moves
                                whiteC(n);
                            }
                        } else if (tripleCheck === 0) {
                            if (piecesPosition[i - 1] === "P") { //PAWN
                                if (n === i - 9 && piecesPosition[n - 1] === "c") { //check exceptions to special Castle's not in check diagonal moves
                                    blackC(n);
                                }
                                if (n === i - 7 && piecesPosition[n - 1] === "c") { //check exceptions to special Castle's not in check diagonal moves
                                    blackC(n);
                                }
                            } else if (piecesPosition[i - 1] === "p") { //pawn check if type c
                                if (n === i + 9 && piecesPosition[n - 1] === "C") { //check exceptions to special Castle's not in check diagonal moves
                                    whiteC(n);
                                }
                                if (n === i + 7 && piecesPosition[n - 1] === "C") { //check exceptions to special Castle's not in check diagonal moves
                                    whiteC(n);
                                }
                            } else if (piecesPosition[i - 1] === "B" || piecesPosition[i - 1] === "b") { //BbBbBbBbBbBbBb
                                if (marksOnBoardToBishopNW.includes(marksOnBoard[m - 1])) { //NW
                                    let lineSize = 1;
                                    let s = 0;
                                    while (marksOnBoardToBishopNW[s] > marksOnBoard[m - 1]) {
                                        lineSize++;
                                        s++;
                                    }
                                    let r = 0;
                                    while (r < lineSize) {
                                        r++;
                                        if (piecesPosition[i - (1 + r * 9)] !== "O" && r < lineSize) { //following line
                                            break;
                                        }
                                        if (r === lineSize) {
                                            if (piecesPosition[i - (1 + r * 9)] === "C" || piecesPosition[i - (1 + r * 9)] === "c") {
                                                if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i - (1 + r * 9)] === piecesPosition[i - (1 + r * 9)].toLowerCase()) {
                                                    blackC(n);
                                                } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i - (1 + r * 9)] === piecesPosition[i - (1 + r * 9)].toUpperCase()) {
                                                    whiteC(n);
                                                }
                                            }
                                        }
                                    }
                                } else if (marksOnBoardToBishopNE.includes(marksOnBoard[m - 1])) {
                                    let lineSize = 1;
                                    let s = 0;
                                    while (marksOnBoardToBishopNE[s] > marksOnBoard[m - 1]) {
                                        lineSize++;
                                        s++;
                                    }
                                    let r = 0;
                                    while (r < lineSize) {
                                        r++;
                                        if (piecesPosition[i - (1 + r * 7)] !== "O" && r < lineSize) { //following line
                                            break;
                                        }
                                        if (r === lineSize) {
                                            if (piecesPosition[i - (1 + r * 7)] === "C" || piecesPosition[i - (1 + r * 7)] === "c") {
                                                if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i - (1 + r * 7)] === piecesPosition[i - (1 + r * 7)].toLowerCase()) {
                                                    blackC(n);
                                                } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i - (1 + r * 7)] === piecesPosition[i - (1 + r * 7)].toUpperCase()) {
                                                    whiteC(n);
                                                }
                                            }
                                        }
                                    }
                                } else if (marksOnBoardToBishopSW.includes(marksOnBoard[m - 1])) {
                                    let lineSize = 1;
                                    let s = 0;
                                    while (marksOnBoardToBishopSW[s] < marksOnBoard[m - 1]) {
                                        lineSize++;
                                        s++;
                                    }
                                    let r = 0;
                                    while (r < lineSize) {
                                        r++;
                                        if (piecesPosition[i + (r * 7 - 1)] !== "O" && r < lineSize) { //following line
                                            break;
                                        }
                                        if (r === lineSize) {
                                            if (piecesPosition[i + (r * 7 - 1)] === "C" || piecesPosition[i + (r * 7 - 1)] === "c") {
                                                if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i + (r * 7 - 1)] === piecesPosition[i + (r * 7 - 1)].toLowerCase()) {
                                                    blackC(n);
                                                } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i + (r * 7 - 1)] === piecesPosition[i + (r * 7 - 1)].toUpperCase()) {
                                                    whiteC(n);
                                                }
                                            }
                                        }
                                    }
                                } else if (marksOnBoardToBishopSE.includes(marksOnBoard[m - 1])) {
                                    let lineSize = 1;
                                    let s = 0;
                                    while (marksOnBoardToBishopSE[s] < marksOnBoard[m - 1]) {
                                        lineSize++;
                                        s++;
                                    }
                                    let r = 0;
                                    while (r < lineSize) {
                                        r++;
                                        if (piecesPosition[i + (r * 9 - 1)] !== "O" && r < lineSize) { //following line
                                            break;
                                        }
                                        if (r === lineSize) {
                                            if (piecesPosition[i + (r * 9 - 1)] === "C" || piecesPosition[i + (r * 9 - 1)] === "c") {
                                                if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i + (r * 9 - 1)] === piecesPosition[i + (r * 9 - 1)].toLowerCase()) {
                                                    blackC(n);
                                                } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i + (r * 9 - 1)] === piecesPosition[i + (r * 9 - 1)].toUpperCase()) {
                                                    whiteC(n);
                                                }
                                            }
                                        }
                                    }
                                }
                            } else if (piecesPosition[i - 1] === "R" || piecesPosition[i - 1] === "r") { //RrRr
                                if (marksOnBoardToRookN.includes(marksOnBoard[m - 1])) { //NW
                                    let lineSize = 1;
                                    let s = 0;
                                    while (marksOnBoardToRookN[s] > marksOnBoard[m - 1]) {
                                        lineSize++;
                                        s++;
                                    }
                                    let r = 0;
                                    while (r < lineSize) {
                                        r++;
                                        if (piecesPosition[i - (1 + r * 8)] !== "O" && r < lineSize) { //following line
                                            break;
                                        }
                                        if (r === lineSize) {
                                            if (piecesPosition[i - (1 + r * 8)] === "C" || piecesPosition[i - (1 + r * 8)] === "c") {
                                                if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i - (1 + r * 8)] === piecesPosition[i - (1 + r * 8)].toLowerCase()) {
                                                    blackC(n);
                                                } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i - (1 + r * 8)] === piecesPosition[i - (1 + r * 8)].toUpperCase()) {
                                                    whiteC(n);
                                                }
                                            }
                                        }
                                    }
                                } else if (marksOnBoardToRookW.includes(marksOnBoard[m - 1])) {
                                    let lineSize = 1;
                                    let s = 0;
                                    while (marksOnBoardToRookW[s] > marksOnBoard[m - 1]) {
                                        lineSize++;
                                        s++;
                                    }
                                    let r = 0;
                                    while (r < lineSize) {
                                        r++;
                                        if (piecesPosition[i - (1 + r)] !== "O" && r < lineSize) { //following line
                                            break;
                                        }
                                        if (r === lineSize) {
                                            if (piecesPosition[i - (1 + r)] === "C" || piecesPosition[i - (1 + r)] === "c") {
                                                if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i - (1 + r)] === piecesPosition[i - (1 + r)].toLowerCase()) {
                                                    blackC(n);
                                                } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i - (1 + r)] === piecesPosition[i - (1 + r)].toUpperCase()) {
                                                    whiteC(n);
                                                }
                                            }
                                        }
                                    }
                                } else if (marksOnBoardToRookE.includes(marksOnBoard[m - 1])) {
                                    let lineSize = 1;
                                    let s = 0;
                                    while (marksOnBoardToRookE[s] < marksOnBoard[m - 1]) {
                                        lineSize++;
                                        s++;
                                    }
                                    let r = 0;
                                    while (r < lineSize) {
                                        r++;
                                        if (piecesPosition[i + (r - 1)] !== "O" && r < lineSize) { //following line
                                            break;
                                        }
                                        if (r === lineSize) {
                                            if (piecesPosition[i + (r - 1)] === "C" || piecesPosition[i + (r - 1)] === "c") {
                                                if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i + (r - 1)] === piecesPosition[i + (r - 1)].toLowerCase()) {
                                                    blackC(n);
                                                } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i + (r - 1)] === piecesPosition[i + (r - 1)].toUpperCase()) {
                                                    whiteC(n);
                                                }
                                            }
                                        }
                                    }
                                } else if (marksOnBoardToRookS.includes(marksOnBoard[m - 1])) {
                                    let lineSize = 1;
                                    let s = 0;
                                    while (marksOnBoardToRookS[s] < marksOnBoard[m - 1]) {
                                        lineSize++;
                                        s++;
                                    }
                                    let r = 0;
                                    while (r < lineSize) {
                                        r++;
                                        if (piecesPosition[i + (r * 8 - 1)] !== "O" && r < lineSize) { //following line
                                            break;
                                        }
                                        if (r === lineSize) {
                                            if (piecesPosition[i + (r * 8 - 1)] === "C" || piecesPosition[i + (r * 8 - 1)] === "c") {
                                                if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i + (r * 8 - 1)] === piecesPosition[i + (r * 8 - 1)].toLowerCase()) {
                                                    blackC(n);
                                                } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i + (r * 8 - 1)] === piecesPosition[i + (r * 8 - 1)].toUpperCase()) {
                                                    whiteC(n);
                                                }
                                            }
                                        }
                                    }
                                }
                            } else if (piecesPosition[i - 1] === "Q" || piecesPosition[i - 1] === "q") { //QUEEN queen
                                fillerStroker("disable");
                                if (marksOnBoardToBishopNW.includes(marksOnBoard[m - 1])) { //NW
                                    let lineSize = 1;
                                    let s = 0;
                                    while (marksOnBoardToBishopNW[s] > marksOnBoard[m - 1]) {
                                        lineSize++;
                                        s++;
                                    }
                                    let r = 0;
                                    while (r < lineSize) {
                                        r++;
                                        if (piecesPosition[i - (1 + r * 9)] !== "O" && r < lineSize) { //following line
                                            break;
                                        }
                                        if (r === lineSize) {
                                            if (piecesPosition[i - (1 + r * 9)] === "C" || piecesPosition[i - (1 + r * 9)] === "c") {
                                                if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i - (1 + r * 9)] === piecesPosition[i - (1 + r * 9)].toLowerCase()) {
                                                    blackC(n);
                                                } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i - (1 + r * 9)] === piecesPosition[i - (1 + r * 9)].toUpperCase()) {
                                                    whiteC(n);
                                                }
                                            }
                                        }
                                    }
                                } else if (marksOnBoardToBishopNE.includes(marksOnBoard[m - 1])) {
                                    let lineSize = 1;
                                    let s = 0;
                                    while (marksOnBoardToBishopNE[s] > marksOnBoard[m - 1]) {
                                        lineSize++;
                                        s++;
                                    }
                                    let r = 0;
                                    while (r < lineSize) {
                                        r++;
                                        if (piecesPosition[i - (1 + r * 7)] !== "O" && r < lineSize) { //following line
                                            break;
                                        }
                                        if (r === lineSize) {
                                            if (piecesPosition[i - (1 + r * 7)] === "C" || piecesPosition[i - (1 + r * 7)] === "c") {
                                                if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i - (1 + r * 7)] === piecesPosition[i - (1 + r * 7)].toLowerCase()) {
                                                    blackC(n);
                                                } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i - (1 + r * 7)] === piecesPosition[i - (1 + r * 7)].toUpperCase()) {
                                                    whiteC(n);
                                                }
                                            }
                                        }
                                    }
                                } else if (marksOnBoardToBishopSW.includes(marksOnBoard[m - 1])) {
                                    let lineSize = 1;
                                    let s = 0;
                                    while (marksOnBoardToBishopSW[s] < marksOnBoard[m - 1]) {
                                        lineSize++;
                                        s++;
                                    }
                                    let r = 0;
                                    while (r < lineSize) {
                                        r++;
                                        if (piecesPosition[i + (r * 7 - 1)] !== "O" && r < lineSize) { //following line
                                            break;
                                        }
                                        if (r === lineSize) {
                                            if (piecesPosition[i + (r * 7 - 1)] === "C" || piecesPosition[i + (r * 7 - 1)] === "c") {
                                                if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i + (r * 7 - 1)] === piecesPosition[i + (r * 7 - 1)].toLowerCase()) {
                                                    blackC(n);
                                                } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i + (r * 7 - 1)] === piecesPosition[i + (r * 7 - 1)].toUpperCase()) {
                                                    whiteC(n);
                                                }
                                            }
                                        }
                                    }
                                } else if (marksOnBoardToBishopSE.includes(marksOnBoard[m - 1])) {
                                    let lineSize = 1;
                                    let s = 0;
                                    while (marksOnBoardToBishopSE[s] < marksOnBoard[m - 1]) {
                                        lineSize++;
                                        s++;
                                    }
                                    let r = 0;
                                    while (r < lineSize) {
                                        r++;
                                        if (piecesPosition[i + (r * 9 - 1)] !== "O" && r < lineSize) { //following line
                                            break;
                                        }
                                        if (r === lineSize) {
                                            if (piecesPosition[i + (r * 9 - 1)] === "C" || piecesPosition[i + (r * 9 - 1)] === "c") {
                                                if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i + (r * 9 - 1)] === piecesPosition[i + (r * 9 - 1)].toLowerCase()) {
                                                    blackC(n);
                                                } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i + (r * 9 - 1)] === piecesPosition[i + (r * 9 - 1)].toUpperCase()) {
                                                    whiteC(n);
                                                }
                                            }
                                        }
                                    }
                                }
                                if (marksOnBoardToRookN.includes(marksOnBoard[m - 1])) { //NW
                                    let lineSize = 1;
                                    let s = 0;
                                    while (marksOnBoardToRookN[s] > marksOnBoard[m - 1]) {
                                        lineSize++;
                                        s++;
                                    }
                                    let r = 0;
                                    while (r < lineSize) {
                                        r++;
                                        if (piecesPosition[i - (1 + r * 8)] !== "O" && r < lineSize) { //following line
                                            break;
                                        }
                                        if (r === lineSize) {
                                            if (piecesPosition[i - (1 + r * 8)] === "C" || piecesPosition[i - (1 + r * 8)] === "c") {
                                                if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i - (1 + r * 8)] === piecesPosition[i - (1 + r * 8)].toLowerCase()) {
                                                    blackC(n);
                                                } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i - (1 + r * 8)] === piecesPosition[i - (1 + r * 8)].toUpperCase()) {
                                                    whiteC(n);
                                                }
                                            }
                                        }
                                    }
                                } else if (marksOnBoardToRookW.includes(marksOnBoard[m - 1])) {
                                    let lineSize = 1;
                                    let s = 0;
                                    while (marksOnBoardToRookW[s] > marksOnBoard[m - 1]) {
                                        lineSize++;
                                        s++;
                                    }
                                    let r = 0;
                                    while (r < lineSize) {
                                        r++;
                                        if (piecesPosition[i - (1 + r)] !== "O" && r < lineSize) { //following line
                                            break;
                                        }
                                        if (r === lineSize) {
                                            if (piecesPosition[i - (1 + r)] === "C" || piecesPosition[i - (1 + r)] === "c") {
                                                if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i - (1 + r)] === piecesPosition[i - (1 + r)].toLowerCase()) {
                                                    blackC(n);
                                                } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i - (1 + r)] === piecesPosition[i - (1 + r)].toUpperCase()) {
                                                    whiteC(n);
                                                }
                                            }
                                        }
                                    }
                                } else if (marksOnBoardToRookE.includes(marksOnBoard[m - 1])) {
                                    let lineSize = 1;
                                    let s = 0;
                                    while (marksOnBoardToRookE[s] < marksOnBoard[m - 1]) {
                                        lineSize++;
                                        s++;
                                    }
                                    let r = 0;
                                    while (r < lineSize) {
                                        r++;
                                        if (piecesPosition[i + (r - 1)] !== "O" && r < lineSize) { //following line
                                            break;
                                        }
                                        if (r === lineSize) {
                                            if (piecesPosition[i + (r - 1)] === "C" || piecesPosition[i + (r - 1)] === "c") {
                                                if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i + (r - 1)] === piecesPosition[i + (r - 1)].toLowerCase()) {
                                                    blackC(n);
                                                } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i + (r - 1)] === piecesPosition[i + (r - 1)].toUpperCase()) {
                                                    whiteC(n);
                                                }
                                            }
                                        }
                                    }
                                } else if (marksOnBoardToRookS.includes(marksOnBoard[m - 1])) {
                                    let lineSize = 1;
                                    let s = 0;
                                    while (marksOnBoardToRookS[s] < marksOnBoard[m - 1]) {
                                        lineSize++;
                                        s++;
                                    }
                                    let r = 0;
                                    while (r < lineSize) {
                                        r++;
                                        if (piecesPosition[i + (r * 8 - 1)] !== "O" && r < lineSize) { //following line
                                            break;
                                        }
                                        if (r === lineSize) {
                                            if (piecesPosition[i + (r * 8 - 1)] === "C" || piecesPosition[i + (r * 8 - 1)] === "c") {
                                                if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i + (r * 8 - 1)] === piecesPosition[i + (r * 8 - 1)].toLowerCase()) {
                                                    blackC(n);
                                                } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i + (r * 8 - 1)] === piecesPosition[i + (r * 8 - 1)].toUpperCase()) {
                                                    whiteC(n);
                                                }
                                            }
                                        }
                                    }
                                }
                            } else if (piecesPosition[i - 1] === "N" || piecesPosition[i - 1] === "n") { //KNIGHT knight
                                if (piecesPosition[n - 1] === "C" || piecesPosition[n - 1] === "c") {
                                    if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[n - 1] === piecesPosition[n - 1].toLowerCase()) {
                                        blackC(n);
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[n - 1] === piecesPosition[n - 1].toUpperCase()) {
                                        whiteC(n);
                                    }
                                }
                            }
                        }
                        n = 64; //breaker. dont need look for all 64 squares, just until find the square we are searching for.
                    }
                }
            }
        }
        if (i === 64 && tripleCheck < 2) {
            tripleCheck++;
            i = 0;
        }
    }
}
