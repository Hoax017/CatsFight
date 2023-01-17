import Game from "./Game.js";
import * as util from "util";

const game = new Game();
(async () => {
    await game.init();
    return game.loop();
})().then(() => {
    console.log("Game over");
}).catch((e) => {
    console.error(e, util.inspect(game, {depth:null, colors:true}));
}).finally(() => {
    process.exit();
});