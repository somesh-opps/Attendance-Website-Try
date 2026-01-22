document.addEventListener('DOMContentLoaded', () => {
    // Mock Data - Replace this with actual API calls to your MongoDB backend
    const mockData = {
        week: {
            user: {
                name: "Jessica",
                overallAttendance: 100,
                totalClasses: 10,
                missedClasses: 0
            },
            classes: [
                { id: "math101", name: "Advanced Mathematics", attendanceRate: 100, attended: 2, total: 2, absences: 0, lastAbsence: "N/A" },
                { id: "phys202", name: "Physics II", attendanceRate: 100, attended: 2, total: 2, absences: 0, lastAbsence: "N/A" },
                { id: "cs101", name: "Computer Science 101", attendanceRate: 100, attended: 3, total: 3, absences: 0, lastAbsence: "N/A" },
                { id: "eng101", name: "English Literature", attendanceRate: 100, attended: 3, total: 3, absences: 0, lastAbsence: "N/A" }
            ]
        },
        month: {
            user: {
                name: "Jessica",
                overallAttendance: 95,
                totalClasses: 40,
                missedClasses: 2
            },
            classes: [
                { id: "math101", name: "Advanced Mathematics", attendanceRate: 100, attended: 8, total: 8, absences: 0, lastAbsence: "N/A" },
                { id: "phys202", name: "Physics II", attendanceRate: 87, attended: 7, total: 8, absences: 1, lastAbsence: "Nov 02, 2023" },
                { id: "cs101", name: "Computer Science 101", attendanceRate: 100, attended: 12, total: 12, absences: 0, lastAbsence: "N/A" },
                { id: "eng101", name: "English Literature", attendanceRate: 91, attended: 11, total: 12, absences: 1, lastAbsence: "Nov 10, 2023" }
            ]
        },
        semester: {
            user: {
                name: "Jessica",
                overallAttendance: 92,
                totalClasses: 120,
                missedClasses: 10
            },
            classes: [
                { id: "math101", name: "Advanced Mathematics", attendanceRate: 98, attended: 24, total: 25, absences: 1, lastAbsence: "Oct 15, 2023" },
                { id: "phys202", name: "Physics II", attendanceRate: 85, attended: 17, total: 20, absences: 3, lastAbsence: "Nov 02, 2023" },
                { id: "cs101", name: "Computer Science 101", attendanceRate: 100, attended: 30, total: 30, absences: 0, lastAbsence: "N/A" },
                { id: "eng101", name: "English Literature", attendanceRate: 90, attended: 18, total: 20, absences: 2, lastAbsence: "Sep 20, 2023" }
            ]
        }
    };

    let currentPeriod = 'semester'; // Default period
    let currentData = mockData[currentPeriod];

    // DOM Elements
    const userGreeting = document.getElementById('user-greeting');
    const overallAttendancePercentage = document.getElementById('overall-attendance-percentage');
    const absentPercentage = document.getElementById('absent-percentage');
    const totalClasses = document.getElementById('total-classes');
    const missedClasses = document.getElementById('missed-classes');
    const classSelect = document.getElementById('class-select');
    const classAttendanceRate = document.getElementById('class-attendance-rate');
    const classAttendedCount = document.getElementById('class-attended-count');
    const classAbsences = document.getElementById('class-absences');
    const classLastAbsence = document.getElementById('class-last-absence');
    const reportIssueBtn = document.getElementById('report-issue-btn');
    const emailReportBtn = document.getElementById('email-report-btn');
    const timeFilterBtns = document.querySelectorAll('.time-filter-btn');

    // Function to fetch data (Simulated)
    async function fetchAnalyticsData(period) {
        // In a real application, you would use fetch() here:
        // const response = await fetch(`/api/analytics?period=${period}`);
        // const data = await response.json();
        
        // Simulating network delay
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(mockData[period]);
            }, 300);
        });
    }

    // Initialize Page
    async function init() {
        try {
            // Set initial active state for buttons
            updateButtonStates(currentPeriod);
            
            const data = await fetchAnalyticsData(currentPeriod);
            currentData = data;
            populateDashboard(data);
        } catch (error) {
            console.error("Failed to fetch analytics data:", error);
        }
    }

    function populateDashboard(data) {
        // User Greeting
        userGreeting.textContent = `Welcome, ${data.user.name}. Here is your attendance summary.`;

        // Overall Stats
        overallAttendancePercentage.textContent = `${data.user.overallAttendance}%`;
        absentPercentage.textContent = `${100 - data.user.overallAttendance}%`;
        totalClasses.textContent = data.user.totalClasses;
        missedClasses.textContent = data.user.missedClasses;

        // Populate Class Select Dropdown
        // Save current selection if possible
        const currentSelection = classSelect.value;
        
        classSelect.innerHTML = '<option value="">Select a class</option>';
        data.classes.forEach(cls => {
            const option = document.createElement('option');
            option.value = cls.id;
            option.textContent = cls.name;
            classSelect.appendChild(option);
        });

        // Restore selection or select first
        if (currentSelection && data.classes.find(c => c.id === currentSelection)) {
            classSelect.value = currentSelection;
            const selectedClass = data.classes.find(c => c.id === currentSelection);
            updateClassDetails(selectedClass);
        } else if (data.classes.length > 0) {
            classSelect.value = data.classes[0].id;
            updateClassDetails(data.classes[0]);
        } else {
            resetClassDetails();
        }
    }

    function updateClassDetails(cls) {
        classAttendanceRate.textContent = `${cls.attendanceRate}%`;
        classAttendanceRate.className = `text-sm font-bold ${cls.attendanceRate >= 75 ? 'text-green-500' : 'text-red-500'}`;
        
        classAttendedCount.textContent = `${cls.attended} / ${cls.total}`;
        classAbsences.textContent = cls.absences;
        classLastAbsence.textContent = cls.lastAbsence;
    }

    function resetClassDetails() {
        classAttendanceRate.textContent = '--%';
        classAttendanceRate.className = 'text-sm font-bold text-slate-700 dark:text-slate-300';
        classAttendedCount.textContent = '-- / --';
        classAbsences.textContent = '--';
        classLastAbsence.textContent = '--';
    }

    function updateButtonStates(activePeriod) {
        timeFilterBtns.forEach(btn => {
            const period = btn.dataset.period;
            if (period === activePeriod) {
                // Active styles
                btn.className = 'time-filter-btn px-3 py-1.5 rounded-md bg-white dark:bg-slate-700 text-primary dark:text-white text-xs font-semibold shadow-sm transition-all';
            } else {
                // Inactive styles
                btn.className = 'time-filter-btn px-3 py-1.5 rounded-md text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-white dark:hover:bg-slate-700/50 transition-all';
            }
        });
    }

    // Event Listeners
    
    // Time Filter Buttons
    timeFilterBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const period = btn.dataset.period;
            if (period === currentPeriod) return; // Do nothing if already active

            currentPeriod = period;
            updateButtonStates(currentPeriod);
            
            // Show loading state if needed (optional)
            
            const data = await fetchAnalyticsData(currentPeriod);
            currentData = data;
            populateDashboard(data);
        });
    });

    // Class Selection
    classSelect.addEventListener('change', (e) => {
        const selectedClassId = e.target.value;
        if (selectedClassId) {
            const selectedClass = currentData.classes.find(c => c.id === selectedClassId);
            updateClassDetails(selectedClass);
        } else {
            resetClassDetails();
        }
    });

    // Button Event Listeners
    reportIssueBtn.addEventListener('click', () => {
        // Logic to open report issue modal or redirect
        alert("Report Issue feature coming soon!");
    });

    emailReportBtn.addEventListener('click', () => {
        // Logic to trigger email report
        alert(`Report emailed to ${currentData.user.name} (simulated)`);
    });

    // Start initialization
    init();
});
