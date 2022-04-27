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
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-design-system/presentation/sections";

// TODO: find pics of cars
export default [
  {
    title: "SUV",
    description: "Luxury vehicle",
    items: [
      {
        image: `${imagesPrefix}/headers.jpg`,
        name: "Page Headers",
        count: 10,
        route: "/sections/page-sections/page-headers",
      },
      {
        image: `${imagesPrefix}/features.jpg`,
        name: "Features",
        count: 14,
        route: "/sections/page-sections/features",
      },
      {
        image: `${imagesPrefix}/pricing.jpg`,
        name: "Pricing",
        count: 8,
        pro: true,
      },
    ],
  },
  {
    title: "Sedan",
    description: "Normal car",
    items: [
      {
        image: `${imagesPrefix}/navbars.jpg`,
        name: "Navbars",
        count: 4,
        route: "/sections/navigation/navbars",
      },
      {
        image: `${imagesPrefix}/nav-tabs.jpg`,
        name: "Nav Tabs",
        count: 2,
        route: "/sections/navigation/nav-tabs",
      },
      {
        image: `${imagesPrefix}/pagination.jpg`,
        name: "Pagination",
        count: 3,
        route: "/sections/navigation/pagination",
      },
    ],
  },
  {
    title: "Truck",
    description: "For delivering goods",
    items: [
      {
        image: `${imagesPrefix}/alerts.jpg`,
        name: "Alerts",
        count: 4,
        route: "/sections/attention-catchers/alerts",
      },
      {
        image: `${imagesPrefix}/toasts.jpg`,
        name: "Notifications",
        count: 3,
        pro: true,
      },
      {
        image: `${imagesPrefix}/popovers.jpg`,
        name: "Tooltips & Popovers",
        count: 2,
        route: "/sections/attention-catchers/tooltips-popovers",
      },
      {
        image: `${imagesPrefix}/modals.jpg`,
        name: "Modals",
        count: 5,
        route: "/sections/attention-catchers/modals",
      },
    ],
  },
];
