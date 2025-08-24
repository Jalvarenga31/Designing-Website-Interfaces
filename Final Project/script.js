const form = document.getElementById("reviewForm");
const reviewsDiv = document.getElementById("reviews");
const clearBtn = document.getElementById("clearBtn");

// Load stored reviews or initialize empty array
let reviews = JSON.parse(localStorage.getItem("gameReviews")) || [];

// Display all stored reviews on page load
reviews.forEach(r => displayReview(r));

// Form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const review = {
    title: document.getElementById("title").value,
    playtime: document.getElementById("playtime").value,
    rating: document.getElementById("rating").value,
    text: document.getElementById("reviewText").value,
    spoiler: document.getElementById("spoiler").checked,
    recommend: document.querySelector("input[name='recommend']:checked").value
  };

  reviews.unshift(review); // newest first
  localStorage.setItem("gameReviews", JSON.stringify(reviews));

  displayReview(review, true);
  form.reset();
});

// Display a single review
function displayReview(review, prepend = false) {
  const div = document.createElement("div");
  div.className = "review";

  div.innerHTML = `
    <p><strong>Game:</strong> ${review.title}</p>
    <p><strong>Playtime:</strong> ${review.playtime}</p>
    <p><strong>Rating:</strong> ${review.rating}/10</p>
    <p><strong>Recommendation:</strong> ${review.recommend}</p>
    <p><strong>Review:</strong> ${
      review.spoiler 
        ? `<span class="spoiler">Spoiler (Click to reveal)</span><span class="hiddenText" style="display:none;"> ${review.text}</span>` 
        : review.text
    }</p>
  `;

  if (prepend) {
    reviewsDiv.prepend(div);
  } else {
    reviewsDiv.appendChild(div);
  }

  // Spoiler toggle
  if (review.spoiler) {
    const spoilerSpan = div.querySelector(".spoiler");
    const hiddenText = div.querySelector(".hiddenText");
    spoilerSpan.addEventListener("click", () => {
      hiddenText.style.display = "inline";
      spoilerSpan.style.display = "none";
    });
  }
}

// Clear all reviews
clearBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all reviews?")) {
    reviews = [];
    localStorage.removeItem("gameReviews");
    reviewsDiv.innerHTML = "";
  }
});
