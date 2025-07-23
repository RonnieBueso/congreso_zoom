import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getDatabase, ref, onValue, set } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js';
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export const currentTurnRef = ref(db, 'current_speaker_turn');

export function listenToTurn(onUpdate) {
  onValue(currentTurnRef, (snapshot) => {
    onUpdate(snapshot.val());
  });
}

export function startTurn(nombre, minutos) {
  const startTime = new Date().toISOString();
  return set(currentTurnRef, {
    speakerName: nombre,
    assignedMinutes: minutos,
    startTime: startTime
  });
}