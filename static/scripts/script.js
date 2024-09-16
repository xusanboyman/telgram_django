    function openinfo() {
        document.getElementById("userinfocentre").style.width= '400px'
        document.getElementById('big').style.opacity = '0.5'
        document.getElementById('big').style.background = "url('static/images/themes/img.png') 80%"
}

    function sidenav() {
        document.getElementById('sidenav').style.width = '300px'
        document.getElementById('big').style.opacity = '0.8'
        document.getElementById('big').style.background = "url('static/images/themes/img.png') 80%"
}

    function closenav() {
        document.getElementById('sidenav').style.width = '0'
//        document.getElementById('userinfocentre').style.width = '0'
        document.getElementById('big').style.opacity = '1'
        document.getElementById('big').style.background = "url('static/images/themes/img.png') 80%"
    }

    // Get the buttons
    document.addEventListener('DOMContentLoaded', function () {
        const textaria = document.getElementById('textaria');
        const send = document.getElementById('send');

        textaria.addEventListener('input', function () {
            if (textaria.value.trim() !== '') {
                send.style.display = 'flex';
                document.getElementById('start-record').style.display = 'none'
            } else {
                send.style.display = 'none';
                document.getElementById('start-record').style.display = 'flex'

            }
        });
    });

    let mediaRecorder;
    let audioChunks = [];

    // Request the user's microphone access
    async function getMicrophoneAccess() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);

        // When the recording starts
        mediaRecorder.onstart = () => {
            audioChunks = [];
        };

        // Capture the audio data during recording
        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };

        // Once the recording stops, process the audio data
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audioPlayback = document.getElementById('audio-playback'); // Link audio element
            audioPlayback.src = audioUrl;  // Set the recorded audio in the playback element

            // Enable download (Optional)
            const downloadLink = document.createElement('a');
            downloadLink.href = audioUrl;
            downloadLink.download = 'recorded-audio.mp3';
            downloadLink.textContent = 'Download Recording';
            document.body.appendChild(downloadLink);
        };
    }

    // Get the buttons
    const startButton = document.getElementById('start-record');
    const stopButton = document.getElementById('stop-record');

    // Start recording
    startButton.addEventListener('click', () => {
        startButton.style.display = 'none';
        stopButton.style.display = 'flex';
        if (!mediaRecorder) {
            getMicrophoneAccess().then(() => mediaRecorder.start());
        } else {
            mediaRecorder.start();
        }
        startButton.disabled = true;
        stopButton.disabled = false;
    });

    // Stop recording
    stopButton.addEventListener('click', () => {
        mediaRecorder.stop();
        startButton.style.display = 'flex';
        stopButton.style.display = 'none';
        startButton.disabled = false;
        stopButton.disabled = true;
    });