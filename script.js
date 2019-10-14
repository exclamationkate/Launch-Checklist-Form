// Write your JavaScript code here!

window.addEventListener("load", function() {
   let json = [];
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then(function(json){
         const missionTarget = document.getElementById("missionTarget");
         let index = Math.floor(Math.random() * json.length);
         console.log(json.length);

         missionTarget.innerHTML = `
         <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[index].name}</li>
               <li>Diameter: ${json[index].diameter}</li>
               <li>Star: ${json[index].star}</li>
               <li>Distance from Earth: ${json[index].distance}</li>
               <li>Number of Moons: ${json[index].moons}</li>
            </ol>
            <img src="${json[index].image}">
         `;
      });
   });

   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      let pilotName = document.querySelector("input[name=pilotName]");
      let copilotName = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoWeight = document.querySelector("input[name=cargoWeight]");
      let letters = /^[a-zA-Z\s]*$/;

      // Checks that a value was entered in all fields
      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoWeight.value === "") {
         alert("All fields are required!");
         event.preventDefault();
      }
      // Checks that only letters or spaces were used in the Pilot and Co-Pilot fields
      if (pilotName.value.match(letters) && copilotName.value.match(letters)) {
         
      } else {
         alert("Make sure to enter valid information for each field!");
         event.preventDefault();
      }
      // Checks that number was entered into Fuel Level and Cargo Weight fields
      if (isNaN(fuelLevel.value) || isNaN(cargoWeight.value)) {
         alert("Make sure to enter valid information for each field!");
         event.preventDefault();
      } else {
         fuelLevel = Number(fuelLevel.value);
         cargoWeight = Number(cargoWeight.value);
      }
      
      let pilotStatus = document.getElementById("pilotStatus");
      let copilotStatus = document.getElementById("copilotStatus");
      let fuelStatus = document.getElementById("fuelStatus");
      let cargoStatus = document.getElementById("cargoStatus");
      let fuelStatusGood = false;
      let cargoStatusGood = false;

      pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch`;
      copilotStatus.innerHTML = `Co-Pilot ${copilotName.value} is ready for launch`;

      if (fuelLevel < 10000) {
         document.getElementById("faultyItems").style.visibility = "visible";
         fuelStatus.innerHTML = `Fuel level too low for launch`;
         document.getElementById("launchStatus").style.color = "red";
         document.getElementById("launchStatus").innerHTML = `Shuttle Not Ready For Launch`;
      } else {
         fuelStatus.innerHTML = `Fuel level high enough for launch`;
         fuelStatusGood = true;
      }

      if (cargoWeight > 10000) {
         document.getElementById("faultyItems").style.visibility = "visible";
         cargoStatus.innerHTML = `Cargo weight too high for launch`;
         document.getElementById("launchStatus").style.color = "red";
         document.getElementById("launchStatus").innerHTML = `Shuttle Not Ready For Launch`;
      } else {
         cargoStatus.innerHTML = `Cargo weight low enough for launch`;
         cargoStatusGood = true;
      }

      if (fuelStatusGood && cargoStatusGood) {
         document.getElementById("faultyItems").style.visibility = "hidden";
         document.getElementById("launchStatus").style.color = "green";
         document.getElementById("launchStatus").innerHTML = `Shuttle Ready For Launch`;
      }

      event.preventDefault();
      
   });
});