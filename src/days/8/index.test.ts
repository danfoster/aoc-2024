import Puzzle from './Puzzle';

test('P1 Example', () => {
    const puzzle = new Puzzle();
    puzzle.parse(puzzle.read('example.p1.txt'));
    expect(puzzle.p1()).toBe(14);
});

test('P2 Example', () => {
    const puzzle = new Puzzle();
    puzzle.parse(puzzle.read('example.p2.txt'));
    puzzle.p1();
    expect(puzzle.p2()).toBe(34);
});
