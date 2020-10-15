/*jshint esversion: 6 */

function underWhiteC(n) {
  if (whiteLandingsInCheck.includes(n) === false) {
    whiteLandingsInCheck.push(parseInt(n));
  }
}

function underBlackC(n) {
  if (blackLandingsInCheck.includes(n) === false) {
    blackLandingsInCheck.push(parseInt(n));
  }
}

function landingInCheck(ii, nn) {

  ghostPiecesPosition = Array.from(piecesPosition);

  ghostPiecesPosition[nn - 1] = ghostPiecesPosition[ii - 1];
  ghostPiecesPosition[ii - 1] = "O";

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
    let xMove;
    let yMove;
    let marksToType = [];
    let marksOnBoard = [];
    let gpP = ghostPiecesPosition[i - 1];

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
    } else {
      xMove = 0;
    }

    if (yButSq < undercy113 - 30) {
      yMove = (undercy113 - yButSq) - 30;
      underxyMover("yNegative", xMove, yMove);
    } else if (yButSq > undercy113 - 30) {
      yMove = (yButSq - undercy113) + 30;
      underxyMover("yPositive", xMove, yMove);
    } else {
      yMove = 0;
    }

    // select only marks by type and inside the board
    if (gpP !== "O") { //check if "i" piece selected is not empty
      if (tripleCheck === 0) { //cover Castles moves exceptions
        if (gpP === "C") {
          marksToType = marksToC;
        } else if (gpP === "c") {
          marksToType = marksToc;
        } else if (gpP === "P") {
          marksToType = marksToP;
        } else if (gpP === "p") {
          marksToType = marksTop;
        } else if (gpP === "Q" || gpP === "q") {
          marksToType = marksToQ;
        } else if (gpP === "B" || gpP === "b") {
          marksToType = marksToB;
        } else if (gpP === "R" || gpP === "r") {
          marksToType = marksToR;
        } else if (gpP === "N" || gpP === "n") {
          marksToType = marksToN;
        }
      } else if (tripleCheck === 1 || tripleCheck === 2) {
        if (gpP === "C" && whiteCastlesInCheck.includes(i)) {
          marksToType = marksToX;
        } else if (gpP === "C" && whiteLandingsInCheck.includes(i)) {
          marksToType = marksToX;
        } else if (gpP === "C" && totalBCastles === 1) {
          marksToType = marksToX;
        } else if (gpP === "c" && blackCastlesInCheck.includes(i)) {
          marksToType = marksToX;
        } else if (gpP === "c" && blackLandingsInCheck.includes(i)) {
          marksToType = marksToX;
        } else if (gpP === "c" && totalWCastles === 1) {
          marksToType = marksToX;
        } else if (gpP === "C") {
          marksToType = marksToC;
        } else if (gpP === "c") {
          marksToType = marksToc;
        } else if (gpP === "P") {
          marksToType = marksToP;
        } else if (gpP === "p") {
          marksToType = marksTop;
        } else if (gpP === "Q" || gpP === "q") {
          marksToType = marksToQ;
        } else if (gpP === "B" || gpP === "b") {
          marksToType = marksToB;
        } else if (gpP === "R" || gpP === "r") {
          marksToType = marksToR;
        } else if (gpP === "N" || gpP === "n") {
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
          if (gpP === "B" || gpP === "b" || gpP === "Q" || gpP === "q") {
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
          if (gpP === "R" || gpP === "r" || gpP === "Q" || gpP === "q") {
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
          let gpPn = ghostPiecesPosition[n - 1];
          let markL = parseInt(document.getElementById("underMark" + marksOnBoard[m - 1]).getAttributeNS(null, "cx")) - 5;
          let markR = parseInt(document.getElementById("underMark" + marksOnBoard[m - 1]).getAttributeNS(null, "cx")) + 5;
          let markT = parseInt(document.getElementById("underMark" + marksOnBoard[m - 1]).getAttributeNS(null, "cy")) - 5;
          let markB = parseInt(document.getElementById("underMark" + marksOnBoard[m - 1]).getAttributeNS(null, "cy")) + 5;
          let sqL = parseInt(document.getElementById("Square" + n).getAttributeNS(null, "x"));
          let sqR = parseInt(document.getElementById("Square" + n).getAttributeNS(null, "x")) + 60;
          let sqT = parseInt(document.getElementById("Square" + n).getAttributeNS(null, "y"));
          let sqB = parseInt(document.getElementById("Square" + n).getAttributeNS(null, "y")) + 60;
          if (markL < sqR && markR > sqL && markT < sqB && markB > sqT) { //check collisions marks/squares
            if (gpP === "C") { //CASTLE check if type C
              if (gpPn === "c" && n !== i - 16 && (n === i - 7 || n === i - 9)) { //check exceptions to special Castle's not in check diagonal moves
                underBlackC(n);
              }
              if (gpPn === "c" && n !== i - 16 && (whiteCastlesInCheck.includes(i) || totalWCastles === 1)) { //check exceptions to special Castle's not in check diagonal moves
                underBlackC(n);
              }
              if (gpPn === "c" && n !== i - 16 && (blackCastlesInCheck.includes(n) || totalBCastles === 1)) { //check exceptions to special Castle's not in check diagonal moves
                underBlackC(n);
              }
            } else if (gpP === "c") { //castle check if type c
              if (gpPn === "C" && n !== i + 16 && (n === i + 7 || n === i + 9)) { //check exceptions to special Castle's not in check diagonal moves
                underWhiteC(n);
              }
              if (gpPn === "C" && n !== i + 16 && (blackCastlesInCheck.includes(i) || totalBCastles === 1)) { //check exceptions to special Castle's not in check diagonal moves
                underWhiteC(n);
              }
              if (gpPn === "C" && n !== i + 16 && (whiteCastlesInCheck.includes(n) || totalWCastles === 1)) { //check exceptions to special Castle's not in check diagonal moves
                underWhiteC(n);
              }
            } else if (tripleCheck === 0) {
              if (gpP === "P") { //PAWN
                if (n === i - 9 && gpPn === "c") { //check exceptions to special Castle's not in check diagonal moves
                  underBlackC(n);
                }
                if (n === i - 7 && gpPn === "c") { //check exceptions to special Castle's not in check diagonal moves
                  underBlackC(n);
                }
              } else if (gpP === "p") { //pawn check if type c
                if (n === i + 9 && gpPn === "C") { //check exceptions to special Castle's not in check diagonal moves
                  underWhiteC(n);
                }
                if (n === i + 7 && gpPn === "C") { //check exceptions to special Castle's not in check diagonal moves
                  underWhiteC(n);
                }
              } else if (gpP === "B" || gpP === "b") { //BbBbBbBbBbBbBb
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
                    if (ghostPiecesPosition[i - (1 + r * 9)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (ghostPiecesPosition[i - (1 + r * 9)] === "C" || ghostPiecesPosition[i - (1 + r * 9)] === "c") {
                        if (gpP === gpP.toUpperCase() && ghostPiecesPosition[i - (1 + r * 9)] === ghostPiecesPosition[i - (1 + r * 9)].toLowerCase()) {
                          underBlackC(n);
                        } else if (gpP === gpP.toLowerCase() && ghostPiecesPosition[i - (1 + r * 9)] === ghostPiecesPosition[i - (1 + r * 9)].toUpperCase()) {
                          underWhiteC(n);
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
                    if (ghostPiecesPosition[i - (1 + r * 7)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (ghostPiecesPosition[i - (1 + r * 7)] === "C" || ghostPiecesPosition[i - (1 + r * 7)] === "c") {
                        if (gpP === gpP.toUpperCase() && ghostPiecesPosition[i - (1 + r * 7)] === ghostPiecesPosition[i - (1 + r * 7)].toLowerCase()) {
                          underBlackC(n);
                        } else if (gpP === gpP.toLowerCase() && ghostPiecesPosition[i - (1 + r * 7)] === ghostPiecesPosition[i - (1 + r * 7)].toUpperCase()) {
                          underWhiteC(n);
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
                    if (ghostPiecesPosition[i + (r * 7 - 1)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (ghostPiecesPosition[i + (r * 7 - 1)] === "C" || ghostPiecesPosition[i + (r * 7 - 1)] === "c") {
                        if (gpP === gpP.toUpperCase() && ghostPiecesPosition[i + (r * 7 - 1)] === ghostPiecesPosition[i + (r * 7 - 1)].toLowerCase()) {
                          underBlackC(n);
                        } else if (gpP === gpP.toLowerCase() && ghostPiecesPosition[i + (r * 7 - 1)] === ghostPiecesPosition[i + (r * 7 - 1)].toUpperCase()) {
                          underWhiteC(n);
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
                    if (ghostPiecesPosition[i + (r * 9 - 1)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (ghostPiecesPosition[i + (r * 9 - 1)] === "C" || ghostPiecesPosition[i + (r * 9 - 1)] === "c") {
                        if (gpP === gpP.toUpperCase() && ghostPiecesPosition[i + (r * 9 - 1)] === ghostPiecesPosition[i + (r * 9 - 1)].toLowerCase()) {
                          underBlackC(n);
                        } else if (gpP === gpP.toLowerCase() && ghostPiecesPosition[i + (r * 9 - 1)] === ghostPiecesPosition[i + (r * 9 - 1)].toUpperCase()) {
                          underWhiteC(n);
                        }
                      }
                    }
                  }
                }
              } else if (gpP === "R" || gpP === "r") { //RrRr
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
                    if (ghostPiecesPosition[i - (1 + r * 8)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (ghostPiecesPosition[i - (1 + r * 8)] === "C" || ghostPiecesPosition[i - (1 + r * 8)] === "c") {
                        if (gpP === gpP.toUpperCase() && ghostPiecesPosition[i - (1 + r * 8)] === ghostPiecesPosition[i - (1 + r * 8)].toLowerCase()) {
                          underBlackC(n);
                        } else if (gpP === gpP.toLowerCase() && ghostPiecesPosition[i - (1 + r * 8)] === ghostPiecesPosition[i - (1 + r * 8)].toUpperCase()) {
                          underWhiteC(n);
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
                    if (ghostPiecesPosition[i - (1 + r)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (ghostPiecesPosition[i - (1 + r)] === "C" || ghostPiecesPosition[i - (1 + r)] === "c") {
                        if (gpP === gpP.toUpperCase() && ghostPiecesPosition[i - (1 + r)] === ghostPiecesPosition[i - (1 + r)].toLowerCase()) {
                          underBlackC(n);
                        } else if (gpP === gpP.toLowerCase() && ghostPiecesPosition[i - (1 + r)] === ghostPiecesPosition[i - (1 + r)].toUpperCase()) {
                          underWhiteC(n);
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
                    if (ghostPiecesPosition[i + (r - 1)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (ghostPiecesPosition[i + (r - 1)] === "C" || ghostPiecesPosition[i + (r - 1)] === "c") {
                        if (gpP === gpP.toUpperCase() && ghostPiecesPosition[i + (r - 1)] === ghostPiecesPosition[i + (r - 1)].toLowerCase()) {
                          underBlackC(n);
                        } else if (gpP === gpP.toLowerCase() && ghostPiecesPosition[i + (r - 1)] === ghostPiecesPosition[i + (r - 1)].toUpperCase()) {
                          underWhiteC(n);
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
                    if (ghostPiecesPosition[i + (r * 8 - 1)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (ghostPiecesPosition[i + (r * 8 - 1)] === "C" || ghostPiecesPosition[i + (r * 8 - 1)] === "c") {
                        if (gpP === gpP.toUpperCase() && ghostPiecesPosition[i + (r * 8 - 1)] === ghostPiecesPosition[i + (r * 8 - 1)].toLowerCase()) {
                          underBlackC(n);
                        } else if (gpP === gpP.toLowerCase() && ghostPiecesPosition[i + (r * 8 - 1)] === ghostPiecesPosition[i + (r * 8 - 1)].toUpperCase()) {
                          underWhiteC(n);
                        }
                      }
                    }
                  }
                }
              } else if (gpP === "Q" || gpP === "q") { //QUEEN queen
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
                    if (ghostPiecesPosition[i - (1 + r * 9)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (ghostPiecesPosition[i - (1 + r * 9)] === "C" || ghostPiecesPosition[i - (1 + r * 9)] === "c") {
                        if (gpP === gpP.toUpperCase() && ghostPiecesPosition[i - (1 + r * 9)] === ghostPiecesPosition[i - (1 + r * 9)].toLowerCase()) {
                          underBlackC(n);
                        } else if (gpP === gpP.toLowerCase() && ghostPiecesPosition[i - (1 + r * 9)] === ghostPiecesPosition[i - (1 + r * 9)].toUpperCase()) {
                          underWhiteC(n);
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
                    if (ghostPiecesPosition[i - (1 + r * 7)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (ghostPiecesPosition[i - (1 + r * 7)] === "C" || ghostPiecesPosition[i - (1 + r * 7)] === "c") {
                        if (gpP === gpP.toUpperCase() && ghostPiecesPosition[i - (1 + r * 7)] === ghostPiecesPosition[i - (1 + r * 7)].toLowerCase()) {
                          underBlackC(n);
                        } else if (gpP === gpP.toLowerCase() && ghostPiecesPosition[i - (1 + r * 7)] === ghostPiecesPosition[i - (1 + r * 7)].toUpperCase()) {
                          underWhiteC(n);
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
                    if (ghostPiecesPosition[i + (r * 7 - 1)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (ghostPiecesPosition[i + (r * 7 - 1)] === "C" || ghostPiecesPosition[i + (r * 7 - 1)] === "c") {
                        if (gpP === gpP.toUpperCase() && ghostPiecesPosition[i + (r * 7 - 1)] === ghostPiecesPosition[i + (r * 7 - 1)].toLowerCase()) {
                          underBlackC(n);
                        } else if (gpP === gpP.toLowerCase() && ghostPiecesPosition[i + (r * 7 - 1)] === ghostPiecesPosition[i + (r * 7 - 1)].toUpperCase()) {
                          underWhiteC(n);
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
                    if (ghostPiecesPosition[i + (r * 9 - 1)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (ghostPiecesPosition[i + (r * 9 - 1)] === "C" || ghostPiecesPosition[i + (r * 9 - 1)] === "c") {
                        if (gpP === gpP.toUpperCase() && ghostPiecesPosition[i + (r * 9 - 1)] === ghostPiecesPosition[i + (r * 9 - 1)].toLowerCase()) {
                          underBlackC(n);
                        } else if (gpP === gpP.toLowerCase() && ghostPiecesPosition[i + (r * 9 - 1)] === ghostPiecesPosition[i + (r * 9 - 1)].toUpperCase()) {
                          underWhiteC(n);
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
                    if (ghostPiecesPosition[i - (1 + r * 8)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (ghostPiecesPosition[i - (1 + r * 8)] === "C" || ghostPiecesPosition[i - (1 + r * 8)] === "c") {
                        if (gpP === gpP.toUpperCase() && ghostPiecesPosition[i - (1 + r * 8)] === ghostPiecesPosition[i - (1 + r * 8)].toLowerCase()) {
                          underBlackC(n);
                        } else if (gpP === gpP.toLowerCase() && ghostPiecesPosition[i - (1 + r * 8)] === ghostPiecesPosition[i - (1 + r * 8)].toUpperCase()) {
                          underWhiteC(n);
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
                    if (ghostPiecesPosition[i - (1 + r)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (ghostPiecesPosition[i - (1 + r)] === "C" || ghostPiecesPosition[i - (1 + r)] === "c") {
                        if (gpP === gpP.toUpperCase() && ghostPiecesPosition[i - (1 + r)] === ghostPiecesPosition[i - (1 + r)].toLowerCase()) {
                          underBlackC(n);
                        } else if (gpP === gpP.toLowerCase() && ghostPiecesPosition[i - (1 + r)] === ghostPiecesPosition[i - (1 + r)].toUpperCase()) {
                          underWhiteC(n);
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
                    if (ghostPiecesPosition[i + (r - 1)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (ghostPiecesPosition[i + (r - 1)] === "C" || ghostPiecesPosition[i + (r - 1)] === "c") {
                        if (gpP === gpP.toUpperCase() && ghostPiecesPosition[i + (r - 1)] === ghostPiecesPosition[i + (r - 1)].toLowerCase()) {
                          underBlackC(n);
                        } else if (gpP === gpP.toLowerCase() && ghostPiecesPosition[i + (r - 1)] === ghostPiecesPosition[i + (r - 1)].toUpperCase()) {
                          underWhiteC(n);
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
                    if (ghostPiecesPosition[i + (r * 8 - 1)] !== "O" && r < lineSize) { //following line
                      break;
                    }
                    if (r === lineSize) {
                      if (ghostPiecesPosition[i + (r * 8 - 1)] === "C" || ghostPiecesPosition[i + (r * 8 - 1)] === "c") {
                        if (gpP === gpP.toUpperCase() && ghostPiecesPosition[i + (r * 8 - 1)] === ghostPiecesPosition[i + (r * 8 - 1)].toLowerCase()) {
                          underBlackC(n);
                        } else if (gpP === gpP.toLowerCase() && ghostPiecesPosition[i + (r * 8 - 1)] === ghostPiecesPosition[i + (r * 8 - 1)].toUpperCase()) {
                          underWhiteC(n);
                        }
                      }
                    }
                  }
                }
              } else if (gpP === "N" || gpP === "n") { //KNIGHT knight
                if (gpPn === "C" || gpPn === "c") {
                  if (gpP === gpP.toUpperCase() && gpPn === gpPn.toLowerCase()) {
                    underBlackC(n);
                  } else if (gpP === gpP.toLowerCase() && gpPn === gpPn.toUpperCase()) {
                    underWhiteC(n);
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
