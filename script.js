const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value.trim();

    if (!inpWord) return;

    result.innerHTML = "<p>Loading...</p>";

    fetch(`${url}${inpWord}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Couldn't Find The Word");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);

          
            let example = data[0].meanings
                .flatMap(m => m.definitions)
                .find(d => d.example)?.example;

            let audioSrc = data[0].phonetics
                .find(p => p.audio)?.audio;

            result.innerHTML = `
            <div class="word">
                <h3>${inpWord}</h3>
                <button onclick="playSound()">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>

            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic || "N/A"}/</p>
            </div>

            <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>

            <p class="word-example">
                ${example || "No example available"}
            </p>
            `;

           
            if (audioSrc) {
                sound.setAttribute("src", audioSrc);
            }
        })
        .catch((error) => {
            result.innerHTML = `<h3 class="error">${error.message}</h3>`;
        });
});

function playSound() {
    if (sound.src) {
        sound.play();
    }
}