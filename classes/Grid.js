class Grid {
    /**
    * Represente une grille.
    * @constructor
    * @param {number} rowNumber - Le nombre de ligne.
    * @param {number} colNumber - Le nombre de colonne.
    */
    constructor(rowNumber, colNumber) {
        this.rowNumber = rowNumber
        this.colNumber = colNumber

        this.cells = []
        for (let row = 0; row < rowNumber; row++) {
            let rowCell = []
            for (let col = 0; col < colNumber; col++) {
                rowCell.push(
                    new Cell(row, col, false)
                )
            }
            this.cells.push(rowCell)
        }
    }


    /**
     * Change l'état d'une cellule.
     * @param {number} row - La ligne de la cellule à changer.
     * @param {number} col - La colonne de la cellule à changer.
     */
    changeCellState(row, col) {
        let currentCell = this.cells[row][col]
        currentCell.changeState()
        this.cells[row][col] = currentCell
    }

    /**
     * Calcul la prochaine génération.
     */
    computeNextCycle() {
        //Création d'un tableau avec des cellules mortes
        let newCellsArray = this.cells

        //Boucle sur les ancienne cellules
        for (let row = 0; row < this.cells.length; row++) {
            for (let col = 0; col < this.cells[row].length; col++) {
                //Création d'une nouvelle cellule
                const newCell = Cell.createFromAnother(newCellsArray[row][col]);
                const oldCell = Cell.createFromAnother(this.cells[row][col]);
                const neighboursAlive = this.countNeighbours(row, col)
                console.log(row + " " + col + " = " + neighboursAlive);

                //Modification de l'état de la nouvelle en fonction de l'ancien + des voisines
                if (!oldCell.isAlive) {
                    if (neighboursAlive == 3) {
                        oldCell.isAlive = true;
                    } else {
                        oldCell.isAlive = false;
                    }
                } else {
                    if (neighboursAlive != 2 && neighboursAlive != 3) {
                        oldCell.isAlive = false;
                    } else {
                        oldCell.isAlive = true;
                    }
                }
                if (newCell.isAlive == true && oldCell.isAlive == true) {
                    newCell.getOld()
                } else {
                    newCell.resetAge()
                }

                newCellsArray[row][col] = newCell
            }
        }


        //On met à jour le tableau des cellules
        this.cells = newCellsArray
    }

    /**
     * Permet de compter le nombre de cellules voisine vivante pour un tableau, une ligne et une colonne donnée 
     * @param {number} row - La ligne de la cellule cible.
     * @param {number} col - La colonne de la cellule cible.
     * @return {number} Le nombre de cellule vivante voisines
     */
    countNeighbours(row, col) {
        let neighboursCount = 0;

        let topLeftCell = this.getCell(row - 1, col - 1);
        let topCell = this.getCell(row - 1, col)
        let topRight = this.getCell(row - 1, col + 1)
        let leftCell = this.getCell(row, col - 1)
        let rightCell = this.getCell(row, col + 1)
        let bottomLeftCell = this.getCell(row + 1, col - 1)
        let bottomCell = this.getCell(row + 1, col)
        let bottomRightCell = this.getCell(row + 1, col + 1)

        if (topLeftCell && topLeftCell.isAlive) {
            neighboursCount++
        }
        if (topCell && topCell.isAlive) {
            neighboursCount++
        }
        if (topRight && topRight.isAlive) {
            neighboursCount++
        }
        if (leftCell && leftCell.isAlive) {
            neighboursCount++
        }
        if (rightCell && rightCell.isAlive) {
            neighboursCount++
        }
        if (bottomLeftCell && bottomLeftCell.isAlive) {
            neighboursCount++
        }
        if (bottomCell && bottomCell.isAlive) {
            neighboursCount++
        }
        if (bottomRightCell && bottomRightCell.isAlive) {
            neighboursCount++
        }

        return neighboursCount;
    }

    /**
     * Récupère la cellule au coordonnées données. 
     * @param {string} row - La ligne de la cellule cible.
     * @param {string} col - La colonne de la cellule cible.
     * @return {Cell|null} La cellule si elle existe, sinon null
     */
    getCell(row, col) {
        if (row < 0 || col < 0 || row >= this.rowNumber || col >= this.colNumber) {
            return null
        }
        return this.cells[row][col]
    }
}