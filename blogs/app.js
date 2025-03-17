const sections = document.querySelectorAll('.section');
const sectBtns = document.querySelectorAll('.control');
const themeBtn = document.querySelector(".theme-btn");

// Function to fetch and load sections dynamically from index.html
function loadSections() {
    fetch("../index.html") // Fetch the content of index.html
        .then(response => response.text()) // Convert response to text
        .then(data => {
            const parser = new DOMParser(); // Create a new DOM parser
            const doc = parser.parseFromString(data, "text/html"); // Parse the HTML response

            // Extract all sections from the fetched index.html
            const sections = doc.querySelectorAll(".section");

            // Get the placeholder where sections will be appended
            const placeholder = document.getElementById("section-placeholder");

            // Append each section dynamically
            sections.forEach(section => {
                placeholder.appendChild(section.cloneNode(true)); // Clone and append section
            });

            // After loading sections, ensure correct section is displayed
            loadSectionFromURL();
        });
}

// Function to determine the section based on the current URL
function loadSectionFromURL() {
    // Get the current URL path
    const path = window.location.pathname;
    console.log(path)

    // Split the path into segments based on '/'
    const pathSegments = path.split("/");

    // Extract the first segment after the root (e.g., 'blogs' from '/blogs/lighting_system.html')
    const section = pathSegments[1]; 

    // If the section is 'blogs' or 'construction', display the main section instead
    if (section === "blogs" || "construction") {
        sectionToDisplay = "main" // Set the section to 'main
    }
    showSection(sectionToDisplay); // Call function to show the section
}

// Function to display the correct section
function showSection(sectionId) {
    // Hide all sections by removing the 'active' class
    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });

    // Find the section that matches the given section ID
    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.classList.add("active"); // Make the section visible
    }

    // Initialize page transitions (event listeners for navigation buttons)
    PageTransitions();
}

// Function to handle page transitions when clicking navigation buttons
function PageTransitions(){
    sectBtns.forEach((btn) => {
        btn.addEventListener('click', function(){
            // Remove 'active-btn' class from the previously active button
            document.querySelector('.active-btn').classList.remove('active-btn');

            // Add 'active-btn' class to the clicked button
            this.classList.add('active-btn');

            // Get the section ID from the button's 'data-id' attribute
            const sectionId = this.getAttribute('data-id');

            // Redirect to index.html while preserving the selected section in the URL
            window.location.href = `../index.html?section=${sectionId}`;
        });
    });
}

// Toggle theme functionality

// Select the body element to apply the theme
let element = document.body;

// Retrieve and apply the saved theme from localStorage to body(if it exists)
const savedTheme = localStorage.getItem("theme")
if (savedTheme) {
    element.classList.add(savedTheme);
}

// Add an event listener to handle theme toggling
themeBtn.addEventListener("click", () =>{
    if (element.classList.contains("light-mode")) {
        // If the current theme is light mode, switch to default dark mode
        element.classList.remove("light-mode"); // Remove light mode class
        localStorage.removeItem("theme"); // Remove the theme from localStorage
    } else {
        // If no theme or dark mode is active, switch to light mode
        element.classList.add("light-mode"); // Apply light mode class
        localStorage.setItem("theme", "light-mode"); // Save the theme in localStorage
    }
});

// Run functions when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    loadSections(); // Fetch and load sections dynamically
});