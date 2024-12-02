const first = (input: string) => {
  for (var line of input.split('\n')) {
    var [left, right] = line.split("   ");
    console.log(left);
  }
  return 11;
};

const expectedFirstSolution = '11';

const second = (input: string) => {
  console.log(input);
  return 'solution 2';
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
