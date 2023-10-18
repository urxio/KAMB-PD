window.onload = function () {
    var savedStartTime = localStorage.getItem('startTime');
    var savedEndTime = localStorage.getItem('endTime');

    // Extract the date from the start time
    var date = savedStartTime.split('T')[0];

    // Extract the time from the start time
    var startTime = convertTo12HourFormat(savedStartTime.split('T')[1]);

    // Extract the time from the end time
    var endTime = convertTo12HourFormat(savedEndTime.split('T')[1]);

    // Set the date and time in the appropriate elements
    document.getElementById('date-display').textContent = date;
    document.getElementById('time-display').textContent = startTime + ' - ' + endTime;

    // Retrieve the selected DJ data from localStorage
    var selectedDJ = localStorage.getItem('selectedDJ');

    // Update the DJ image and name in the HTML
    var djImageElement = document.getElementById('dj-image');
    var djNameElement = document.getElementById('dj-name');

    // Set the DJ image source and alt attribute
    djImageElement.src = 'img/' + selectedDJ.split(' ')[0] + '.png';
    djImageElement.alt = selectedDJ + ' Image';

    // Set the DJ name
    djNameElement.textContent = selectedDJ;
};

function convertTo12HourFormat(time) {
    var hour = parseInt(time.split(':')[0]);
    var minute = time.split(':')[1];
    var period = hour >= 12 ? 'PM' : 'AM';

    // Convert hour to 12-hour format
    hour = hour % 12;
    if (hour !== 0) {
        hour = hour;
      } else {
        hour = 12;
      } // Handle midnight (0) as 12

    return hour + ':' + minute + ' ' + period;
}