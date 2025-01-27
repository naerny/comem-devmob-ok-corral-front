
import WsClient from '../websocketlibrary/WSClient.js';
import { useSessionStore } from "@/stores/storeSession.js";
const { setSessionPlayers, setSession } = useSessionStore();
import { usePlayerStore } from "@/stores/storePlayers.js";
import { useGameManager } from '@/utils/gameManager.js';
const { gameStarted, resultsObtained, endGame, GameResults } = useGameManager();
import router from '@/router/index.js';
import { showModal } from '@/utils/modalManager.js';

export const wsClient = new WsClient(`ws://${import.meta.env.VITE_WS_URL}:8887`);
await wsClient.connect();

export function useWebsocket() {

    function sub(sessionId) {
        wsClient.sub(sessionId, (message) => {

            if (message.action === 'playerCount') {
                setSessionPlayers(message.count);
                console.log('playerCount:', message.count);
                if (!localStorage.getItem('player_id')) {
                    localStorage.setItem('player_id', message.count);
                }

            } else if (message.action === 'closeSession') {
                setSessionPlayers(0);
                setSession(null, null);
                localStorage.removeItem('player1_result');
                localStorage.removeItem('player2_result');
                localStorage.removeItem('player_id');
                GameResults.value = false;
                console.log('closeSession');
                router.push('/');
                showModal('Session was closed by Admin');


            } else if (message.action === 'startGame') {
                // setSession(message.session, message.players);
                gameStarted.value = true;
                console.log('startGame');

            } else if (message.action === 'playerResult') {
                if (localStorage.getItem('player1_result')) {
                    localStorage.setItem('player2_result', JSON.stringify(message.result));
                } else {
                    localStorage.setItem('player1_result', JSON.stringify(message.result));
                }
                console.log('message', message);
                resultsObtained.value += 1;
                if (resultsObtained.value === 2) {
                    endGame();
                    console.log('Game Ended');
                }

            } else if (message.action === 'endGame') {                              
                console.log('endGame');
                showModal('Game Ended');

            } else {
                console.log('Unknown action');
            }
        });
    }

    function pub(sessionId, message) {
        wsClient.pub(sessionId, message);
        console.log('pub:', sessionId, message);
    }

    return {
        sub,
        pub,
        wsClient,
    }
}