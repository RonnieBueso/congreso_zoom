import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js';
import './firebase-config.js';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.getElementById('startBtn').addEventListener('click', async () => {
  const speakerName = document.getElementById('speakerName').value.trim();
  const speakerRole = document.getElementById('speakerRole').value.trim();
  const topic = document.getElementById('topic').value.trim();
  const subtopic = document.getElementById('subtopic').value.trim();
  const assignedMinutes = parseInt(document.getElementById('assignedMinutes').value.trim(), 10);
  const zoomUrl = document.getElementById('zoomUrl').value.trim();
  const status = document.getElementById('status');

  if (!speakerName || !speakerRole || !topic || isNaN(assignedMinutes) || !zoomUrl) {
    status.textContent = "Por favor, completa todos los campos requeridos.";
    return;
  }

  const turnData = {
    speakerName,
    speakerRole,
    topic,
    subtopic,
    assignedMinutes,
    zoomUrl,
    startTime: new Date().toISOString()
  };

  try {
    await set(ref(db, 'current_speaker_turn'), turnData);
    status.textContent = "Turno actualizado correctamente.";
  } catch (error) {
    console.error("Error al guardar en Firebase:", error);
    status.textContent = "Error al guardar turno.";
  }
});
