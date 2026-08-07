(function () {
  var el = document.getElementById('last-updated');
  if (!el) return;

  var repo = 'HeavenlyBerserker/website2026';
  var url = 'https://api.github.com/repos/' + repo + '/commits/main';

  fetch(url)
    .then(function (res) {
      if (!res.ok) throw new Error('GitHub API ' + res.status);
      return res.json();
    })
    .then(function (data) {
      var iso = data.commit && data.commit.committer && data.commit.committer.date;
      if (!iso) throw new Error('No commit date');
      var date = new Date(iso);
      el.textContent =
        'Last updated: ' +
        date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
    })
    .catch(function () {
      el.textContent = '';
    });
})();
