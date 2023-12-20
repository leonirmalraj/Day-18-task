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

// Function to initialize DataTable
function initializeDataTable(data) {
    $('#dataTable').DataTable({
        data: data,
        columns: [
            { data: 'id' },
            { data: 'title' },
            { data: 'body' }
        ],
        responsive: true,
        columnDefs: [
            { targets: '_all', className: 'text-center' } // Center align all columns
        ],
        ordering: true
    });
}

// Fetch posts data from the JSONPlaceholder API
const jsonPlaceholderApiUrl = 'https://jsonplaceholder.typicode.com/posts';
fetchData(jsonPlaceholderApiUrl)
    .then(data => {
        if (data) {
            initializeDataTable(data);
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
