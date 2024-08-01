
    // Pop-under URL'lerinin listesi
    const urls = [
      "https://www.example1.com",
      "https://www.example2.com",
      "https://www.example3.com"
    ];

    function openPopunder() {
      let index = getNextUrlIndex();
      let url = urls[index]; // URL'yi seç
      let newWindow = window.open(url, '_blank');
      if (newWindow) {
        newWindow.blur();
        window.focus();
      }
    }

    function getNextUrlIndex() {
      let data = JSON.parse(localStorage.getItem('popunderData')) || { date: '', count: 0, urlIndex: 0 };
      let today = new Date().toDateString();

      if (data.date !== today) {
        data.date = today;
        data.count = 0;
        data.urlIndex = 0;
      }

      let urlIndex = data.urlIndex;

      // URL indeksini güncelle
      data.urlIndex = (data.urlIndex + 1) % urls.length;
      localStorage.setItem('popunderData', JSON.stringify(data));

      return urlIndex;
    }

    function checkAndOpenPopunder() {
      let data = JSON.parse(localStorage.getItem('popunderData')) || { date: '', count: 0, urlIndex: 0 };
      let today = new Date().toDateString();

      if (data.date !== today) {
        data.date = today;
        data.count = 0;
        data.urlIndex = 0;
      }

      if (data.count < 2) {
        openPopunder();
        data.count++;
        localStorage.setItem('popunderData', JSON.stringify(data));
      }
    }

    window.onload = function() {
      document.body.addEventListener('click', function() {
        checkAndOpenPopunder();
      });
    };
