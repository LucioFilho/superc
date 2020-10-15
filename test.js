if (piecesPosition[i - 1] === "C" && whiteCastlesInCheck.includes(i)) {
    marksToType = marksToX; //get array squares Castle in check can go
} else if (piecesPosition[i - 1] === "c" && blackCastlesInCheck.includes(i)) {
    marksToType = marksToX; //get array squares castle in check can go
} else if (piecesPosition[i - 1] === "C") {
    marksToType = marksToC;
} else if (piecesPosition[i - 1] === "c") {
    marksToType = marksToc;
} else if (piecesPosition[i - 1] === "P") {
    marksToType = marksToP;
} else if (piecesPosition[i - 1] === "p") {
    marksToType = marksTop;
} else if (piecesPosition[i - 1] === "Q") {
    marksToType = marksToQ;
} else if (piecesPosition[i - 1] === "q") {
    marksToType = marksToq;
} else if (piecesPosition[i - 1] === "B") {
    marksToType = marksToB;
} else if (piecesPosition[i - 1] === "b") {
    marksToType = marksTob;
} else if (piecesPosition[i - 1] === "R") {
    marksToType = marksToR;
} else if (piecesPosition[i - 1] === "r") {
    marksToType = marksTor;
} else if (piecesPosition[i - 1] === "N") {
    marksToType = marksToN;
} else if (piecesPosition[i - 1] === "n") {
    marksToType = marksTon;
}