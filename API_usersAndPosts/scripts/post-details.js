const params = new URLSearchParams(location.search);
const postId = params.get("id");
fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
.then(res => res.json())
.then(post => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('mainWrapper');
    const divPost = document.createElement('div');
    divPost.classList.add('post-info');
    divPost.innerHTML = `
        <p><strong>User Id: </strong>${post.userId}</p>
        <p><strong>Post Id: </strong>${post.id}</p>
        <p><strong>Title: </strong>${post.title}</p>
        <p><strong>Body: </strong>${post.body}</p>
    `;
    const h3 = document.createElement('h3');
    h3.innerText = "Comments";
    const commentsGrid = document.createElement('div');
    commentsGrid.classList.add('comments-grid');
    wrapper.appendChild(divPost);
    wrapper.appendChild(h3);
    wrapper.appendChild(commentsGrid);
    document.body.appendChild(wrapper);
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(res => res.json())
        .then(comments => {
            for (const comment of comments) {
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment-card');
                commentDiv.innerHTML = `
                    <h4>${comment.name}</h4>
                    <p><strong>${comment.email}</strong></p>
                    <p>${comment.body}</p>
                `;
                commentsGrid.appendChild(commentDiv);
            }
        });
})