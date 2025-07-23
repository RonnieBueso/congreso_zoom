// reunion.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js';
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const turnRef = ref(db, 'current_speaker_turn');

const timerEl = document.getElementById('timer-display');
const nameEl = document.getElementById('presenter-name');
const roleEl = document.getElementById('presenter-role');
const topicEl = document.getElementById('speaker-topic');
const subtopicEl = document.getElementById('speaker-subtopic');
const signatureInput = document.getElementById('zoom-signature');
const joinButton = document.getElementById('join-meeting');

let intervalId;

function updateUI(data) {
  if (!data) return;
  nameEl.textContent = data.speakerName || "";
  roleEl.textContent = data.speakerRole || "";
  topicEl.textContent = `Tema: ${data.topic || ""}`;
  subtopicEl.textContent = `Subtema: ${data.subtopic || ""}`;

  clearInterval(intervalId);
  const start = new Date(data.startTime).getTime();
  const end = start + data.assignedMinutes * 60 * 1000;

  intervalId = setInterval(() => {
    const now = Date.now();
    const remaining = Math.max(0, end - now);
    const minutes = Math.floor(remaining / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((remaining % 60000) / 1000).toString().padStart(2, '0');
    timerEl.textContent = `${minutes}:${seconds}`;
    if (remaining <= 0) clearInterval(intervalId);
  }, 1000);
}

onValue(turnRef, (snapshot) => {
  const data = snapshot.val();
  updateUI(data);
});

joinButton.addEventListener('click', () => {
  const signature = signatureInput.value.trim();
  if (!signature) {
    alert('Por favor ingresa una firma válida');
    return;
  }

  const meetingNumber = '123456789'; // TU MEETING NUMBER FIJO AQUÍ
  const sdkKey = 'P7JFLT37S5StVaucOjNjZw'; // TU SDK KEY
  const userName = 'Expositor';

  ZoomMtg.setZoomJSLib('https://source.zoom.us/2.18.5/lib', '/av');
  ZoomMtg.preLoadWasm();
  ZoomMtg.prepareJssdk();

  ZoomMtg.init({
    leaveUrl: window.location.href,
    success: function () {
      ZoomMtg.join({
        signature,
        sdkKey,
        meetingNumber,
        userName,
        passWord: '',
        success: function () {
          console.log('Joined Zoom meeting');
        },
        error: function (err) {
          console.error(err);
          alert('Error al unir a la reunión');
        }
      });
    },
    error: function (err) {
      console.error(err);
    }
  });
});
