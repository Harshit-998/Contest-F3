let getLocationBtn = document.getElementById("getLocation");
let map = document.querySelector("iframe");
let removeLocationBtn = document.getElementById("removeLocation");

// console.log(map);
if (localStorage.getItem("location") != null) {
  getLocationBtn.disabled = true;
  removeLocationBtn.disabled = false;
  let location = JSON.parse(localStorage.getItem("location"));
  map.src = `https://maps.google.com/maps?q=${location.lat},${location.long}&z=15&output=embed`;
} else {
  removeLocationBtn.disabled = true;
  map.src = "https://maps.google.com/maps?q=&z=15&output=embed&";
}

getLocationBtn.addEventListener("click", () => {
  if (getLocation()) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("error");
    let p = document.createElement("p");
    p.style.color = "red";
    p.innerHTML = "Oops Something is wrong!!";
    document.body.appendChild(p);
  }
});

function getLocation() {
  return navigator.geolocation;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude, longitude);
  let location = {};
  location.lat = latitude;
  location.long = longitude;
  console.log(location);
  localStorage.setItem("location", JSON.stringify(location));
  map.src = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
  getLocationBtn.disabled = true;
  removeLocationBtn.disabled = false;
}

removeLocationBtn.addEventListener("click", () => {
  localStorage.removeItem("location");
  getLocationBtn.disabled = false;
  removeLocationBtn.disabled = true;
  map.src = "https://maps.google.com/maps?q=&z=15&output=embed&";
});
