type Puzzle = {
  first: (input: string) => string;
  exampleFirstSolution: string;
  expectedFirstSolution: string;
  second: (input: string) => string;
  expectedSecondSolution: string;
  exampleSecondSolution: string;
};

export default Puzzle;
