let timer = 60;

function startTimer() {
    let x = setInterval(() => {
        timer--;
        document.getElementById("timer").innerText = timer;

        if (timer === 20) {
            let result = cryptoRandom();
            document.getElementById("status").innerText = "Result: " + result;
        }

        if (timer <= 0) {
            timer = 60;
            document.getElementById("status").innerText = "Waiting...";
        }
    }, 1000);
}

function cryptoRandom() {
    let array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return (array[0] % 10).toString();
}

startTimer();