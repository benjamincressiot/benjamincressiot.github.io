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
});
</script>
