function clickSquare(i) {
    unClickSquare();
    if (landingsAgain === 0) {
        whiteLandingsInCheck = [];
        blackLandingsInCheck = [];
        //need give 3 seconds to player time
    }
    //mark selected square
    fillerStroker("square");
    document.getElementById("butSquare" + i).setAttributeNS(null, "fill", filler);

    SquaresToGo = [];
    let marksOnBoardToRookN = [];
    let marksOnBoardToRookE = [];
    let marksOnBoardToRookW = [];
    let marksOnBoardToRookS = [];
    let marksOnBoardToBishopNW = [];
    let marksOnBoardToBishopNE = [];
    let marksOnBoardToBishopSW = [];
    let marksOnBoardToBishopSE = [];
    let cx113;
    let cy113;
    let xButSq;
    let yButSq;
    let xMove;
    let yMove;
    let marksToType = [];
    let marksOnBoard = [];

    //marks positioning when click square
    cx113 = document.getElementById("Mark113").getAttribute("cx");
    cy113 = document.getElementById("Mark113").getAttribute("cy");
    xButSq = document.getElementById("butSquare" + i).getAttribute("x");
    yButSq = document.getElementById("butSquare" + i).getAttribute("y");

    //Marks positioner
    function xyMover(moverVal) {
        let m = 0;
        while (m < 225) {
            m++;
            if (moverVal === "xNegative") {
                let actualX = parseInt(document.getElementById("Mark" + m).getAttribute("cx")) - xMove;
                document.getElementById("Mark" + m).setAttributeNS(null, "cx", actualX);
            }
            if (moverVal === "yNegative") {
                let actualY = parseInt(document.getElementById("Mark" + m).getAttribute("cy")) - yMove;
                document.getElementById("Mark" + m).setAttributeNS(null, "cy", actualY);
            }
            if (moverVal === "xPositive") {
                let actualX = parseInt(document.getElementById("Mark" + m).getAttribute("cx")) + xMove;
                document.getElementById("Mark" + m).setAttributeNS(null, "cx", actualX);
            }
            if (moverVal === "yPositive") {
                let actualY = parseInt(document.getElementById("Mark" + m).getAttribute("cy")) + yMove;
                document.getElementById("Mark" + m).setAttributeNS(null, "cy", actualY);
            }
        }
    }

    if (xButSq < cx113 - 30) {
        xMove = (cx113 - xButSq) - 30;
        xyMover("xNegative");
    } else if (xButSq > cx113 - 30) {
        xMove = (xButSq - cx113) + 30;
        xyMover("xPositive");
    } else {
        xMove = 0;
    }

    if (yButSq < cy113 - 30) {
        yMove = (cy113 - yButSq) - 30;
        xyMover("yNegative");
    } else if (yButSq > cy113 - 30) {
        yMove = (yButSq - cy113) + 30;
        xyMover("yPositive");
    } else {
        yMove = 0;
    }

    // select only marks by type and inside the board
    if (piecesPosition[i - 1] !== "O") { //check if piece I click is not empty
        fillerStroker("disable");

        if (piecesPosition[i - 1] === "C" && totalWCastles === 1) {
            whiteCastlesInCheck.push(i);
        } else if (piecesPosition[i - 1] === "c" && totalBCastles === 1) {
            blackCastlesInCheck.push(i);
        }

        if (piecesPosition[i - 1] === "C" && whiteCastlesInCheck.includes(i)) {
            marksToType = marksToX; //get array squares Castle in check can go
        } else if (piecesPosition[i - 1] === "c" && blackCastlesInCheck.includes(i)) {
            marksToType = marksToX; //get array squares castle in check can go
        } else {
            marksToType = eval("marksTo" + piecesPosition[i - 1]); //get array squares pieces can go
        }

        let p = 0;
        while (p < marksToType.length) { //check Board limit to get only marks inside board
            let markL = parseInt(document.getElementById("Mark" + marksToType[p]).getAttributeNS(null, "cx")) - 5;
            let markR = parseInt(document.getElementById("Mark" + marksToType[p]).getAttributeNS(null, "cx")) + 5;
            let markT = parseInt(document.getElementById("Mark" + marksToType[p]).getAttributeNS(null, "cy")) - 5;
            let markB = parseInt(document.getElementById("Mark" + marksToType[p]).getAttributeNS(null, "cy")) + 5;
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
                let markL = parseInt(document.getElementById("Mark" + marksOnBoard[m - 1]).getAttributeNS(null, "cx")) - 5;
                let markR = parseInt(document.getElementById("Mark" + marksOnBoard[m - 1]).getAttributeNS(null, "cx")) + 5;
                let markT = parseInt(document.getElementById("Mark" + marksOnBoard[m - 1]).getAttributeNS(null, "cy")) - 5;
                let markB = parseInt(document.getElementById("Mark" + marksOnBoard[m - 1]).getAttributeNS(null, "cy")) + 5;
                let sqL = parseInt(document.getElementById("Square" + n).getAttributeNS(null, "x"));
                let sqR = parseInt(document.getElementById("Square" + n).getAttributeNS(null, "x")) + 60;
                let sqT = parseInt(document.getElementById("Square" + n).getAttributeNS(null, "y"));
                let sqB = parseInt(document.getElementById("Square" + n).getAttributeNS(null, "y")) + 60;
                if (markL < sqR && markR > sqL && markT < sqB && markB > sqT) { //check collisions marks/squares
                    if (piecesPosition[i - 1] === "C") { //CASTLE check if type C
                        if (whiteCastlesInCheck.includes(i)) {
                            if (totalWCastles > 1) {
                                if (piecesPosition[n - 1] !== "O") {
                                    if (piecesPosition[n - 1] !== piecesPosition[n - 1].toUpperCase()) {
                                        fillerStroker("take");
                                        SquaresToGo.push(n);
                                    } else {
                                        fillerStroker("disable");
                                    }
                                } else {
                                    fillerStroker("empty");
                                    SquaresToGo.push(n);
                                }
                            } else {
                                if (totalBCastles === 1 && piecesPosition[n - 1] === "c") {
                                    fillerStroker("mate");
                                    SquaresToGo.push(n);
                                } else {
                                    if (piecesPosition[n - 1] !== "O") {
                                        if (landingsAgain === 0 && piecesPosition[n - 1] !== piecesPosition[n - 1].toUpperCase()) {
                                            ghostPiecesPosition = [];
                                            landingInCheck(i, n);
                                            again = 1;
                                        }
                                    } else if (landingsAgain === 0) {
                                        ghostPiecesPosition = [];
                                        landingInCheck(i, n);
                                        again = 1;
                                    }
                                    if (whiteLandingsInCheck.includes(n)) {
                                        fillerStroker("disable");
                                    } else if (piecesPosition[n - 1] !== "O") {
                                        if (piecesPosition[n - 1] !== piecesPosition[n - 1].toUpperCase()) {
                                            fillerStroker("take");
                                            SquaresToGo.push(n);
                                        } else {
                                            fillerStroker("disable");
                                        }
                                    } else {
                                        fillerStroker("empty");
                                        SquaresToGo.push(n);
                                    }
                                }
                            }
                        } else if (n === i - 9 || n === i - 7) { //check exceptions to special Castle's not in check diagonal moves
                            if (piecesPosition[n - 1] !== "O") { //check if squares to go are not empty
                                if (piecesPosition[n - 1] !== piecesPosition[n - 1].toUpperCase()) { //check if piece on land is enemy
                                    if (piecesPosition[n - 1] === "b" || piecesPosition[n - 1] === "q") { // if enemy, if b or q to go
                                        fillerStroker("turnover");
                                        SquaresToGo.push(n);
                                    } else { //can take enemy pieces
                                        fillerStroker("take");
                                        SquaresToGo.push(n);
                                    }
                                } else if (piecesPosition[n - 1] === "B" || piecesPosition[n - 1] === "Q") { // if friend, if Q or B to go
                                    fillerStroker("turnover");
                                    SquaresToGo.push(n);
                                } else { //disable to go
                                    fillerStroker("disable");
                                }
                            } else { //if diagonal squares is empty, C can't go
                                fillerStroker("disable");
                            }
                        } else if (n === i - 16) { //check if further most square to go ahead is empty
                            if (piecesPosition[i - 9] === "O") { // check if near square ahead is empty
                                if (piecesPosition[n - 1] !== "O") { //check if further square is not empty
                                    if (piecesPosition[n - 1] !== piecesPosition[n - 1].toUpperCase()) { //check if piece on go is enemy
                                        if (piecesPosition[n - 1] === "b" || piecesPosition[n - 1] === "q") { // if enemy, if b or q to go
                                            fillerStroker("turnover");
                                            SquaresToGo.push(n);
                                        } else { //disable to go
                                            fillerStroker("disable");
                                        }
                                    } else {  //if friend
                                        if (piecesPosition[n - 1] === "B" || piecesPosition[n - 1] === "Q") { // if friend, if B or Q to go
                                            fillerStroker("turnover");
                                            SquaresToGo.push(n);
                                        } else { //disable to go
                                            fillerStroker("disable");
                                        }
                                    }
                                } else {
                                    fillerStroker("empty");
                                    SquaresToGo.push(n);
                                }
                            } else { //disable to go
                                fillerStroker("disable");
                            }
                        } else if (n === i - 8) { //check if it is near square
                            if (piecesPosition[n - 1] !== "O") { //check if near square to go ahead is empty
                                if (piecesPosition[n - 1] !== piecesPosition[n - 1].toUpperCase()) { //check if piece on go is enemy
                                    if (piecesPosition[n - 1] === "b" || piecesPosition[n - 1] === "q") { // if enemy, if b or q to go
                                        fillerStroker("turnover");
                                        SquaresToGo.push(n);
                                    } else { //disable to go
                                        fillerStroker("disable");
                                    }
                                } else {  //if friend
                                    if (piecesPosition[n - 1] === "B" || piecesPosition[n - 1] === "Q") { // if friend, if B or Q to go
                                        fillerStroker("turnover");
                                        SquaresToGo.push(n);
                                    } else { //disable to go
                                        fillerStroker("disable");
                                    }
                                }
                            } else {
                                fillerStroker("empty");
                                SquaresToGo.push(n);
                            }
                        }
                    } else if (piecesPosition[i - 1] === "c") { //castle check if type c
                        if (blackCastlesInCheck.includes(i)) {
                            if (totalBCastles > 1) {
                                if (piecesPosition[n - 1] !== "O") {
                                    if (piecesPosition[n - 1] !== piecesPosition[n - 1].toLowerCase()) {
                                        fillerStroker("take");
                                        SquaresToGo.push(n);
                                    } else {
                                        fillerStroker("disable");
                                    }
                                } else {
                                    fillerStroker("empty");
                                    SquaresToGo.push(n);
                                }
                            } else {
                                if (totalWCastles === 1 && piecesPosition[n - 1] === "C") {
                                    fillerStroker("mate");
                                    SquaresToGo.push(n);
                                } else {
                                    if (piecesPosition[n - 1] !== "O") {
                                        if (landingsAgain === 0 && piecesPosition[n - 1] !== piecesPosition[n - 1].toLowerCase()) {
                                            ghostPiecesPosition = [];
                                            landingInCheck(i, n);
                                            again = 1;
                                        }
                                    } else if (landingsAgain === 0) {
                                        ghostPiecesPosition = [];
                                        landingInCheck(i, n);
                                        again = 1;
                                    }
                                    if (blackLandingsInCheck.includes(n)) {
                                        fillerStroker("disable");
                                    } else if (piecesPosition[n - 1] !== "O") {
                                        if (piecesPosition[n - 1] !== piecesPosition[n - 1].toLowerCase()) {
                                            fillerStroker("take");
                                            SquaresToGo.push(n);
                                        } else {
                                            fillerStroker("disable");
                                        }
                                    } else {
                                        fillerStroker("empty");
                                        SquaresToGo.push(n);
                                    }
                                }
                            }
                        } else if (n === i + 9 || n === i + 7) { //check exceptions to special Castle's not in check diagonal moves
                            if (piecesPosition[n - 1] !== "O") { //check if squares to go are empty
                                if (piecesPosition[n - 1] !== piecesPosition[n - 1].toLowerCase()) { //check if piece on go is enemy
                                    if (piecesPosition[n - 1] === "B" || piecesPosition[n - 1] === "Q") { // if enemy, if B or Q to go
                                        fillerStroker("turnover");
                                        SquaresToGo.push(n);
                                    } else {
                                        fillerStroker("take");
                                        SquaresToGo.push(n);
                                    }
                                } else if (piecesPosition[n - 1] === "b" || piecesPosition[n - 1] === "q") { // if friend, if q or b to go
                                    fillerStroker("turnover");
                                    SquaresToGo.push(n);
                                } else { //disable to go
                                    fillerStroker("disable");
                                }
                            } else { //if diagonal squares is empty, c can't go
                                fillerStroker("disable");
                            }
                        } else if (n === i + 16) { //check if far square to go ahead is empty
                            if (piecesPosition[i + 7] === "O") {
                                if (piecesPosition[n - 1] !== "O") {
                                    if (piecesPosition[n - 1] !== piecesPosition[n - 1].toLowerCase()) { //check if piece on go is enemy
                                        if (piecesPosition[n - 1] === "B" || piecesPosition[n - 1] === "Q") { // if enemy, if B or Q to go
                                            fillerStroker("turnover");
                                            SquaresToGo.push(n);
                                        } else { //disable to go
                                            fillerStroker("disable");
                                        }
                                    } else {  //if friend
                                        if (piecesPosition[n - 1] === "b" || piecesPosition[n - 1] === "q") { // if friend, if b or q to go
                                            fillerStroker("turnover");
                                            SquaresToGo.push(n);
                                        } else { //disable to go
                                            fillerStroker("disable");
                                        }
                                    }
                                } else {
                                    fillerStroker("empty");
                                    SquaresToGo.push(n);
                                }
                            } else { //disable to go
                                fillerStroker("disable");
                            }
                        } else if (n === i + 8) { //check if near square to go ahead is empty
                            if (piecesPosition[n - 1] !== "O") {
                                if (piecesPosition[n - 1] !== piecesPosition[n - 1].toLowerCase()) { //check if piece on go is enemy
                                    if (piecesPosition[n - 1] === "B" || piecesPosition[n - 1] === "Q") { // if enemy, if B or Q to go
                                        fillerStroker("turnover");
                                        SquaresToGo.push(n);
                                    } else { //disable to go
                                        fillerStroker("disable");
                                    }
                                } else {  //if friend
                                    if (piecesPosition[n - 1] === "b" || piecesPosition[n - 1] === "q") { // if friend, if b or q to go
                                        fillerStroker("turnover");
                                        SquaresToGo.push(n);
                                    } else { //disable to go
                                        fillerStroker("disable");
                                    }
                                }
                            } else {
                                fillerStroker("empty");
                                SquaresToGo.push(n);
                            }
                        }
                    } else if (piecesPosition[i - 1] === "P") { //PAWN
                        if (n === i - 9 || n === i - 7) { //check exceptions to special Castle's not in check diagonal moves
                            if (piecesPosition[n - 1] !== "O") { //check if squares to go are not empty
                                if (piecesPosition[n - 1] !== piecesPosition[n - 1].toUpperCase()) { //check if piece on land is enemy
                                    if (piecesPosition[n - 1] === "b" || piecesPosition[n - 1] === "q") { // if enemy, if b or q to go
                                        fillerStroker("turnover");
                                        SquaresToGo.push(n);
                                    } else { //can take enemy pieces
                                        fillerStroker("take");
                                        SquaresToGo.push(n);
                                    }
                                } else if (piecesPosition[n - 1] === "B" || piecesPosition[n - 1] === "Q") { // if friend, if Q or B to go
                                    fillerStroker("turnover");
                                    SquaresToGo.push(n);
                                } else { //disable to go
                                    fillerStroker("disable");
                                }
                            } else { //if diagonal squares is empty, C can't go
                                fillerStroker("disable");
                            }
                        } else if (n === i - 8) { //check if it is near square
                            if (piecesPosition[n - 1] !== "O") { //check if near square to go ahead is empty
                                if (piecesPosition[n - 1] !== piecesPosition[n - 1].toUpperCase()) { //check if piece on go is enemy
                                    if (piecesPosition[n - 1] === "b" || piecesPosition[n - 1] === "q") { // if enemy, if b or q to go
                                        fillerStroker("turnover");
                                        SquaresToGo.push(n);
                                    } else { //disable to go
                                        fillerStroker("disable");
                                    }
                                } else {  //if friend
                                    if (piecesPosition[n - 1] === "B" || piecesPosition[n - 1] === "Q") { // if friend, if B or Q to go
                                        fillerStroker("turnover");
                                        SquaresToGo.push(n);
                                    } else { //disable to go
                                        fillerStroker("disable");
                                    }
                                }
                            } else {
                                fillerStroker("empty");
                                SquaresToGo.push(n);
                            }
                        }
                    } else if (piecesPosition[i - 1] === "p") { //pawn check if type c
                        if (n === i + 9 || n === i + 7) { //check exceptions to special Castle's not in check diagonal moves
                            if (piecesPosition[n - 1] !== "O") { //check if squares to go are empty
                                if (piecesPosition[n - 1] !== piecesPosition[n - 1].toLowerCase()) { //check if piece on go is enemy
                                    if (piecesPosition[n - 1] === "B" || piecesPosition[n - 1] === "Q") { // if enemy, if B or Q to go
                                        fillerStroker("turnover");
                                        SquaresToGo.push(n);
                                    } else {
                                        fillerStroker("take");
                                        SquaresToGo.push(n);
                                    }
                                } else if (piecesPosition[n - 1] === "b" || piecesPosition[n - 1] === "q") { // if friend, if q or b to go
                                    fillerStroker("turnover");
                                    SquaresToGo.push(n);
                                } else { //disable to go
                                    fillerStroker("disable");
                                }
                            } else { //if diagonal squares is empty, c can't go
                                fillerStroker("disable");
                            }
                        } else if (n === i + 8) { //check if near square to go ahead is empty
                            if (piecesPosition[n - 1] !== "O") {
                                if (piecesPosition[n - 1] !== piecesPosition[n - 1].toLowerCase()) { //check if piece on go is enemy
                                    if (piecesPosition[n - 1] === "B" || piecesPosition[n - 1] === "Q") { // if enemy, if B or Q to go
                                        fillerStroker("turnover");
                                        SquaresToGo.push(n);
                                    } else { //disable to go
                                        fillerStroker("disable");
                                    }
                                } else {  //if friend
                                    if (piecesPosition[n - 1] === "b" || piecesPosition[n - 1] === "q") { // if friend, if b or q to go
                                        fillerStroker("turnover");
                                        SquaresToGo.push(n);
                                    } else { //disable to go
                                        fillerStroker("disable");
                                    }
                                }
                            } else {
                                fillerStroker("empty");
                                SquaresToGo.push(n);
                            }
                        }
                    } else if (piecesPosition[i - 1] === "B" || piecesPosition[i - 1] === "b") { //BbBbBbBbBbBbBb
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
                                    if (piecesPosition[i - (1 + r * 9)] === "O") {
                                        fillerStroker("empty");
                                        SquaresToGo.push(n);
                                        break;
                                    } else if (piecesPosition[i - (1 + r * 9)] === "R" || piecesPosition[i - (1 + r * 9)] === "P" || piecesPosition[i - (1 + r * 9)] === "r" || piecesPosition[i - (1 + r * 9)] === "p") {
                                        fillerStroker("turnover");
                                        SquaresToGo.push(n);
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i - (1 + r * 9)] === piecesPosition[i - (1 + r * 9)].toUpperCase()) {
                                        fillerStroker("disable");
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i - (1 + r * 9)] === piecesPosition[i - (1 + r * 9)].toLowerCase()) {
                                        fillerStroker("disable");
                                    } else {
                                        fillerStroker("take");
                                        SquaresToGo.push(n);
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
                                    if (piecesPosition[i - (1 + r * 7)] === "O") {
                                        fillerStroker("empty");
                                        SquaresToGo.push(n);
                                    } else if (piecesPosition[i - (1 + r * 7)] === "R" || piecesPosition[i - (1 + r * 7)] === "P" || piecesPosition[i - (1 + r * 7)] === "r" || piecesPosition[i - (1 + r * 7)] === "p") {
                                        fillerStroker("turnover");
                                        SquaresToGo.push(n);
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i - (1 + r * 7)] === piecesPosition[i - (1 + r * 7)].toUpperCase()) {
                                        fillerStroker("disable");
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i - (1 + r * 7)] === piecesPosition[i - (1 + r * 7)].toLowerCase()) {
                                        fillerStroker("disable");
                                    } else {
                                        fillerStroker("take");
                                        SquaresToGo.push(n);
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
                                    if (piecesPosition[i + (r * 7 - 1)] === "O") {
                                        fillerStroker("empty");
                                        SquaresToGo.push(n);
                                    } else if (piecesPosition[i + (r * 7 - 1)] === "R" || piecesPosition[i + (r * 7 - 1)] === "P" || piecesPosition[i + (r * 7 - 1)] === "r" || piecesPosition[i + (r * 7 - 1)] === "p") {
                                        fillerStroker("turnover");
                                        SquaresToGo.push(n);
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i + (r * 7 - 1)] === piecesPosition[i + (r * 7 - 1)].toUpperCase()) {
                                        fillerStroker("disable");
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i + (r * 7 - 1)] === piecesPosition[i + (r * 7 - 1)].toLowerCase()) {
                                        fillerStroker("disable");
                                    } else {
                                        fillerStroker("take");
                                        SquaresToGo.push(n);
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
                                    if (piecesPosition[i + (r * 9 - 1)] === "O") {
                                        fillerStroker("empty");
                                        SquaresToGo.push(n);
                                    } else if (piecesPosition[i + (r * 9 - 1)] === "R" || piecesPosition[i + (r * 9 - 1)] === "P" || piecesPosition[i + (r * 9 - 1)] === "r" || piecesPosition[i + (r * 9 - 1)] === "p") {
                                        fillerStroker("turnover");
                                        SquaresToGo.push(n);
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i + (r * 9 - 1)] === piecesPosition[i + (r * 9 - 1)].toUpperCase()) {
                                        fillerStroker("disable");
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i + (r * 9 - 1)] === piecesPosition[i + (r * 9 - 1)].toLowerCase()) {
                                        fillerStroker("disable");
                                    } else {
                                        fillerStroker("take");
                                        SquaresToGo.push(n);
                                    }
                                }
                            }
                        }
                    } else if (piecesPosition[i - 1] === "R" || piecesPosition[i - 1] === "r") { //RrRr
                        fillerStroker("disable");
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
                                    if (piecesPosition[i - (1 + r * 8)] === "O") {
                                        fillerStroker("empty");
                                        SquaresToGo.push(n);
                                        break;
                                    } else if (piecesPosition[i - (1 + r * 8)] === "B" || piecesPosition[i - (1 + r * 8)] === "b" || piecesPosition[i - (1 + r * 8)] === "N" || piecesPosition[i - (1 + r * 8)] === "n") {
                                        fillerStroker("turnover");
                                        SquaresToGo.push(n);
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i - (1 + r * 8)] === piecesPosition[i - (1 + r * 8)].toUpperCase()) {
                                        fillerStroker("disable");
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i - (1 + r * 8)] === piecesPosition[i - (1 + r * 8)].toLowerCase()) {
                                        fillerStroker("disable");
                                    } else {
                                        fillerStroker("take");
                                        SquaresToGo.push(n);
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
                                    if (piecesPosition[i - (1 + r)] === "O") {
                                        fillerStroker("empty");
                                        SquaresToGo.push(n);
                                    } else if (piecesPosition[i - (1 + r)] === "B" || piecesPosition[i - (1 + r)] === "b" || piecesPosition[i - (1 + r)] === "N" || piecesPosition[i - (1 + r)] === "n") {
                                        fillerStroker("turnover");
                                        SquaresToGo.push(n);
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i - (1 + r)] === piecesPosition[i - (1 + r)].toUpperCase()) {
                                        fillerStroker("disable");
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i - (1 + r)] === piecesPosition[i - (1 + r)].toLowerCase()) {
                                        fillerStroker("disable");
                                    } else {
                                        fillerStroker("take");
                                        SquaresToGo.push(n);
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
                                    if (piecesPosition[i + (r - 1)] === "O") {
                                        fillerStroker("empty");
                                        SquaresToGo.push(n);
                                    } else if (piecesPosition[i + (r - 1)] === "B" || piecesPosition[i + (r - 1)] === "b" || piecesPosition[i + (r - 1)] === "N" || piecesPosition[i + (r - 1)] === "n") {
                                        fillerStroker("turnover");
                                        SquaresToGo.push(n);
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i + (r - 1)] === piecesPosition[i + (r - 1)].toUpperCase()) {
                                        fillerStroker("disable");
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i + (r - 1)] === piecesPosition[i + (r - 1)].toLowerCase()) {
                                        fillerStroker("disable");
                                    } else {
                                        fillerStroker("take");
                                        SquaresToGo.push(n);
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
                                    if (piecesPosition[i + (r * 8 - 1)] === "O") {
                                        fillerStroker("empty");
                                        SquaresToGo.push(n);
                                    } else if (piecesPosition[i + (r * 8 - 1)] === "B" || piecesPosition[i + (r * 8 - 1)] === "b" || piecesPosition[i + (r * 8 - 1)] === "N" || piecesPosition[i + (r * 8 - 1)] === "n") {
                                        fillerStroker("turnover");
                                        SquaresToGo.push(n);
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i + (r * 8 - 1)] === piecesPosition[i + (r * 8 - 1)].toUpperCase()) {
                                        fillerStroker("disable");
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i + (r * 8 - 1)] === piecesPosition[i + (r * 8 - 1)].toLowerCase()) {
                                        fillerStroker("disable");
                                    } else {
                                        fillerStroker("take");
                                        SquaresToGo.push(n);
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
                                    if (piecesPosition[i - (1 + r * 9)] === "O") {
                                        fillerStroker("empty");
                                        SquaresToGo.push(n);
                                        break;
                                    } else if (piecesPosition[i - (1 + r * 9)] === "R" || piecesPosition[i - (1 + r * 9)] === "P" || piecesPosition[i - (1 + r * 9)] === "r" || piecesPosition[i - (1 + r * 9)] === "p") {
                                        fillerStroker("turnover");
                                        SquaresToGo.push(n);
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i - (1 + r * 9)] === piecesPosition[i - (1 + r * 9)].toUpperCase()) {
                                        fillerStroker("disable");
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i - (1 + r * 9)] === piecesPosition[i - (1 + r * 9)].toLowerCase()) {
                                        fillerStroker("disable");
                                    } else {
                                        fillerStroker("take");
                                        SquaresToGo.push(n);
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
                                    if (piecesPosition[i - (1 + r * 7)] === "O") {
                                        fillerStroker("empty");
                                        SquaresToGo.push(n);
                                    } else if (piecesPosition[i - (1 + r * 7)] === "R" || piecesPosition[i - (1 + r * 7)] === "P" || piecesPosition[i - (1 + r * 7)] === "r" || piecesPosition[i - (1 + r * 7)] === "p") {
                                        fillerStroker("turnover");
                                        SquaresToGo.push(n);
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i - (1 + r * 7)] === piecesPosition[i - (1 + r * 7)].toUpperCase()) {
                                        fillerStroker("disable");
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i - (1 + r * 7)] === piecesPosition[i - (1 + r * 7)].toLowerCase()) {
                                        fillerStroker("disable");
                                    } else {
                                        fillerStroker("take");
                                        SquaresToGo.push(n);
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
                                    if (piecesPosition[i + (r * 7 - 1)] === "O") {
                                        fillerStroker("empty");
                                        SquaresToGo.push(n);
                                    } else if (piecesPosition[i + (r * 7 - 1)] === "R" || piecesPosition[i + (r * 7 - 1)] === "P" || piecesPosition[i + (r * 7 - 1)] === "r" || piecesPosition[i + (r * 7 - 1)] === "p") {
                                        fillerStroker("turnover");
                                        SquaresToGo.push(n);
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i + (r * 7 - 1)] === piecesPosition[i + (r * 7 - 1)].toUpperCase()) {
                                        fillerStroker("disable");
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i + (r * 7 - 1)] === piecesPosition[i + (r * 7 - 1)].toLowerCase()) {
                                        fillerStroker("disable");
                                    } else {
                                        fillerStroker("take");
                                        SquaresToGo.push(n);
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
                                    if (piecesPosition[i + (r * 9 - 1)] === "O") {
                                        fillerStroker("empty");
                                        SquaresToGo.push(n);
                                    } else if (piecesPosition[i + (r * 9 - 1)] === "R" || piecesPosition[i + (r * 9 - 1)] === "P" || piecesPosition[i + (r * 9 - 1)] === "r" || piecesPosition[i + (r * 9 - 1)] === "p") {
                                        fillerStroker("turnover");
                                        SquaresToGo.push(n);
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i + (r * 9 - 1)] === piecesPosition[i + (r * 9 - 1)].toUpperCase()) {
                                        fillerStroker("disable");
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i + (r * 9 - 1)] === piecesPosition[i + (r * 9 - 1)].toLowerCase()) {
                                        fillerStroker("disable");
                                    } else {
                                        fillerStroker("take");
                                        SquaresToGo.push(n);
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
                                    if (piecesPosition[i - (1 + r * 8)] === "O") {
                                        fillerStroker("empty");
                                        SquaresToGo.push(n);
                                        break;
                                    } else if (piecesPosition[i - (1 + r * 8)] === "R" || piecesPosition[i - (1 + r * 8)] === "r" || piecesPosition[i - (1 + r * 8)] === "P" || piecesPosition[i - (1 + r * 8)] === "p") {
                                        fillerStroker("turnover");
                                        SquaresToGo.push(n);
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i - (1 + r * 8)] === piecesPosition[i - (1 + r * 8)].toUpperCase()) {
                                        fillerStroker("disable");
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i - (1 + r * 8)] === piecesPosition[i - (1 + r * 8)].toLowerCase()) {
                                        fillerStroker("disable");
                                    } else {
                                        fillerStroker("take");
                                        SquaresToGo.push(n);
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
                                    if (piecesPosition[i - (1 + r)] === "O") {
                                        fillerStroker("empty");
                                        SquaresToGo.push(n);
                                    } else if (piecesPosition[i - (1 + r)] === "R" || piecesPosition[i - (1 + r)] === "r" || piecesPosition[i - (1 + r)] === "P" || piecesPosition[i - (1 + r)] === "p") {
                                        fillerStroker("turnover");
                                        SquaresToGo.push(n);
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i - (1 + r)] === piecesPosition[i - (1 + r)].toUpperCase()) {
                                        fillerStroker("disable");
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i - (1 + r)] === piecesPosition[i - (1 + r)].toLowerCase()) {
                                        fillerStroker("disable");
                                    } else {
                                        fillerStroker("take");
                                        SquaresToGo.push(n);
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
                                    if (piecesPosition[i + (r - 1)] === "O") {
                                        fillerStroker("empty");
                                        SquaresToGo.push(n);
                                    } else if (piecesPosition[i + (r - 1)] === "R" || piecesPosition[i + (r - 1)] === "r" || piecesPosition[i + (r - 1)] === "P" || piecesPosition[i + (r - 1)] === "p") {
                                        fillerStroker("turnover");
                                        SquaresToGo.push(n);
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i + (r - 1)] === piecesPosition[i + (r - 1)].toUpperCase()) {
                                        fillerStroker("disable");
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i + (r - 1)] === piecesPosition[i + (r - 1)].toLowerCase()) {
                                        fillerStroker("disable");
                                    } else {
                                        fillerStroker("take");
                                        SquaresToGo.push(n);
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
                                    if (piecesPosition[i + (r * 8 - 1)] === "O") {
                                        fillerStroker("empty");
                                        SquaresToGo.push(n);
                                    } else if (piecesPosition[i + (r * 8 - 1)] === "R" || piecesPosition[i + (r * 8 - 1)] === "r" || piecesPosition[i + (r * 8 - 1)] === "P" || piecesPosition[i + (r * 8 - 1)] === "p") {
                                        fillerStroker("turnover");
                                        SquaresToGo.push(n);
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() && piecesPosition[i + (r * 8 - 1)] === piecesPosition[i + (r * 8 - 1)].toUpperCase()) {
                                        fillerStroker("disable");
                                    } else if (piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase() && piecesPosition[i + (r * 8 - 1)] === piecesPosition[i + (r * 8 - 1)].toLowerCase()) {
                                        fillerStroker("disable");
                                    } else {
                                        fillerStroker("take");
                                        SquaresToGo.push(n);
                                    }
                                }
                            }
                        }
                    } else if (piecesPosition[i - 1] === "N" || piecesPosition[i - 1] === "n") { //KNIGHT knight
                        if (piecesPosition[n - 1] !== "O") { //check if squares to go are not empty
                            if (piecesPosition[n - 1] === piecesPosition[n - 1].toUpperCase() && piecesPosition[i - 1] === piecesPosition[i - 1].toUpperCase() || piecesPosition[n - 1] === piecesPosition[n - 1].toLowerCase() && piecesPosition[i - 1] === piecesPosition[i - 1].toLowerCase()) { //check if piece on land is friend
                                if (piecesPosition[n - 1] === "B" || piecesPosition[n - 1] === "b" || piecesPosition[n - 1] === "Q" || piecesPosition[n - 1] === "q") { // if friend, if b or q to go
                                    fillerStroker("turnover");
                                    SquaresToGo.push(n);
                                } else { //cant go on friendly square
                                    fillerStroker("disable");
                                }
                            } else {
                                if (piecesPosition[n - 1] === "B" || piecesPosition[n - 1] === "b" || piecesPosition[n - 1] === "Q" || piecesPosition[n - 1] === "q") { // if enemy, if b or q to go
                                    fillerStroker("turnover");
                                    SquaresToGo.push(n);
                                } else { //attack enemy
                                    fillerStroker("take");
                                    SquaresToGo.push(n);
                                }
                            }
                        } else { //go empty square
                            fillerStroker("empty");
                            SquaresToGo.push(n);
                        }
                    } else { //temporary to develop
                        fillerStroker("colorError");
                    }
                    document.getElementById("Mark" + marksOnBoard[m - 1]).setAttributeNS(null, "fill", filler);
                    document.getElementById("Mark" + marksOnBoard[m - 1]).setAttributeNS(null, "stroke", stroker);
                    n = 64; //breaker. dont need look for all 64 squares, just until find the square we are searching for.
                }
            }
        }
    } else { //clear marks
        unClickSquare();
    }
    if (again === 1) {
        landingsAgain = 1;
    }
}
