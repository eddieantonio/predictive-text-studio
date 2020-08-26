import test from 'ava';

import {theAnswerToLifeTheUniverseAndEverything} from './src/worker/placeholder';

test('it has the answer to life, the universe, and everything', t => {
  t.is(theAnswerToLifeTheUniverseAndEverything(), 42);
});
