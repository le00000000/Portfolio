const sections = document.querySelectorAll('.section');
const sectBtns = document.querySelectorAll('.control');
const blogs = document.querySelectorAll('.blog');

// Function to load the correct section based on the URL parameter
function loadSectionFromURL() {
    // Get URL parameters
    const params = new URLSearchParams(window.location.search);
    const section = params.get('section');

    if (section) {
        // Remove 'active-btn' class from the currently active button
        document.querySelector('.active-btn').classList.remove('active-btn');

        // Find the button that corresponds to the selected section
        const element = document.querySelector(`.control[data-id="${section}"]`);
        element.classList.add('active-btn');

        // Display the correct section
        showSection(section);
    }

    // Initialize page transitions (event listeners for navigation buttons)
    PageTransitions();
}

// Function to handle navigation button clicks and page transitions
function PageTransitions(){
    sectBtns.forEach((btn) => {
        btn.addEventListener('click', function(){
            // Remove the active button class from the previous active button
            document.querySelector('.active-btn').classList.remove('active-btn');

            // Add 'active-btn' class to the clicked button
            this.classList.add('active-btn');

            // Get section ID from the clicked button's 'data-id' attribute
            const sectionId = this.getAttribute('data-id');

            // Update the URL without reloading the page
            history.pushState(null, "", `?section=${sectionId}`);

            // Show the correct section based on the button clicked
            showSection(sectionId);
        });
    });
}

// Function to display the correct section based on the section ID
function showSection(sectionId) {
    // Hide all sections by removing the 'active' class
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Find the section that matches the given section ID
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active'); // Make the section visible
    }

    // If the section is 'blogs', load the blog section
    if (sectionId == "blogs") {
        loadBlog();
    }
}

// Function to add click event listeners to blog items
function loadBlog() {
    blogs.forEach(blog => {
        blog.addEventListener("click", function () {
            // Get the target page URL from the 'data-target' attribute
            const targetPage = this.getAttribute("data-target");

            // Redirect to the target blog page
            window.location.href = `${targetPage}`;
        });
    });
}

// Run functions when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    loadSectionFromURL(); // Load the correct section from the URL
});