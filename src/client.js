import * as sapper from '@sapper/app';

/**
 * Returns a promise when the initial page is hydrated.
 */
sapper.start({
	target: document.querySelector('#sapper')
});
