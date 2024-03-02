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

