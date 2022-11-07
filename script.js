//You can edit ALL of the code here
let allEpisodes; //= getAllEpisodes();
const rootElem = document.getElementById("root");
const header = document.getElementById("header");
let url = "https://api.tvmaze.com/shows";
let sortedEpisodes;

const setup = async () => {
  try {
    const response = fetch(url);
    allEpisodes = await (await response).json();
    //console.log(allEpisodes)
    sortedEpisodes = [...allEpisodes];
    if (allEpisodes[0].genres) {
      makePageForEpisodes(sortedEpisodes.sort(compare));
    } else {
      makePageForEpisodes(allEpisodes);
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

function compare(a, b) {
  const nameA = a.name;
  const nameB = b.name;

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
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
  makePageForEpisodes(pickedEpisodes);
  document.querySelector(
    ".para"
  ).innerText = `displaying ${pickedEpisodes.length}/${allEpisodes.length} episodes`;
  if (searchField.value === "") {
    document.querySelector(".para").innerText = "";
  }
});

const dropdown = document.getElementById("select");
const dropdownShows = document.getElementById("shows");
//const showName = document.createElement("p")

dropdown.onchange = function () {
  const episodeID = document.getElementById("select").value;
  const selectName = document.getElementById("select");
  const text = selectName.options[selectName.selectedIndex].text;
  console.log(text);
  console.log(episodeID);
  document.querySelector("#select").innerHTML = "";
  document.querySelector(".para").innerText = "";
  rootElem.innerHTML = "";
  if (allEpisodes[0].url.includes(".com/shows")) {
    url = `https://api.tvmaze.com/shows/${episodeID}/episodes`;
    const showName = document.querySelector(".show-name");
    showName.innerText = `Your chosen show: ${text}`;
    setup();
  } else if (allEpisodes[0].url.includes(".com/episodes")) {
    const pickedEpisodes = allEpisodes.filter((episode) => {
      return episode.id == episodeID;
    });
    
    rootElem.innerHTML = "";
    makePageForEpisodes(pickedEpisodes);
    dropdown.innerHTML = "";
    allEpisodes.forEach((episode) => {
      createSelectOptions(episode);
    });
  }
  if (episodeID == "original") {
    location.reload(); //makePageForEpisodes(allEpisodes);
  } else {
    createButton();
  }
};

const createButton = () => {
  let backButton = "";
  if (!document.querySelector("button")) {
    backButton = document.createElement("button");
    backButton.id = "back-button";
    backButton.innerText = "Back to Shows";
    document.body.appendChild(backButton);
    header.appendChild(backButton);
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
}

function makePageForEpisodes(episodesObject) {
  rootElem.className = "root";
  episodesObject.forEach((episode) => {
    const episodesContainer = document.createElement("div");
    rootElem.appendChild(episodesContainer);
    const episodeName = document.createElement("h1");
    episodeName.className = "episode-name";
    episodesContainer.className = "episode-container";
    episodesContainer.id = episode.id;

    
    const infoContainer = document.createElement("div");
    infoContainer.className = 'info-container';
    const rating = document.createElement("p");
    rating.innerHTML = `<b>Rated:</b> ${episode.rating.average}`
    if(episode.rating.average) {
      infoContainer.appendChild(rating);
      }
    const genres = document.createElement("p");
    genres.innerHTML = `<b>Genres:</b> ${episode.genres}`;
    if(episode.genres) {
      infoContainer.appendChild(genres);
    }    
    const status = document.createElement('p');
    status.innerHTML = `<b>Status:</b> ${episode.status}`;
    if(episode.status) {
      infoContainer.appendChild(status);
    }    
    const runtime = document.createElement('p');
    runtime.innerHTML = `<b>Runtime:</b> ${episode.runtime}`;
    if(episode.runtime) {
      infoContainer.appendChild(runtime);
    }    
    
    episodesContainer.addEventListener("click", episodeContainerEvent);

    if (episode.season && episode.number) {
      episodeName.innerText = `${episode.name} - ${episodeCode(
        episode.season,
        episode.number        
      )}`;
        
    } else episodeName.innerText = episode.name;
    episodesContainer.appendChild(episodeName);
    episodesContainer.appendChild(infoContainer);
    const episodeImage = document.createElement("img");
    if (!episode.image) {
      episodeImage.src = "";
    } else {
      episodeImage.src = episode.image.medium;
    }
    episodesContainer.appendChild(episodeImage);
    const episodeSummary = document.createElement("p");
    episodeSummary.className = "episode-text";

    episodeSummary.innerHTML = episode.summary;
    episodesContainer.appendChild(episodeSummary);
    //truncated text
    // let truncatedSummary;
    // console.log(episode.summary.length)
    // if( episode.summary.length > 150) {
    //    truncatedSummary = episode.summary.slice(0, 150);
    //   episodeSummary.innerHTML = `${truncatedSummary}... <span class='read-more'>read more</span>`;
    // } else {episodeSummary.innerHTML = episode.summary}
    
    
    
    // episodesContainer.appendChild(episodeSummary);
    // const readMore = document.querySelector(".read-more");

    // readMore.addEventListener("click", () => {
    //   episodesContainer.removeEventListener("click", episodeContainerEvent);      
    //   episodeSummary.innerHTML = `${episode.summary}` // <span class='read-less'>read less</span> `;
    //   //episodesContainer.addEventListener("click", episodeContainerEvent);
    // });
    
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
};

function episodeCode(season, number) {
  season = season < 10 ? "0" + season : season;
  number = number < 10 ? "0" + number : number;
  return `S${season}E${number}`;
}

const episodeContainerEvent = (e) => {
  //console.log(e.currentTarget);
  let ID = e.currentTarget.id;
  console.log(e.currentTarget);

  if (allEpisodes[0].url.includes(".com/shows")) {
    url = `https://api.tvmaze.com/shows/${ID}/episodes`;
    //const showName = document.querySelector(".show-name");
    //showName.innerText = `Your chosen show: ${text}`;
    rootElem.innerHTML = "";
    setup();
    dropdown.innerHTML = "";
  } else if (allEpisodes[0].url.includes(".com/episodes")) {
    const pickedEpisodes = allEpisodes.filter((episode) => {
      return episode.id == ID;
      
    });
    rootElem.innerHTML = "";
    makePageForEpisodes(pickedEpisodes);  
};
createButton();
};

window.onload = setup;

// https://cyf-robcso-tv.netlify.app/
