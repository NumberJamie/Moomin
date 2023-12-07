async function populateApp() {
    let data = localStorage.getItem('githubRepos');

    if (!data) {
        try {
            const response = await fetch("https://api.github.com/users/NumberJamie/repos");
            data = await response.json();
            localStorage.setItem('githubRepos', JSON.stringify(data));
        } catch (error) {
            console.error('Error fetching data:', error);
            return;
        }
    } else {
        data = JSON.parse(data);
    }

    const app = document.getElementById('app');

    data.forEach(repo => {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardContent = document.createElement('div');
        cardContent.classList.add('header');

        const title = document.createElement('h2');
        title.textContent = repo.name;

        const description = document.createElement('p');
        description.textContent = repo.description || "No description available";

        const btnContent = document.createElement('div');
        btnContent.classList.add('footer');

        const language = document.createElement('p');
        language.textContent = repo.language || "No language available";
        language.classList.add('language');

        const githubLink = document.createElement('a');
        githubLink.href = repo.html_url;
        githubLink.textContent = "github";

        card.appendChild(cardContent);
        cardContent.appendChild(title);
        card.appendChild(description);
        btnContent.appendChild(language)
        btnContent.appendChild(githubLink);
        card.appendChild(btnContent);

        app.appendChild(card);
    });
}

populateApp().then(() => {});