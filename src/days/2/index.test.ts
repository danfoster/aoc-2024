import Puzzle from './Puzzle.ts';

test('P1 Example', () => {
    const puzzle = new Puzzle();
    puzzle.parse(puzzle.read('example.p1.txt'));
    expect(puzzle.p1()).toBe(2);
});

test('P2 Example', () => {
    const puzzle = new Puzzle();
    puzzle.parse(puzzle.read('example.p2.txt'));
    puzzle.p1();
    expect(puzzle.p2()).toBe(4);
});
