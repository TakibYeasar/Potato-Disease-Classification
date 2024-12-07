const fileInput = document.getElementById("fileInput");
const previewContainer = document.getElementById("previewContainer");
const preview = document.getElementById("preview");
const resultContainer = document.getElementById("resultContainer");
const resultLabel = document.getElementById("resultLabel");
const resultConfidence = document.getElementById("resultConfidence");
const loader = document.getElementById("loader");
const clearButton = document.getElementById("clearButton");

fileInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    preview.src = objectUrl;
    previewContainer.classList.remove("hidden");

    loader.classList.remove("hidden");
    resultContainer.classList.add("hidden");

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("/predict", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();

        resultLabel.textContent = data.class;
        resultConfidence.textContent = `${(data.confidence * 100).toFixed(2)}%`;

        loader.classList.add("hidden");
        resultContainer.classList.remove("hidden");
        clearButton.classList.remove("hidden");
    } catch (error) {
        alert("Error processing the image. Please try again.");
        loader.classList.add("hidden");
    }
});

clearButton.addEventListener("click", () => {
    fileInput.value = "";
    previewContainer.classList.add("hidden");
    resultContainer.classList.add("hidden");
    clearButton.classList.add("hidden");
});
