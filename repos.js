const totalContainerEl = document.getElementById('total-container');
const profileContainerEl = document.getElementById('profile-container');
const reposContainerEl = document.getElementById('repos-container');
const repoContainerEl = document.getElementById('repo-container');
const prevBtnEl = document.getElementById('prev-btn');
const nextBtnEl = document.getElementById('next-btn');
const searchInputEl = document.getElementById('search-input');
const searchBtnEl = document.getElementById('search-btn');
const paginationListEl = document.querySelector('#pagination ul')
const reposPerPageInput = document.getElementById('repos-per-page');
const loaderEl= document.getElementById('loader')
const iconEl= document.getElementById('icon')

let userDetails = JSON.parse(localStorage.getItem('userDetails'));
console.log(userDetails)
if(userDetails){
    let currentPage = 1;
    let reposPerPage = 10
    let totalRepos = 0;
    let reposData = []; 
    let filteredRepos = [];
    
    // profile container
    const profileImageEl = document.getElementById('profile-image');
    profileImageEl.src = userDetails.avatar_url;
    profileImageEl.alt = 'Profile Image';
    
    const githubUrlEl = document.getElementById('github-link');
    githubUrlEl.href = userDetails.html_url;
    
    const profileNameEl = document.getElementById('profile-name');
    profileNameEl.textContent = userDetails.name;
    
    const profileBioEl = document.getElementById('profile-bio');
    profileBioEl.textContent = userDetails.bio;
    
    const locationEl = document.getElementById('location');
    locationEl.textContent = userDetails.location;
    if(locationEl.textContent){
        locationEl.textContent = userDetails.location;
        iconEl.classList.remove('d-none')
    }else{
        iconEl.classList.add('d-none')
    }
    
    // createAndAppend
    const createAndAppendRepoToReposContainer = (repo) => {
        const repoContainerEl = document.createElement('div');
        repoContainerEl.classList.add('repo-container');
    
        const repoNameEl = document.createElement('h1');
        repoNameEl.classList.add('repo-name');
        repoNameEl.textContent = repo.name;
        repoContainerEl.appendChild(repoNameEl);
    
        const repoDescriptionEl = document.createElement('p');
        repoDescriptionEl.classList.add('repo-description');
        repoDescriptionEl.textContent = repo.description;
        repoContainerEl.appendChild(repoDescriptionEl);
    
        const repoTopicsEl = document.createElement('p');
        repoTopicsEl.classList.add('repo-topics');
        repo.topics.forEach(topic => {
            const spanElement = document.createElement('span');
            spanElement.textContent = topic;
            spanElement.classList.add('topic')
            repoTopicsEl.appendChild(spanElement);
        });
        repoContainerEl.appendChild(repoTopicsEl);
    
        const repoLinkEl = document.createElement('a');
        repoLinkEl.classList.add('repo-link');
        repoLinkEl.href = repo.html_url;
        repoLinkEl.target='_blank'
        repoLinkEl.textContent = 'Repository Link';
        repoContainerEl.appendChild(repoLinkEl);
    
        reposContainerEl.appendChild(repoContainerEl);
    };
    

    
    
    const displayRepos = (repos) => {
        reposContainerEl.innerHTML = '';
    
        for (let repo of repos) {
            createAndAppendRepoToReposContainer(repo);
        }
        
   
     
    };
    
  
    // repos container
    const fetchRepos = async () => {
        const username = userDetails.login;
        console.log(currentPage)
        const paginatedUrl = `https://api.github.com/users/${username}/repos?per_page=${reposPerPage}&page=${currentPage}`;
       console.log(paginatedUrl)
        try {
            loaderEl.classList.remove('d-none'); 
            const response = await fetch(paginatedUrl);

            const result = await response.json();
            console.log(result)
            if(result.length!==0){
            totalRepos = result.length;
            reposData = result;
            filteredRepos = [...reposData];
            displayRepos(filteredRepos);
           
        }
            else {
              reposContainerEl.textContent = `${userDetails.login} has no public repositories to display.`;
            } 
        } catch (e) {
            console.error(e);
        }finally {
            loaderEl.classList.add('d-none'); 
    
        }
    };
    
    
    fetchRepos();
    
    
    searchBtnEl.addEventListener('click', async () => {
        const searchTerm = searchInputEl.value.toLowerCase();
        const currentPage = 1;
        const itemsPerPage = 10;
        if(searchTerm===''){
            fetchRepos()
        }
        else{
        const response = await fetch(`https://api.github.com/search/repositories?q=${searchTerm}+user:${userDetails.login}&page=${currentPage}&per_page=${itemsPerPage}}`);
        const searchData = await response.json();
        console.log(searchData.items)
        const searchResults = searchData.items;
        displayRepos(searchResults);
    }
    });
       

   
    reposPerPageInput.addEventListener('change', () => {
        reposPerPage = parseInt(reposPerPageInput.value, 10);
        currentPage = 1;
        fetchRepos();
    });

    reposPerPageInput.addEventListener('input', () => {
        const maxValue = parseInt(reposPerPageInput.getAttribute('max'), 10);
    
        if (reposPerPageInput.value > maxValue) {
            const errorEl= document.getElementById('error')
            reposPerPageInput.value = maxValue; 
        
        }

        
    });
   
    prevBtnEl.addEventListener('click', () => {
        console.log('clicked')
        if (currentPage > 1) {
            currentPage--;
            fetchRepos()
        }
    });
    
    nextBtnEl.addEventListener('click', () => {
            console.log('clicked')
            currentPage++;
            console.log(currentPage)
            fetchRepos()
        
    })
    


}
else{
    totalContainerEl.textContent='User does not exist'
}
 
