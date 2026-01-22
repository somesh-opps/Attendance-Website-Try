document.addEventListener('DOMContentLoaded', function() {
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const step3 = document.getElementById('step-3');

    const sendCodeBtn = document.getElementById('send-code-btn');
    const verifyCodeBtn = document.getElementById('verify-code-btn');
    const resetPasswordBtn = document.getElementById('reset-password-btn');

    const emailInput = document.getElementById('email');
    const codeInput = document.getElementById('code');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    // Mock API Functions
    async function sendVerificationCode(email) {
        // Replace with actual API call
        // const response = await fetch('/api/forgot-password', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email })
        // });
        // return await response.json();

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, message: 'Verification code sent' });
            }, 1000);
        });
    }

    async function verifyResetCode(email, code) {
        // Replace with actual API call
        // const response = await fetch('/api/verify-code', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email, code })
        // });
        // return await response.json();

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (code === '123456') { // Mock valid code
                    resolve({ success: true, message: 'Code verified' });
                } else {
                    reject({ success: false, message: 'Invalid code' });
                }
            }, 1000);
        });
    }

    async function resetUserPassword(email, code, newPassword) {
        // Replace with actual API call
        // const response = await fetch('/api/reset-password', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email, code, newPassword })
        // });
        // return await response.json();

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, message: 'Password reset successfully' });
            }, 1000);
        });
    }

    // Step 1: Send Code
    sendCodeBtn.addEventListener('click', async function() {
        const email = emailInput.value.trim();
        if (!email) {
            alert('Please enter your email address.');
            return;
        }
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        try {
            sendCodeBtn.disabled = true;
            sendCodeBtn.textContent = 'Sending...';

            const response = await sendVerificationCode(email);

            if (response.success) {
                console.log(`Sending code to ${email}`);
                
                // Transition to Step 2
                step1.classList.add('hidden');
                step1.classList.remove('flex');
                
                step2.classList.remove('hidden');
                step2.classList.add('flex');
                
                // Focus on code input
                codeInput.focus();
            } else {
                alert(response.message || 'Failed to send code');
            }
        } catch (error) {
            console.error('Error sending code:', error);
            alert('An error occurred.');
        } finally {
            sendCodeBtn.disabled = false;
            sendCodeBtn.textContent = 'Send Code';
        }
    });

    // Step 2: Verify Code
    verifyCodeBtn.addEventListener('click', async function() {
        const code = codeInput.value.trim();
        const email = emailInput.value.trim();

        if (!code) {
            alert('Please enter the verification code.');
            return;
        }
        if (code.length !== 6) { // Assuming 6 digit code
            alert('Please enter a valid 6-digit code.');
            return;
        }

        try {
            verifyCodeBtn.disabled = true;
            verifyCodeBtn.textContent = 'Verifying...';

            // Note: In a real app, you might verify the code here OR just pass it to the final reset step.
            // Here we verify it first to show the next step.
            const response = await verifyResetCode(email, code);

            if (response.success) {
                console.log(`Verifying code: ${code}`);

                // Transition to Step 3
                step2.classList.add('hidden');
                step2.classList.remove('flex');

                step3.classList.remove('hidden');
                step3.classList.add('flex');

                // Focus on new password input
                newPasswordInput.focus();
            } else {
                alert(response.message || 'Invalid code');
            }
        } catch (error) {
            console.error('Error verifying code:', error);
            alert('Invalid code or error occurred.');
        } finally {
            verifyCodeBtn.disabled = false;
            verifyCodeBtn.textContent = 'Verify Code';
        }
    });

    // Step 3: Reset Password
    resetPasswordBtn.addEventListener('click', async function() {
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const email = emailInput.value.trim();
        const code = codeInput.value.trim();

        if (!newPassword) {
            alert('Please enter a new password.');
            return;
        }
        if (newPassword.length < 8) {
            alert('Password must be at least 8 characters long.');
            return;
        }
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            resetPasswordBtn.disabled = true;
            resetPasswordBtn.textContent = 'Resetting...';

            const response = await resetUserPassword(email, code, newPassword);

            if (response.success) {
                console.log('Resetting password...');
                alert('Password reset successfully! Redirecting to login...');
                
                // Redirect to Login page
                window.location.href = 'Login.html';
            } else {
                alert(response.message || 'Failed to reset password');
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            alert('An error occurred.');
        } finally {
            resetPasswordBtn.disabled = false;
            resetPasswordBtn.textContent = 'Reset Password';
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
