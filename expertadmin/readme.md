# Expert Admin  
***  
  
**Basic Architecture**    
- *React-Redux with typescript with @redux/toolkit[https://redux-toolkit.js.org/]*    
- Using ESlint and prettier configured for maintaing code quality and styling.
- Axios configured for handling api calls
- application types are defined in types.d.ts file
<br>
- *App Structure*  
  - *app*  
    - contains root level files which are essential for app startup  
  - *api*  
    - functions for API interactions, and corresponding Typescript types  
  - *components*  
    - components that are reused in multiple places  
  - *utils*  
    - various string utility functions  
  - *features*
    - container logic goes here. It consists of following
      - slice - Reducer
      - action - Action
      - [component] - View
<br>

**Login**
  
**Last Activity**  
- Level 1 - Active Menu (Eg. Questions)  
- Level 2 - Active Query  
    >{ [queryName1]: value1,   
    > [queryName2]: value2 }  
- Level 3 - Active Card (Eg. .QuestionId)  
  
**Question**  
  - *get all questions api will be called on click of questions menu item*  
  - *pagination required*  
  - *response must include sequence for drag and drop functionality*
** Test accounts ** 
- tpmexpert1@gmail.com/123456 the account has general expert admin features ( Tracks, Capabilities, Questions and Your Candidates) 
- tpm_admin_test@gmail.com/123456 the account has admin priviliges
