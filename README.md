It is a [web-app](https://github-repos-xi.vercel.app/) to get public github repos of a user.
  1. user should enter username to get the github repos.
  2. Provided username exists, application displays github repos.
  3. If not, it displays user not found.
Features implemented:
  1. Implemented Server-side pagination where each page displays default 10 repos, and max of 100 repos where repos number can be changed.
  2. Implemented loaders when api calls are in progress.
  3. Used Github apis to fetch the gihub repos of entered user.
  4. Implemented server side search feature using github api where user can search required repos not constraining to current page.
  5. Handled edge cases of: validation for username in login page; unavailable username; no public repos of a user; max repos of 100 per page; no results found in search functionality.

how to run in Local: 
1. Clone the repository:

   ```bash
   git clone https://github.com/sruthipunnana/github-repos.git
2. Navigate to the project directory:
     cd github-repos
3.Open login.html in your preferred browser or use bash command: open login.html

