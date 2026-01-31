// Set up elements
const startDateInput = document.getElementById('startDate');
const startDateDisplay = document.getElementById('startDateDisplay');
const durationInput = document.getElementById('duration');
const endDateDisplay = document.getElementById('endDate');
const returnDateDisplay = document.getElementById('returnDate');
const headerDate = document.getElementById('current-date-display');

// Initialize with today's date
const today = new Date();
// Format for header
headerDate.textContent = today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
// Set input default to today (YYYY-MM-DD)
startDateInput.valueAsDate = today;
updateDisplayDate();

// Event Listeners
startDateInput.addEventListener('input', () => {
    updateDisplayDate();
    calculateDates();
});

durationInput.addEventListener('input', calculateDates);

// Helper: Update the visual text for Start Date
function updateDisplayDate() {
    const date = new Date(startDateInput.value + 'T00:00:00'); // Fix timezone issue
    const options = { month: 'short', day: 'numeric' };
    startDateDisplay.textContent = date.toLocaleDateString('en-US', options);
}

// Helper: Quick Add Buttons
function addDays(days) {
    durationInput.value = days;
    calculateDates();
}

// Main Logic
function calculateDates() {
    const start = new Date(startDateInput.value + 'T00:00:00');
    const duration = parseInt(durationInput.value);

    if (!duration || duration < 1) {
        endDateDisplay.textContent = "--";
        returnDateDisplay.textContent = "--";
        return;
    }

    // Medical Logic: Start Date is Day 1. 
    // So if duration is 1 day, End Date = Start Date.
    // End Date = Start + (Duration - 1)
    const end = new Date(start);
    end.setDate(start.getDate() + (duration - 1));

    // Return to Work = End Date + 1
    const returnDay = new Date(end);
    returnDay.setDate(end.getDate() + 1);

    // Format Outputs
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    
    endDateDisplay.textContent = end.toLocaleDateString('en-US', options);
    returnDateDisplay.textContent = returnDay.toLocaleDateString('en-US', options);
}
