import promptSync from 'prompt-sync';
const prompt: any = promptSync();

let life_cpu: number = 50
let life_player: number = 50
let tab_attack: string[] = ["0-Charge", "1-Soin", "2-Aquajet", "3-Draco-rage"]
let round: number = 1
let current_player: string = "player"

function choice_attack(tab: string[]) {
    for (let i = 0; i < tab.length; i++) {
        console.log(tab[i]);
    }
    let choice: string = prompt("choisie ton attaque = ")
    choice = tab_attack[parseInt(choice)]
    return choice
}

function attack(choice: string) {
    switch (choice) {
        case (tab_attack[0]):
            if (check_attack_success(0, 1) == true) {
                update_life_opponent(-10);
                console.log("attaque réussi");
            } else {
                console.log("attaque échoué");
            }
            console.log("life cpu = ", life_cpu, "life player = ", life_player);
            break;
        case (tab_attack[1]):
            if (check_attack_success(0, 1) == true) {
                update_my_life(10);
                console.log("soin réussi");
            } else {
                console.log("soin échoué");
            }
            console.log("life cpu = ", life_cpu, "life player = ", life_player);
            break;
        case (tab_attack[2]):
            if (check_attack_success(0, 1) == true) {
                update_life_opponent(-20);
                console.log("attaque réussi");
            } else {
                console.log("attaque échoué");
            }
            console.log("life cpu = ", life_cpu, "life player = ", life_player);
            break;
        case (tab_attack[3]):
            if (check_attack_success(0, 1) == true) {
                update_life_opponent(-50);
                console.log("attaque réussi");
            } else {
                console.log("attaque échoué");
            }
            console.log("life cpu = ", life_cpu, "life player = ", life_player);
            break;
        default:
            break;
    }
}

function update_life_opponent(nmb_life: number) {
    if (round % 2 == 0) {
        life_player = life_player + nmb_life;
    } else {
        life_cpu = life_cpu + nmb_life;
    }
}

function update_my_life(nmb_life: number) {
    if (round % 2 == 1) {
        life_player = life_player + nmb_life;
    } else {
        life_cpu = life_cpu + nmb_life;
    }
}

function aleatoire(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
}

function check_attack_success(min: number, max: number) {
    let success: boolean = false;
    if (aleatoire(min, max) == max) {
        success = true
    }
    return success
}

function game() {
    while (life_player > 0 && life_cpu > 0) {
        if (round % 2 == 0) {
            console.log("Le CPU choisie son attaque");
            let cpu_choisenAttack: string = cpu_attack()
            attack(cpu_choisenAttack)
        } else {
            let choisenAttack: string = choice_attack(tab_attack)
            attack(choisenAttack)
        }
        if (life_cpu < 1) {
            console.log("GAGNER!!!");
        } else if (life_player < 1) {
            console.log("perdu...t'es nul");
        }
        round++
        change_player()
    }

}

function cpu_attack(): string {
    let choice_cpu: number = aleatoire(0, tab_attack.length - 1)
    let choisenAttack = tab_attack[choice_cpu]
    return choisenAttack
}

function change_player() {
    if (round % 2 == 0) {
        current_player = "cpu"
    } else {
        current_player = "player"
    }
}

game()