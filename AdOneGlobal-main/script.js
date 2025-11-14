(function() {
  emailjs.init("ck7nxs3Fsg3yndcoX"); // Replace with your EmailJS user ID
})();

document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault();  // Prevent form from submitting in the traditional way
  
  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const number = document.getElementById("number").value;
  const message = document.getElementById("message").value;

  // Check if the user has agreed to the privacy policy
  const agree = document.getElementById("agree").checked;

  if (!agree) {
    alert("Please agree to the Privacy Policy.");
    return;
  }

  // Prepare the data to send to EmailJS
  const emailParams = {
    user_name: name,
    user_email: email,
    user_number: number,
    message: message,
  };

  // Send the email via EmailJS
  emailjs.send("service_15ymipx", "template_grhfzm1", emailParams)
    .then(function(response) {
      console.log("Email sent successfully:", response);
      alert("Your message has been sent!");
    }, function(error) {
      console.log("Error sending email:", error);
      alert("Oops! Something went wrong, please try again later.");
    });
});


  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navlink-2"); // This ID must match

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });


  const links = navLinks.querySelectorAll("a");
  links.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
