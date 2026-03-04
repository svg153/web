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

/* ── 3. Talks year filter & pagination ── */
(function () {
    const PAGE_SIZE = 5;
    const section = document.getElementById('talks');
    if (!section) return;

    // Collect years sorted descending
    const yearHeaders = [...section.querySelectorAll('.timeline-year[data-year]')];
    const allYears = yearHeaders
        .map(h => h.dataset.year)
        .sort((a, b) => Number(b) - Number(a));

    if (!allYears.length) return;

    // Default to current calendar year, fall back to most recent with entries
    const calYear = String(new Date().getFullYear());
    let activeYear = allYears.includes(calYear) ? calYear : allYears[0];
    let shownCount = 0;

    // Inject pagination container at the bottom of the timeline
    const timeline = section.querySelector('.timeline');
    const paginationEl = document.createElement('div');
    paginationEl.id = 'talks-pagination';
    timeline.appendChild(paginationEl);

    function getItems(year) {
        return [...section.querySelectorAll(`.timeline-item[data-year="${year}"]`)];
    }

    function hideAll() {
        section.querySelectorAll('.timeline-item').forEach(i => (i.style.display = 'none'));
        section.querySelectorAll('.timeline-year').forEach(h => (h.style.display = 'none'));
    }

    function renderPage() {
        hideAll();

        // Show active year header
        const header = section.querySelector(`.timeline-year[data-year="${activeYear}"]`);
        if (header) header.style.display = '';

        // Show items up to shownCount
        const items = getItems(activeYear);
        items.slice(0, shownCount).forEach(i => (i.style.display = ''));

        // Sync nav button
        document.querySelectorAll('#talks-year-nav .year-filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.year === activeYear);
        });

        buildPagination(items);
    }

    function buildPagination(items) {
        paginationEl.innerHTML = '';
        const moreInYear = shownCount < items.length;
        const yearIdx = allYears.indexOf(activeYear);
        const hasNextYear = yearIdx < allYears.length - 1;

        if (moreInYear) {
            const remaining = items.length - shownCount;
            const label = `Show ${Math.min(PAGE_SIZE, remaining)} more`;
            paginationEl.appendChild(makeBtn(label, () => {
                shownCount = Math.min(shownCount + PAGE_SIZE, items.length);
                renderPage();
            }));
        } else if (hasNextYear) {
            const nextYear = allYears[yearIdx + 1];
            paginationEl.appendChild(makeBtn(`Show ${nextYear}`, () => {
                activeYear = nextYear;
                shownCount = Math.min(PAGE_SIZE, getItems(nextYear).length);
                renderPage();
            }));
        }
    }

    function makeBtn(label, onClick) {
        const btn = document.createElement('button');
        btn.className = 'btn-show-more';
        btn.textContent = label;
        btn.addEventListener('click', onClick);
        return btn;
    }

    function showAll() {
        section.querySelectorAll('.timeline-item').forEach(i => (i.style.display = ''));
        section.querySelectorAll('.timeline-year').forEach(h => (h.style.display = ''));
        paginationEl.innerHTML = '';
        document.querySelectorAll('#talks-year-nav .year-filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.year === 'all');
        });
    }

    // Year nav click handlers (replaces inline onclick)
    document.querySelectorAll('#talks-year-nav .year-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.dataset.year === 'all') {
                showAll();
                return;
            }
            activeYear = btn.dataset.year;
            shownCount = Math.min(PAGE_SIZE, getItems(activeYear).length);
            renderPage();
        });
    });

    // Init
    shownCount = Math.min(PAGE_SIZE, getItems(activeYear).length);
    renderPage();

    // Legacy compat
    window.filterTalksYear = (year) => {
        if (year === 'all') { showAll(); return; }
        activeYear = year;
        shownCount = Math.min(PAGE_SIZE, getItems(year).length);
        renderPage();
    };
}());
