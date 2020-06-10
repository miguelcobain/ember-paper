import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const LOREM = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Nulla venenatis ante augue. Phasellus volutpat neque ac dui mattis
  vulputate. Etiam consequat aliquam cursus. In sodales pretium ultrices.
  Maecenas lectus est, sollicitudin consectetur felis nec, feugiat ultricies mi.\n
`;

function getChapters() {
  let tabs = A();

  for (let i = 1; i < 5; i++) {
    tabs.push({
      index: i,
      title: `Chapter ${i}`,
      body: LOREM.repeat(i)
    });
  }

  return tabs;
}

export default class extends Controller {
  chapters = getChapters();
  @tracked borderBottom = true;
  @tracked selectedChapter = this.chapters.firstObject;
  @tracked selectedBasicTab = 0;
  @service router;

  @action
  toggle(propName) {
    this.toggleProperty(propName);
  }

  @action
  addChapter() {
    let index = Math.max(...this.chapters.mapBy('index')) + 1;
    let chapter = {
      index,
      title: this.newTitle,
      body: this.newContent,
    };
    this.chapters.pushObject(chapter);
    this.selectedChapter = chapter;
    this.setProperties({
      newTitle: '',
      newContent: ''
    });
  }

  @action
  removeChapter(t) {
    if (this.selectedChapter === t) {
      let chapters = this.chapters;
      let index = chapters.indexOf(t);
      let newSelection = chapters.objectAt(index + 1) || chapters.objectAt(index - 1);
      this.selectedChapter = newSelection;
    }
    this.chapters.removeObject(t);
  }

  @action
  noop() {}
}
