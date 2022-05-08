/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

const imagesPrefix =
  "https://media.zipcar.com/images/model-image?model_id=";

// TODO: find pics of cars
// eslint-disable-next-line
export default [
  {
    title: "SUV",
    description: "Luxury vehicle",
    items: [
      {
        image: `${imagesPrefix}64790058`,
        name: "Page Headers",
        count: 10,
        route: "/trip",
      },
      {
        image: `${imagesPrefix}94567`,
        name: "Features",
        count: 14,
        route: "/trip",
      },
      {
        image: `${imagesPrefix}2297323015`,
        name: "Pricing",
        count: 8,
        pro: true,
        route: "/trip",
      },
    ],
  },
  {
    title: "Sedan",
    description: "Normal car",
    items: [
      {
        image: `${imagesPrefix}475722000`,
        name: "Navbars",
        count: 4,
        route: "/trip",
      },
      {
        image: `${imagesPrefix}64790058`,
        name: "Nav Tabs",
        count: 2,
        route: "/trip",
      },
    ]
  },

  {
    title: "Truck",
    description: "For delivering goods",
    items: [
      {
        image: `${imagesPrefix}94567`,
        name: "Alerts",
        count: 4,
        route: "/trip",
      },
      {
        image: `${imagesPrefix}1651832377`,
        name: "Notifications",
        count: 3,
        pro: true,
        route: "/trip",
      },
      {
        image: `${imagesPrefix}475722000`,
        name: "Tooltips & Popovers",
        count: 2,
        route: "/trip",
      },
    ],
  }
];
