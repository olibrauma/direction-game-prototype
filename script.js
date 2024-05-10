var patterns = [
    {
        button2: "北",
        button4: "西",
        button6: "東",
        button8: "南"
    },
    {
        button2: "東",
        button4: "北",
        button6: "南",
        button8: "西"
    },
    {
        button2: "南",
        button4: "東",
        button6: "西",
        button8: "北"
    },
    {
        button2: "西",
        button4: "南",
        button6: "北",
        button8: "東"
    }
];

var lastPatternIndex = -1;
var westButtonClickCount = 0;
var gameInProgress = false;
var countdown = 10.00;

var countdownInterval;

function getRandomPatternIndex() {
    var index = Math.floor(Math.random() * patterns.length);
    while (index === lastPatternIndex) {
        index = Math.floor(Math.random() * patterns.length);
    }
    lastPatternIndex = index;
    return index;
}

function changeButtonText(clickedButtonText) {
    if (gameInProgress) {
        var buttonsToUpdate = [2, 4, 6, 8];
        var randomPatternIndex = getRandomPatternIndex();
        var currentPattern = patterns[randomPatternIndex];

        buttonsToUpdate.forEach(function(buttonIndex) {
            document.getElementById('button' + buttonIndex).textContent = currentPattern['button' + buttonIndex];
        });

        if (clickedButtonText === "北" || clickedButtonText === "東" || clickedButtonText === "南") {
            alert("残念！");
        }

        if (clickedButtonText === "西") {
            westButtonClickCount++;
            document.getElementById('button1').textContent = westButtonClickCount.toString();
            var increaseAmount = 1 / ((westButtonClickCount / 5) + 2) + 0.5;
            increaseCountdown(increaseAmount); // 「西」のボタンが押されたらcountdownを増やす
        }
    }
}

function startGame() {
    if (!gameInProgress) {
        gameInProgress = true;
        westButtonClickCount = 0;
        document.getElementById('button1').textContent = "0";
        countdown = 10.00;

        var button3Text = document.getElementById('button3');

        countdownInterval = setInterval(function() {
            button3Text.textContent = countdown.toFixed(2);
            countdown -= 0.01;

            if (countdown <= 0) {
                clearInterval(countdownInterval);
                button3Text.textContent = "10.00";
                gameInProgress = false;
            }
        }, 10);
    }
}

function increaseCountdown(value) {
    countdown += value; // 引数valueの値だけcountdownを増やす
}

function decreaseCountdown() {
    countdown -= 1;
}

