It is a [web-app](https://github-repos-xi.vercel.app/) to get public github repos of a user.
  1. user should enter username to get the github repos.
  2. Provided username exists, application displays github repos.
  3. If not, it displays user not found.
Features implemented:
  1. Implemented Server-side pagination where each page displays default 10 repos, and max of 100 repos where repos number can be changed.
  2. Used Github apis to fetch the gihub repos of entered user.
  3. Implemented server side search feature using github api where user can search required repos not constraining to current page.
  4. Handled edge cases of: validation for username in login page; unavailable username; no public repos of a user; max repos of 100 per page; no results found in search functionality.   
