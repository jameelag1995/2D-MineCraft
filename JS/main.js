/* -------------------------------------------------------------------------- */
/*                              CREATE GAME WORLD                             */
/* -------------------------------------------------------------------------- */
const NumOfRows = 10;
const NumOfColums = 15;
const gameWorld = document.getElementById("game-world");

function CreateWorld() {
    for (let i = 0; i < NumOfRows; i++) {
        const row = addRow();
        gameWorld.append(row);
        for (let j = 0; j < NumOfColums; j++) {
            const cell = addCell();
            if (i < 6) {
                if (i > 1 && j >= 0 && j < i - 1) {
                    cell.classList.add("stone");
                } else if (i > 0 && i < 4 && j >= 8 && j <= 10) {
                    cell.classList.add("leaves");
                } else if (i >= 4 && i <= 5 && j == 9) {
                    cell.classList.add("wood");
                } else {
                    cell.classList.add("sky");
                }
            } else if (i == 6) {
                cell.classList.add("grass");
            } else {
                let rndNum = Math.random();
                if (rndNum > 0.5) {
                    cell.classList.add("dirt");
                } else {
                    cell.classList.add("gold");
                }
            }

            row.append(cell);
        }
    }
}

const addRow = () => {
    const row = document.createElement("div");
    row.className = "row";
    return row;
};

const addCell = () => {
    const cell = document.createElement("div");
    cell.className = "cell";
    return cell;
};

CreateWorld();

/* -------------------------------------------------------------------------- */
/*                             Create Tools Events                            */
/* -------------------------------------------------------------------------- */
const pickaxe = document.querySelector(".pickaxe");
const axe = document.querySelector(".axe");
const shovel = document.querySelector(".shovel");
let currTool = 
pickaxe.addEventListener("click", (e) => {
    if (currTool != undefined) {
        currTool.classList.remove("currtool");
    }
    currTool = pickaxe;
    currTool.classList.add("currtool");
});
pickaxe.click();

axe.addEventListener("click", (e) => {
    if (currTool != undefined) {
        currTool.classList.remove("currtool");
    }
    currTool = axe;
    currTool.classList.add("currtool");
});

shovel.addEventListener("click", (e) => {
    if (currTool != undefined) {
        currTool.classList.remove("currtool");
    }
    currTool = shovel;
    currTool.classList.add("currtool");
});

/* -------------------------------------------------------------------------- */
/*              Rendering Tiles functionality & last picked item              */
/* -------------------------------------------------------------------------- */
let lastPickedItem = document.querySelector(".last-picked");
function renderTiles() {
    const tiles = document.querySelectorAll(".cell");
    tiles.forEach((tile) => {
        // console.log(tile.classList[tile.classList.length - 1]);
        checkTile(tile);
    });
}
/* --------------------------- First tiles render --------------------------- */
renderTiles();

function checkTile(tile) {
    tile.addEventListener("click", (e) => {
        if (
            currTool.classList.contains("pickaxe") &&
            (tile.classList.contains("gold") ||
                tile.classList.contains("stone"))
        ) {
            removeTile(tile);
        } else if (
            currTool.classList.contains("axe") &&
            (tile.classList.contains("wood") ||
                tile.classList.contains("leaves"))
        ) {
            removeTile(tile);
        } else if (
            currTool.classList.contains("shovel") &&
            (tile.classList.contains("grass") ||
                tile.classList.contains("dirt"))
        ) {
            removeTile(tile);
        }
    });
}

function removeTile(tile) {
    if (lastPickedItem.classList.length > 1) {
        lastPickedItem.classList.remove(
            `${lastPickedItem.classList[lastPickedItem.classList.length - 1]}`
        );
    }
    lastPickedItem.classList.add(
        `${tile.classList[tile.classList.length - 1]}`
    );
    tile.classList.remove(`${tile.classList[tile.classList.length - 1]}`);
    tile.classList.add("sky");
}

/* -------------------------------------------------------------------------- */
/*                           Last Picked item Event                           */
/* -------------------------------------------------------------------------- */

lastPickedItem.addEventListener("click", (e) => {
    // if (lastPickedItem.classList.length > 1) {
        if (currTool != undefined && currTool !== lastPickedItem) {
            currTool.classList.remove("currtool");
        }
        currTool = lastPickedItem;
        currTool.classList.add("currtool");
        const emptyTiles = document.querySelectorAll(".cell");
        emptyTiles.forEach((emptyTile) => {
            emptyTile.addEventListener("click", (e) => {
                
                if (
                    lastPickedItem.classList.length > 1 &&
                    !emptyTile.classList.contains(
                        `${
                            lastPickedItem.classList[
                                lastPickedItem.classList.length - 1
                            ]
                        }` 
                    )
                ) {
                    emptyTile.classList.add(
                        `${
                            lastPickedItem.classList[
                                lastPickedItem.classList.length - 1
                            ]
                        }`
                    );
                    emptyTile.classList.remove("currtool");
                    lastPickedItem.classList.remove(
                        `${
                            lastPickedItem.classList[
                                lastPickedItem.classList.length - 1
                            ]
                        }`
                    );
                    renderTiles();
                }
            });
        });
    // }
});
