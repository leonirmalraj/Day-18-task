// Function to make a GET request using Fetch and return a promise
function fetchData(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Function to create and append table rows with user data
function displayUserData(users) {
    const tableBody = document.querySelector('#userDataTable tbody');

    users.forEach(user => {
        const row = tableBody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);

        cell1.textContent = user.name;
        cell2.textContent = user.email;
        cell3.textContent = user.phone;
    });
}

// API endpoint for user data
const apiUrl = 'https://jsonplaceholder.typicode.com/users';

// Fetch data and display in the table
fetchData(apiUrl)
    .then(users => {
        displayUserData(users);
    });
