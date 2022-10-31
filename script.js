//You can edit ALL of the code here
let allEpisodes; //= getAllEpisodes();
const rootElem = document.getElementById("root");
const header = document.getElementById("header")
let url = "https://api.tvmaze.com/shows";
let sortedEpisodes;


const setup = async () => {
  try {
    const response = fetch(url);
    allEpisodes = await (await response).json();
    //console.log(allEpisodes)
    sortedEpisodes = [...allEpisodes]
    if (allEpisodes[0].genres){
      makePageForEpisodes(sortedEpisodes.sort(compare));
    } else {
      makePageForEpisodes(allEpisodes)
    }
    
    //console.log(makePageForEpisodes(allEpisodes))
  } catch (error) {
    console.log(error);
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
};

function compare(a,b) {
  const nameA = a.name
  const nameB = b.name

  let comparison = 0;
  if(nameA>nameB) {
    comparison = 1;
  } else if (nameA<nameB){
    comparison = -1;
  }
  return comparison
}

const searchField = document.getElementById("search-field");

searchField.addEventListener("keyup", (e) => {
  // console.log(e.target.value)
  document.querySelector(".para").innerText = "";
  const pickedEpisodes = allEpisodes.filter((episode) => {
    return (
      episode.name
        .toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase()) ||
      episode.summary
        .toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase())
    );
  });
  rootElem.innerHTML = "";
  // while(rootElem.firstChild) {
  //   rootElem.removeChild(rootElem.firstChild)
  // }
  makePageForEpisodes(pickedEpisodes);
  
  document.querySelector(
    ".para"
  ).innerText = `displaying ${pickedEpisodes.length}/${allEpisodes.length} episodes`;
    //console.log(searchField.value)
  if(searchField.value === "") {
    document.querySelector(".para").innerText = "";
  }
});

const dropdown = document.getElementById("select");
const dropdownShows = document.getElementById("shows");

dropdown.onchange = function () {
  const episodeID = document.getElementById("select").value;
  document.querySelector("#select").innerHTML = ""
  document.querySelector(".para").innerText = "";
  //console.log(episodeID)
  //console.log(allEpisodes[0].url);
  rootElem.innerHTML = "";
  
  if (allEpisodes[0].url.includes(".com/shows")){
    url = `https://api.tvmaze.com/shows/${episodeID}/episodes`;
    setup();
} else if (allEpisodes[0].url.includes(".com/episodes")) {
    const pickedEpisodes = allEpisodes.filter((episode) => {
      // console.log(episodeID)
      // console.log(episode.name)
      // console.log(episode.id)
      return (
        episode.id == episodeID
      );
    });
    console.log(pickedEpisodes)
    rootElem.innerHTML = "";
    makePageForEpisodes(pickedEpisodes);
    // rootElem.style
    dropdown.innerHTML = "";
    allEpisodes.forEach(episode => {
      createSelectOptions(episode)
    })
}
  
  // console.log(url)
  // console.log(episodeID)
  
  //rootElem.innerHTML = "";
  if (episodeID == "original") {
    location.reload();//makePageForEpisodes(allEpisodes);
  } else {
    let backButton = "";
    
    //console.log(backButton);
    if (!document.querySelector("button")) {
      backButton = document.createElement("button");      
      backButton.id = "back-button";
      backButton.innerText = "Back to Shows";
      document.body.appendChild(backButton);
      header.appendChild(backButton)
    } else {
      backButton = document.createElement("button");
      backButton.id = "back-button";
      backButton.innerText = "backButton";
      document.body.appendChild(backButton);
      document.body.removeChild(backButton);
    }

    const button = document.getElementById("back-button");
    button.addEventListener("click", () => {      
      return location.reload();
    });

    // const dropDownEpisode = allEpisodes.filter((episode) => {
    //   // console.log(episode.name)
    //   // console.log(episodeID)
    //   // console.log(episode.id)
    //   return episode.id == episodeID;
    // });
    //makePageForEpisodes(dropDownEpisode);
    //console.log(dropDownEpisode)
    // console.log(episodeID)    
  }
};

function makePageForEpisodes(episodesObject) {
  rootElem.className = "root";
  //console.log(episodesObject.url)
  episodesObject.forEach((episode) => {
    //console.log(episode.url);
    //console.log(episode.url.includes(".com/shows"));
    
    const episodesContainer = document.createElement("div");
    rootElem.appendChild(episodesContainer);
    const episodeName = document.createElement("h1");
    episodeName.className = "episode-name";
    episodesContainer.className = "episode-container";
    episodesContainer.id = episode.id;
    if (episode.season && episode.number) {
      episodeName.innerText = `${episode.name} - ${episodeCode(
        episode.season,
        episode.number
      )}`;
    } else episodeName.innerText = episode.name;
    episodesContainer.appendChild(episodeName);
    const episodeImage = document.createElement("img");

    if (!episode.image) {
      episodeImage.src = "";
    } else {
      episodeImage.src = episode.image.medium;
    }

    episodesContainer.appendChild(episodeImage);
    const episodeSummary = document.createElement("p");
    episodeSummary.className = "episode-text"
    episodeSummary.innerHTML = episode.summary;
    episodesContainer.appendChild(episodeSummary);
    //select menu is bellow
    createSelectOptions(episode);
  });
}

const createSelectOptions = (episode) => {
  const selectItem = document.createElement("option");
  if (episode.url.includes(".com/shows")) {
    selectItem.value = episode.id;
    selectItem.id = episode.id;

    if (episode.season && episode.number) {
      selectItem.innerText = `${episode.name} - ${episodeCode(
        episode.season,
        episode.number
      )}`;
    } else selectItem.innerText = episode.name;
    dropdown.appendChild(selectItem);
  } else if (episode.url.includes(".com/episodes")) {
    //select menu is bellow
    const showItem = document.createElement("option");

    showItem.value = episode.id;
    showItem.id = episode.id;
    if (episode.season && episode.number) {
      showItem.innerText = `${episode.name} - ${episodeCode(
        episode.season,
        episode.number
      )}`;
    } else showItem.innerText = episode.name;
    dropdown.appendChild(showItem);
  }
}


function episodeCode(season, number) {
  season = season < 10 ? "0" + season : season;
  number = number < 10 ? "0" + number : number;
  return `S${season}E${number}`;
}

// const allShows = getAllShows()
const showSelect = document.getElementById("shows")

// allShows.forEach(show=>{
//   const showOption = document.createElement("option")
  
//   showOption.innerText = show.name
//   showOption.id = show.id
//   show.value = show.id
//   showSelect.appendChild(showOption)
// })

// showSelect.onchange = function() {
//   const showID = document.getElementById("shows").value
//   console.log(showID)
//   rootElem.innerHTML = " ";
//   searchField.innerHTML = " "
//   allShows.forEach(show=>{
//     if(showID==show.name){
//       console.log(show.id)
//       url = `https://api.tvmaze.com/shows/${show.id}/episodes`;
//       console.log(url)
      
//     }
    
//     setup()
//     makePageForEpisodes(allEpisodes)
//   })
// }
// console.log(setup())
//console.log(allShows);
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
