export default {
  props: {
    notification: {},
  },
  data() {
    return {};
  },
  template: `
      <div id="notification-container">
      <div id="notification" class="alert" :class="notification.success ? 'alert-success' : 'alert-danger'"
           :class="notification.visible ? 'visible' : ''" role="alert">
        {{ notification.text }}
      </div>
      </div>
    `,
};
