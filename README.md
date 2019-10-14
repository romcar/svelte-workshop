# sapper-template

The default [Sapper](https://github.com/sveltejs/sapper) template, with branches for Rollup and webpack. To clone it and get started:

```bash
# https
git clone https://github.com/romcar/svelte-workshop.git

# SSH
git clone git@github.com:romcar/svelte-workshop.git

cd svelte-workshop
npm install # or yarn!
npm run dev
```

Open up [localhost:3000](http://localhost:3000) and start clicking around.

Tech used:
- ![Sapper](https://user-images.githubusercontent.com/31927972/66726984-626e7300-ee0a-11e9-82cf-b0a2d4c7b4f7.png)
- ![Svelte](https://user-images.githubusercontent.com/31927972/66727024-a792a500-ee0a-11e9-9ef3-1e9411da639b.png)
- ![lowDB](https://user-images.githubusercontent.com/31927972/66727056-d4df5300-ee0a-11e9-9413-28882a6466c2.png)
- ![Sass](https://user-images.githubusercontent.com/31927972/66727155-4c14e700-ee0b-11e9-8095-c1b681bdd0c4.png)
- ![Webpack](https://user-images.githubusercontent.com/31927972/66727110-15d76780-ee0b-11e9-902e-73af83066b9c.png)
- ![StoryBlok](https://user-images.githubusercontent.com/31927972/66727175-6f3f9680-ee0b-11e9-87e3-3b936d2ffa07.png)
- ![Susy](https://user-images.githubusercontent.com/31927972/66727227-bb8ad680-ee0b-11e9-8886-ec935893ec54.png)

Documentations:
-  [Sapper](https://sapper.svelte.dev/docs)
-  [Svelte](https://svelte.dev/docs)
-  [lowDB](https://github.com/typicode/lowdb)


<br/>

# Original ReadMe Notes:

## Structure

Sapper expects to find two directories in the root of your project —  `src` and `static`.


### src

The [src](src) directory contains the entry points for your app — `client.js`, `server.js` and (optionally) a `service-worker.js` — along with a `template.html` file and a `routes` directory.


#### src/routes

This is the heart of your Sapper app. There are two kinds of routes — *pages*, and *server routes*.

**Pages** are Svelte components written in `.svelte` files. When a user first visits the application, they will be served a server-rendered version of the route in question, plus some JavaScript that 'hydrates' the page and initialises a client-side router. From that point forward, navigating to other pages is handled entirely on the client for a fast, app-like feel. (Sapper will preload and cache the code for these subsequent pages, so that navigation is instantaneous.)

**Server routes** are modules written in `.js` files, that export functions corresponding to HTTP methods. Each function receives Express `request` and `response` objects as arguments, plus a `next` function. This is useful for creating a JSON API, for example.

There are three simple rules for naming the files that define your routes:

* A file called `src/routes/about.svelte` corresponds to the `/about` route. A file called `src/routes/blog/[slug].svelte` corresponds to the `/blog/:slug` route, in which case `params.slug` is available to the route
* The file `src/routes/index.svelte` (or `src/routes/index.js`) corresponds to the root of your app. `src/routes/about/index.svelte` is treated the same as `src/routes/about.svelte`.
* Files and directories with a leading underscore do *not* create routes. This allows you to colocate helper modules and components with the routes that depend on them — for example you could have a file called `src/routes/_helpers/datetime.js` and it would *not* create a `/_helpers/datetime` route


### static

The [static](static) directory contains any static assets that should be available. These are served using [sirv](https://github.com/lukeed/sirv).

In your [service-worker.js](src/service-worker.js) file, you can import these as `files` from the generated manifest...

```js
import { files } from '@sapper/service-worker';
```

...so that you can cache them (though you can choose not to, for example if you don't want to cache very large files).


## Bundler config

Sapper uses Rollup or webpack to provide code-splitting and dynamic imports, as well as compiling your Svelte components. With webpack, it also provides hot module reloading. As long as you don't do anything daft, you can edit the configuration files to add whatever plugins you'd like.


## Production mode and deployment

To start a production version of your app, run `npm run build && npm start`. This will disable live reloading, and activate the appropriate bundler plugins.

You can deploy your application to any environment that supports Node 8 or above. As an example, to deploy to [Now](https://zeit.co/now), run these commands:

```bash
npm install -g now
now
```


## Using external components

When using Svelte components installed from npm, such as [@sveltejs/svelte-virtual-list](https://github.com/sveltejs/svelte-virtual-list), Svelte needs the original component source (rather than any precompiled JavaScript that ships with the component). This allows the component to be rendered server-side, and also keeps your client-side app smaller.

Because of that, it's essential that the bundler doesn't treat the package as an *external dependency*. You can either modify the `external` option under `server` in [rollup.config.js](rollup.config.js) or the `externals` option in [webpack.config.js](webpack.config.js), or simply install the package to `devDependencies` rather than `dependencies`, which will cause it to get bundled (and therefore compiled) with your app:

```bash
npm install -D @sveltejs/svelte-virtual-list
```


## Bugs and feedback

Sapper is in early development, and may have the odd rough edge here and there. Please be vocal over on the [Sapper issue tracker](https://github.com/sveltejs/sapper/issues).
