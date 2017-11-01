import { inject as service } from '@ember/service';
import { readOnly, reads } from '@ember/object/computed';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { A } from '@ember/array';

const LOREM = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Nulla venenatis ante augue. Phasellus volutpat neque ac dui mattis
  vulputate. Etiam consequat aliquam cursus. In sodales pretium ultrices.
  Maecenas lectus est, sollicitudin consectetur felis nec, feugiat ultricies mi.\n
`;

export default Controller.extend({
  borderBottom: true,

  selectedBasicTab: 0,

  router: service(),

  currentRouteName: readOnly('router.currentRouteName'),

  chapters: computed(function() {
    let tabs = A();
    for (let i = 1; i < 5; i++) {
      tabs.push({
        index: i,
        title: `Chapter ${i}`,
        body: LOREM.repeat(i)
      });
    }

    return tabs;
  }),

  selectedChapter: reads('chapters.firstObject'),

  actions: {
    toggle(propName) {
      this.toggleProperty(propName);
    },

    addChapter() {
      let index = Math.max(...this.get('chapters').mapBy('index')) + 1;
      let chapter = {
        index,
        title: this.get('newTitle'),
        body: this.get('newContent')
      };
      this.get('chapters').pushObject(chapter);
      this.set('selectedChapter', chapter);
      this.setProperties({
        newTitle: '',
        newContent: ''
      });
    },

    removeChapter(t) {
      if (this.get('selectedChapter') === t) {
        let chapters = this.get('chapters');
        let index = chapters.indexOf(t);
        let newSelection = chapters.objectAt(index + 1) || chapters.objectAt(index - 1);
        this.set('selectedChapter', newSelection);
      }
      this.get('chapters').removeObject(t);
    },

    noop() {}
  }
});
