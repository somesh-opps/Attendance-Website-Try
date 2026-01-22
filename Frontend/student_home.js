document.addEventListener("DOMContentLoaded", () => {
  // Mock Data - Replace this with actual API calls to your MongoDB backend
  const mockData = {
    student: {
      name: "Bruce Wayne",
      registrationNo: "REG123456789",
      enrollmentNo: "ENRL987654321",
      department: "Computer Science & Engineering",
      section: "A",
      rollNo: "25",
      semester: "6th",
      status: "Active",
      profileImage: "images/profileimage.png",
    },
  };

  // DOM Elements
  const studentName = document.getElementById("student-name");
  const registrationNo = document.getElementById("registration-no");
  const enrollmentNo = document.getElementById("enrollment-no");
  const department = document.getElementById("department");
  const section = document.getElementById("section");
  const rollNo = document.getElementById("roll-no");
  const semester = document.getElementById("semester");
  const statusText = document.getElementById("status-text");
  const statusIndicator = document.getElementById("status-indicator");
  const profileImage = document.getElementById("profile-image");
  const welcomeName = document.getElementById("welcome-name");

  // Function to fetch data (Simulated)
  async function fetchStudentProfile() {
    // In a real application, you would use fetch() here:
    // const response = await fetch('/api/student/profile');
    // const data = await response.json();

    // Simulating network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData);
      }, 500);
    });
  }

  // Initialize Page
  async function init() {
    try {
      const data = await fetchStudentProfile();
      populateProfile(data.student);
    } catch (error) {
      console.error("Failed to fetch student profile:", error);
      // Handle error
    }
  }

  function populateProfile(student) {
    if (studentName) studentName.textContent = student.name;
    if (registrationNo) registrationNo.textContent = student.registrationNo;
    if (enrollmentNo) enrollmentNo.textContent = student.enrollmentNo;
    if (department) department.textContent = student.department;
    if (section) section.textContent = student.section;
    if (rollNo) rollNo.textContent = student.rollNo;
    if (semester) semester.textContent = student.semester;

    // Update welcome message with first name
    if (welcomeName && student.name) {
      const firstName = student.name.split(" ")[0];
      welcomeName.textContent = `Good to see you, ${firstName}!`;
    }

    if (statusText) statusText.textContent = student.status;
    if (statusIndicator) {
      if (student.status === "Active") {
        statusIndicator.className =
          "inline-block h-2.5 w-2.5 rounded-full bg-green-500";
      } else {
        statusIndicator.className =
          "inline-block h-2.5 w-2.5 rounded-full bg-red-500";
      }
    }

    if (profileImage && student.profileImage) {
      profileImage.style.backgroundImage = `url("${student.profileImage}")`;
    }
  }

  // Start initialization
  init();
});
