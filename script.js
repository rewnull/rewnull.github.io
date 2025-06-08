const videoUrls = [
      "https://www.youtube.com/watch?v=4K8IEzXnMYk",
      "https://www.youtube.com/watch?v=ozhHrzOXZkI",
      "https://www.youtube.com/watch?v=YPSza4zN4H4",
      "https://www.youtube.com/watch?v=CYHMovVEsYU",
      "https://www.youtube.com/watch?v=fMDr_luEqS8",
      "https://www.youtube.com/watch?v=IXhmu1aQSOY",
      "https://www.youtube.com/watch?v=B5YokNW7tIs"
    ];

    const container = document.getElementById("video-list");

    async function fetchVideoInfo(url) {
      const apiUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("Failed to fetch video data");
      return res.json();
    }

    async function loadVideos() {
      for (const url of videoUrls) {
        try {
          const data = await fetchVideoInfo(url);

          const videoDiv = document.createElement("div");
          videoDiv.className = "video";
          videoDiv.innerHTML = `
            <a href="${url}" target="_blank">
              <img src="${data.thumbnail_url}" alt="Thumbnail">
            </a>
            <div>
              <a href="${url}" target="_blank"><strong>${data.title}</strong></a><br>
              <small>${url}</small>
            </div>
          `;

          container.appendChild(videoDiv);
        } catch (err) {
          console.error("Error loading video:", err.message);
        }
      }
    }

    loadVideos();
