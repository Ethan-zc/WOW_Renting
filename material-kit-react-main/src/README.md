# Directory

```
material-kit-react-main
├── CHANGELOG.md
├── ISSUE_TEMPLATE.md
├── README.md
├── jsconfig.json
├── package-lock.json
├── package.json                <-- to install node_modules
├── public
└── src                         <-- source codes
    ├── App.js                  <-- main
    ├── README.md
    ├── assets                  <-- resources: images, theme etc.
    ├── components              <-- basic components in two templates
    ├── context                 <-- [unknown] used in dashboard
    │   └── index.js
    ├── examples                <-- [remove] examples to show how to use comps
    │   ├── Breadcrumbs
    │   ├── Cards
    │   ├── Charts
    │   ├── Configurator
    │   ├── Footer
    │   ├── Items
    │   ├── LayoutContainers
    │   ├── Lists
    │   ├── Navbars
    │   ├── Sidenav
    │   ├── Tables
    │   └── Timeline
    ├── http-common.js          <-- config backend url to connect with
    ├── index.js                <-- main entry
    ├── layouts                 <-- [remove] pages entry: pages, sections
    │   ├── billing
    │   ├── dashboard
    │   ├── notifications
    │   ├── pages
    │   ├── profile
    │   ├── rtl
    │   ├── sections
    │   └── tables
    ├── pages                   <-- pages
    │   ├── Account
    │   ├── Authentication
    │   ├── Dashboard
    │   ├── Trip
    │   └── Welcome
    ├── routes.js               <-- config routing urls
    ├── services                <-- handle request and backend interface
    │   ├── authentication.service.js
    │   └── trip.service.js
    ├── user.routes.js          <-- config routing urls for specific users
    └── view                    <-- commonly used tools?
        ├── Breadcrumbs
        ├── Cards
        ├── Footers
        ├── Navbars
        └── TableList
```

# Functions

Navigation

- Pages
- Menu bar, side bar
- Button, link

Interact with the backend

- Send GET request
- Send POST request, for example, display suitable cars for users by their preferences (pick up location, etc.)

Authentication

- Sign in & sign up
- Use local storage to achieve remember me option, probably workable in storing token
- Filling form check if they are valid

# Templates

- Use [Material Kit Material-UI v4](https://www.creative-tim.com/product/material-kit-material-ui-v4) to create car rental pages
- Use  [Material Dashboard 2 React](https://www.creative-tim.com/product/material-dashboard-react#) to create account pages for users
- Alternative template [Material Dashboard Material-UI v4](https://www.creative-tim.com/product/material-dashboard-material-ui-v4)

# Spring boot + React + MySQL

- Overall: [spring boot + react + mysql tut & codes](https://www.githubcode.com/spring-boot-react-project-github/#Springboot_React_MySQL)
- Backend codes: [spring-boot-data-jpa-mysql](https://github.com/bezkoder/spring-boot-data-jpa-mysql)
- Tut for backend: [spring-boot-jpa-crud-rest-api](https://www.bezkoder.com/spring-boot-jpa-crud-rest-api/)
- Frontend codes: [react-crud-web-api](https://github.com/bezkoder/react-crud-web-api)
- Tut for overall project: [react-spring-boot-crud](https://www.bezkoder.com/react-spring-boot-crud/)

# Resources

- [Material UI Documents](https://mui.com/material-ui/getting-started/installation/)

