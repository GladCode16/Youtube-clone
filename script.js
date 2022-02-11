const videoContainer = document.getElementById("Videos-container");
const thumb_images = document.getElementsByClassName("thumb-images");


const api_key = "Your api Key";
const video_key = "https://youtube.googleapis.com/youtube/v3/videos?"
const video_http_data = "https://www.googleapis.com/youtube/v3/channels?"
fetch(video_key + new URLSearchParams ({
    part: "snippet",
    chart: "mostPopular",
    maxResults: 100,
    regionCode: "US",
    key: api_key,
}))
.then(res => res.json())
.then((data)=>{
    data.items.forEach(items => {
        GetChannelIcon(items)
    });
})
.catch(err =>{"Error Occure",err})

function GetChannelIcon(video_data) {
    fetch(video_http_data + new URLSearchParams({
        part: "snippet",
        id: video_data.snippet.channelId,
        key: api_key,
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url
        VideoSec(video_data)
    })
}


function VideoSec(videoData) {
    videoContainer.innerHTML+= `
    <div class="thumb-images" onclick="location.href = 'https://youtube.com/watch?v=${videoData.id}'">
                <a href=https://youtube.com/watch?v=${videoData.id}'><img src="${videoData.snippet.thumbnails.high.url}" alt="" class="thumbnail"></a>
                <div id="img-title">
                    <img src="${videoData.channelThumbnail}" alt="" class="channel-logo">
                    <span class="title">${videoData.snippet.title}</span>
                </div>
                <div class="channel-details">
                    <div class="channel-name">${videoData.snippet.channelTitle}</div>
                </div>
    </div>`
    
}

// searchBar section
const search_bar = document.getElementById("search")
const search_img = document.getElementById("search-img")

const search_http = "https://www.youtube.com/results?search_query="
search_img.onclick = ()=>{
    search()
}
search_bar.onkeypress = (e)=>{
    if (e.keyCode === 13) {
        search()
    }
}
function search() {
    location.href = search_http+search_bar.value
}