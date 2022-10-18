//You can edit ALL of the code here
let allEpisodes; //= getAllEpisodes();
const rootElem = document.getElementById("root");
const url = "https://api.tvmaze.com/shows/82/episodes"


const setup = async() => {
  try {
    const response = fetch(url)
    allEpisodes = await(await response).json()
    makePageForEpisodes(allEpisodes)  
  } catch(error){
    console.log(error)
  }
  
  // fetch("https://api.tvmaze.com/shows/82/episodes")
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (data) {
  //     //console.log(data)
  //     allEpisodes = data;
  //     makePageForEpisodes(allEpisodes);
  //     console.log(allEpisodes);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  
}

const searchField = document.getElementById("search-field")

searchField.addEventListener("keyup", (e) =>{
  console.log(e.target.value)
  
  const pickedEpisodes = allEpisodes.filter(episode => {
    //console.log(episode.name)
   return (
     episode.name
       .toLocaleLowerCase()
       .includes(e.target.value.toLocaleLowerCase()) ||
     episode.summary
       .toLocaleLowerCase()
       .includes(e.target.value.toLocaleLowerCase())
   ); 
           
  })
  rootElem.innerHTML = ""
  // while(rootElem.firstChild) {
  //   rootElem.removeChild(rootElem.firstChild)
  // }
 makePageForEpisodes(pickedEpisodes)
 //console.log(pickedEpisodes)
  document.querySelector(".para").innerText = `displaying ${pickedEpisodes.length}/${allEpisodes.length} episodes`
} )



function makePageForEpisodes(episodeList) {
  
  rootElem.className = "root"
  episodeList.forEach(episode =>{
    const episodesContainer = document.createElement("div");
    rootElem.appendChild(episodesContainer);
    const episodeName = document.createElement("h1");
    episodeName.className = "episode-name";
    episodesContainer.className = "episode-container";
    episodeName.innerText = `${episode.name} - ${episodeCode(episode.season, episode.number)}`;
    episodesContainer.appendChild(episodeName);
    const episodeImage = document.createElement("img");
    episodeImage.src = episode.image.medium;
    episodesContainer.appendChild(episodeImage);
    const episodeSummary = document.createElement("p");
    episodeSummary.innerHTML = episode.summary;
    episodesContainer.appendChild(episodeSummary)
  })   
}



function episodeCode(season, number){
  season = season < 10 ? "0" + season : season;
  number = number < 10 ? "0" + number : number;
  return `S${season}E${number}`
}

 window.onload = setup;

// let allEpisodes = getAllEpisodes();
// let rootElem = document.getElementById("root");
// let episodeTab, episodeName, episodeThumbnail, episodeSummary, searchField, allEpisodesDiv;

// searchField = rootElem.appendChild(document.createElement("input"));
// searchField.id = "searchField"
// allEpisodesDiv = rootElem.appendChild(document.createElement("div"));
// allEpisodesDiv.className = "allEpisodesDiv"

// searchField.addEventListener("keyup", ()=>{
//   // allEpisodes.filter()


// })

//  allEpisodes.forEach(item=>{
//  episodeTab = allEpisodesDiv.appendChild(document.createElement("section"));
//  episodeName = episodeTab.appendChild(document.createElement("h1"));
//  episodeThumbnail = episodeTab.appendChild(document.createElement("img"));
//  episodeSummary = episodeTab.appendChild(document.createElement("p")) 
//  episodeTab.className = "episodeTab";
//  episodeName.className = "episodeName";
//  episodeThumbnail.className = "episodeThumbnail";
//  episodeSummary.className = "episodeSummary";
//  episodeName.innerText = `${item.name} - S${('0' + item.season).slice(-2)}E${('0' + item.number).slice(-2)}` ;
//  episodeThumbnail.src = item.image.medium;
//  episodeSummary.innerHTML = item.summary
// })


// https://cyf-robcso-tv.netlify.app/