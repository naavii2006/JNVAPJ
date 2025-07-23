// Gallery Slider - Auto Slide + Arrows (Only 1 image visible at a time)

const gallerySlider = document.getElementById('gallery-slider');
const galleryTrack = document.getElementById('gallery-track');
const gallerySlides = galleryTrack.querySelectorAll('.slide');
const galleryPrev = document.getElementById('gallery-prev');
const galleryNext = document.getElementById('gallery-next');

let galleryIndex = 0;

// Calculate slide width dynamically
let gallerySlideWidth = gallerySlider.clientWidth;

// Position slides correctly
function updateGalleryPosition() {
  galleryTrack.style.transform = `translateX(-${galleryIndex * gallerySlideWidth}px)`;
}

// Auto-slide every 3 seconds
let galleryInterval = setInterval(() => {
  galleryIndex = (galleryIndex + 1) % gallerySlides.length;
  updateGalleryPosition();
}, 3000);

// Reset auto-slide if user interacts
function resetGalleryAutoSlide() {
  clearInterval(galleryInterval);
  galleryInterval = setInterval(() => {
    galleryIndex = (galleryIndex + 1) % gallerySlides.length;
    updateGalleryPosition();
  }, 3000);
}

// Next button click
galleryNext.addEventListener('click', () => {
  galleryIndex = (galleryIndex + 1) % gallerySlides.length;
  updateGalleryPosition();
  resetGalleryAutoSlide();
});

// Previous button click
galleryPrev.addEventListener('click', () => {
  galleryIndex = (galleryIndex - 1 + gallerySlides.length) % gallerySlides.length;
  updateGalleryPosition();
  resetGalleryAutoSlide();
});

// Recalculate slide width on window resize
window.addEventListener('resize', () => {
  gallerySlideWidth = gallerySlider.clientWidth;
  updateGalleryPosition();
});


//chatbox

const form = document.getElementById('guestbook-form');
const nameInput = document.getElementById('guest-name');
const messageInput = document.getElementById('guest-message');
const messagesContainer = document.getElementById('guestbook-messages');

// Load messages from localStorage on page load
window.onload = () => {
  const savedMessages = JSON.parse(localStorage.getItem('guestbookMessages')) || [];
  savedMessages.forEach(addMessageToDOM);
};

// Handle form submit
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  if (name && message) {
    const msgObj = { name, message };
    addMessageToDOM(msgObj);

    // Save to localStorage
    const saved = JSON.parse(localStorage.getItem('guestbookMessages')) || [];
    saved.push(msgObj);
    localStorage.setItem('guestbookMessages', JSON.stringify(saved));

    // Clear input
    nameInput.value = '';
    messageInput.value = '';
  }
});

function addMessageToDOM({ name, message }) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'guestbook-message';
  msgDiv.innerHTML = `<strong>${name}:</strong> ${message}`;
  messagesContainer.appendChild(msgDiv);
}




function submitVote() {
  const checkboxes = document.querySelectorAll('input[name="feature"]:checked');
  const selectedOptions = [];

  checkboxes.forEach((checkbox) => {
    selectedOptions.push(checkbox.value);
  });

  const result = document.getElementById('voteResult');
  if (selectedOptions.length > 0) {
    result.innerText = "✅ You voted for:\n" + selectedOptions.join(", ");
  } else {
    result.innerText = "⚠️ Please select at least one option.";
  }
}
