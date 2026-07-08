document.addEventListener('DOMContentLoaded', function () {
  function hideAllExtras() {
    document.querySelectorAll('.pub-extra').forEach(function (el) {
      el.hidden = true;
    });
  }

  document.querySelectorAll('.pub-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-target');
      var target = document.getElementById(targetId);
      if (!target) return;

      // If this target is currently visible, hide it. Otherwise hide others and show this one.
      if (!target.hidden) {
        target.hidden = true;
      } else {
        hideAllExtras();
        target.hidden = false;
        // scroll into view a bit for context
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
