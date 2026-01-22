document.addEventListener("DOMContentLoaded", () => {
  const studentIdInput = document.getElementById("student-id");
  const passwordInput = document.getElementById("password");
  const loginForm = document.querySelector("form");
  const togglePasswordButton = document.querySelector('button[type="button"]');

  // Toggle Password Visibility
  if (togglePasswordButton) {
    togglePasswordButton.addEventListener("click", () => {
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);

      const iconSpan = togglePasswordButton.querySelector("span");
      iconSpan.textContent =
        type === "password" ? "visibility" : "visibility_off";
    });
  }

  // Mock Login API Call
  async function loginUser(credentials) {
    // Replace this with your actual API call
    // const response = await fetch('/api/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(credentials)
    // });
    // return await response.json();

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success
        if (credentials.studentId && credentials.password) {
          resolve({
            success: true,
            token: "mock-jwt-token",
            user: { name: "Student" },
          });
        } else {
          reject({ success: false, message: "Invalid credentials" });
        }
      }, 1000);
    });
  }

  // Form Submit Handler
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Basic Validation
    if (!studentIdInput.value.trim()) {
      alert("Please enter your Student ID.");
      return;
    }
    if (!passwordInput.value) {
      alert("Please enter your password.");
      return;
    }

    const submitButton = loginForm.querySelector('button[type="submit"]');

    try {
      // Show loading state
      const originalHTML = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = "<span>Logging in...</span>";

      const response = await loginUser({
        studentId: studentIdInput.value,
        password: passwordInput.value,
      });

      if (response.success) {
        console.log("Login successful:", response);
        // Store token if needed
        // localStorage.setItem('token', response.token);

        // Show success message briefly before redirect
        submitButton.innerHTML = "<span>Success! Redirecting...</span>";

        // Redirect after a short delay
        setTimeout(() => {
          window.location.href = "student_home.html";
        }, 500);
      } else {
        alert(response.message || "Login failed");
        submitButton.disabled = false;
        submitButton.innerHTML = originalHTML;
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
      submitButton.disabled = false;
      submitButton.innerHTML =
        '<span>Sign In</span><span class="material-icons">arrow_forward</span>';
    }
  });
});
