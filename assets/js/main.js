/**
 * main.js – portfolio site interactivity
 *
 * Sections:
 *   1. Smooth scrolling
 *   2. Fade-in on scroll (IntersectionObserver)
 *   3. Talks year filter
 */

/* ── 1. Smooth scrolling ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ── 2. Fade-in on scroll ── */
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
);

document.querySelectorAll('.card, .talk-card').forEach(el => observer.observe(el));

/* ── 3. Talks year filter ── */
function filterTalksYear(year) {
    const section = document.getElementById('talks');
    const items = section.querySelectorAll('.timeline-item');
    const yearHeaders = section.querySelectorAll('.timeline-year');

    // Update active button
    document.querySelectorAll('#talks-year-nav .year-filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.year === year);
    });

    if (year === 'all') {
        items.forEach(i => (i.style.display = ''));
        yearHeaders.forEach(h => (h.style.display = ''));
        return;
    }

    items.forEach(i => {
        i.style.display = i.dataset.year === year ? '' : 'none';
    });
    yearHeaders.forEach(h => {
        h.style.display = h.dataset.year === year ? '' : 'none';
    });
}

// Expose for inline onclick attributes in HTML
window.filterTalksYear = filterTalksYear;
