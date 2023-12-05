const api_Url = 'https://api.github.com/users/';
const userBox = document.querySelector("#main");

const getUser = async (userName) => {
    try {
        const response = await fetch(api_Url + userName);
        if (!response.ok) {
            throw new Error('User not found');
        }

        const data = await response.json();
        console.log(data);
        const card = `
        <div class="card">
                <div>
                    <img class="avatar" src="${data.avatar_url}" alt="Florin Pop">
                </div>
                <div class="user-info">
                    <h2>${data.name}</h2>
                    <p>${data.bio}</p>
    
                    <ul class="info">
                        <li>${data.followers}<strong>Followers</strong></li>
                        <li>${data.following}<strong>Following</strong></li>
                        <li>${data.public_repos}<strong>Repos</strong></li>
                    </ul>
                    <div id="repos">
                       
                    </div>
                </div>
            </div>
        `
        userBox.innerHTML = card;
        getRepos(userName);
    } catch(error) {
        console.log('User not found or there was a problem:', error);
    }
}
getUser("BeWithSohail");
const getRepos = async (userName) => {
    try {
        let repos = document.querySelector("#repos");
        let response = await fetch(api_Url + userName + "/repos");
        if (!response.ok) {
            throw new Error('User repositories not found');
        }
        let data = await response.json();
        console.log(data);
        data.forEach((item) => {
            let elements = document.createElement("a");
            elements.classList = "repo";
            elements.href = item.html_url;
            elements.target = "_blank";
            elements.innerText = item.name;
            repos.append(elements);
        })  
    }
    catch (error) {
        console.error('User repositories not found or there was a problem:', error);
    }
   
}


const formSubmit = () => { 
    let userInput = document.querySelector("#search");
    if(userInput.value !== ""){
        getUser(userInput.value);
        userInput.value = ""
    }else {
        console.error('Please enter a GitHub username');
        // Display an error message to the user indicating that they should enter a username
    }

    return false;
}

// <a class="repo" href="#" tasearchrget="_blank">Repo 1</a>
// <a class="repo" href="#" target="_blank">Repo 2</a>
// <a class="repo" href="#" target="_blank">Repo 3</a>