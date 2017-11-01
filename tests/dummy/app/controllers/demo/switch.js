import Controller from '@ember/controller';

export default Controller.extend({
  booleanProp1: true,
  booleanProp2: false,
  booleanProp3: false,
  booleanProp4: false,
  booleanProp5: false,

  actions: {
    changeBooleanProp(which, newValue) {
      this.set(`booleanProp${which}`, newValue);
    }
  }

});
