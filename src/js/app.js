import { Slider } from './slider';
import { parallax } from './parallax';
import { header } from './header';
import { map } from './map';
import { form } from './form';
import { Container } from "./job";

document.addEventListener('DOMContentLoaded', function() {
	map();
    parallax();
    header();
    form();

    const slider = new Slider('.banner', {
        pauseTime : 5000
    });

    const jobs = new Container();
	jobs.makeButtons();
});