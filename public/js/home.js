const loginFormHandler = async function (event) {
  event.preventDefault()

  const usernameEl = document.querySelector('#username-input-login')
  const passwordEl = document.querySelector('#password-input-login')

  const response = await fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  })

  if (response.ok) {
    document.location.replace('/')
  } else {
    alert('Failed to login')
  }
}
const loginFormBtn = document.querySelector('#login-form')
if (loginFormBtn) {
  loginFormBtn.addEventListener('submit', loginFormHandler)
}

// sign up form
const signupFormHandler = async function (event) {
  event.preventDefault()

  const usernameEl = document.querySelector('#username-input-signup')
  const passwordEl = document.querySelector('#password-input-signup')

  const response = await fetch('/api/user/register', {
    method: 'POST',
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  })

  if (response.ok) {
    document.location.replace('/')
  } else {
    alert('Error trying to sign up new user. Please try again!')
  }
}

const signupFormBtn = document.querySelector('#signup-form')
if (signupFormBtn) {
  signupFormBtn.addEventListener('submit', signupFormHandler)
}

// logout function
const logout = async function () {
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })

  if (response.ok) {
    document.location.replace('/')
  } else {
    alert('Error trying to logout user. Please try again.')
  }
}

const logoutBtn = document.querySelector('#logout-nav-item')
if (logoutBtn) {
  logoutBtn.addEventListener('click', logout)
}
