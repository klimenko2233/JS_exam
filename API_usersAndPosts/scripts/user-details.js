const params = new URLSearchParams(location.search);
const userId = params.get("id");
fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
.then(res => res.json())
.then(user => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('user-wrapper');
    const userDiv = document.createElement('div');
    userDiv.classList.add('user-info');
    userDiv.innerHTML = `
    <h2>${user.name}</h2>
    <p><strong>ID:</strong> ${user.id}</p>
    <p><strong>Username:</strong> ${user.username}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Phone:</strong> ${user.phone}</p>
    <p><strong>Website:</strong> ${user.website}</p>
    <h3>Address:</h3>
    <ul>
        <li><strong>Street:</strong> ${user.address.street}</li>
        <li><strong>Suite:</strong> ${user.address.suite}</li>
        <li><strong>City:</strong> ${user.address.city}</li>
        <li><strong>Zipcode:</strong> ${user.address.zipcode}</li>
        <li><strong>Geo:</strong>
            <ul>
                <li>Lat: ${user.address.geo.lat}</li>
                <li>Lng: ${user.address.geo.lng}</li>
            </ul>
        </li>
    </ul>
    <h3>Company:</h3>
    <ul>
        <li><strong>Name:</strong> ${user.company.name}</li>
        <li><strong>Catch Phrase:</strong> ${user.company.catchPhrase}</li>
        <li><strong>BS:</strong> ${user.company.bs}</li>
    </ul>
    `;
    const postsBtn = document.createElement('button')
    postsBtn.innerText = 'Post of current user';
    postsBtn.id = 'posts-button';
    userDiv.appendChild(postsBtn);
    const postsContainer = document.createElement('div');
    postsContainer.classList.add('posts-grid');
    wrapper.appendChild(userDiv);
    wrapper.appendChild(postsBtn);
    wrapper.appendChild(postsContainer);
    document.body.appendChild(wrapper);
    postsBtn.addEventListener('click', () => {
        postsContainer.innerHTML = '';
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then(res => res.json())
        .then(posts => {
            for (const post of posts) {
                const postCard = document.createElement('div');
                postCard.classList.add('post-card');
                postCard.innerHTML = `
                    <p>${post.title}</p>
                    <button>Details</button>`;
                postCard.querySelector('button').addEventListener('click', (e) => {
                    window.location.href = `post-details.html?id=${post.id}`;
                });
                postsContainer.appendChild(postCard);
            }
        })
    })
})
