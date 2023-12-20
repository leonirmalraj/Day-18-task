// script.js

document.addEventListener('DOMContentLoaded', () => {
    const apiUrls = [
        'https://jsonplaceholder.typicode.com/todos/1',
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/users/1'
    ];

    let uniqueId = 1; // Initialize a unique ID counter

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }

            const data = await response.json();
            return { id: uniqueId++, data }; // Return both the unique ID and the data
        } catch (error) {
            console.error(error);
            throw error; // Rethrow the error for better error handling
        }
    };

    const displayData = (rowData) => {
        const dataContainer = document.getElementById('data-container');
        const tableRow = document.createElement('tr');

        tableRow.innerHTML = `
            <td>${rowData.id}</td>
            <td>${rowData.data.title || rowData.data.name}</td>
            <td>${JSON.stringify(rowData.data, null, 2)}</td>
        `;

        dataContainer.appendChild(tableRow);
    };

    const fetchDataAndDisplay = async () => {
        try {
            for (const url of apiUrls) {
                const rowData = await fetchData(url);
                displayData(rowData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    fetchDataAndDisplay();
});
