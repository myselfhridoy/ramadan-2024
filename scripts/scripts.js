document.addEventListener("DOMContentLoaded", function () {
    // Get the current date
    const currentDate = new Date();
    const christianYear = currentDate.getFullYear(); // Current Christian year
    const hijriYear = calculateHijriYear(currentDate); // Calculate Hijri year dynamically
    const banglaYear = calculateBanglaYear(currentDate); // Calculate Bangla year dynamically

        // Update the title with dynamic Hijri year
    const navbarTitle = document.getElementById('title');
    navbarTitle.textContent = `মাহে রমজান ${toBengaliNumber(christianYear)}`;
    // Update the navbar title with dynamic Hijri year
    const navbarTitle = document.getElementById('navbar-title');
    navbarTitle.textContent = `মাহে রমজান ${toBengaliNumber(hijriYear)}`;

    // Update the title, location note, and year info
    const ramadanTitle = document.getElementById('ramadan-title');
    const yearInfo = document.getElementById('year-info');

    ramadanTitle.textContent = `রমজানের সাহ্‌রি ও ইফতারের সময়সূচি - ${toBengaliNumber(christianYear)}`;
    yearInfo.textContent = `পবিত্র মাহে রমজান ${toBengaliNumber(hijriYear)} হিজরি, ${toBengaliNumber(banglaYear)} বঙ্গাব্দ, ${toBengaliNumber(christianYear)} খ্রিষ্টাব্দ`;

    // Fetch JSON data and populate the table
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Extract unique months from the JSON data
            const months = [...new Set(data.map(item => item.month.split(' ')[1]))];

            // Update the table header dynamically
            const monthHeader = document.querySelector('thead tr th:nth-child(2)');
            if (months.length === 1) {
                monthHeader.textContent = months[0]; // Single month
            } else {
                monthHeader.textContent = months.join('/'); // Multiple months
            }

            // Populate the table body
            const tableBody = document.querySelector('table tbody');
            tableBody.innerHTML = ''; // Clear old data

            data.forEach(item => {
                const row = document.createElement('tr');
                row.id = item.date; // Set row ID to the date
                row.innerHTML = `
                    <th>${item.roza}</th>
                    <td>${item.month}</td>
                    <td>${item.day}</td>
                    <td>${item.sehri_end}</td>
                    <td>${item.fajr_start}</td>
                    <td>${item.iftar_time}</td>
                `;
                tableBody.appendChild(row);
            });

            highlightCurrentRamadan(); // Highlight today's date

            // Update dynamic info paragraphs
            updateDynamicInfo(data);
        })
        .catch(error => {
            console.error('Error loading JSON data:', error);
            document.querySelector('table tbody').innerHTML = `
                <tr>
                    <td colspan="6" class="text-center text-red-500">ডেটা লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।</td>
                </tr>
            `;
        });

    // Visitor count logic
    let visitorCount = localStorage.getItem("visitorCount");
    if (!visitorCount) {
        visitorCount = 0;
    }
    visitorCount++;
    localStorage.setItem("visitorCount", visitorCount);

    // Display the visitor count
    document.getElementById("visitorCount").textContent = toBengaliNumber(visitorCount);
});

// Function to calculate Hijri year dynamically
function calculateHijriYear(currentDate) {
    // Hijri year starts in July of the previous Gregorian year
    const hijriYearStart = new Date(currentDate.getFullYear() - 1, 6, 1); // July 1st of the previous year
    if (currentDate < hijriYearStart) {
        return Math.floor(((currentDate.getFullYear() - 1) - 622) * 33 / 32); // Previous Hijri year
    } else {
        return Math.floor((currentDate.getFullYear() - 622) * 33 / 32); // Current Hijri year
    }
}

// Function to calculate Bangla year dynamically
function calculateBanglaYear(currentDate) {
    const banglaYearStart = new Date(currentDate.getFullYear(), 3, 14); // April 14th of the current year
    if (currentDate < banglaYearStart) {
        return currentDate.getFullYear() - 594; // Previous Bangla year
    } else {
        return currentDate.getFullYear() - 593; // Current Bangla year
    }
}

// Function to convert numbers to Bengali numerals
function toBengaliNumber(number) {
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const bengaliNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return number.toString().split('').map(digit => bengaliNumbers[englishNumbers.indexOf(digit)]).join('');
}

// Function to highlight today's date in the table
function highlightCurrentRamadan() {
    // Get current date in the same format as JSON data (DD/MM/YYYY)
    const currentDate = new Date();
    const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()}`;

    // Find the row with the matching date
    const element = document.getElementById(formattedDate);
    if (element) {
        element.classList.add('bg-green-600', 'text-white', 'font-extrabold');
    }
}

// Function to update dynamic info paragraphs
function updateDynamicInfo(data) {
    const firstRoza = data[0]; // First day of Ramadan
    const lastRoza = data[data.length - 1]; // Last day of Ramadan

    // Paragraph 1: Info about Ramadan start date and first Sehri/Iftar time
    const dynamicInfo1 = document.getElementById('dynamic-info-1');
    const [firstDay, firstMonth] = firstRoza.month.split(' ');
    dynamicInfo1.textContent = `রমজান মাসের চাঁদ দেখা সাপেক্ষে এ বছর রোজা শুরু হতে পারে ${toBengaliNumber(firstDay)} ${firstMonth}। সে হিসাবে ${toBengaliNumber(firstDay)} ${firstMonth} ধরে ঢাকার সাহ্‌রি ও ইফতারের সময়সূচি নির্ধারণ করেছে ইসলামিক ফাউন্ডেশন। সময়সূচি অনুযায়ী, ${toBengaliNumber(firstDay)} ${firstMonth} প্রথম রোজার সাহ্‌রির শেষ সময় ${firstRoza.sehri_end} ও ইফতারির সময় ${firstRoza.iftar_time}।`;

    // Paragraph 2: General info about regional differences
    const dynamicInfo2 = document.getElementById('dynamic-info-2');
    dynamicInfo2.textContent = `দূরত্ব অনুযায়ী ঢাকার সময়ের সঙ্গে সর্বোচ্চ ${toBengaliNumber(9)} মিনিট যোগ করে অথবা ${toBengaliNumber(9)} মিনিট বিয়োগ করে দেশের বিভিন্ন অঞ্চলের মানুষ সাহ্‌রি ও ইফতার করবেন।`;
}
