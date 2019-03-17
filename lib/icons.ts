import { config, library } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleLeft,
  faCheck,
  faCircleNotch,
  faPlus,
  faSave,
  faTimes,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';

config.autoAddCss = false;

library.add(faPlus);
library.add(faSave);
library.add(faAngleLeft);
library.add(faTimes);
library.add(faCheck);
library.add(faCircleNotch);
library.add(faTrashAlt);
