class Game {
    ROW_NUMBER = 3
    COLUMN_NUMBER = 3

    constructor(tableElement, btnStartElement, btnNextCycleElement) {
        this.tableElement = tableElement
        this.btnStartElement = btnStartElement
        this.btnNextCycleElement = btnNextCycleElement
        this.timer = null
    }

    //Point d'entrée de ma classe Game
    init() {
        this.grid = new Grid(this.ROW_NUMBER, this.COLUMN_NUMBER)

        this.render()

        this.btnStartElement.addEventListener("click", () => {
            if (this.timer == null) {
                this.btnStartElement.textContent = "Stop"
                this.timer = setInterval(() => {
                    this.nextState()
                }, 250)
            } else {
                this.btnStartElement.textContent = "Start"
                clearInterval(this.timer);
                this.timer = null
            }
        })
        this.btnNextCycleElement.addEventListener("click", () => {
            this.nextState()
        })
    }

    nextState() {
        this.grid.computeNextCycle()
        this.render()

    }

    //Dessine le tableau html
    render() {
        //On supprime l'ancien tableau
        this.tableElement.innerHTML = ""
        //On parcours la grille 
        for (let row = 0; row < this.grid.cells.length; row++) {

            //Création d'une ligne
            let tr = document.createElement("tr")
            for (let col = 0; col < this.grid.cells[row].length; col++) {
                //Récupération de la cellule
                let cell = this.grid.cells[row][col]
                //Création de la case
                let td = document.createElement("td")
                td.dataset.row = row
                td.dataset.col = col
                td.dataset.cell = ""
                if (cell.isAlive == true) {
                    td.classList.add("alive")
                }

                td.addEventListener("click", () => {
                    this.grid.changeCellState(row, col)
                    this.render()
                });

                //Ajout de la case dans la ligne
                tr.appendChild(td);
            }
            //Ajout de la ligne dans le tableau
            this.tableElement.appendChild(tr);
        }
    }
}