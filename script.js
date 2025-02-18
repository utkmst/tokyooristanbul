document.getElementById("submit").addEventListener("click", async () => {
    const fileInput = document.getElementById("imageUpload");
    if (fileInput.files.length === 0) {
        alert("Please upload an image first.");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
        const base64Image = reader.result.split(",")[1];  // Convert image to Base64 format

        const requestData = {
            data: [base64Image]  // Gradio expects a list with the image data
        };

        try {
            const response = await fetch("https://utkmst-istanbul-or-tokyo.hf.space/gradio_api/call/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData)
            });

            const result = await response.json();
            document.getElementById("output").innerText = `Prediction: ${result.data[0]}`;  // Display result
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        }
    };
});
