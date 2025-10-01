const webAppURL = "YOUR_GAS_WEB_APP_URL_HERE"; // Replace with your GAS URL

// Load Tickets
function loadTickets() {
  fetch(webAppURL)
    .then(res => res.json())
    .then(data => renderTickets(data))
    .catch(err => console.error(err));
}

// Render Tickets
function renderTickets(tickets) {
  const container = document.getElementById("ticketList");
  container.innerHTML = "";
  if(tickets.length===0){
    container.innerHTML="<p>No active tickets 🎉</p>";
    return;
  }
  tickets.forEach(ticket=>{
    const div = document.createElement("div");
    div.className = "ticket";
    div.innerHTML = `
      <span><b>${ticket.name}</b>: ${ticket.issue}</span>
      <button onclick="resolveTicket(${ticket.id})">Resolved</button>
    `;
    container.appendChild(div);
  });
}

// Submit Form
document.getElementById("ticketForm").addEventListener("submit", function(e){
  e.preventDefault();
  const name = document.getElementById("username").value;
  const issue = document.getElementById("issue").value;

  fetch(webAppURL, {
    method: "POST",
    body: JSON.stringify({action:"add", name, issue}),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.json())
  .then(data => {
    alert("Ticket Raised!");
    document.getElementById("ticketForm").reset();
    loadTickets();
  });
});

// Resolve Ticket
function resolveTicket(id){
  fetch(webAppURL, {
    method: "POST",
    body: JSON.stringify({action:"resolve", id}),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.json())
  .then(data => {
    alert("Ticket Resolved!");
    loadTickets();
  });
}

// Initial load
loadTickets();
