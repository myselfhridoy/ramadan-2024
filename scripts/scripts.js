function highlightCurrentRamadan() {
    let currentDate = new Date().toLocaleDateString('en-GB', { timeZone: 'Asia/Dhaka' });
    // console.log(currentDate)
    const element = document.getElementById(currentDate);
    console.log(element)
    if (element) {
        element.classList.add('bg-green-600', 'text-white', 'font-extrabold');
    }
}

window.onload = function () {
    highlightCurrentRamadan();
};


document.addEventListener("DOMContentLoaded", function() {
    // Check if visitor count is already stored
    let visitorCount = localStorage.getItem("visitorCount");
    
    // If not stored, set the initial count to 0
    if (visitorCount === null) {
      localStorage.setItem("visitorCount", 0);
      visitorCount = 0;
    }
    
    // Update the visitor count on the page
    document.getElementById("visitorCount").textContent = visitorCount;
    
    // Increment the visitor count on each visit
    visitorCount++;
    localStorage.setItem("visitorCount", visitorCount);
  });
  

