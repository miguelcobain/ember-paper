import { helper } from '@ember/component/helper';
import { faker } from '@faker-js/faker';

export default helper(function fakerImage(positional, named) {
  const options = { height: 200, width: 200, ...named };
  return faker.image.url(options);
});
