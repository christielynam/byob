const generateToken = (e) => {
  const email = $('.email-input').val();
  const appName = $('.app-name-input').val();

  e.preventDefault();

  fetch('/api/v1/authenticate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      appName: appName
    })
  })
  .then(results => results.json())
  .then(results => $('.token').append(`<h3>${results.token}</h3>`));

  $('.email-input').val('');
  $('.app-name-input').val('');
};


$('button').on('click', generateToken);
