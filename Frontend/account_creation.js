document.addEventListener("DOMContentLoaded", () => {
  const fullNameInput = document.getElementById("full-name");
  const userIdInput = document.getElementById("user-id");
  const registrationNoInput = document.getElementById("registration-no");
  const emailInput = document.getElementById("email");
  const emailVerifyButton = document.getElementById("email-verify-btn");
  const otpSection = document.getElementById("otp-section");
  const otpInput = document.getElementById("otp");
  const otpVerifyButton = document.getElementById("otp-verify-btn");
  const otpStatus = document.getElementById("otp-status");
  const passwordInput = document.getElementById("password");
  const departmentInput = document.getElementById("department");
  const yearInput = document.getElementById("year");
  const classRollInput = document.getElementById("class-roll");
  const sectionInput = document.getElementById("section");
  const extraFields = document.getElementById("extra-fields");
  // Show/hide extra fields based on role selection
  document.getElementById("role").addEventListener("change", (e) => {
    if (e.target.value !== "Select your role") {
      extraFields.classList.remove("hidden");
    } else {
      extraFields.classList.add("hidden");
    }
  });
  const confirmPasswordInput = document.getElementById("confirm-password");
  const roleSelect = document.getElementById("role");
  const registerButton = document.getElementById("register-btn");
  const togglePasswordButton = document.querySelector(
    'button span[data-icon="visibility"]'
  ).parentElement;

  let generatedOtp = null;
  let isEmailOtpVerified = false;

  function setOtpStatus(message) {
    if (!otpStatus) return;
    otpStatus.textContent = message;
  }

  function resetOtpState() {
    generatedOtp = null;
    isEmailOtpVerified = false;
    if (otpInput) otpInput.value = "";
    if (otpSection) otpSection.classList.add("hidden");
    setOtpStatus("");
    if (emailVerifyButton) emailVerifyButton.disabled = false;
    if (otpVerifyButton) otpVerifyButton.disabled = false;
  }

  // Toggle Password Visibility
  togglePasswordButton.addEventListener("click", () => {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    const iconSpan = togglePasswordButton.querySelector("span");
    iconSpan.textContent =
      type === "password" ? "visibility" : "visibility_off";
  });

  // Reset OTP verification if email changes
  emailInput.addEventListener("input", () => {
    resetOtpState();
  });

  // Email Verify (OTP) flow (frontend demo)
  emailVerifyButton.addEventListener("click", () => {
    if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
      alert("Please enter a valid email address first.");
      return;
    }

    // Fixed OTP for now (no backend)
    generatedOtp = "123456";
    isEmailOtpVerified = false;

    otpSection.classList.remove("hidden");
    setOtpStatus("OTP sent to your email (demo).");

    if (otpInput) otpInput.focus();
  });

  otpVerifyButton.addEventListener("click", () => {
    if (!generatedOtp) {
      alert("Please click Verify next to Email first.");
      return;
    }
    const entered = (otpInput?.value || "").trim();
    if (!entered) {
      alert("Please enter the OTP.");
      return;
    }
    if (entered !== generatedOtp) {
      setOtpStatus("Invalid OTP. Please try again.");
      return;
    }

    isEmailOtpVerified = true;
    setOtpStatus("Email verified successfully.");
    emailVerifyButton.disabled = true;
    otpVerifyButton.disabled = true;
  });

  // Mock Registration API Call
  async function registerUser(userData) {
    // Replace this with your actual API call
    // const response = await fetch('/api/register', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(userData)
    // });
    // return await response.json();

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success
        resolve({ success: true, message: "Account created successfully" });
        // Simulate error: reject({ success: false, message: 'Email already exists' });
      }, 1000);
    });
  }

  // Register Button Click Handler
  registerButton.addEventListener("click", async (e) => {
    e.preventDefault(); // Prevent default form submission
    e.stopPropagation(); // Stop event bubbling

    // Basic Validation
    if (!fullNameInput.value.trim()) {
      alert("Please enter your full name.");
      return;
    }
    if (!userIdInput.value.trim()) {
      alert("Please enter your ID.");
      return;
    }
    if (!registrationNoInput.value.trim()) {
      alert("Please enter your registration number.");
      return;
    }
    if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!isEmailOtpVerified) {
      alert("Please verify your email via OTP before registering.");
      return;
    }
    if (!passwordInput.value) {
      alert("Please enter a password.");
      return;
    }
    if (!confirmPasswordInput?.value) {
      alert("Please confirm your password.");
      return;
    }
    if (passwordInput.value !== confirmPasswordInput.value) {
      alert("Passwords do not match.");
      return;
    }
    if (roleSelect.value === "Select your role") {
      alert("Please select a role.");
      return;
    }
    // Require extra fields if role is selected
    if (!departmentInput.value.trim()) {
      alert("Please enter your department.");
      return;
    }
    if (!yearInput.value.trim()) {
      alert("Please enter your year.");
      return;
    }
    if (!classRollInput.value.trim()) {
      alert("Please enter your class roll number.");
      return;
    }
    if (!sectionInput.value.trim()) {
      alert("Please enter your section.");
      return;
    }

    const userData = {
      fullName: fullNameInput.value,
      userId: userIdInput.value,
      email: emailInput.value,
      role: roleSelect.value,
      password: passwordInput.value,
    };

    try {
      // Show loading state
      const originalText = registerButton.textContent;
      registerButton.disabled = true;
      registerButton.textContent = "Creating Account...";

      const response = await registerUser(userData);

      if (response.success) {
        console.log("Registration successful:", response);

        // Show success message
        registerButton.innerHTML =
          '<span>Success! Redirecting...</span><span class="material-icons">check_circle</span>';

        // Redirect after a short delay
        setTimeout(() => {
          window.location.href = "student_home.html";
        }, 1000);
      } else {
        alert(response.message || "Registration failed");
        registerButton.disabled = false;
        registerButton.innerHTML =
          '<span>Create Account</span><span class="material-icons">arrow_forward</span>';
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration.");
      registerButton.disabled = false;
      registerButton.innerHTML =
        '<span>Create Account</span><span class="material-icons">arrow_forward</span>';
    }
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
