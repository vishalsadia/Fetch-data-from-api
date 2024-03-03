let data = [];

// using .then method

// fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")
//   .then(response =>{
//     if(!response.ok){
//         throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data =>{
//     console.log(data);
//   })
//   .catch(error =>{
//     console.log('there was a problem with the fetch operation:' , error);
//   });


//   using async await

async function fetchData() {
    try {
      const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false" , {method: "GET"})
       data = await response.json();
      console.log(data);
      renderTable(data);
    }
    catch {
      console.error(error);
    }
  }
fetchData();

// display function 

function renderTable(data){
    console.log(data, "display function called");
    const tablebody = document.getElementById("tablebody");
    tablebody.innerHTML = "";
    data.forEach((item) => {
        const row = document.createElement("tr");
        const percentageChange = item.price_change_percentage_24h;
        const percentageChangeClass = percentageChange >= 0 ? "positive-change" : " negative-change";

        row.innerHTML = `
        <td id="data1"><img src="${item.image}" alt="${item.name}"width="20"/></td>
        <td>${item.name}</td>
        <td>${item.symbol}</td>
        <td>${item.id}</td>
        <td>${"$" + item.current_price}</td>
        <td class="${percentageChangeClass}">${item.price_change_percentage_24h}</td>
        <td>${"Mkt cap : $" + item.total_volume}</td>
        
        `;
        tablebody.appendChild(row);
    });
}

// search function 

document.getElementById('searchInput').addEventListener('keyup',event=>{
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    if(searchTerm == ''){
        renderTable(data);
        return;
    }
    const filteredData = data.filter(item=>{
        const itemName = item.name.toLowerCase();
        const itemSymbol = item.symbol.toLowerCase();
        return itemName.includes(searchTerm) || itemSymbol.includes(searchTerm);
    })
    renderTable(filteredData);
})

//sort function

document.getElementById("sortMarketCapButton").addEventListener("click",()=>{
    data.sort((a,b)=>b.total_volume-a.total_volume);
    renderTable(data);
})

// sort functon2
document.getElementById("sortPercentageChangeButton").addEventListener("click",()=>{
    data.sort((a,b)=>a.price_change_percentage_24h-b.price_change_percentage_24h);
    renderTable(data);
})