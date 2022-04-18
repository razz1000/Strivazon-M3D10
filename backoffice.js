const URLAPI = "https://striveschool-api.herokuapp.com/api/movies/";
const eventId = new URLSearchParams(window.location.search).get("userId");
console.log(eventId);
const method = eventId ? "PUT" : "POST";

const endPoint = eventId ? URLAPI + eventId : URLAPI;

const options = {
  method: method,
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU2YmNiZmE5MDIzOTAwMTVkOTY1YzYiLCJpYXQiOjE2NTAwMTc3NDAsImV4cCI6MTY1MTIyNzM0MH0.7GJaEK4mjADWWTH6upeMg83-z5R1hkoRrN_hdGaafvA",
  },
};

window.onload = async () => {
  if (eventId) {
    console.log("resource ID: " + eventId);

    const response = await fetch(endPoint, options);
    const { name, imageUrl, category, description } = await response.json();

    document.getElementById("name").value = name;
    document.getElementById("description").value = description;
    document.getElementById("category").value = category;
    document.getElementById("image").value = imageUrl;

    const submitButton = document.querySelector(".submitbutton");
    submitButton.innerText = "Edit";
  } else if (eventId === null) {
    const response = await fetch(endPoint, options);
    const body = await response.json();
    console.log(body);
    const movies = await body.parsedBody;
    console.log(movies);
  }
};

let formOnSubmitFunction = async (event) => {
  console.log(event);
  event.preventDefault();
  buttonLoadingFunction(true);
  const theCurrentFormEvent = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    category: document.getElementById("category").value,
    imageUrl: document.getElementById("image").value,
  };

  const response = await fetch(endPoint, {
    method: method,
    body: JSON.stringify(theCurrentFormEvent),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU2YmNiZmE5MDIzOTAwMTVkOTY1YzYiLCJpYXQiOjE2NDk4NTE1ODMsImV4cCI6MTY1MTA2MTE4M30.1jc7LN9eMX4yZ7HWl4wazVJ2SyiKUzAHtFm0IglDnhY",
    },
  });

  if (eventId) {
    const body = await response.json();

    buttonLoadingFunction(false);

    alert("You just edited : " + body._id);
    console.log(response);
    window.location.assign("./index.html");
  } else {
    const body = await response.json();
    buttonLoadingFunction(false);
    alert("You have just posted a new movie with this id: " + body._id);
    window.location.assign("./index.html");
  }
};

/* The delete button */
const options2 = {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU2YmNiZmE5MDIzOTAwMTVkOTY1YzYiLCJpYXQiOjE2NTAwMTc3NDAsImV4cCI6MTY1MTIyNzM0MH0.7GJaEK4mjADWWTH6upeMg83-z5R1hkoRrN_hdGaafvA",
  },
};

let deleteEventButton = async (event) => {
  console.log(event.target);

  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/movies/" + eventId,
    options2
  );

  const parsedBody = await response.json();
  console.log(parsedBody);

  if (window.confirm("Are you sure you would like to delete this movie?")) {
    alertContainer(
      "You successfully deleted the movie, with the following ID: " + eventId
    );
    setTimeout(() => {
      window.location.assign("./index.html");
    }, 2500);
  } else console.log("Cancel was pressed");
};

/* The Validate event */
let validateEvent = (event) => {
  console.log(event.target.parentElement.querySelector(".form1"));
  document.querySelector(".form1").classList.add("validated");
};

/* The Loading Button  */
let buttonLoadingFunction = (loadinstate) => {
  const submitbutton = document.querySelector(".submitbutton");
  if (loadinstate) {
    submitbutton.innerHTML = `<div class="spinner-border text-primary" role="status">
    <span class="sr-only">Loading...</span>
  </div>`;
  } else {
    submitbutton.querySelector(".spinner-border").remove();
  }
};

let alertContainer = (msg) => {
  let alertContainer = document.querySelector(".alert-container");

  alertContainer.innerHTML = `<div class="alert alert-danger" role="alert">${msg}
</div>`;
};

/* RESET BUTTON FUNCTION */
let resetButton = (event) => {
  window.location.assign("./backoffice.html");
};
