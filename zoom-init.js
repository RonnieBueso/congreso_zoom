ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

ZoomMtg.init({
  leaveUrl: "https://tusitio.com/finalizado.html",
  isSupportAV: true,
  success: function () {
    ZoomMtg.join({
      sdkKey: "TU_SDK_KEY",
      signature: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZGtLZXkiOiJUVV9TREtfS0VZIiwibW4iOiJUVV9NRUVUSU5HX0lEIiwicm9sZSI6MCwiaWF0IjoxNzUzMjk5ODk1LCJleHAiOjE3NTMzMjg3MjUsImFwcEtleSI6IlRVX1NES19LRVkiLCJ0b2tlbkV4cCI6MTc1MzMyODcyNX0.lEkO9xket_Z3lzhnbWZMFRLgAUe6TdlJw9whmL5_V8g",
      meetingNumber: "MEETING_ID",
      password: "PASSWORD_DE_LA_REUNIÓN",
      userName: "Nombre del expositor o asistente",
      success: function () {
        console.log("¡Reunión iniciada!");
      },
      error: function (err) {
        console.error(err);
      }
    });
  },
  error: function (err) {
    console.error(err);
  }
});
