// 1. Text to Speech Logic
function speak(text) {
  window.speechSynthesis.cancel();
  let msg = new SpeechSynthesisUtterance(text);
  msg.lang = "hi-IN";
  msg.rate = 0.9;
  window.speechSynthesis.speak(msg);
}

// 3. AUTOMATIC GREETING LOGIC
function setAutoGreeting() {
  const hour = new Date().getHours();
  let message = "";
  if (hour < 12)
    message = " Shubh Prabhat (Good Morning)! Aapka din mangalmay ho.";
  else if (hour < 17)
    message =
      " Shubh Dopahar (Good Afternoon)! Hum aapki help ke liye taiyar hain.";
  else
    message =
      " Shubh Sandhya (Good Evening)! CarePulse hamesha aapke saath hai.";

  document.getElementById("greeting-bar").innerText = message;

  // Voice se bhi bol kar bataye (Automatic)
  setTimeout(() => speak(message), 1000);
}
window.onload = setAutoGreeting;

// AI Voice Reply (Seniors ko jawab dene ke liye)
function speakOut(text) {
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(text);
  utterThis.lang = "hi-IN";
  synth.speak(utterThis);
}
// Appointment Save karne ka function
window.handleFormSubmit = async function (event) {
  event.preventDefault();

  // HTML se data uthana
  const name = document.querySelector(
    'input[placeholder="Naam likhein"]',
  ).value;
  const phone = document.querySelector(
    'input[placeholder="Mobile Number"]',
  ).value;
  // Aapne video mein buttons dikhaye hain (Medical/Sahara), unki value bhi le sakte hain

  if (!name || !phone) return alert("Kripya naam aur number bharein");

  try {
    await addDoc(collection(db, "appointments"), {
      patientName: name,
      patientPhone: phone,
      type: "General", // Ise aap dynamic bhi bana sakte hain
      timestamp: new Date(),
    });
    alert(
      "Success! Aapka appointment book ho gaya aur Firebase mein save ho gaya.",
    );
    event.target.reset(); // Form saaf karne ke liye
  } catch (e) {
    alert("Error: " + e.message);
  }
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- FEATURE 1: APPOINTMENT FORM ---
window.handleFormSubmit = async function (event) {
  event.preventDefault();
  const name = document.querySelector(
    'input[placeholder="Naam likhein"]',
  ).value;
  const phone = document.querySelector(
    'input[placeholder="Mobile Number"]',
  ).value;

  try {
    await addDoc(collection(db, "appointments"), {
      patientName: name,
      patientPhone: phone,
      timestamp: new Date(),
    });
    alert("Success! Data Firebase mein save ho gaya.");
  } catch (e) {
    alert("Error: " + e.message);
  }
};

// Language
function changeLanguage(lang) {
  const texts = {
    en: {
      home: "Home",
      book: "Book Now",
      contact: "Contact",
      about: "About Us",
      services: "Services",
      calendar: "Set Calendar",
      medicine: "Medicine Reminder",

      heroTitle: "Compassionate Care at the Pulse of Your Life.",
      heroText: "Get the best medical support at home without any trouble.",
      consult: "Book a Free Consultation",

      monitoring: "Medical Monitoring",
      companion: "Companion Care",
      water: "Water Intake Tracking",

      appoint: "Book Appointment",
      name: "Your Name :",
      phone: "Phone Number :",
      need: "What do you need?",
      submit: "Submit",
    },

    hi: {
      home: "होम",
      book: "बुक करें",
      contact: "संपर्क करें",
      about: "हमारे बारे में",
      services: "सेवाएं",
      calendar: "कैलेंडर सेट करें",
      medicine: "दवा रिमाइंडर",

      heroTitle: "आपके जीवन की देखभाल हर पल।",
      heroText: "घर बैठे बेहतरीन मेडिकल सहायता पाएं।",
      consult: "फ्री सलाह बुक करें",

      monitoring: "स्वास्थ्य निगरानी",
      companion: "साथी देखभाल",
      water: "पानी पीने की निगरानी",

      appoint: "अपॉइंटमेंट बुक करें",
      name: "आपका नाम :",
      phone: "फोन नंबर :",
      need: "क्या चाहिए ?",
      submit: "भेजें",
    },
  };

  let t = texts[lang];

  document.querySelectorAll("#mainNav a")[0].innerText = t.home;
  document.querySelectorAll("#mainNav a")[1].innerText = t.book;
  document.querySelectorAll("#mainNav a")[2].innerText = t.contact;
  document.querySelectorAll("#mainNav a")[3].innerText = t.about;
  document.querySelectorAll("#mainNav a")[4].innerText = t.services;
  document.querySelectorAll("#mainNav a")[5].innerText = t.calendar;
  document.querySelectorAll("#mainNav a")[6].innerText = t.medicine;

  document.querySelector(".hero-text h1").innerText = t.heroTitle;
  document.querySelector(".hero-text p").innerText = t.heroText;
  document.querySelector(".btn-main").innerText = t.consult;

  document.querySelectorAll(".card h3")[0].innerText = t.monitoring;
  document.querySelectorAll(".card h3")[1].innerText = t.companion;
  document.querySelectorAll(".card h3")[2].innerText = t.water;

  document.querySelector(".form-container h2").innerText = t.appoint;
  document.querySelectorAll(".input-group label")[0].innerText = t.name;
  document.querySelectorAll(".input-group label")[1].innerText = t.phone;
  document.querySelectorAll(".input-group label")[2].innerText = t.need;

  document.querySelector('#appointment button[type="submit"]').innerText =
    t.submit;
}