
        function toggleMenu() {
            const sidebar = document.getElementById("sidebar");
            sidebar.classList.toggle("active");
        }

        document.getElementById("scroll-down").addEventListener("click", function() {
            document.getElementById("content").scrollIntoView({ behavior: "smooth" });
        });

        document.getElementById("scroll-down1").addEventListener("click", function() {
          document.getElementById("footer").scrollIntoView({ behavior: "smooth" });
      });

        const planets = [
            { name: "Mercury", image: "../images/mercury.jpg", description: "Mercury is the smallest and fastest planet, orbiting the Sun in just 88 days. It has extreme temperature variations, scorching hot during the day and freezing at night." , link: "../planets/mercury/mercury.html"},
            { name: "Venus", image: "../images/venus.webp", description: "Venus, often called Earth's twin, has a thick atmosphere that traps heat, making it the hottest planet. It rotates in the opposite direction and has a toxic, dense atmosphere." , link: "../planets/venus/venus.html" },
            { name: "Earth", image: "../images/earth1.jpg", description: "Earth is the only known planet to support life, with vast oceans and a protective atmosphere. Its balanced climate and magnetic field make it a habitable world." , link: "../planets/earth/earth.html"},
            { name: "Mars", image: "../images/mars.jpg", description: "Mars, the 'Red Planet', is covered in iron-rich dust and has the tallest volcano, Olympus Mons. Scientists believe it once had liquid water, raising questions about past life.", link: "../planets/mars/mars.html" },
            { name: "Jupiter", image: "../images/jupiter.jpg", description: "Jupiter, the largest planet, is a gas giant with a raging storm called the Great Red Spot. It has over 79 moons, including Ganymede, the biggest in the Solar System.", link: "../planets/jupiter/jupiter.html" },
            { name: "Saturn", image: "../images/saturn2.jpg", description: "Saturn is famous for its stunning ring system made of ice and rock. Its largest moon, Titan, has lakes of liquid methane and a thick atmosphere." , link: "../planets/saturn/saturn.html"},
            { name: "Uranus", image: "../images/uranus.jpg", description: "Uranus is tilted on its side, making it unique among planets. Its atmosphere is mostly hydrogen, helium, and methane, giving it a bluish-green color." , link: "../planets/uranus/uranus.html" },
            { name: "Neptune", image: "../images/neptune.jpg", description: "Neptune, the farthest planet, has the strongest winds in the Solar System. Its deep blue color comes from methane, and it experiences powerful storms." , link: "../planets/neptune/neptune.html"}
        ];

        let currentIndex = 0;
        const planetElement = document.getElementById("planet");
        const planetName = document.getElementById("planet-name");
        const planetDescription = document.getElementById("planet-description");

        function showPlanet(index) {
            const planet = planets[index];
            planetElement.style.backgroundImage = `url(${planet.image})`;
            planetName.textContent = planet.name;
            planetDescription.textContent = planet.description;

            const learnMoreButton = document.querySelector(".button");
    learnMoreButton.onclick = function () {
        window.location.href = planet.link;
    };
        }

        document.getElementById("prevPlanet").addEventListener("click", function() {
            currentIndex = (currentIndex - 1 + planets.length) % planets.length;
            showPlanet(currentIndex);
        });

        document.getElementById("nextPlanet").addEventListener("click", function() {
            currentIndex = (currentIndex + 1) % planets.length;
            showPlanet(currentIndex);
        });

        showPlanet(currentIndex);



       
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('newsletterEmail');
    const message = document.getElementById('formMessage');

    // Regex for simple email validation
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent page reload

      const email = emailInput.value.trim();

      if (!email) {
        message.textContent = "Please enter your email.";
        message.style.color = "orange";
      } else if (!isValidEmail(email)) {
        message.textContent = "Please enter a valid email address.";
        message.style.color = "red";
      } else {
        // Simulate a successful subscription
        message.textContent = `Thanks for subscribing, ${email}! `;
        message.style.color = "#e65476";
        form.reset();
      }
    });
  });

