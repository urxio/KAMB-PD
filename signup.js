window.onload = function() {
    document.getElementById('signupform').addEventListener('submit', function(event) {
      event.preventDefault();
  
      var firstname = document.getElementById('firstname').value;
      var lastname = document.getElementById('lastname').value;
      var username = document.getElementById('username').value;
      var password = document.getElementById('password').value;
  
      if (!firstname || !lastname || !username || !password) {
        alert('All fields are required.');
        return false;
      }
  
      if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return false;
      }
  
      // Submit the form 
      document.getElementById('signupform').submit();
    });
  }