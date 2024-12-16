document.addEventListener("DOMContentLoaded", () => {
    const uploadButton = document.getElementById("uploadButton");
    const startRecordButton = document.getElementById("startRecordButton");
    const stopRecordButton = document.getElementById("stopRecordButton");
    const analyzeButton = document.getElementById("analyzeButton");
    const waveformContainer = document.getElementById("waveform");

    let recorder, audioChunks = [];
    let wavesurfer = WaveSurfer.create({ container: waveformContainer, waveColor: 'cyan', progressColor: 'lime' });

    uploadButton.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            wavesurfer.load(url);
            analyzeButton.disabled = false;
        }
    });

    startRecordButton.addEventListener("click", async () => {
        audioChunks = [];
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (e) => audioChunks.push(e.data);
        recorder.onstop = () => {
            const blob = new Blob(audioChunks, { type: "audio/wav" });
            const url = URL.createObjectURL(blob);
            wavesurfer.load(url);
            analyzeButton.disabled = false;
        };
        recorder.start();
        startRecordButton.disabled = true;
        stopRecordButton.disabled = false;
    });

    stopRecordButton.addEventListener("click", () => {
        recorder.stop();
        startRecordButton.disabled = false;
        stopRecordButton.disabled = true;
    });

    analyzeButton.addEventListener("click", async () => {
        alert("Analysis functionality goes here.");
    });
});