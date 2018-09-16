import { jQuery as $ } from 'lib/jquery';

import 'styles/main.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'lib/template';

import UserPic from 'lib/template/assets/img/user.jpg';
$('.user-pic').find('img').attr('src', UserPic);