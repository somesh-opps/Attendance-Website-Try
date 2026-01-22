// Mock Data for Student Profile (Simulating Backend)
const mockStudentData = {
    name: "Alex Doe",
    email: "alex.doe@university.edu",
    role: "Student",
    registrationNo: "REG2023001",
    enrollmentNo: "ENR2023001",
    profileImage: "images/profileimage.png"
};

// Function to simulate fetching data from backend
async function fetchStudentSettings() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockStudentData);
        }, 500); // Simulate network delay
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const student = await fetchStudentSettings();
        
        // Populate fields
        const nameInput = document.getElementById('settings-name');
        const emailInput = document.getElementById('settings-email');
        const roleInput = document.getElementById('settings-role');
        const regInput = document.getElementById('settings-reg');
        const enrollInput = document.getElementById('settings-enroll');
        
        if (nameInput) nameInput.value = student.name;
        if (emailInput) emailInput.value = student.email;
        if (roleInput) roleInput.value = student.role;
        if (regInput) regInput.value = student.registrationNo;
        if (enrollInput) enrollInput.value = student.enrollmentNo;

        // Profile Image Logic
        const editBtn = document.getElementById('edit-profile-btn');
        const actionsDiv = document.getElementById('profile-actions');
        const uploadBtn = document.getElementById('upload-btn');
        const fileInput = document.getElementById('profile-upload');
        const saveBtn = document.getElementById('save-btn');
        const profilePreview = document.getElementById('profile-image-preview');

        // Set initial profile image from data
        if (profilePreview && student.profileImage) {
            profilePreview.style.backgroundImage = `url('${student.profileImage}')`;
        }

        if (editBtn && actionsDiv) {
            editBtn.addEventListener('click', () => {
                actionsDiv.classList.toggle('hidden');
                actionsDiv.classList.toggle('flex');
            });
        }

        if (uploadBtn && fileInput) {
            uploadBtn.addEventListener('click', () => {
                fileInput.click();
            });

            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        profilePreview.style.backgroundImage = `url('${e.target.result}')`;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                // Simulate saving
                alert('Profile picture updated successfully!');
                actionsDiv.classList.add('hidden');
                actionsDiv.classList.remove('flex');
            });
        }

    } catch (error) {
        console.error("Error loading settings:", error);
    }
});
