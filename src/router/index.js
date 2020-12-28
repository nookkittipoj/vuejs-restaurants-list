import Vue from "vue";
import Router from "vue-router";
import Index from "../pages/location-restaurant"


Router.prototype.open = function (routeObject) {
    const {href} = this.resolve(routeObject);
    window.open(href, "_blank");
};

Vue.use(Router);
let router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "Home",
            component: Index,
        }
    ]
});

export default router;
