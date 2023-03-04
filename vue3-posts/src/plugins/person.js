export default {
  install(app, options) {
    const person = {
      name: '짐코딩',
      say() {
        alert(this.name);
      },
      ...options,
    };
    app.config.globalProperties.$person = person;
    // setup에 provide inject
    app.provide('person', person);
  },
};
