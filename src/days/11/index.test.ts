import Puzzle from './Puzzle';

test('P1 Example', () => {
    const puzzle = new Puzzle();
    puzzle.parse(puzzle.read('example.p1.txt'));
    expect(puzzle.p1()).toBe(55312);
});
