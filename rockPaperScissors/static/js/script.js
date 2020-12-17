var playerScore = 0;
var botScore = 0;
var roundNumber = 0;

document.getElementById('playerScore').innerHTML = playerScore;
document.getElementById('botScore').innerHTML = botScore;

function startSingleButton() {
    document.getElementById('singleRound').remove();
    document.getElementById('threeRound').remove();
    singleRoundDisplay();
}

function startThreeButton() {
    document.getElementById('singleRound').remove();
    document.getElementById('threeRound').remove();
    threeRoundDisplay();
}

function singleRoundDisplay() {
    var rpsDiv = document.createElement(null);
    var rockImg = document.createElement(null);
    var paperImg = document.createElement(null);
    var scissorsImg = document.createElement(null);

    document.getElementById('flex-box-rps-button').appendChild(rpsDiv);
    rpsDiv.outerHTML = "<div id='rpsDiv' style='display: flex; flex-direction: row;'></div>";

    document.getElementById('rpsDiv').appendChild(rockImg);
    document.getElementById('rpsDiv').appendChild(paperImg);
    document.getElementById('rpsDiv').appendChild(scissorsImg);

    rockImg.outerHTML = "<img id='rock' src='https://adiihd.github.io/rock-paper-scissors-game/img/rock.png' onclick='rpsSingleGame(this)'>"
    paperImg.outerHTML = "<img id='paper' src='https://adiihd.github.io/rock-paper-scissors-game/img/paper.png' onclick='rpsSingleGame(this)'>"
    scissorsImg.outerHTML = "<img id='scissors' src='https://adiihd.github.io/rock-paper-scissors-game/img/scissors.png' onclick='rpsSingleGame(this)'>"


}

function threeRoundDisplay() {
    var rpsDiv = document.createElement(null);
    var rockImg = document.createElement(null);
    var paperImg = document.createElement(null);
    var scissorsImg = document.createElement(null);

    document.getElementById('flex-box-rps-button').appendChild(rpsDiv);
    rpsDiv.outerHTML = "<div id='rpsDiv' style='display: flex; flex-direction: row;'></div>";

    document.getElementById('rpsDiv').appendChild(rockImg);
    document.getElementById('rpsDiv').appendChild(paperImg);
    document.getElementById('rpsDiv').appendChild(scissorsImg);

    rockImg.outerHTML = "<img id='rock' src='https://adiihd.github.io/rock-paper-scissors-game/img/rock.png' onclick='rpsThreeGame(this)'>"
    paperImg.outerHTML = "<img id='paper' src='https://adiihd.github.io/rock-paper-scissors-game/img/paper.png' onclick='rpsThreeGame(this)'>"
    scissorsImg.outerHTML = "<img id='scissors' src='https://adiihd.github.io/rock-paper-scissors-game/img/scissors.png' onclick='rpsThreeGame(this)'>"

}


function restartThreeGame() {

    resetScore();

    document.getElementById('flex-box-rps-button').innerHTML = "";

    threeRoundDisplay();
}

function restartSingleGame() {

    resetScore();

    document.getElementById('flex-box-rps-button').innerHTML = "";

    singleRoundDisplay();
}

function rpsSingleGame(yourChoice) {
    var humanChoice, botChoice;

    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());

    console.log('Your Choice:', yourChoice.id);
    console.log('Computer Choice:', botChoice); 

    results = decideWinner(humanChoice, botChoice); // [0,1] humanLost|botWon

    console.log(results);

    message = finalMessage(results);

    console.log(message);

    rpsSingleFrontEnd(yourChoice.id, botChoice, message); 
}

function rpsThreeGame(yourChoice) {
    var humanChoice, botChoice;

    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());

    console.log('Your Choice:', yourChoice.id);
    console.log('Computer Choice:', botChoice); 

    results = decideWinner(humanChoice, botChoice); // [0,1] humanLost|botWon

    console.log(results);

    message = finalMessage(results);

    console.log(message);

    rpsThreeFrontEnd(yourChoice.id, botChoice, message); 

}


function randToRpsInt() {
    return Math.floor(Math.random() * 3);    
}

function numberToChoice(number) {
    return ['rock','paper','scissors'][number]
}

function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
        'scissors': {'paper': 1, 'scissors': 0.5, 'rock': 0}
    };

    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore];
}


function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        roundNumber = roundNumber + 1;

        botScore = botScore + 1;

        console.log('Round: ' + roundNumber );
        console.log('Your Score: ' + playerScore);
        console.log('Bot Score: ' + botScore );

        return {'message': 'Bot Wins!', 'color': 'red'};
    } else if (yourScore === 0.5) {

        roundNumber = roundNumber + 1;

        console.log('Round: ' + roundNumber );
        console.log('Your Score: ' + playerScore);
        console.log('Bot Score: ' + botScore );

        return {'message': 'Tie!', 'color': 'purple'};
    } else {
        roundNumber = roundNumber + 1;

        playerScore = playerScore + 1;

        console.log('Round: ' + roundNumber );
        console.log('Your Score: ' + playerScore);
        console.log('Bot Score: ' + botScore );

        return {'message': 'Player Wins!', 'color': 'green'};
    }
}

function resultDisplay(humanImageChoice, botImageChoice, finalMessage) {
    var imageDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    document.getElementById('rpsDiv').remove();

    // document.getElementById('rock').parentElement.remove();
    // document.getElementById('paper').parentElement.remove();
    // document.getElementById('scissors').parentElement.remove();
    
    var rpsResultDiv = document.createElement(null); 
    var humanImg = document.createElement(null);
    var botImg = document.createElement(null);
    var messageImg = document.createElement(null);

    document.getElementById('flex-box-rps-button').appendChild(rpsResultDiv);
    rpsResultDiv.outerHTML = "<div class='col-12' id='rpsResultDiv"+roundNumber+"' style='display: flex; flex-direction: row; border-style: dotted; '></div>";

    document.getElementById('rpsResultDiv'+roundNumber).appendChild(humanImg);
    document.getElementById('rpsResultDiv'+roundNumber).appendChild(messageImg);
    document.getElementById('rpsResultDiv'+roundNumber).appendChild(botImg);


    humanImg.outerHTML = "<img src='" + imageDatabase[humanImageChoice] + "' style='box-shadow: 0px 10px 50px rgba(37,50,233,1);'>"
    messageImg.outerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; margin: auto;'>" + finalMessage['message'] + "</h1>" 
    botImg.outerHTML = "<img src='" + imageDatabase[botImageChoice] + "' style='box-shadow: 0px 10px 50px rgba(250,0,0,1);'>"



    document.getElementById('playerScore').innerHTML = playerScore;
    document.getElementById('botScore').innerHTML = botScore;
}

function rpsSingleFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    resultDisplay(humanImageChoice, botImageChoice, finalMessage);
    showRestartSingleRoundButton();
        returnToMenuButton();
}


function rpsThreeFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    resultDisplay(humanImageChoice, botImageChoice, finalMessage);
    if (playerScore === 2) {
        console.log("Player Wins!");
   
        var messageDiv = document.createElement('div');
        messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px;'>" + 'Game Ends: ' + finalMessage['message'] + "</h1>" 
        document.getElementById('flex-box-rps-button').appendChild(messageDiv);

        showRestartThreeRoundButton();
        returnToMenuButton();

    } else if (botScore === 2) {
        console.log("Bot Wins!");

        var messageDiv = document.createElement('div');
        messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + 'Game Ends: ' + finalMessage['message'] + "</h1>" 
        document.getElementById('flex-box-rps-button').appendChild(messageDiv);

        showRestartThreeRoundButton();
        returnToMenuButton();

    } else {
        threeRoundDisplay();
    }
}

function showRestartThreeRoundButton() {
    var restartButton = document.createElement('div');
    document.getElementById('flex-box-rps-button').appendChild(restartButton);
    restartButton.innerHTML = "<button class='btn btn-success'; id='cat-generator'; onclick='restartThreeGame();'>Restart Game</button>"
}

function showRestartSingleRoundButton() {
    var restartButton = document.createElement('div');
    document.getElementById('flex-box-rps-button').appendChild(restartButton);
    restartButton.innerHTML = "<button class='btn btn-success'; id='cat-generator'; onclick='restartSingleGame();'>Restart Game</button>"
}

function returnToMenuButton() {
    var menuButton = document.createElement('div');
    document.getElementById('flex-box-rps-button').appendChild(menuButton);    
    menuButton.innerHTML = "<button class='btn btn-danger'; id='cat-generator'; onclick='recreateMenu();'>Return To Menu</button>"
}

function recreateMenu() {
    resetScore();

    document.getElementById('flex-box-rps-button').innerHTML = "";

    var singleButton = document.createElement(null);
    var threeButton = document.createElement(null);

    document.getElementById('flex-box-rps-button').appendChild(singleButton);
    document.getElementById('flex-box-rps-button').appendChild(threeButton);

    singleButton.outerHTML = "<button id='singleRound' class='btn btn-primary' onclick='startSingleButton()'>Single Round</button>";
    threeButton.outerHTML = "<button id='threeRound' class='btn btn-danger' onclick='startThreeButton()'>Best of Three Rounds</button>"; 

}

function resetScore(){
    playerScore = 0;
    botScore = 0;
    roundNumber = 0

    document.getElementById('playerScore').innerHTML = playerScore;
    document.getElementById('botScore').innerHTML = botScore;
}