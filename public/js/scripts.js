const authenticate = (e) => {
  e.preventDefault();
  console.log('clicked');
}

$('button').on('click', authenticate)
