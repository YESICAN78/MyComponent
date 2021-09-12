const defaultCallback = () => {};
export class EventBus {
  constructor() {
    this.eventList = [];
  }
  // 绑定事件
  on(eventName, callback) {
    this.eventList.push({ eventName, callback });
  }
  //    出发事件
  emit(eventName, params) {
    const matchEvents = this.eventList.filter(
      (eventItem) => eventItem.eventName === eventName
    );
    matchEvents.forEach((eventItem) => {
      const { callback = defaultCallback } = eventItem;
      callback(params);
    });
  }

  off(eventName, callback) {
    this.eventList = this.eventList.filter((eventItem) => {
      if (eventItem.eventName === eventName) {
        if (typeof callback !== "function") {
          return false;
        }
        if (typeof callback === "function" && eventItem.callback === callback) {
          return false;
        }
      }
      return true;
    });
  }
  destroy() {
    this.eventList = [];
  }
}
export default new EventBus();
