function toggleSearch() {

    const search = document.getElementById("mobileSearch");
    const nav = document.getElementById("mainNav");
    const access = document.getElementById("accessMenu");

    search.style.display =
        search.style.display === "block" ? "none" : "block";

    nav.classList.remove("show");
    access.classList.remove("show");
}


function toggleMenu(menuId) {

    const nav = document.getElementById("mainNav");
    const access = document.getElementById("accessMenu");

    if (menuId === "mainNav") {

        access.classList.remove("show");
        nav.classList.toggle("show");
    }

    if (menuId === "accessMenu") {

        nav.classList.remove("show");
        access.classList.toggle("show");
    }
}
// 2. Font Resizer Logic
let currentFontSize = 16;
let currentImageSize = 100; // %

function changeFontSize(value){

    currentFontSize += value;
    currentImageSize += value * 5;

    /* limits */
    if(currentFontSize < 12) currentFontSize = 12;
    if(currentFontSize > 26) currentFontSize = 26;

    if(currentImageSize < 60) currentImageSize = 60;
    if(currentImageSize > 160) currentImageSize = 160;

    /* text */
    document.querySelectorAll(
        "p,a,span,div,button,li,label,input,h1,h2,h3,h4,h5,h6,select"
    ).forEach(el=>{
        el.style.fontSize = currentFontSize + "px";
    });

    /* images */
    document.querySelectorAll("img").forEach(img=>{
        img.style.transform = `scale(${currentImageSize / 100})`;
        img.style.transition = "0.3s ease";
    });
}


document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (e) => {
    // Sirf internal links ke liye (jo dusre page par le jayein)
    if (link.hostname === window.location.hostname && link.hash === "") {
      e.preventDefault();
      let destination = link.href;

      // Body ko fade out karein
      document.body.style.opacity = "0";
      document.body.style.transition = "0.5s";

      // 0.5 second baad naya page kholein
      setTimeout(() => {
        window.location.href = destination;
      }, 500);
    }
  });
});
// dark mode 
function toggleMode() {

    const body = document.body;

    // desktop button
    const btn = document.getElementById("mode-btn");

    // mobile button (if any)
    const mobileBtns = document.querySelectorAll(".mode-btn-mobile");

    body.classList.toggle("light-mode");

    if (body.classList.contains("light-mode")) {

        if (btn) btn.innerHTML = "🌙 Dark Mode";

        mobileBtns.forEach(button => {
            button.innerHTML = "🌙 Dark Mode";
        });

    } else {

        if (btn) btn.innerHTML = "☀️ Light Mode";

        mobileBtns.forEach(button => {
            button.innerHTML = "☀️ Light Mode";
        });

    }
}

// Voice Function 
function startVoice() {
    // 1. Browser check (Chrome/Edge support)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        alert("Maafi chahte hain, aapka browser voice command support nahi karta. Kripya Chrome use karein.");
        return;
    }

    const recognition = new SpeechRecognition();
    const status = document.getElementById('voice-status');
    const btn = document.getElementById('mic-btn');

    recognition.lang = 'hi-IN'; // Hindi aur English dono samajh lega
    recognition.start();
    
    status.style.display = 'block';
    btn.style.background = '#ff4444'; // Recording ke waqt red color

    recognition.onresult = function(event) {
        const command = event.results[0][0].transcript.toLowerCase();
        console.log("Aapne bola:", command);
        status.innerText = "Aapne bola: " + command;

        // COMMANDS LOGIC
        if (command.includes("appointment") || command.includes("doctor")) {
            window.location.hash = "appointmentForm"; // Form par jump karega
            speakOut("Theek hai, main appointment section khol raha hoon.");
        } 
        else if (command.includes("dawai") || command.includes("medicine") || command.includes("reminder")) {
            window.location.hash = "medicine-dashboard"; // Dashboard par jump karega
            speakOut("Zaroor, aapka medicine reminder yahan hai.");
        }
        else if (command.includes("emergency") || command.includes("sos") || command.includes("help")) {
            document.getElementById('sos-btn').click(); // SOS call trigger karega
            speakOut("Emergency call lagaya ja raha hai.");
        }
        else {
            speakOut("Maaf kijiye, mujhe samajh nahi aaya. Kripya phir se bole.");
        }

        setTimeout(() => { status.style.display = 'none'; btn.style.background = '#007bff'; }, 3000);
    };

    recognition.onerror = function() {
        status.innerText = "Error! Phir se try karein.";
        btn.style.background = '#007bff';
    };
}