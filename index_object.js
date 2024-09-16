
const game = new Game(
    document.querySelector("[data-id=table]"),
    document.querySelector("[data-btn=start]"),
    document.querySelector("[data-btn=next-cycle]"),
);

game.init();