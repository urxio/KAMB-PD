window.onload = function() {
    document.getElementById('submit-button').addEventListener('click', function() {
      var startTime = document.getElementById('start-time').value;
      var endTime = document.getElementById('end-time').value;
  
      localStorage.setItem('startTime', startTime);
      localStorage.setItem('endTime', endTime);
    });
  };