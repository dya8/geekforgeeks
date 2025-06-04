document.getElementById('pushBtn').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: extractProblemData
    }, async (results) => {
      const problemData = results[0].result;
  
      if (!problemData) {
        document.getElementById("status").textContent = "Failed to extract problem.";
        return;
      }
  
      const response = await pushToGitHub(problemData);
      document.getElementById("status").textContent = response.ok
        ? "Successfully pushed!"
        : "Failed to push.";
    });
  });
  
  function extractProblemData() {
    const title = document.querySelector("h1")?.innerText || "Untitled Problem";
    const content = document.querySelector(".problem-page-main")?.innerText || "No content found.";
    return { title, content };
  }
  
  async function pushToGitHub(problemData) {
    const token = "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";
    const username = "dya8";
    const repo = "geekforgeeks";
  
    const filePath = `geeksforgeeks/${problemData.title.replace(/\s+/g, "_")}.md`;
    const content = btoa(`# ${problemData.title}\n\n${problemData.content}`);
  
    const url = `https://api.github.com/repos/${username}/${repo}/contents/${filePath}`;
    
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Authorization": `token ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: `Added ${problemData.title}`,
        content: content
      })
    });
  
    return response;
  }
  