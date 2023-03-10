const apiKey = "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";

async function generateCoverLetter() {
  // show loading animation
  document.getElementById("generatedCoverLetter").innerHTML = '<div class="loader"></div>';

  const resumeText = document.getElementById("resumeText").value;
  const jobDescription = document.getElementById("jobDescription").value;

  const endpoint = "https://api.openai.com/v1/engines/text-davinci-003/completions";
  const body = {
    prompt: `Generate an appealing cover letter with this ${resumeText} resume for this ${jobDescription} job description`,
    max_tokens: 2048,
    stop: "Project completed",
    temperature: 0.95
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status} ${response.statusText}`);
    }

    const { choices } = await response.json();

    if (choices && choices[0] && choices[0].text) {
      const coverLetter = choices[0].text.trim();
      document.getElementById("generatedCoverLetter").innerHTML = coverLetter;
    } else {
      throw new Error("No text returned from API");
    }
  } catch (error) {
    console.error(`Error generating cover letter: ${error}`);
    document.getElementById("generatedCoverLetter").innerHTML = "Failed to generate cover letter.";
  }
}

const generateButton = document.getElementById("submit");
generateButton.addEventListener("click", generateCoverLetter);
