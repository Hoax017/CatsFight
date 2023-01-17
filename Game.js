import Brawler from "./Brawler.js";
import * as fs from "fs";
import {readStdIn} from "./utils.js";
import * as util from "util";

export default class Game {
    players = [];
    static debug = false;
    async init() {
        console.log('Welcome to the CatsFight!');
        const namePlayer1 = (await readStdIn("Please enter the name of the first player:")).trim() || 'Computer';
        const namePlayer2 = (await readStdIn("Please enter the name of the second player:")).trim() || 'Computer';

        console.clear();
        this.players = [new Brawler(namePlayer1), new Brawler(namePlayer2)];
        console.log(`'${namePlayer1}' and '${namePlayer2}' are ready to fight!`);
        this.printPlayers();
        await readStdIn("Press enter to start the game");
    }


    async loop () {
        while (this.players[0].healPoints > 0 && this.players[1].healPoints > 0) {
            if (!Game.debug) {
                console.clear();
            }

            this.players[0].sendAttack(this.players[1]);
            this.players[1].sendAttack(this.players[0]);

            this.printPlayers();
            if (Game.debug) {
                console.log(util.inspect(this, {depth:null, colors:true}));
                await readStdIn("Press enter to continue");
            } else {
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        }

        console.log(`${this.players[0].healPoints > 0 ? this.players[0].name : this.players[1].name} wins!`);
    }

    printPlayers() {
        console.log(`
        ${this.players[0].name}${" ".repeat(22 - this.players[0].name.length)}${this.players[1].name}
        ${this.players[0].class}${" ".repeat(22 - this.players[0].class.length)}${this.players[1].class}
           /\\_/\\                /\\_/\\
         =( o.o )=            =( o.o )=
           )   (                )   (
          (__ __)              (__ __)
          
          
        HP: ${this.players[0].healPoints}${" ".repeat(18 - this.players[0].healPoints.toString().length)}HP: ${this.players[1].healPoints}
    `);
    }
}