let data = null;

async function fetchData() {
    try {
        const response = await fetch("https://api.github.com/users/NumberJamie/repos");
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function populateApp() {
    if (!data) {
        data = await fetchData();
    }

    if (data) {
        let app = document.getElementById('app');

        data.forEach(repo => {
            const card = document.createElement('div');
            card.classList.add('card', 'flex', 'column', 'between');
                               
            const cardContent = document.createElement('div');
            cardContent.classList.add('flex');

            const title = document.createElement('h2');
            title.classList.add('icon', 'rose', 'flex')
            title.textContent = repo.name;

            const description = document.createElement('p');
            description.textContent = repo.description || "No description available";

            const btnContent = document.createElement('div');
            btnContent.classList.add('auto', 'flex', 'between');

            const language = document.createElement('p');
            language.textContent = repo.language || "No language available";
            language.classList.add('icon', 'code', 'flex');

            const githubLink = document.createElement('a');
            githubLink.classList.add('button', 'icon', 'arrow', 'flex')
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
    } else {
        console.error('No data available.');
    }
}

populateApp().then(() => {});