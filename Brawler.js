import Game from "./Game.js";

export default class Brawler {

    static availableClasses = ['NINJA', 'ZOMBIE', 'CAPTAIN'];

    static availableAttacks = [
         {
            type:"punch",
            name: "Coup de poing",
            damage: 1,
        },
        {
            type: "kick",
            name: "Coup de pied",
            damage: 2,
        },
        {
            type: "katana",
            name: "Coup de katana",
            damage: 5,
        },
        {
            type: 'buff',
            name: "Sort de Boost de dégats",
            damage: 0,
            isBuff: true,
            active: false,
            used: false,
        },
        {
            type: 'shielded',
            name: "Coups de pieds*",
            damage: 1,
        }
    ];
    class = null;
    healPoints = 0;


    attacks = [];


    constructor(name) {
        this.name = name;

        this.chooseClass();

        //chose random heal points between 1 and 100
        this.healPoints = Math.floor(Math.random() * 100) + 1;
    }

    chooseClass() {
        // choose a random class
        this.class = Brawler.availableClasses[Math.floor(Math.random() * Brawler.availableClasses.length)];

        switch (this.class) {
            case 'NINJA':
                this.attacks = [
                    Brawler.availableAttacks.find(attack => attack.type === 'punch'),
                    Brawler.availableAttacks.find(attack => attack.type === 'kick'),
                    Brawler.availableAttacks.find(attack => attack.type === 'katana'),
                ]
                break;
            case 'ZOMBIE':
                this.attacks = [
                    Brawler.availableAttacks.find(attack => attack.type === 'punch'),
                    Brawler.availableAttacks.find(attack => attack.type === 'kick'),
                    Brawler.availableAttacks.find(attack => attack.type === 'buff'),
                ]
                break;
            case 'CAPTAIN':
                this.attacks = [
                    Brawler.availableAttacks.find(attack => attack.type === 'shielded'),
                ]
                break;
            default:
        }
    }

    sendAttack(brawler) {
        // select random attack
        const attack = this.getRandomAttack();
        if (Game.debug) {
            console.log({attack})
        }
        // if the attack is buff, set it to active
        if (attack.type === 'buff') {
            this.attacks.find(a => a.type === "buff").active = true;
        }

        brawler.receiveAttack(attack, this);
    }

    getRandomAttack() {
        // Récupération des attaques valides
        const validAttacks = this.attacks.filter(attack => !attack.used && !attack.active);
        // Si il n'y a pas d'attaques valides, on retourne null
        if (validAttacks.length === 0) {
          throw new Error('No valid attack');
        }
        // Sélection aléatoire d'une attaque valide
        const randomIndex = Math.floor(Math.random() * validAttacks.length);
        return validAttacks[randomIndex];
    }

    receiveAttack(attack, attacker) {
        const absorbedDamage = this.class === 'CAPTAIN' ? 1 : 0;
        let damage = attack.damage;

        let buffedDamage = false;
        let buff = attacker.attacks.find(a => a.type === "buff");
        if (buff?.active && !buff?.used && !attack.isBuff) {
            buff.used = true;
            damage *= 3;
            buffedDamage = true;
        }

        damage = Math.max(damage - absorbedDamage, 0);

        console.log(`${attacker.name} attacks ${this.name} with ${attack.name} (${damage} damage${buffedDamage ? ' buffed' : ''})`);

        this.healPoints -= damage; // if the damage is less than 0, set it to 0
        this.healPoints = this.healPoints < 0 ? 0 : this.healPoints;
    }
}


