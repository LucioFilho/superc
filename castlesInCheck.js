/*jshint esversion: 6 */

function uncheckCastles() {
  let k = 0;
  while (k < 64) {

    if (PiecesPosition[k] === "C") {
      document.getElementById("extA" + extPiecesPosition[k]).setAttributeNS(null, "stroke", "rgba(0,0,0,1.0)");
      document.getElementById("midA" + midPiecesPosition[k]).setAttributeNS(null, "stroke", "rgba(0,0,0,1.0)");
      document.getElementById("intA" + intPiecesPosition[k]).setAttributeNS(null, "fill", "rgba(0,0,0,1.0)");
    }

    if (PiecesPosition[k] === "c") {
      document.getElementById("extA" + extPiecesPosition[k]).setAttributeNS(null, "stroke", "rgba(255,255,255,1.0)");
      document.getElementById("midA" + midPiecesPosition[k]).setAttributeNS(null, "stroke", "rgba(255,255,255,1.0)");
      document.getElementById("intA" + intPiecesPosition[k]).setAttributeNS(null, "fill", "rgba(255,255,255,1.0)");
    }

    k++;
  }
}

function markCastleInCheck(n) {
  //mark castles in check
  document.getElementById("extA" + extPiecesPosition[n - 1]).setAttributeNS(null, "stroke", "rgba(255,0,0,1.0)");
  document.getElementById("midA" + midPiecesPosition[n - 1]).setAttributeNS(null, "stroke", "rgba(255,0,0,1.0)");
  document.getElementById("intA" + intPiecesPosition[n - 1]).setAttributeNS(null, "fill", "rgba(255,0,0,1.0)");
}

function blackC(n) {
  if (BlackCastlesInCheck.includes(n) === false) {
    BlackCastlesInCheck.push(parseInt(n));
    markCastleInCheck(n);
  }
}

function whiteC(n) {
  if (WhiteCastlesInCheck.includes(n) === false) {
    WhiteCastlesInCheck.push(parseInt(n));
    markCastleInCheck(n);
  }
}

function castlesInCheck() {
  WhiteCastlesInCheck = [];
  BlackCastlesInCheck = [];

  //clear castles in check marksTo
  uncheckCastles();

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
    let xMove = 0;
    let yMove = 0;
    let marksToType = [];
    let marksOnBoard = [];
    let pP = PiecesPosition[i - 1];

    //marks positioning
    undercx113 = document.getElementById("underMark113").getAttribute("cx");
    undercy113 = document.getElementById("underMark113").getAttribute("cy");
    xButSq = document.getElementById("butSquare" + i).getAttribute("x");
    yButSq = document.getElementById("butSquare" + i).getAttribute("y");

    //Marks positioner

    if (xButSq < undercx113 - 30) {
      xMove = (undercx113 - xButSq) - 30;
      underxyMover("xNegative", xMove, yMove);
    } else if (xButSq > undercx113 - 30) {
      xMove = (xButSq - undercx113) + 30;
      underxyMover("xPositive", xMove, yMove);
    }

    if (yButSq < undercy113 - 30) {
      yMove = (undercy113 - yButSq) - 30;
      underxyMover("yNegative", xMove, yMove);
    } else if (yButSq > undercy113 - 30) {
      yMove = (yButSq - undercy113) + 30;
      underxyMover("yPositive", xMove, yMove);
    }

    // select only marks by type and inside the board
    if (pP !== "O") { //check if piece I click is not empty
      if (tripleCheck === 0) { //cover Castles moves exceptions
        if (pP === "C") {
          marksToType = marksToC;
        } else if (pP === "c") {
          marksToType = marksToc;
        } else if (pP === "P") {
          marksToType = marksToP;
        } else if (pP === "p") {
          marksToType = marksTop;
        } else if (pP === "Q" || pP === "q") {
          marksToType = marksToQ;
        } else if (pP === "B" || pP === "b") {
          marksToType = marksToB;
        } else if (pP === "R" || pP === "r") {
          marksToType = marksToR;
        } else if (pP === "N" || pP === "n") {
          marksToType = marksToN;
        }
      } else if (tripleCheck === 1 || tripleCheck === 2) {
        if (pP === "C" && WhiteCastlesInCheck.includes(i)) {
          marksToType = marksToX;
        } else if (pP === "C" && TotalBCastles === 1) {
          marksToType = marksToX;
        } else if (pP === "c" && BlackCastlesInCheck.includes(i)) {
          marksToType = marksToX;
        } else if (pP === "c" && TotalWCastles === 1) {
          marksToType = marksToX;
        } else if (pP === "C") {
          marksToType = marksToC;
        } else if (pP === "c") {
          marksToType = marksToc;
        } else if (pP === "P") {
          marksToType = marksToP;
        } else if (pP === "p") {
          marksToType = marksTop;
        } else if (pP === "Q" || pP === "q") {
          marksToType = marksToQ;
        } else if (pP === "B" || pP === "b") {
          marksToType = marksToB;
        } else if (pP === "R" || pP === "r") {
          marksToType = marksToR;
        } else if (pP === "N" || pP === "n") {
          marksToType = marksToN;
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
          if (pP === "B" || pP === "b" || pP === "Q" || pP === "q") {
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
          if (pP === "R" || pP === "r" || pP === "Q" || pP === "q") {
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
          let pPn = PiecesPosition[n - 1];
          let markL = parseInt(document.getElementById("underMark" + marksOnBoard[m - 1]).getAttributeNS(null, "cx")) - 5;
          let markR = parseInt(document.getElementById("underMark" + marksOnBoard[m - 1]).getAttributeNS(null, "cx")) + 5;
          let markT = parseInt(document.getElementById("underMark" + marksOnBoard[m - 1]).getAttributeNS(null, "cy")) - 5;
          let markB = parseInt(document.getElementById("underMark" + marksOnBoard[m - 1]).getAttributeNS(null, "cy")) + 5;
          let sqL = parseInt(document.getElementById("butSquare" + n).getAttributeNS(null, "x"));
          let sqR = parseInt(document.getElementById("butSquare" + n).getAttributeNS(null, "x")) + 60;
          let sqT = parseInt(document.getElementById("butSquare" + n).getAttributeNS(null, "y"));
          let sqB = parseInt(document.getElementById("butSquare" + n).getAttributeNS(null, "y")) + 60;
          if (markL < sqR && markR > sqL && markT < sqB && markB > sqT) { //check collisions marks/squares
            if (pP === "C") { //CASTLE check if type C
              if (pPn === "c" && n !== i - 16 && (n === i - 7 || n === i - 9)) { //check exceptions to special Castle's not in check diagonal moves
                blackC(n);
              }
              if (pPn === "c" && n !== i - 16 && (WhiteCastlesInCheck.includes(i) || TotalWCastles === 1)) { //check exceptions to special Castle's not in check diagonal moves
                blackC(n);
              }
              if (pPn === "c" && n !== i - 16 && (BlackCastlesInCheck.includes(n) || TotalBCastles === 1)) { //check exceptions to special Castle's not in check diagonal moves
                blackC(n);
              }
            } else if (pP === "c") { //castle check if type c
              if (pPn === "C" && n !== i + 16 && (n === i + 7 || n === i + 9)) { //check exceptions to special Castle's not in check diagonal moves
                whiteC(n);
              }
              if (pPn === "C" && n !== i + 16 && (BlackCastlesInCheck.includes(i) || TotalBCastles === 1)) { //check exceptions to special Castle's not in check diagonal moves
                whiteC(n);
              }
              if (pPn === "C" && n !== i + 16 && (WhiteCastlesInCheck.includes(n) || TotalWCastles === 1)) { //check exceptions to special Castle's not in check diagonal moves
                whiteC(n);
              }
            } else if (tripleCheck === 0) {
              if (pP === "P") { //PAWN
                if (n === i - 9 && pPn === "c") { //check exceptions to special Castle's not in check diagonal moves
                  blackC(n);
                }
                if (n === i - 7 && pPn === "c") { //check exceptions to special Castle's not in check diagonal moves
                  blackC(n);
                }
              } else if (pP === "p") { //pawn check if type c
                if (n === i + 9 && pPn === "C") { //check exceptions to special Castle's not in check diagonal moves
                  whiteC(n);
                }
                if (n === i + 7 && pPn === "C") { //check exceptions to special Castle's not in check diagonal moves
                  whiteC(n);
                }
              } else if (pP === "B" || pP === "b") { //BbBbBbBbBbBbBb
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
                    if (PiecesPosition[i - (1 + r * 9)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (PiecesPosition[i - (1 + r * 9)] === "C" || PiecesPosition[i - (1 + r * 9)] === "c") {
                        if (pP === pP.toUpperCase() && PiecesPosition[i - (1 + r * 9)] === PiecesPosition[i - (1 + r * 9)].toLowerCase()) {
                          blackC(n);
                        } else if (pP === pP.toLowerCase() && PiecesPosition[i - (1 + r * 9)] === PiecesPosition[i - (1 + r * 9)].toUpperCase()) {
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
                    if (PiecesPosition[i - (1 + r * 7)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (PiecesPosition[i - (1 + r * 7)] === "C" || PiecesPosition[i - (1 + r * 7)] === "c") {
                        if (pP === pP.toUpperCase() && PiecesPosition[i - (1 + r * 7)] === PiecesPosition[i - (1 + r * 7)].toLowerCase()) {
                          blackC(n);
                        } else if (pP === pP.toLowerCase() && PiecesPosition[i - (1 + r * 7)] === PiecesPosition[i - (1 + r * 7)].toUpperCase()) {
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
                    if (PiecesPosition[i + (r * 7 - 1)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (PiecesPosition[i + (r * 7 - 1)] === "C" || PiecesPosition[i + (r * 7 - 1)] === "c") {
                        if (pP === pP.toUpperCase() && PiecesPosition[i + (r * 7 - 1)] === PiecesPosition[i + (r * 7 - 1)].toLowerCase()) {
                          blackC(n);
                        } else if (pP === pP.toLowerCase() && PiecesPosition[i + (r * 7 - 1)] === PiecesPosition[i + (r * 7 - 1)].toUpperCase()) {
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
                    if (PiecesPosition[i + (r * 9 - 1)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (PiecesPosition[i + (r * 9 - 1)] === "C" || PiecesPosition[i + (r * 9 - 1)] === "c") {
                        if (pP === pP.toUpperCase() && PiecesPosition[i + (r * 9 - 1)] === PiecesPosition[i + (r * 9 - 1)].toLowerCase()) {
                          blackC(n);
                        } else if (pP === pP.toLowerCase() && PiecesPosition[i + (r * 9 - 1)] === PiecesPosition[i + (r * 9 - 1)].toUpperCase()) {
                          whiteC(n);
                        }
                      }
                    }
                  }
                }
              } else if (pP === "R" || pP === "r") { //RrRr
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
                    if (PiecesPosition[i - (1 + r * 8)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (PiecesPosition[i - (1 + r * 8)] === "C" || PiecesPosition[i - (1 + r * 8)] === "c") {
                        if (pP === pP.toUpperCase() && PiecesPosition[i - (1 + r * 8)] === PiecesPosition[i - (1 + r * 8)].toLowerCase()) {
                          blackC(n);
                        } else if (pP === pP.toLowerCase() && PiecesPosition[i - (1 + r * 8)] === PiecesPosition[i - (1 + r * 8)].toUpperCase()) {
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
                    if (PiecesPosition[i - (1 + r)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (PiecesPosition[i - (1 + r)] === "C" || PiecesPosition[i - (1 + r)] === "c") {
                        if (pP === pP.toUpperCase() && PiecesPosition[i - (1 + r)] === PiecesPosition[i - (1 + r)].toLowerCase()) {
                          blackC(n);
                        } else if (pP === pP.toLowerCase() && PiecesPosition[i - (1 + r)] === PiecesPosition[i - (1 + r)].toUpperCase()) {
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
                    if (PiecesPosition[i + (r - 1)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (PiecesPosition[i + (r - 1)] === "C" || PiecesPosition[i + (r - 1)] === "c") {
                        if (pP === pP.toUpperCase() && PiecesPosition[i + (r - 1)] === PiecesPosition[i + (r - 1)].toLowerCase()) {
                          blackC(n);
                        } else if (pP === pP.toLowerCase() && PiecesPosition[i + (r - 1)] === PiecesPosition[i + (r - 1)].toUpperCase()) {
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
                    if (PiecesPosition[i + (r * 8 - 1)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (PiecesPosition[i + (r * 8 - 1)] === "C" || PiecesPosition[i + (r * 8 - 1)] === "c") {
                        if (pP === pP.toUpperCase() && PiecesPosition[i + (r * 8 - 1)] === PiecesPosition[i + (r * 8 - 1)].toLowerCase()) {
                          blackC(n);
                        } else if (pP === pP.toLowerCase() && PiecesPosition[i + (r * 8 - 1)] === PiecesPosition[i + (r * 8 - 1)].toUpperCase()) {
                          whiteC(n);
                        }
                      }
                    }
                  }
                }
              } else if (pP === "Q" || pP === "q") { //QUEEN queen
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
                    if (PiecesPosition[i - (1 + r * 9)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (PiecesPosition[i - (1 + r * 9)] === "C" || PiecesPosition[i - (1 + r * 9)] === "c") {
                        if (pP === pP.toUpperCase() && PiecesPosition[i - (1 + r * 9)] === PiecesPosition[i - (1 + r * 9)].toLowerCase()) {
                          blackC(n);
                        } else if (pP === pP.toLowerCase() && PiecesPosition[i - (1 + r * 9)] === PiecesPosition[i - (1 + r * 9)].toUpperCase()) {
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
                    if (PiecesPosition[i - (1 + r * 7)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (PiecesPosition[i - (1 + r * 7)] === "C" || PiecesPosition[i - (1 + r * 7)] === "c") {
                        if (pP === pP.toUpperCase() && PiecesPosition[i - (1 + r * 7)] === PiecesPosition[i - (1 + r * 7)].toLowerCase()) {
                          blackC(n);
                        } else if (pP === pP.toLowerCase() && PiecesPosition[i - (1 + r * 7)] === PiecesPosition[i - (1 + r * 7)].toUpperCase()) {
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
                    if (PiecesPosition[i + (r * 7 - 1)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (PiecesPosition[i + (r * 7 - 1)] === "C" || PiecesPosition[i + (r * 7 - 1)] === "c") {
                        if (pP === pP.toUpperCase() && PiecesPosition[i + (r * 7 - 1)] === PiecesPosition[i + (r * 7 - 1)].toLowerCase()) {
                          blackC(n);
                        } else if (pP === pP.toLowerCase() && PiecesPosition[i + (r * 7 - 1)] === PiecesPosition[i + (r * 7 - 1)].toUpperCase()) {
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
                    if (PiecesPosition[i + (r * 9 - 1)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (PiecesPosition[i + (r * 9 - 1)] === "C" || PiecesPosition[i + (r * 9 - 1)] === "c") {
                        if (pP === pP.toUpperCase() && PiecesPosition[i + (r * 9 - 1)] === PiecesPosition[i + (r * 9 - 1)].toLowerCase()) {
                          blackC(n);
                        } else if (pP === pP.toLowerCase() && PiecesPosition[i + (r * 9 - 1)] === PiecesPosition[i + (r * 9 - 1)].toUpperCase()) {
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
                    if (PiecesPosition[i - (1 + r * 8)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (PiecesPosition[i - (1 + r * 8)] === "C" || PiecesPosition[i - (1 + r * 8)] === "c") {
                        if (pP === pP.toUpperCase() && PiecesPosition[i - (1 + r * 8)] === PiecesPosition[i - (1 + r * 8)].toLowerCase()) {
                          blackC(n);
                        } else if (pP === pP.toLowerCase() && PiecesPosition[i - (1 + r * 8)] === PiecesPosition[i - (1 + r * 8)].toUpperCase()) {
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
                    if (PiecesPosition[i - (1 + r)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (PiecesPosition[i - (1 + r)] === "C" || PiecesPosition[i - (1 + r)] === "c") {
                        if (pP === pP.toUpperCase() && PiecesPosition[i - (1 + r)] === PiecesPosition[i - (1 + r)].toLowerCase()) {
                          blackC(n);
                        } else if (pP === pP.toLowerCase() && PiecesPosition[i - (1 + r)] === PiecesPosition[i - (1 + r)].toUpperCase()) {
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
                    if (PiecesPosition[i + (r - 1)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (PiecesPosition[i + (r - 1)] === "C" || PiecesPosition[i + (r - 1)] === "c") {
                        if (pP === pP.toUpperCase() && PiecesPosition[i + (r - 1)] === PiecesPosition[i + (r - 1)].toLowerCase()) {
                          blackC(n);
                        } else if (pP === pP.toLowerCase() && PiecesPosition[i + (r - 1)] === PiecesPosition[i + (r - 1)].toUpperCase()) {
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
                    if (PiecesPosition[i + (r * 8 - 1)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (PiecesPosition[i + (r * 8 - 1)] === "C" || PiecesPosition[i + (r * 8 - 1)] === "c") {
                        if (pP === pP.toUpperCase() && PiecesPosition[i + (r * 8 - 1)] === PiecesPosition[i + (r * 8 - 1)].toLowerCase()) {
                          blackC(n);
                        } else if (pP === pP.toLowerCase() && PiecesPosition[i + (r * 8 - 1)] === PiecesPosition[i + (r * 8 - 1)].toUpperCase()) {
                          whiteC(n);
                        }
                      }
                    }
                  }
                }
              } else if (pP === "N" || pP === "n") { //KNIGHT knight
                if (pPn === "C" || pPn === "c") {
                  if (pP === pP.toUpperCase() && pPn === pPn.toLowerCase()) {
                    blackC(n);
                  } else if (pP === pP.toLowerCase() && pPn === pPn.toUpperCase()) {
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
