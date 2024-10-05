const apiKey = "AsG8oB3SZuEVnwfQc7u9fBiREJjD1ZotBeK2iMWg";
const today = new Date()
  .toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  .replace(/\//g, "-");
let figure, explanation;
let pictureDate;

// clear content of an html element to make room for new content
function clearContent(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// get image data from NASA API
function getImage(date) {
  return fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`
  ).then((r) => r.json());
}

// render new content onto the page
function renderContent({ date, explanation: text, title, ...media }) {
  pictureDate = date;

  clearContent(explanation);
  let p = document.createElement("p");
  p.textContent = text;
  explanation.appendChild(p);
  if (media.copyright) {
    p = document.createElement("p");
    p.textContent = `© ${media.copyright}`;
    explanation.appendChild(p);
  }

  clearContent(figure);
  const caption = document.createElement("figcaption");
  caption.textContent = title;
  figure.appendChild(caption);
  if (media.media_type === "image") {
    const img = document.createElement("img");
    // use hdurl for better resolution if it's available, otherwise use url.
    img.src = media.hdurl ? media.hdurl : media.url;
    img.alt = title;
    figure.appendChild(img);
  } else if (media.media_type === "video") {
    // use iframe to display youtube video link
    const iframe = document.createElement("iframe");
    iframe.src = media.url;
    figure.appendChild(iframe);
  }
}

function handleDateChange(date) {
  if (date !== pictureDate) {
    return getImage(date).then(renderContent).catch(console.error);
  }
  return Promise.resolve();
}

// execute logic when html page is ready
window.addEventListener("load", () => {
  // populate DOM variables (for renderContent)
  figure = document.querySelector(".figure");
  explanation = document.querySelector(".explanation");

  // get today's picture from API
  handleDateChange(today);

  // initialize input field
  const input = document.querySelector("#date");
  input.max = today;
  input.value = today;
  input.addEventListener("change", () => {
    if (input.validity.valid) {
      handleDateChange(input.value);
    }
  });
});
