//https://www.youtube.com/watch?v=B3pmT7Cpi24


window.addEventListener('DOMContentLoaded', () => {
    var fields = Array.from(document.querySelectorAll('.field'));
    var playerDisplay = document.querySelector('.display-player');
    var resetgame = document.querySelector('#reset');
    var announcer = document.querySelector('.announcer');

    var game = ['', '', '', '', '', '', '', '', ''];
    var currentPlayer = 'X';
    var isGameActive = true;

    var PLAYERX_WON = 'PLAYERX_WON';
    var PLAYERO_WON = 'PLAYERO_WON';
    var TIE = 'TIE';

    var winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        var roundWon = false;
        for (let i = 0; i <= 7; i++) {
            var winCondition = winningConditions[i];
            var a = game[winCondition[0]];
            var b = game[winCondition[1]];
            var c = game[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

    if (!game.includes(''))
        announce(TIE);
    }

    function announce(type) {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };

    function isValidAction(field) {
        if (field.innerText === 'X' || field.innerText === 'O'){
            return false;
        }

        return true;
    };

    function updategame(index) {
        game[index] = currentPlayer;
    }

    function changePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    function userAction(field, index) {
        if(isValidAction(field) && isGameActive) {
            field.innerText = currentPlayer;
            field.classList.add(`player${currentPlayer}`);
            updategame(index);
            handleResultValidation();
            changePlayer();
        }
    }
    
    function resetgame() {
        game = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        fields.forEach(field => {
            field.innerText = '';
            field.classList.remove('playerX');
            field.classList.remove('playerO');
        });
    }

    fields.forEach( (field, index) => {
        field.addEventListener('click', () => userAction(field, index));
    });

    resetgame.addEventListener('click', resetgame);
});