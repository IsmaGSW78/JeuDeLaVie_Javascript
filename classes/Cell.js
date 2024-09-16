class Cell {
    constructor(x, y, isAlive) {
        this.x = x
        this.y = y
        this.isAlive = isAlive
        this.age = 0
    }

    getOld() {
        this.age++
    }

    resetAge() {
        this.age = 0
    }

    changeState() {
        this.isAlive = !this.isAlive
    }


    static createFromAnother(cell) {
        let newCell = new Cell();
        newCell.x = cell.x;
        newCell.y = cell.y;
        newCell.isAlive = cell.isAlive;
        newCell.age = cell.age;
        return newCell;
    }
}