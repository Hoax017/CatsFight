Implémenter un jeu de combat :
L’objectif est de coder un jeu de combat dont on peut suivre l’évolution dans la console du terminal (ou
sur un navigateur WEB)
Pour cela vous devrez coder différents composants selon une structure de code que vous aurez définie
afin de répondre aux spécifications ci-dessous.
1. Tout combattant à un niveau de vie définit à sa création (ne peut pas être négatif)
2. Deux types de frappe de base possible pour chaque combattant :
- POING = causant un dégât de -1 point de vie à son adversaire
- PIED = causant un dégât de -2 point de vie à son adversaire
3. Nous devons être capable de connaitre le niveau de vie pour déclarer un vainqueur

Nous souhaitons maintenant faire évoluer les combattants avec trois classes de combattants :

4. NINJA : qui a la spécificité d'avoir un katana :
Nouvelle technique de frappe : coup de katana enlevant 5 points de vie à son adversaire

5. ZOMBIE : qui a la spécificité d'avoir un sort de dégât
Lorsque le joueur l’active il triple (x3) les dégâts de la prochaine technique de base. Ce sort est
utilisable une seule fois dans le combat

6. CAPITAINE : qui a la spécificité d’avoir un bouclier :
Il ne peut donc causer qu’un dégât de -1 au pied, et enlève 1 point de dégâts sur tous les coups reçus.

Faire fonctionner le jeu :
Il faudra implémenter une méthode qui simulera une arène dans laquelle tous les types de combattants
s’affronteront successivement en duel.
Lors de chacun des combats, les combattants porteront un coup chacun leur tour.
Le type d’attaque doit être choisi aléatoirement.
Lorsqu’un combattant atteint un niveau de vie de zéro, l’autre combattant remporte le combat.