const MIN_GENERATE = 1
const MAX_GENERATE = 10

function onStartgame() {
    confirm("Вы готовы угадать моё число?")
}

function onWingame() {
    alert("Вы голова, отгадали моё число!)")
}

function onLosegame() {
    alert("Надо тренироваться, попробуйте ещё раз(")
}

function game() {

    onStartgame()

    let n = Number(prompt("Я загадал число от " + MIN_GENERATE + " до " + MAX_GENERATE + ", какое число я загадал по-вашему?)"))
    let n_computer = Math.floor(Math.random() * (MAX_GENERATE - MIN_GENERATE + 1)) + MIN_GENERATE
    
    if (n >= MIN_GENERATE && n <= MAX_GENERATE) {
        if (n == n_computer) {
            onWingame()
        }
        else {
            onLosegame()
        }
    } else {
        alert("Ты ввёл число за диапазоном, или вообще не число, не делай так больше")
    }
}