fetch('https://jsonplaceholder.typicode.com/users')
.then(res => res.json())
.then(users => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('user-container');
    for (const user of users) {
        const div = document.createElement('div');
        div.classList.add('user-card');
        div.innerText = `${user.id}: ${user.name}`;
        const button = document.createElement('button');
        button.innerText = 'Details';
        button.addEventListener('click', () => {
            location.href = `pages/user-details.html?id=${user.id}`
        });
        div.appendChild(button);
        wrapper.appendChild(div);
        document.body.appendChild(wrapper);
    }
})