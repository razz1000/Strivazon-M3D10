const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU2YmNiZmE5MDIzOTAwMTVkOTY1YzYiLCJpYXQiOjE2NDk4NTE1ODMsImV4cCI6MTY1MTA2MTE4M30.1jc7LN9eMX4yZ7HWl4wazVJ2SyiKUzAHtFm0IglDnhY",
  },
};

window.onload = () => {
  showActionMoviesFunction();
  showRomanceMoviesFunction();
  showThrillerMoviesFunction();
  showSpinnerFunctionforActionMovies(true);
  showSpinnerForRomanceFunction(true);
  showSpinnerForThrillerMovies(true);
};

let actionRow = document.querySelector(".action-row");
let romanceRow = document.querySelector(".romance-row");
let thrillerRow = document.querySelector(".thriller-row");

/* THIS IS THE ACTION MOVIES FUNCTION */
let showActionMoviesFunction = async () => {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/movies/action",
    options
  );
  const parsedBody = await response.json();
  console.log(parsedBody);

  showSpinnerFunctionforActionMovies(false);

  actionRow.innerHTML = "";
  parsedBody.forEach((movie) => {
    let div1 = document.createElement("div");
    div1.innerHTML = `<div class="col-6 col-md-4 col-lg-6 px-1">
          <a href="./backoffice.html?userId=${movie._id}"><img class="img-fluid row-images" src="${movie.imageUrl}"></a>
          <h4>${movie.name}</h4>
          <h6>${movie.description}</h6>
    </div>
        `;
    actionRow.appendChild(div1);
  });
};

/* THIS IS THE ROMANCE MOVIES FUNCTION */
let showRomanceMoviesFunction = async () => {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/movies/romance",
    options
  );
  const parsedBody = await response.json();
  console.log(parsedBody);

  showSpinnerForRomanceFunction(false);

  romanceRow.innerHTML = "";
  parsedBody.forEach((movie) => {
    let div1 = document.createElement("div");
    div1.innerHTML = `<div class="col-6 col-md-4 col-lg-6 px-1">
          <a href="./backoffice.html?userId=${movie._id}"><img class="img-fluid row-images" src="${movie.imageUrl}"></a>
          <h4>${movie.name}</h4>
          <h6>${movie.description}</h6>
      </div>
          `;
    romanceRow.appendChild(div1);
  });
};

/* THIS IS THE THRILLER MOVIES FUNCTION */
let showThrillerMoviesFunction = async () => {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/movies/thriller",
    options
  );
  const parsedBody = await response.json();
  console.log(parsedBody);

  showSpinnerForThrillerMovies(false);

  thrillerRow.innerHTML = "";
  parsedBody.forEach((movie) => {
    let div1 = document.createElement("div");
    div1.innerHTML = `<div class="col-6 col-md-4 col-lg-6 px-1">
            <a href="./backoffice.html?userId=${movie._id}"><img class="img-fluid row-images" src="${movie.imageUrl}"></a>
            <h4>${movie.name}</h4>
            <h6>${movie.description}</h6>
        </div>
            `;
    thrillerRow.appendChild(div1);
  });
};

/* THE 3 SPINNER FUNCTIONS BELOW */
let showSpinnerFunctionforActionMovies = (loadingstate) => {
  if (loadingstate) {
    actionRow.innerHTML = `<div class="spinner-border text-primary" role="status">
    <span class="sr-only">Loading...</span>
  </div>`;
  } else {
    actionRow.querySelector(".spinner-border").remove();
  }
};

let showSpinnerForRomanceFunction = (loadingstate) => {
  if (loadingstate) {
    romanceRow.innerHTML = `<div class="spinner-border text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>`;
  } else {
    romanceRow.querySelector(".spinner-border").remove();
  }
};

let showSpinnerForThrillerMovies = (loadingstate) => {
  if (loadingstate) {
    thrillerRow.innerHTML = `<div class="spinner-border text-primary" role="status">
    <span class="sr-only">Loading...</span>
  </div>`;
  } else {
    thrillerRow.querySelector(".spinner-border").remove();
  }
};
/* END - THE 3 SPINNER FUNCTIONS */
