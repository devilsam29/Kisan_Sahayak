// ================= USER DATA =================

const user = {
  name: "",
  mobile: "",
  language: "en",
  farmerId: "KF-20481"
};


// ================= BACKEND URL =================

const API_URL = "http://127.0.0.1:8000";


// ================= SEND OTP =================

async function sendOTP() {

  const name = document.getElementById("name").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const language = document.getElementById("language").value;

  if (name === "") {
    showMessage("Please enter your full name.");
    return;
  }

  if (!/^[0-9]{10}$/.test(mobile)) {
    showMessage("Please enter a valid 10-digit mobile number.");
    return;
  }

  user.name = name;
  user.mobile = mobile;
  user.language = language;

  const phone = "+91" + mobile;

  try {

    showMessage("Generating OTP...");

    const response = await fetch(`${API_URL}/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phone: phone
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Failed to generate OTP");
    }

    document.getElementById("otpMobile").textContent =
      "******" + mobile.slice(-4);

    document.getElementById("otpInput").value = "";

    showScreen("otp");

    showMessage("OTP generated successfully!");

    console.log(data);

  } catch (error) {

    console.error(error);

    showMessage(
      "Backend se connection nahi ho raha."
    );
  }
}


// ================= VERIFY OTP =================

async function verifyOTP() {

  const otp = document.getElementById("otpInput").value.trim();

  if (!/^[0-9]{6}$/.test(otp)) {
    showMessage("Please enter the 6-digit OTP.");
    return;
  }

  const phone = "+91" + user.mobile;

  try {

    showMessage("Verifying OTP...");

    const response = await fetch(`${API_URL}/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phone: phone,
        otp: otp
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Invalid OTP");
    }

    console.log(data);

    loadUserData();

    showScreen("home");

    showMessage("Login successful! 🎉");

  } catch (error) {

    console.error(error);

    showMessage(
      error.message || "Invalid OTP"
    );
  }
}


// ================= LOAD USER DATA =================

function loadUserData() {

  document.getElementById("welcomeName").textContent =
    "Namaste, " + user.name + " 👋";

  document.getElementById("farmerId").textContent =
    user.farmerId;
}


// ================= SCREEN NAVIGATION =================

function showScreen(screenName) {

  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  const screen = document.getElementById(screenName);

  if (!screen) {
    console.error("Screen not found:", screenName);
    return;
  }

  screen.classList.add("active");

  const nav = document.getElementById("bottomNav");

  if (nav) {
    if (screenName === "login" || screenName === "otp") {
      nav.style.display = "none";
    } else {
      nav.style.display = "flex";
    }
  }

  document.querySelectorAll(".nav-btn").forEach(button => {
    button.classList.remove("active");
  });

  if (screenName === "home") {
    document.querySelectorAll(".nav-btn")[0]?.classList.add("active");
  }

  if (screenName === "schedule") {
    document.querySelectorAll(".nav-btn")[1]?.classList.add("active");
  }

  if (screenName === "status") {
    document.querySelectorAll(".nav-btn")[2]?.classList.add("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ================= QR MODAL =================

function showQR() {
  document.getElementById("qrModal").classList.add("show");
}

function closeQR() {
  document.getElementById("qrModal").classList.remove("show");
}

document.addEventListener("click", function(event) {

  const modal = document.getElementById("qrModal");

  if (event.target === modal) {
    closeQR();
  }

});


// ================= REQUEST SLOT =================

function requestSlot() {
  showMessage("Slot request submitted successfully.");
}


// ================= SMS ALERT =================

function enableSMS() {
  showMessage("SMS alerts have been enabled.");
}


// ================= HELP =================

function showHelp() {
  showMessage("Please contact your local procurement centre.");
}


// ================= TOAST MESSAGE =================

let toastTimer;

function showMessage(message) {

  const toast = document.getElementById("toast");

  if (!toast) {
    alert(message);
    return;
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}


// ================= START APP =================

document.addEventListener("DOMContentLoaded", function() {

  const continueBtn =
    document.getElementById("continueBtn");

  if (continueBtn) {
    continueBtn.addEventListener("click", sendOTP);
  }

  const verifyBtn =
    document.getElementById("verifyBtn");

  if (verifyBtn) {
    verifyBtn.addEventListener("click", verifyOTP);
  }

  const resendBtn =
    document.getElementById("resendBtn");

  if (resendBtn) {
    resendBtn.addEventListener("click", sendOTP);
  }

  showScreen("login");

});
