import { marsRover } from './marsRover';
import { expect } from '@jest/globals';

describe('Mars Rover', () => {
    it('should correctly process the example input', () => {
        const input = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

        const expectedOutput = `1 3 N
5 1 E`;

        expect(marsRover(input)).toBe(expectedOutput);
    });
});
