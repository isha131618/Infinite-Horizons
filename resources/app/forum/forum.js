const postText = document.getElementById('postText');
const imageInput = document.getElementById('imageInput');
const postsContainer = document.getElementById('postsContainer');

// Load posts from localStorage on page load
window.onload = function () {
    const savedPosts = JSON.parse(localStorage.getItem('spacePosts')) || [];
    savedPosts.forEach(post => displayPost(post));
};

// Function to convert image file to Base64
function getBase64(file, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
    reader.onerror = error => console.error('Error: ', error);
}

// Submit a new post
function submitPost() {
    const text = postText.value.trim();
    const imageFile = imageInput.files[0];

    if (!text && !imageFile) return;

    const postId = Date.now(); // Unique ID for each post

    if (imageFile) {
        getBase64(imageFile, (base64Image) => {
            saveAndDisplayPost({ id: postId, text, image: base64Image, likes: 0, replies: [] });
        });
    } else {
        saveAndDisplayPost({ id: postId, text, image: null, likes: 0, replies: [] });
    }

    postText.value = '';
    imageInput.value = '';
}

// Save and display post
function saveAndDisplayPost(postObj) {
    const posts = JSON.parse(localStorage.getItem('spacePosts')) || [];
    posts.unshift(postObj);
    localStorage.setItem('spacePosts', JSON.stringify(posts));
    displayPost(postObj);
}

// Create post element
function displayPost(post) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    if (post.text) {
        const textPara = document.createElement('p');
        textPara.textContent = post.text;
        postDiv.appendChild(textPara);
    }

    if (post.image) {
        const img = document.createElement('img');
        img.src = post.image;
        img.alt = "Posted image";
        img.classList.add('post-image');
        postDiv.appendChild(img);
    }

    // Like button
    const likeBtn = document.createElement('button');
    likeBtn.textContent = `👍 Like (${post.likes})`;
    likeBtn.className = 'like-btn';
    likeBtn.onclick = () => {
        post.likes++;
        likeBtn.textContent = `👍 Like (${post.likes})`;

        // Update likes in localStorage
        const savedPosts = JSON.parse(localStorage.getItem('spacePosts')) || [];
        const index = savedPosts.findIndex(p => p.id === post.id);
        if (index !== -1) {
            savedPosts[index].likes = post.likes;
            localStorage.setItem('spacePosts', JSON.stringify(savedPosts));
        }
    };
    postDiv.appendChild(likeBtn);

    // Reply input and button
    const replyContainer = document.createElement('div');
    replyContainer.className = 'reply-container';

    const replyInput = document.createElement('input');
    replyInput.placeholder = 'Write a reply...';
    replyInput.className = 'reply-input';

    const replyBtn = document.createElement('button');
    replyBtn.textContent = 'Reply';
    replyBtn.className = 'reply-btn';
    replyBtn.onclick = () => {
        const replyText = replyInput.value.trim();
        if (replyText) {
            post.replies.push(replyText);
            displayReplies();
            replyInput.value = '';

            // Update replies in localStorage
            const savedPosts = JSON.parse(localStorage.getItem('spacePosts')) || [];
            const index = savedPosts.findIndex(p => p.id === post.id);
            if (index !== -1) {
                savedPosts[index].replies = post.replies;
                localStorage.setItem('spacePosts', JSON.stringify(savedPosts));
            }
        }
    };

    replyContainer.appendChild(replyInput);
    replyContainer.appendChild(replyBtn);
    postDiv.appendChild(replyContainer);

    // Replies list
    const replyList = document.createElement('ul');
    replyList.className = 'replies';
    postDiv.appendChild(replyList);

    function displayReplies() {
        replyList.innerHTML = '';
        post.replies.forEach(reply => {
            const li = document.createElement('li');
            li.textContent = reply;
            replyList.appendChild(li);
        });
    }

    displayReplies();
    postsContainer.prepend(postDiv);
}