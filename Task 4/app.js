// Sample data for demonstration, replace it with your real data
const trendingMoviesData = [
    { title: 'Sairat', thumbnail: 'movie1.jpeg' },
    { title: 'Bablu', thumbnail: 'movie2.jpeg' },
    { title: 'Devva', thumbnail: 'movie3.jpeg' },
    { title: 'Mai nhi bataunga', thumbnail: 'movie4.jpeg' },
    // Add more movies
];

const trendingSeriesData = [
    { title: 'Jane do', thumbnail: 'series1.jpeg' },
    { title: 'Nhi jane dunga', thumbnail: 'series2.jpeg' },
    { title: 'Jane do yaar', thumbnail: 'series3.jpeg' },
    { title: 'Bhaad me Jao', thumbnail: 'series4.jpeg' },
    // Add more series
];

const recommendedContentData = [
    { title: 'Sports', thumbnail: 'rec1.jpeg' },
    { title: 'News', thumbnail: 'rec2.jpeg' },
    { title: 'Entertainment', thumbnail: 'content3.jpeg' },
    { title: 'Spiritual', thumbnail: 'rec4.jpeg' },
    // Add more recommended content
];

// Function to populate content dynamically
function populateContent(sectionId, contentData) {
    const section = document.getElementById(sectionId);
    contentData.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<img src="${item.thumbnail}" alt="${item.title}">
                          <h3>${item.title}</h3>`;
        section.appendChild(card);
    });
}

// Populate content on page load
document.addEventListener('DOMContentLoaded', () => {
    populateContent('trendingContent', trendingMoviesData);
    populateContent('seriesContent', trendingSeriesData);
    populateContent('recommendedContent', recommendedContentData);
});
// Function to perform search
function performSearch() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const searchResultsSection = document.getElementById('searchResults');
    searchResultsSection.innerHTML = ''; // Clear previous search results

    // Loop through the data (assuming you have a variable named 'allContentData' that contains all content)
    allContentData.forEach(item => {
        if (item.title.toLowerCase().includes(searchInput)) {
            const resultCard = document.createElement('div');
            resultCard.classList.add('card');
            resultCard.innerHTML = `<img src="${item.thumbnail}" alt="${item.title}">
                                    <h3>${item.title}</h3>`;
            resultCard.addEventListener('click', () => openModal(item));
            searchResultsSection.appendChild(resultCard);
        }
    });

    // Optionally, you can display a message if no results are found
    if (searchResultsSection.children.length === 0) {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'No results found.';
        searchResultsSection.appendChild(noResultsMessage);
    }
}
