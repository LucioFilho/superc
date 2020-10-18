/*jshint esversion: 6 */

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

  landX = parseInt(document.getElementById("butSquare" + landing).getAttributeNS(null, "x")) + 30;
  landY = parseInt(document.getElementById("butSquare" + landing).getAttributeNS(null, "y")) + 30;

  speedX = leavingX > landX ? parseInt((leavingX - landX) / 30) : speedX = leavingX < landX ? parseInt((landX - leavingX) / 30) : 0;
  speedY = leavingY > landY ? parseInt((leavingY - landY) / 30) : speedY = leavingY < landY ? parseInt((landY - leavingY) / 30) : 0;

  //markMoves
  document.getElementById("mMove1").setAttributeNS(null, "x", leavingX - 30);
  document.getElementById("mMove1").setAttributeNS(null, "y", leavingY - 30);

  let animeEMI = function() {
    let travel = setInterval(function() {

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

        //mMove delayed. The second move's mark.
        document.getElementById("mMove2").setAttributeNS(null, "x", landX - 30);
        document.getElementById("mMove2").setAttributeNS(null, "y", landY - 30);

        //promotion
        if (PromoControl === 1) {
          //pawn's Promotion
          let pStroke1;
          let pStroke2;
          if (PiecesPosition[landing - 1] === PiecesPosition[landing - 1].toUpperCase()) {
            pStroke1 = "rgba(0,0,0,1.0)";
            pStroke2 = "rgba(255,255,255,1.0)";
          } else {
            pStroke1 = "rgba(255,255,255,1.0)";
            pStroke2 = "rgba(0,0,0,1.0)";
          }

          if (extPiecesPosition[landing - 1] !== 0 && (PiecesToRemove === "EMI" || PiecesToRemove === "E")) {
            document.getElementById("extA" + extPiecesPosition[landing - 1]).setAttributeNS(null, "stroke", "transparent");
            document.getElementById("extB" + extPiecesPosition[landing - 1]).setAttributeNS(null, "stroke", "transparent");
          }
          if (midPiecesPosition[landing - 1] !== 0 && (PiecesToRemove === "EMI" || PiecesToRemove === "M")) {
            document.getElementById("midA" + midPiecesPosition[landing - 1]).setAttributeNS(null, "stroke", "transparent");
            document.getElementById("midB" + midPiecesPosition[landing - 1]).setAttributeNS(null, "stroke", "transparent");
          }
          if (intPiecesPosition[landing - 1] && (PiecesToRemove === "EMI" || PiecesToRemove === "I")) {
            document.getElementById("intA" + intPiecesPosition[landing - 1]).setAttributeNS(null, "fill", "transparent");
            document.getElementById("intB" + intPiecesPosition[landing - 1]).setAttributeNS(null, "fill", "transparent");
          }

          extPiecesPosition[landing - 1] = 0;
          midPiecesPosition[landing - 1] = PromoID;
          intPiecesPosition[landing - 1] = PromoID;

          document.getElementById("midA" + PromoID).setAttributeNS(null, "stroke", pStroke1);
          document.getElementById("midB" + PromoID).setAttributeNS(null, "stroke", pStroke2);
          document.getElementById("intA" + PromoID).setAttributeNS(null, "fill", pStroke1);
          document.getElementById("intB" + PromoID).setAttributeNS(null, "fill", pStroke2);


          document.getElementById("midA" + PromoID).setAttributeNS(null, "cx", landX);
          document.getElementById("midA" + PromoID).setAttributeNS(null, "cy", landY);
          document.getElementById("midB" + PromoID).setAttributeNS(null, "cx", landX);
          document.getElementById("midB" + PromoID).setAttributeNS(null, "cy", landY);

          document.getElementById("intA" + PromoID).setAttributeNS(null, "cx", landX);
          document.getElementById("intA" + PromoID).setAttributeNS(null, "cy", landY);
          document.getElementById("intB" + PromoID).setAttributeNS(null, "cx", landX);
          document.getElementById("intB" + PromoID).setAttributeNS(null, "cy", landY);

          PromoID++;
          PromoControl = 0;
        }
        LockFlipBoard = 0;
      }
    }, 1);
  };
  
  animeEMI();
}

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

function coloring(p, q, landing) {
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

function coloringPieces(leaving, landing) {

  if (PiecesPosition[landing - 1] === "C" || PiecesPosition[landing - 1] === "c") {
    fillStroke("disable");
    coloring("ext", "stroke", landing);
    coloring("mid", "stroke", landing);
    coloring("int", "fill", landing);
    extPiecesPosition[landing - 1] = 0;
    midPiecesPosition[landing - 1] = 0;
    intPiecesPosition[landing - 1] = 0;

  } else if (PiecesPosition[landing - 1] === "P") {
    if (PiecesPosition[leaving] === "c" || PiecesPosition[leaving] === "p" || PiecesPosition[leaving] === "r" || PiecesPosition[leaving] === "n") {
      fillStroke("disable");
      coloring("ext", "stroke", landing);
      extPiecesPosition[landing - 1] = 0;
    } else if (PiecesPosition[leaving] === "b" || PiecesPosition[leaving] === "q") {
      fillStroke("black");
      coloring("ext", "stroke", landing);
    }

  } else if (PiecesPosition[landing - 1] === "p") {
    if (PiecesPosition[leaving] === "C" || PiecesPosition[leaving] === "P" || PiecesPosition[leaving] === "R" || PiecesPosition[leaving] === "N") {
      fillStroke("disable");
      coloring("ext", "stroke", landing);
      extPiecesPosition[landing - 1] = 0;
    } else if (PiecesPosition[leaving] === "B" || PiecesPosition[leaving] === "Q") {
      fillStroke("white");
      coloring("ext", "stroke", landing);
    }

  } else if (PiecesPosition[landing - 1] === "B") {
    if (PiecesPosition[leaving] === "b" || PiecesPosition[leaving] === "q") {
      fillStroke("disable");
      coloring("mid", "stroke", landing);
      midPiecesPosition[landing - 1] = 0;
    } else if (PiecesPosition[leaving] === "c") {
      if (BlackCastlesInCheck.includes(BSqSel)) {
        fillStroke("disable");
        coloring("mid", "stroke", landing);
        midPiecesPosition[landing - 1] = 0;
      } else {
        fillStroke("black");
        coloring("mid", "stroke", landing);
      }
    } else if (PiecesPosition[leaving] === "p" || PiecesPosition[leaving] === "n" || PiecesPosition[leaving] === "r") {
      fillStroke("black");
      coloring("mid", "stroke", landing);
    }

  } else if (PiecesPosition[landing - 1] === "b") {
    if (PiecesPosition[leaving] === "B" || PiecesPosition[leaving] === "Q") {
      fillStroke("disable");
      coloring("mid", "stroke", landing);
      midPiecesPosition[landing - 1] = 0;
    } else if (PiecesPosition[leaving] === "C") {
      if (WhiteCastlesInCheck.includes(BSqSel)) {
        fillStroke("disable");
        coloring("mid", "stroke", landing);
        midPiecesPosition[landing - 1] = 0;
      } else {
        fillStroke("white");
        coloring("mid", "stroke", landing);
      }
    } else if (PiecesPosition[leaving] === "P" || PiecesPosition[leaving] === "N" || PiecesPosition[leaving] === "R") {
      fillStroke("white");
      coloring("mid", "stroke", landing);
    }

  } else if (PiecesPosition[landing - 1] === "Q") {
    if (PiecesPosition[leaving] === "b" || PiecesPosition[leaving] === "q" || PiecesPosition[leaving] === "r" || PiecesPosition[leaving] === "c") {
      fillStroke("disable");
      coloring("mid", "stroke", landing);
      coloring("int", "fill", landing);
      midPiecesPosition[landing - 1] = 0;
      intPiecesPosition[landing - 1] = 0;
    } else if (PiecesPosition[leaving] === "p" || PiecesPosition[leaving] === "n") {
      fillStroke("black");
      coloring("mid", "stroke", landing);
      coloring("int", "fill", landing);
    }

  } else if (PiecesPosition[landing - 1] === "q") {
    if (PiecesPosition[leaving] === "B" || PiecesPosition[leaving] === "C" || PiecesPosition[leaving] === "Q" || PiecesPosition[leaving] === "R") {
      fillStroke("disable");
      coloring("mid", "stroke", landing);
      coloring("int", "fill", landing);
      midPiecesPosition[landing - 1] = 0;
      intPiecesPosition[landing - 1] = 0;
    } else if (PiecesPosition[leaving] === "P" || PiecesPosition[leaving] === "N") {
      fillStroke("white");
      coloring("mid", "stroke", landing);
      coloring("int", "fill", landing);
    }

  } else if (PiecesPosition[landing - 1] === "R") {
    if (PiecesPosition[leaving] === "b" || PiecesPosition[leaving] === "q") {
      fillStroke("black");
      coloring("int", "fill", landing);
    } else if (PiecesPosition[leaving] === "c" || PiecesPosition[leaving] === "p" || PiecesPosition[leaving] === "n" || PiecesPosition[leaving] === "r") {
      fillStroke("disable");
      coloring("int", "fill", landing);
      intPiecesPosition[landing - 1] = 0;
    }

  } else if (PiecesPosition[landing - 1] === "r") {
    if (PiecesPosition[leaving] === "B" || PiecesPosition[leaving] === "Q") {
      fillStroke("white");
      coloring("int", "fill", landing);
    } else if (PiecesPosition[leaving] === "C" || PiecesPosition[leaving] === "P" || PiecesPosition[leaving] === "N" || PiecesPosition[leaving] === "R") {
      fillStroke("disable");
      coloring("int", "fill", landing);
      intPiecesPosition[landing - 1] = 0;
    }

  } else if (PiecesPosition[landing - 1] === "N") {
    if (PiecesPosition[leaving] === "b" || PiecesPosition[leaving] === "q" || PiecesPosition[leaving] === "c" || PiecesPosition[leaving] === "p" || PiecesPosition[leaving] === "n") {
      fillStroke("disable");
      coloring("ext", "stroke", landing);
      coloring("mid", "stroke", landing);
      extPiecesPosition[landing - 1] = 0;
      midPiecesPosition[landing - 1] = 0;
    } else if (PiecesPosition[leaving] === "r") {
      fillStroke("black");
      coloring("ext", "stroke", landing);
      coloring("mid", "stroke", landing);
    }

  } else if (PiecesPosition[landing - 1] === "n") {
    if (PiecesPosition[leaving] === "B" || PiecesPosition[leaving] === "Q" || PiecesPosition[leaving] === "C" || PiecesPosition[leaving] === "P" || PiecesPosition[leaving] === "N") {
      fillStroke("disable");
      coloring("ext", "stroke", landing);
      coloring("mid", "stroke", landing);
      extPiecesPosition[landing - 1] = 0;
      midPiecesPosition[landing - 1] = 0;
    } else if (PiecesPosition[leaving] === "R") {
      fillStroke("white");
      coloring("ext", "stroke", landing);
      coloring("mid", "stroke", landing);
    }
  }
}

function movingPiece(i) {

  Turn = PiecesPosition[BSqSel - 1] === PiecesPosition[BSqSel - 1].toUpperCase() ? "b" : "W";

  MMoveLeaving = i;
  MMoveLanding = BSqSel;
  let leaving = BSqSel - 1;
  let landing = i;

  coloringPieces(leaving, landing);

  LandingsAgain = 0;
  Again = 0;
  switch (PiecesPosition[BSqSel - 1]) { //identify leaving piece
    case "C":
      switch (PiecesPosition[i - 1]) { //identify if pieces in landing square
        case "O":
        case "c":
        case "n":
        case "q":
        case "r":
          PiecesPosition[BSqSel - 1] = WhiteCastlesInCheck.includes(BSqSel) ? "O" : "Q";

          if (PiecesPosition[BSqSel - 1] === "O") {
            if (TotalWCastles > 1 && i < 9) {
              PiecesPosition[i - 1] = "Q";
              PromoControl = 1;
              PiecesToRemove = "EMI";
            } else {
              PiecesPosition[i - 1] = "C";
            }
            animePiece(leaving, landing, "EMI");

          } else if (PiecesPosition[BSqSel - 1] === "Q") {
            if (i < 9) {
              PiecesPosition[i - 1] = "Q";
              PromoControl = 1;
              PiecesToRemove = "EMI";
            } else {
              PiecesPosition[i - 1] = "P";
            }
            animePiece(leaving, landing, "E");
          }
          break;
        case "p":
          PiecesPosition[BSqSel - 1] = "O";
          PiecesPosition[i - 1] = "C";
          animePiece(leaving, landing, "EMI");
          break;
        case "b":
          PiecesPosition[BSqSel - 1] = WhiteCastlesInCheck.includes(BSqSel) ? "O" : "Q";

          if (PiecesPosition[BSqSel - 1] === "O") {
            PiecesPosition[i - 1] = "C";
            animePiece(leaving, landing, "EMI");

          } else if (PiecesPosition[BSqSel - 1] === "Q") {
            PiecesPosition[i - 1] = "N";
            animePiece(leaving, landing, "E");
          }
          break;
        case "B":
          PiecesPosition[BSqSel - 1] = "Q";
          PiecesPosition[i - 1] = "N";
          animePiece(leaving, landing, "E");
          break;
        case "Q":
          PiecesPosition[BSqSel - 1] = "Q";
          PiecesPosition[i - 1] = "C";
          animePiece(leaving, landing, "E");
          break;
      }
      break;
    case "c":
      switch (PiecesPosition[i - 1]) { //identify if pieces in landing square
        case "O":
        case "C":
        case "N":
        case "Q":
        case "R":
          PiecesPosition[BSqSel - 1] = BlackCastlesInCheck.includes(BSqSel) ? "O" : "q";

          if (PiecesPosition[BSqSel - 1] === "O") {
            if (TotalBCastles > 1 && i > 56) {
              PiecesPosition[i - 1] = "q";
              PromoControl = 1;
              PiecesToRemove = "EMI";
            } else {
              PiecesPosition[i - 1] = "c";
            }
            animePiece(leaving, landing, "EMI");
          } else if (PiecesPosition[BSqSel - 1] === "q") {
            if (i > 56) {
              PiecesPosition[i - 1] = "q";
              PromoControl = 1;
              PiecesToRemove = "EMI";
            } else {
              PiecesPosition[i - 1] = "p";
            }
            animePiece(leaving, landing, "E");
          }
          break;
        case "P":
          PiecesPosition[BSqSel - 1] = "O";
          PiecesPosition[i - 1] = "c";
          animePiece(leaving, landing, "EMI");
          break;
        case "B":
          PiecesPosition[BSqSel - 1] = BlackCastlesInCheck.includes(BSqSel) ? "O" : "q";

          if (PiecesPosition[BSqSel - 1] === "O") {
            PiecesPosition[i - 1] = "c";
            animePiece(leaving, landing, "EMI");

          } else if (PiecesPosition[BSqSel - 1] === "q") {
            PiecesPosition[i - 1] = "n";
            animePiece(leaving, landing, "E");
          }
          break;
        case "b":
          PiecesPosition[BSqSel - 1] = "q";
          PiecesPosition[i - 1] = "n";
          animePiece(leaving, landing, "E");
          break;
        case "q":
          PiecesPosition[BSqSel - 1] = "q";
          PiecesPosition[i - 1] = "c";
          animePiece(leaving, landing, "E");
          break;
      }
      break;
    case "P":
      switch (PiecesPosition[i - 1]) { //identify if pieces in landing square
        case "O":
        case "c":
        case "r":
        case "n":
        case "p":
          PiecesPosition[BSqSel - 1] = "O";

          if (i < 9) {
            PiecesPosition[i - 1] = "Q";
            PromoControl = 1;
            PiecesToRemove = "E";
          } else {
            PiecesPosition[i - 1] = "P";
          }
          animePiece(leaving, landing, "E");

          break;
        case "q":
        case "Q":
          PiecesPosition[BSqSel - 1] = "O";
          if (i < 9) {
            PiecesPosition[i - 1] = "Q";
            PromoControl = 1;
            PiecesToRemove = "EMI";
          } else {
            PiecesPosition[i - 1] = "C";
          }
          animePiece(leaving, landing, "E");
          break;
        case "B":
        case "b":
          PiecesPosition[BSqSel - 1] = "O";
          PiecesPosition[i - 1] = "N";
          animePiece(leaving, landing, "E");
          break;
      }
      break;
    case "p":
      switch (PiecesPosition[i - 1]) { //identify if pieces in landing square
        case "O":
        case "C":
        case "R":
        case "N":
        case "P":
          PiecesPosition[BSqSel - 1] = "O";
          if (i > 56) {
            PiecesPosition[i - 1] = "q";
            PromoControl = 1;
            PiecesToRemove = "E";
          } else {
            PiecesPosition[i - 1] = "p";
          }
          animePiece(leaving, landing, "E");
          break;
        case "Q":
        case "q":
          PiecesPosition[BSqSel - 1] = "O";
          if (i > 56) {
            PiecesPosition[i - 1] = "q";
            PromoControl = 1;
            PiecesToRemove = "EMI";
          } else {
            PiecesPosition[i - 1] = "c";
          }
          animePiece(leaving, landing, "E");
          break;
        case "b":
        case "B":
          PiecesPosition[BSqSel - 1] = "O";
          PiecesPosition[i - 1] = "n";
          animePiece(leaving, landing, "E");
          break;
      }
      break;
    case "Q":
      switch (PiecesPosition[i - 1]) { //identify if pieces in landing square
        case "O":
        case "c":
        case "b":
        case "n":
        case "q":
          PiecesPosition[BSqSel - 1] = "R";
          PiecesPosition[i - 1] = "B";
          animePiece(leaving, landing, "M");
          break;
        case "r":
        case "R":
          PiecesPosition[BSqSel - 1] = "R";
          PiecesPosition[i - 1] = "Q";
          animePiece(leaving, landing, "M");
          break;
        case "p":
        case "P":
          PiecesPosition[BSqSel - 1] = "R";
          PiecesPosition[i - 1] = "N";
          animePiece(leaving, landing, "M");
          break;
      }
      break;
    case "q":
      switch (PiecesPosition[i - 1]) { //identify if pieces in landing square
        case "O":
        case "C":
        case "B":
        case "N":
        case "Q":
          PiecesPosition[BSqSel - 1] = "r";
          PiecesPosition[i - 1] = "b";
          animePiece(leaving, landing, "M");
          break;
        case "R":
        case "r":
          PiecesPosition[BSqSel - 1] = "r";
          PiecesPosition[i - 1] = "q";
          animePiece(leaving, landing, "M");
          break;
        case "P":
        case "p":
          PiecesPosition[BSqSel - 1] = "r";
          PiecesPosition[i - 1] = "n";
          animePiece(leaving, landing, "M");
          break;
      }
      break;
    case "B":
      switch (PiecesPosition[i - 1]) { //identify if pieces in landing square
        case "O":
        case "c":
        case "b":
        case "n":
        case "q":
          PiecesPosition[BSqSel - 1] = "O";
          PiecesPosition[i - 1] = "B";
          animePiece(leaving, landing, "M");
          break;
        case "r":
        case "R":
          PiecesPosition[BSqSel - 1] = "O";
          PiecesPosition[i - 1] = "Q";
          animePiece(leaving, landing, "M");
          break;
        case "p":
        case "P":
          PiecesPosition[BSqSel - 1] = "O";
          PiecesPosition[i - 1] = "N";
          animePiece(leaving, landing, "M");
          break;
      }
      break;
    case "b":
      switch (PiecesPosition[i - 1]) { //identify if pieces in landing square
        case "O":
        case "C":
        case "B":
        case "N":
        case "Q":
          PiecesPosition[BSqSel - 1] = "O";
          PiecesPosition[i - 1] = "b";
          animePiece(leaving, landing, "M");
          break;
        case "R":
        case "r":
          PiecesPosition[BSqSel - 1] = "O";
          PiecesPosition[i - 1] = "q";
          animePiece(leaving, landing, "M");
          break;
        case "P":
        case "p":
          PiecesPosition[BSqSel - 1] = "O";
          PiecesPosition[i - 1] = "n";
          animePiece(leaving, landing, "M");
          break;
      }
      break;
    case "R":
      switch (PiecesPosition[i - 1]) { //identify if pieces in landing square
        case "O":
        case "p":
        case "c":
        case "q":
        case "r":
          PiecesPosition[BSqSel - 1] = "O";
          PiecesPosition[i - 1] = "R";
          animePiece(leaving, landing, "I");
          break;
        case "b":
        case "B":
          PiecesPosition[BSqSel - 1] = "O";
          PiecesPosition[i - 1] = "Q";
          animePiece(leaving, landing, "I");
          break;
        case "n":
        case "N":
          PiecesPosition[BSqSel - 1] = "O";
          if (i < 9) {
            PiecesPosition[i - 1] = "Q";
            PromoControl = 1;
            PiecesToRemove = "EMI";
          } else {
            PiecesPosition[i - 1] = "C";
          }
          animePiece(leaving, landing, "I");
          break;
      }
      break;
    case "r":
      switch (PiecesPosition[i - 1]) { //identify if pieces in landing square
        case "O":
        case "P":
        case "C":
        case "Q":
        case "R":
          PiecesPosition[BSqSel - 1] = "O";
          PiecesPosition[i - 1] = "r";
          animePiece(leaving, landing, "I");
          break;
        case "B":
        case "b":
          PiecesPosition[BSqSel - 1] = "O";
          PiecesPosition[i - 1] = "q";
          animePiece(leaving, landing, "I");
          break;
        case "N":
        case "n":
          PiecesPosition[BSqSel - 1] = "O";
          if (i > 56) {
            PiecesPosition[i - 1] = "q";
            PromoControl = 1;
            PiecesToRemove = "EMI";
          } else {
            PiecesPosition[i - 1] = "c";
          }
          animePiece(leaving, landing, "I");
          break;
      }
      break;
    case "N":
      switch (PiecesPosition[i - 1]) { //identify if pieces in landing square
        case "O":
        case "p":
        case "c":
        case "r":
        case "n":
          PiecesPosition[BSqSel - 1] = "B";
          if (i < 9) {
            PiecesPosition[i - 1] = "Q";
            PromoControl = 1;
            PiecesToRemove = "EMI";
          } else {
            PiecesPosition[i - 1] = "P";
          }
          animePiece(leaving, landing, "E");
          break;
        case "b":
        case "B":
          PiecesPosition[BSqSel - 1] = "B";
          PiecesPosition[i - 1] = "N";
          animePiece(leaving, landing, "E");
          break;
        case "q":
        case "Q":
          PiecesPosition[BSqSel - 1] = "B";
          if (i < 9) {
            PiecesPosition[i - 1] = "Q";
            PromoControl = 1;
            PiecesToRemove = "EMI";
          } else {
            PiecesPosition[i - 1] = "C";
          }
          animePiece(leaving, landing, "E");
          break;
      }
      break;
    case "n":
      switch (PiecesPosition[i - 1]) { //identify if pieces in landing square
        case "O":
        case "P":
        case "C":
        case "R":
        case "N":
          PiecesPosition[BSqSel - 1] = "b";
          if (i > 56) {
            PiecesPosition[i - 1] = "q";
            PromoControl = 1;
            PiecesToRemove = "EMI";
          } else {
            PiecesPosition[i - 1] = "p";
          }
          animePiece(leaving, landing, "E");
          break;
        case "B":
        case "b":
          PiecesPosition[BSqSel - 1] = "b";
          PiecesPosition[i - 1] = "n";
          animePiece(leaving, landing, "E");
          break;
        case "Q":
        case "q":
          PiecesPosition[BSqSel - 1] = "b";
          if (i > 56) {
            PiecesPosition[i - 1] = "q";
            PromoControl = 1;
            PiecesToRemove = "EMI";
          } else {
            PiecesPosition[i - 1] = "c";
          }
          animePiece(leaving, landing, "E");
          break;
      }
      break;
  }
  call888(); //count how many castles on board
  shortCode();
  castlesInCheck(); //review castles in check

}
