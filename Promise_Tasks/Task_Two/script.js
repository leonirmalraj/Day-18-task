// Function to fetch data using Promise
function fetchData(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

// Function to render SpaceX launch data on the webpage
function renderLaunchList(launchList) {
    const launchListContainer = document.getElementById('launchList');
    launchList.forEach(launch => {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4');
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${launch.name}</h5>
                    <p class="card-text">Flight Number: ${launch.flight_number}</p>
                    <p class="card-text">Launch Date: ${new Date(launch.launch_date_utc).toLocaleDateString()}</p>
                    <a href="${launch.links.article}" target="_blank" class="btn btn-primary">Read More</a>
                </div>
            </div>
        `;
        launchListContainer.appendChild(card);
    });
}

// Fetch SpaceX Launches
const spacexApiUrl = 'https://api.spacexdata.com/v4/launches';
fetchData(spacexApiUrl)
    .then(data => {
        if (data) {
            renderLaunchList(data);
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
