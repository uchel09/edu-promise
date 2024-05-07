document.addEventListener("DOMContentLoaded", function () {

  const searchInput = document.getElementById("searchInput");
  const newsContainer = document.getElementById("newsContainer");


  const apiKey = "ef2a252c1e4946f1bd6b7b07df3745ca";
  const apiUrl = "https://newsapi.org/v2/everything";


  function createNewsCard(news) {
    const card = document.createElement("div");
    card.classList.add("card");

    const urlImage = document.createElement("img");
    urlImage.src = news.urlToImage;

    const title = document.createElement("h2");
    title.textContent = news.title;

    const description = document.createElement("p");
    description.textContent = news.description;

    const source = document.createElement("p");
    source.textContent = `Source: ${news.source.name}`;

    card.appendChild(urlImage);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(source);

    return card;
  }


  function displayNews(newsList) {
    newsContainer.innerHTML = "";

    newsList.forEach((news) => {
      const card = createNewsCard(news);
      newsContainer.appendChild(card);
    });
  }

  async function searchNews(searchTerm) {
    try {
      const response = await axios.get(apiUrl, {
        params: {
          q: searchTerm,
          from: "2024-05-05",
          to: "2024-05-05",
          sortBy: "popularity",
          apiKey: apiKey,
        },
      });
      const newsList = response.data.articles;
      displayNews(newsList);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }

  searchInput.addEventListener("input", function (event) {
    const searchTerm = event.target.value;
    if (searchTerm.trim() !== "") {
      searchNews(searchTerm);
    } else {
      searchNews("a");
    }
  });

  searchNews("a");
});
