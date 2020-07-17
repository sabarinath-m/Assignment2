const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
//initial is the initial generation
var initial = [];

//findNeighborCount returns the total number of alive neighbors

function findNeighborCount(irow, icolumn, bound) {
  // irow and icolumn will provide the postion of a particular element
  // size of 2-D list is given by bound
  let row = Number(irow);
  let column = Number(icolumn);
  let count = 0;
  if (row - 1 >= 0) {
    if (initial[row - 1][column] == "x") count++;
  }
  if (row - 1 >= 0 && column - 1 >= 0) {
    if (initial[row - 1][column - 1] == "x") count++;
  }
  if (row - 1 >= 0 && column + 1 < bound) {
    if (initial[row - 1][column + 1] == "x") count++;
  }
  if (column - 1 >= 0) {
    if (initial[row][column - 1] == "x") count++;
  }
  if (column + 1 < bound) {
    if (initial[row][column + 1] == "x") count++;
  }
  if (row + 1 < bound && column - 1 >= 0) {
    if (initial[row + 1][column - 1] == "x") count++;
  }
  if (row + 1 < bound && column + 1 < bound) {
    if (initial[row + 1][column + 1] == "x") count++;
  }

  if (row + 1 < bound) {
    if (initial[row + 1][column] == "x") count++;
  }
  return count;
}

//nextGenCreation returns nextgeneration 2-D list that is our output

function nextGenCreation(nextGen) {
  for (let row in initial) {
    for (let column in initial[row]) {
      let initialElement = initial[row][column];
      let neighborCount = findNeighborCount(row, column, initial.length);
      if (initialElement == "x") {
        if (neighborCount < 2 || neighborCount > 3) {
          nextGen[row][column] = "-"; //becomes dead cell
        } else if (neighborCount == 2 || neighborCount == 3) {
          nextGen[row][column] = "x"; //live cell
        }
      } else if (initialElement == "-") {
        if (neighborCount == 3) {
          nextGen[row][column] = "x"; //becomes alive cell
        }
      }
    }
  }
  return nextGen;
}

// getInput receives multiline input from console and assign it to inital list

function getInput() {
  rl.on("line", function (cmd) {
    console.log("enter the complete row or ctrl-d for exit");
    initial.push(cmd);
  });
}

//processInput stops receving input on user click ctrl-D
//transform received input to a 2-D list having 'x' and '-' as elements
//call nextGenCreation and console the nextGeneration as output

function processInput() {
  rl.on("close", function (cmd) {
    for (let row in initial) {
      initial[row] = initial[row].split(" ");
    }
    let nextGen = [];
    for (let row = 0; row < initial.length; row++) {
      nextGen.push([]);
      for (let column = 0; column < initial.length; column++) {
        nextGen[row].push("-");
      }
    }
    let nextGeneration = nextGenCreation(nextGen);
    console.log("Next generation is:");
    for (row in nextGeneration) {
      for (column in nextGeneration[row]) {
        process.stdout.write(nextGeneration[row][column] + " ");
      }
      process.stdout.write("\n");
    }
    process.exit(0);
  });
}
console.log("enter the complete row with space b/w each element");
console.log("or");
console.log("ctrl-d for exit");
getInput();
processInput();
