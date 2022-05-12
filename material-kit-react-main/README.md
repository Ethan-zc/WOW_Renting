# Run

Install all dependencies

```
npm install
```

Start the app, and it will be runninig on `localhost:3000`

```
npm start
```


# Directory

```
material-kit-react-main
├── CHANGELOG.md
├── ISSUE_TEMPLATE.md
├── README.md
├── jsconfig.json
├── package-lock.json
├── package.json              <-- Node module dependencies
├── public
└── src                       <-- Source codes
    ├── App.js                <-- Main
    ├── README.md
    ├── assets                <-- Images and theme
    ├── auth-App.js           <-- Entry for registered users
    ├── components            <-- Basic components
    ├── context               <-- Material UI provider
    ├── http-common.js        <-- Config of backend url
    ├── index.js              <-- Main
    ├── pages
    │   ├── account           <-- Account page including profile, order, billing
    │   ├── authentication    <-- Sign in and sign up pages
    │   ├── trip              <-- Trip page
    │   └── welcome           <-- Welcome page
    ├── routes                <-- Routes
    ├── sections              <-- Worksheet
    ├── services              <-- Methods sending requests to backend API
    └── unauth-App.js         <-- Entry for guests
```

# Features

- Basic functions
    - Navigation
    - Forms
    - Registration
- Multiple route settings for different roles
- Authentication
- Precheck on inputs
    - Password validation
    - Empty blank check
    - Input format check
- Cache
    - Remember me option using localStorage
    - Order detail using sessionStorage
Communicate with the backend through HTTP
    - Send CRUD requests

# References and Resources

- [Material Kit Material-UI v4](https://www.creative-tim.com/product/material-kit-material-ui-v4)
- [Material Dashboard 2 React](https://www.creative-tim.com/product/material-dashboard-react#)
- [React-Navigation with Login Screen](https://stackoverflow.com/questions/42876690/react-navigation-with-login-screen)
- [React-Navigation Authentication flows](https://reactnavigation.org/docs/auth-flow/)
- [Authentication in React Applications](https://kentcdodds.com/blog/authentication-in-react-applications)
- [spring boot + react + mysql tut & codes](https://www.githubcode.com/spring-boot-react-project-github/#Springboot_React_MySQL)
- [Material UI Documents](https://mui.com/material-ui/getting-started/installation/)

