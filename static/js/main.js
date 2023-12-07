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

    let app = document.getElementById('app');

    data.forEach(repo => {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardContent = document.createElement('div');
        cardContent.classList.add('header');

        const logoImage = document.createElement('img');
        logoImage.src = "../static/media/primary-logo.svg";
        logoImage.alt = "logo";

        const title = document.createElement('h2');
        title.textContent = repo.name;

        const description = document.createElement('p');
        description.textContent = repo.description || "No description available";

        const btnContent = document.createElement('div');
        btnContent.classList.add('footer');

        const Language = document.createElement('p');
        Language.textContent = repo.language || "No language available";
        Language.classList.add('language');

        const githubLink = document.createElement('a');
        githubLink.href = repo.html_url;

        const githubText = document.createElement('p');
        githubText.textContent = "github";

        const arrowImage = document.createElement('img');
        arrowImage.src = "../static/media/arrow.svg";
        arrowImage.alt = "arrow";

        card.appendChild(cardContent);
        cardContent.appendChild(logoImage);
        cardContent.appendChild(title);
        card.appendChild(description);
        githubLink.appendChild(githubText);
        githubLink.appendChild(arrowImage);
        btnContent.appendChild(Language)
        btnContent.appendChild(githubLink);
        card.appendChild(btnContent);

        app.appendChild(card);
    });
}

populateApp().then(r => {})