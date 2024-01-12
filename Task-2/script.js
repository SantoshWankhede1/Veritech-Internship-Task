// Set the launch date (replace with your actual launch date)
const launchDate = new Date('February 15, 2024 00:00:00 GMT+0000').getTime();

// Update the countdown every 1 second
const countdownInterval = setInterval(updateCountdown, 1000);

function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = launchDate - now;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Display the countdown
    document.getElementById('countdown').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // If the launch date has passed, display a message and clear the countdown interval
    if (timeRemaining < 0) {
        document.getElementById('countdown').innerHTML = 'Launch has occurred!';
        clearInterval(countdownInterval);
    }
}
