const usernameInputEl = document.getElementById('username-input');
const findButtonEl = document.getElementById('find-button');
const errorEl= document.getElementById('error')
const loaderEl= document.getElementById('loader')

const fetchUser = async () => {
    const username = usernameInputEl.value;
    console.log(username);
    try {
        loaderEl.classList.remove('d-none'); 
        const response = await fetch(`https://api.github.com/users/${username}`);
        console.log(response)   
        if (response.ok) {
            const result = await response.json();
            console.log(result);
            localStorage.setItem('userDetails', JSON.stringify(result));
            window.location.href = 'repos.html';
        } else if(response.status===404){
            localStorage.removeItem('userDetails')
            window.location.href= 'repos.html'
        }
    } catch (e) {
        console.error(e);
        
    }finally {
        loaderEl.classList.add('d-none'); 
    }
};

findButtonEl.addEventListener('click', () => {
    if(usernameInputEl.value!==''){
        fetchUser();
    }else{
        errorEl.textContent='Please Enter Username'
    }
   
});
