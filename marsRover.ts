type Direction = 'N' | 'E' | 'S' | 'W';
type Command = 'L' | 'R' | 'M';

interface Position {
    x: number;
    y: number;
    direction: Direction;
}

class Plateau {
    constructor(public width: number, public height: number) {}
}

class Rover {
    constructor(public position: Position) {}

    move(command: Command, plateau: Plateau): void {
        switch (command) {
            case 'L':
                this.turnLeft();
                break;
            case 'R':
                this.turnRight();
                break;
            case 'M':
                this.moveForward(plateau);
                break;
        }
    }

    private turnLeft(): void {
        const directions: Direction[] = ['N', 'W', 'S', 'E'];
        const currentIndex = directions.indexOf(this.position.direction);
        this.position.direction = directions[(currentIndex + 1) % 4];
    }

    private turnRight(): void {
        const directions: Direction[] = ['N', 'E', 'S', 'W'];
        const currentIndex = directions.indexOf(this.position.direction);
        this.position.direction = directions[(currentIndex + 1) % 4];
    }

    private moveForward(plateau: Plateau): void {
        switch (this.position.direction) {
            case 'N':
                if (this.position.y < plateau.height) this.position.y++;
                break;
            case 'E':
                if (this.position.x < plateau.width) this.position.x++;
                break;
            case 'S':
                if (this.position.y > 0) this.position.y--;
                break;
            case 'W':
                if (this.position.x > 0) this.position.x--;
                break;
        }
    }

    getPosition(): string {
        return `${this.position.x} ${this.position.y} ${this.position.direction}`;
    }
}

function parseInput(input: string): [Plateau, Rover[], Command[][]] {
    const lines = input.trim().split('\n');
    const [width, height] = lines[0].split(' ').map(Number);
    const plateau = new Plateau(width, height);

    const rovers: Rover[] = [];
    const commands: Command[][] = [];

    for (let i = 1; i < lines.length; i += 2) {
        const [x, y, direction] = lines[i].split(' ');
        rovers.push(new Rover({ x: Number(x), y: Number(y), direction: direction as Direction }));
        commands.push(lines[i + 1].split('') as Command[]);
    }

    return [plateau, rovers, commands];
}

export function marsRover(input: string): string {
    const [plateau, rovers, commands] = parseInput(input);

    rovers.forEach((rover, index) => {
        commands[index].forEach(command => rover.move(command, plateau));
    });

    return rovers.map(rover => rover.getPosition()).join('\n');
}
