import { ref, computed, watchEffect } from 'vue';
import { currentSession, currentSessionPlayers } from '@/utils/localStorage.js';

const session = ref(null);
const sessionPlayers = ref(0);

watchEffect(() => {
  session.value = currentSession.getSession();
  sessionPlayers.value = currentSessionPlayers.getSessionPlayers();
});

const hasSession = computed(() => session.value && session.value.id !== null);

const setSession = (id, code) => {
  session.value = { id, code };
  if (id && code) {
    currentSession.setSession(id, code);
  } else {
    currentSession.removeSession();
  }
};

const getSession = () => {
  return session.value;
};



const setSessionPlayers = (players) => {
  sessionPlayers.value = players;
  if (players) {
    currentSessionPlayers.setSessionPlayers(players);
  } else {
    currentSessionPlayers.removeSessionPlayers();
  }  
};

export const useSessionStore = () => {
  return {
    session,
    hasSession,
    setSession,
    getSession,
    sessionPlayers,
    setSessionPlayers,
  };
}