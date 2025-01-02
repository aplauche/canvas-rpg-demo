class Events {
  // entities subscribe by pushing callbacks to this array
  callbacks = [];
  // keep track of callback ids with a simple counter
  nextId = 0;

  // emit an event
  emit(eventName, data) {
    this.callbacks
      .filter((c) => c.eventName === eventName)
      .forEach((c) => c.callback(data));
  }

  // add subscription
  on(eventName, caller, callback) {
    this.nextId++;
    this.callbacks.push({ id: this.nextId, eventName, caller, callback });
    return this.nextId;
  }

  // remove subscription by id
  off(id) {
    this.callbacks = this.callbacks.filter((c) => c.id !== id);
  }

  // remove all subscriptions for a given caller if an item is fully removed from scene etc
  unsubscribe(caller) {
    this.callbacks = this.callbacks.filter((c) => c.caller !== caller);
  }

}

// export a singleton instance
export const events = new Events()