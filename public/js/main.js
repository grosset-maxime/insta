const CLEANUP_BTN = '#cleanup-btn';

function init () {
    window.addEventListener('keyup', (e) => {
        // console.log(`code: ${e.code}`);
        switch (e.code) {
          case 'Space':
          case 'Enter':
            cleanup();
            break;

          // case 'Escape':
            // break;
          default:
        }
    });

    document.querySelector(CLEANUP_BTN).addEventListener('click', cleanup);
}

async function cleanup () {
    let message = '';
    const btn = document.querySelector(CLEANUP_BTN);

    document.body.classList.add('cleanup-ing');
    btn.setAttribute('disabled', true);

    await fetch('/api/cleanup')
      .then(response => response.json())
      .then((response) => {
        console.log(response);
        message = response.success ? 'Success' : 'Failure';
      })
      .catch((e) => {
          console.log(e);
          message = e;
      })
      .finally(() => {
        document.body.classList.remove('cleanup-ing');
        btn.removeAttribute('disabled');
        UIkit.notification({
            message,
            status: 'primary',
            pos: 'top-right',
            timeout: 5000
        });
      });
  }