<script>
document.addEventListener('DOMContentLoaded', () => {
  // Reveal-on-scroll animation.
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((element) => element.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });
    items.forEach((element) => observer.observe(element));
  }

  // Publication period filters.
  const filters = document.querySelectorAll('.pub-filter');
  const groups = document.querySelectorAll('.pub-year-group-v15');

  if (filters.length && groups.length) {
    filters.forEach((button) => {
      button.addEventListener('click', () => {
        filters.forEach((item) => item.classList.remove('is-active'));
        button.classList.add('is-active');

        const selectedPeriod = button.dataset.filter;
        groups.forEach((group) => {
          const shouldShow = selectedPeriod === 'all' || group.dataset.period === selectedPeriod;
          group.hidden = !shouldShow;
          if (shouldShow && selectedPeriod !== 'all') {
            group.open = true;
          }
        });
      });
    });

  }

  // V67 — normalize corresponding-author markers in the published record.
  const correspondingPapers = new Set(['26', '23', '22', '21', '20', '19', '18']);
  document.querySelectorAll('.pub-full-list-v15 article').forEach((article) => {
    const number = article.querySelector('.pub-number')?.textContent.trim();

    // Remove legacy markers that were previously placed on coauthors.
    article.querySelectorAll('.corresponding-star').forEach((star) => star.remove());

    // Unwrap any stray <em> tags created by Markdown parsing around old asterisks.
    article.querySelectorAll('em').forEach((em) => {
      const parent = em.parentNode;
      while (em.firstChild) parent.insertBefore(em.firstChild, em);
      parent.removeChild(em);
    });

    const benjamin = Array.from(article.querySelectorAll('strong')).find(
      (el) => el.textContent.trim() === 'B. Cressiot'
    );

    if (benjamin && correspondingPapers.has(number)) {
      const star = document.createElement('sup');
      star.className = 'corresponding-star';
      star.title = 'Corresponding author';
      star.textContent = '*';
      benjamin.appendChild(star);
    }
  });

  const recordNote = document.querySelector('.pub-record-note-v47');
  if (recordNote) {
    recordNote.innerHTML = '<strong>B. Cressiot</strong> is highlighted in each author list; '
      + '<sup class="corresponding-star">*</sup> after his name denotes corresponding authorship.';
  }

  // V67 — correct patent identifiers and provide direct Google Patents links on the CV.
  const patentHeading = Array.from(document.querySelectorAll('.cv-page h2')).find(
    (h) => h.textContent.trim() === 'Patents'
  );
  if (patentHeading) {
    const list = patentHeading.nextElementSibling;
    if (list && list.tagName === 'OL') {
      list.innerHTML = `
        <li><a href="https://patents.google.com/patent/WO2024153816A1/en" target="_blank" rel="noopener"><strong>Method for detection of peptide biomarkers</strong></a> — <strong>WO2024153816A1</strong>.</li>
        <li><a href="https://patents.google.com/patent/US12320796B2/en" target="_blank" rel="noopener"><strong>Lipid-free anchoring of thermophilic bacteriophage G20C portal adapter into solid-state nanopores</strong></a> — <strong>US12320796B2</strong>.</li>
      `;
    }
  }

});
</script>
