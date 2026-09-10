// ================= USER DATA =================

const user = {
  name: "",
  mobile: "",
  language: "en",
  farmerId: "KF-20481"
};


// ================= SEND OTP / CONTINUE =================

function sendOTP() {

  const name = document.getElementById("name").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const language = document.getElementById("language").value;

  // Check name
  if (name === "") {
    showMessage("Please enter your full name.");
    document.getElementById("name").focus();
    return;
  }

  // Check mobile
  if (!/^[0-9]{10}$/.test(mobile)) {
    showMessage("Please enter a valid 10-digit mobile number.");
    document.getElementById("mobile").focus();
    return;
  }

  // Save user information
  user.name = name;
  user.mobile = mobile;
  user.language = language;

  // Show last 4 digits on OTP screen
  document.getElementById("otpMobile").textContent =
    "******" + mobile.slice(-4);

  // Clear old OTP
  document.getElementById("otpInput").value = "";

  // Go to OTP screen
  showScreen("otp");

  console.log("OTP sent to:", mobile);
}


// ================= VERIFY OTP =================

function verifyOTP() {

  const otp = document.getElementById("otpInput").value.trim();

  // Check OTP length
  if (!/^[0-9]{6}$/.test(otp)) {
    showMessage("Please enter the 6-digit OTP.");
    return;
  }

  // DEMO OTP
  if (otp !== "123456") {
    showMessage("Invalid OTP. Use 123456 for demo.");
    return;
  }

  // Load farmer information
  loadUserData();

  // Go to home
  showScreen("home");

  showMessage("Login successful!");
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

  // Hide all screens
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  // Find selected screen
  const screen = document.getElementById(screenName);

  if (!screen) {
    console.error("Screen not found:", screenName);
    return;
  }

  // Show selected screen
  screen.classList.add("active");

  // Bottom navigation
  const nav = document.getElementById("bottomNav");

  if (screenName === "login" || screenName === "otp") {
    nav.style.display = "none";
  } else {
    nav.style.display = "flex";
  }

  // Update active navigation button
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

  // Scroll to top
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ================= QR MODAL =================

function showQR() {

  document
    .getElementById("qrModal")
    .classList.add("show");
}


function closeQR() {

  document
    .getElementById("qrModal")
    .classList.remove("show");
}


// Close QR when clicking outside
document.addEventListener("click", function(event) {

  const modal = document.getElementById("qrModal");

  if (event.target === modal) {
    closeQR();
  }

});


// ================= REQUEST SLOT =================

function requestSlot() {

  showMessage(
    "Slot request submitted successfully."
  );
}


// ================= SMS ALERT =================

function enableSMS() {

  showMessage(
    "SMS alerts have been enabled."
  );
}


// ================= HELP =================

function showHelp() {

  showMessage(
    "Please contact your local procurement centre."
  );
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

  // Continue button
  const continueBtn =
    document.getElementById("continueBtn");

  if (continueBtn) {
    continueBtn.addEventListener(
      "click",
      sendOTP
    );
  }


  // Verify button
  const verifyBtn =
    document.getElementById("verifyBtn");

  if (verifyBtn) {
    verifyBtn.addEventListener(
      "click",
      verifyOTP
    );
  }


  // Resend OTP
  const resendBtn =
    document.getElementById("resendBtn");

  if (resendBtn) {
    resendBtn.addEventListener(
      "click",
      sendOTP
    );
  }


  // Start on login page
  showScreen("login");

});
