import { ref, watch } from 'vue';
import { useWebsocket, wsClient } from '@/composables/useWebsocket';
import { useSessionStore } from '@/stores/storeSession';
const { getSession } = useSessionStore();
import { createGame } from '@/utils/apiCalls/gamePost.js';
import { closeGame } from '@/utils/apiCalls/gameClose.js';
import { gameResult } from '@/utils/apiCalls/gameResult.js';
import { usePlayerStore } from '@/stores/storePlayers';
const { storePlayer1, storePlayer2 } = usePlayerStore();

const gameStarted = ref(null);
const GameResults = ref(null);
const resultsObtained = ref(0);



export function useGameManager() {
    function startGame() {
        gameStarted.value = true;
        createGame();        
        wsClient.pub(getSession().id, { action: 'startGame' });        
    }

    function endGame() {
        gameStarted.value = false;
        GameResults.value = true
        wsClient.pub(getSession().id, { action: 'endGame' });
        closeGame();
        console.log('Game Ended');
    }

    function calcResults() {
        const player1 = JSON.parse(localStorage.getItem('player1_result'));
        const player2 = JSON.parse(localStorage.getItem('player2_result'));
        console.log('player1', player1);
        console.log('player2', player2);
        const winner = ref(null);

        // both players shoot are invalid
        if (player1.shootValidity === false && player2.shootValidity === false) {

            // player 1 shoot is invalid and player 2 shoot is valid
        } else if (player1.shootValidity && player2.shootValidity === true) {
            winner.value = player2;

            // player 1 shoot is valid and player 2 shoot is invalid
        } else if (player1.shootValidity === true && player2.shootValidity === false) {
            winner.value = player1;

            // both players shoot are invalid
        } else if (player1.shootValidity === true && player2.shootValidity === true) {
            // player 1 trigger time is less than player 2 trigger time
            if (player1.triggerTime < player2.triggerTime) {
                winner.value = player1;
                // player 2 trigger time is less than player 1 trigger time
            } else {
                winner.value = player2;
            }
        } else {
            winner.value = null;
        }

        gameResult();
        return winner;
    }

    return {
        startGame,
        endGame,
        gameStarted,
        GameResults,
        calcResults,
        resultsObtained
    }
}