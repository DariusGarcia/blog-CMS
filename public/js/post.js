// new blog post handler
const newFormHandler = async function (event) {
  event.preventDefault()
  const title = document.querySelector('input[name="post-title"]').value
  const blogText = document.querySelector('textarea[name="post-body"]').value

  await fetch(`/api/post`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      blogText,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
  document.location.replace('/dashboard')
}

const newPostForm = document.querySelector('#new-post-form')
if (newPostForm) {
  newPostForm.addEventListener('submit', newFormHandler)
}

// edit a single post
const editFormHandler = async function (event) {
  event.preventDefault()
  const postId = document.querySelector('input[name="post-id"]').value

  const title = document.querySelector('input[name="post-title"]').value
  const blogText = document.querySelector('textarea[name="post-body"]').value

  await fetch(`/api/post/8`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      blogText,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // document.location.replace('/dashboard')
}

const editPostForm = document.querySelector('#edit-post-form')
if (editPostForm) {
  editPostForm.addEventListener('submit', editFormHandler)
}

const deleteClickHandler = async function () {
  await fetch(`/api/post/${postId}`, {
    method: 'DELETE',
  })
  document.location.replace('/dashboard')
}

const deleteBtn = document.querySelector('#delete-btn')
if (deleteBtn) {
  deleteBtn.addEventListener('click', deleteClickHandler)
}

// new comment handler
const commentFormHandler = async function (event) {
  event.preventDefault()
  const postId = document.querySelector('input[name="post-id"]').value
  const body = document.querySelector('textarea[name="comment-body"]').value

  if (body) {
    await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        postId,
        body,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    document.location.reload()
  }
}

const commentForm = document.querySelector('#new-comment-form')
if (commentForm) {
  commentForm.addEventListener('submit', commentFormHandler)
}
