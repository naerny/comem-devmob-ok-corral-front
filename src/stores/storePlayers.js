import { ref, watch, watchEffect } from "vue";
import { currentSession, currentSessionPlayers } from '@/utils/localStorage.js';

const storePlayer1 = ref(null)

const storePlayer2 = ref(null)

watchEffect(() => {
    storePlayer1.value = currentSessionPlayers.getPlayerResult('player1_result');
    storePlayer2.value = currentSessionPlayers.getPlayerResult('player2_result');
});

const setPlayerResults = (player, results) => {
    player.results = results;
    if (player) {
        currentSessionPlayers.setPlayerResult(player);
    } else {
        currentSessionPlayers.removePlayerresult();
    }  
};

export const usePlayerStore = () => {
    return {
        storePlayer1,
        storePlayer2,
        setPlayerResults,
    };
} 