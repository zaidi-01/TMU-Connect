import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App).use(router);

/* Global filters */

// Date time filter
app.config.globalProperties.$filters = {
  formatDateTime(value) {
    const date = new Date(value);
    const dateNow = new Date();
    // If date is today, return "Today at HH:mm"
    if (date.toDateString() === dateNow.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }
    // If date is yesterday, return "Yesterday at HH:mm"
    dateNow.setDate(dateNow.getDate() - 1);
    if (date.toDateString() === dateNow.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }
    // Else return "DD MMM, YYYY"
    return date.toLocaleDateString([], {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  },
};

app.mount("#app");
