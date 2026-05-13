function welcome() {
  alert("Welcome to CarePulse!");
}

function checkHealth() {
  const bp = document.getElementById("bp").value;
  const sugar = document.getElementById("sugar").value;
  const result = document.getElementById("result");

  if (bp === "" || sugar === "") {
    result.style.color = "red";
    result.innerText = "Please enter all values";
    return;
  }

  if (bp < 120 && sugar < 140) {
    result.style.color = "green";
    result.innerText = "Health Status: Normal ✅";
  } else {
    result.style.color = "orange";
    result.innerText = "Health Status: Needs Attention ⚠️";
  }
}

function sos() {
  alert("🚨 SOS Activated!\nFamily and Doctor Notified.");
}
