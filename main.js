let data; // Declare the data variable in the global scope

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const sortButton = document.getElementById('sortButton');
const tableBody = document.getElementById('tableBody');

// Fetch data using .then
fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    .then(response => response.json())
    .then(dataFromApi => {
        data = dataFromApi; // Assign the fetched data to the global data variable
        renderTable(data);
    })
    .catch(error => console.error('Error:', error));

// Fetch data using async/await
async function fetchData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        data = await response.json();
        renderTable(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function renderTable(data) {
    tableBody.innerHTML = '';
    data.forEach(item => {
        const row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.id}</td>
                <td><img src="${item.image}" alt="${item.name}"></td>
                <td>${item.symbol.toUpperCase()}</td>
                <td>$${item.current_price.toFixed(2)}</td>
                <td>$${item.total_volume.toLocaleString()}</td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm) {
        const filteredData = data.filter(item => item.name.toLowerCase().includes(searchTerm) || item.symbol.toLowerCase() === searchTerm);
        renderTable(filteredData);
    } else {
        fetchData();
    }
});

sortButton.addEventListener('click', () => {
    const sortBy = 'market_cap_desc'; // Change this value to 'percentage_change_24h' for sorting by percentage change
    const sortedData = data.sort((a, b) => b[sortBy] - a[sortBy]);
    renderTable(sortedData);
});