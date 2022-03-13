

export default {
  // main navigation - side menu
  menu: [
    { title: "Dashboard", icon: 'dashboard', to: "/dashboard/analytics", },
    { title: "Explore", icon: 'search-alt', to: "/explore/", },
    { title: "My collections", icon: 'backpack', to: "/dashboard/analytics", },
    { title: "Favorites", icon: 'heart', to: "/dashboard/analytics", },
  ],
  admin: [
    { title: "Users", icon: 'tachometer-fast-alt', to: "/admin/users", },
    { title: "Ingredients", icon: 'pizza-slice', to: "/admin/ingredients/", },
    { title: "Recepies", icon: 'restaurant', to: "/admin/recepies/", },
    { title: "Tags", icon: 'tag-alt', to: "/admin/tags/", },

  ],

  // footer links
  footer: []
}
