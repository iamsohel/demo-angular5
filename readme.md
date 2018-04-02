#CHECK DEFENCE FRONTEND APPLICATION

VERSION 1.0
Build with Angular 5.2

Project Build Instructions
-----------------------

**Creating a build**

To [build](https://github.com/angular/angular-cli/wiki/build) the application open the terminal in the project directory
and run 
``ng build``
The build artifacts will be stored in the dist/ directory.

All commands that build or serve your project, ``ng build/serve/e2e``, will delete the output directory (dist/ by default). 

This can be disabled via the --no-delete-output-path (or --delete-output-path=false) flag. 


**Build Targets and Environment Files**

ng build can specify both a build target (`--target=production` or `--target=development`) and an environment file to be used with that build (`--environment=dev` or `--environment=prod`). By default, the development build target and environment are used.

The mapping used to determine which environment file is used can be found in ``.angular-cli.json``:

``"environmentSource": "environments/environment.ts",
"environments": {
  "dev": "environments/environment.ts",
  "prod": "environments/environment.prod.ts"
}``

These options also apply to the serve command. If you do not pass a value for environment, it will default to dev for development and prod for production.

```angular2html
# These are equivalent
ng build --target=production --environment=prod
ng build --prod --env=prod
ng build --prod
```


```
# And so are these
ng build --target=development --environment=dev
ng build --dev --e=dev
ng build --dev
ng build
```

You can also add your own env files other than dev and prod by doing the following:

* create a ``src/environments/environment.NAME.ts``
* add ``{ "NAME": 'src/environments/environment.NAME.ts' }`` to the ``apps[0].environments`` object in ``.angular-cli.json``
* use them via the ``--env=NAME`` flag on the build/serve commands.


**Base tag handling in index.html**

When building you can modify base tag (```<base href="/">```) in your `index.html` with ``--base-href your-url`` option.



``` 
# Sets base tag href to /myUrl/ in your index.html
ng build --base-href /myUrl/
ng build --bh /myUrl/ 
```
So if the files are in `http://expample.com/dist/`
then you have to build the application using `--base-href=../dist/` 

**Bundling & Tree-Shaking**

All builds make use of bundling and limited tree-shaking, while `--prod` builds also run limited dead code elimination via UglifyJS.

**--dev vs --prod builds**

Both `--dev/--target=development` and `--prod/--target=production` are `'meta'` flags, that set other flags. If you do not specify either you will get the `--dev` defaults.


|Flag|	--dev|	--prod|
|:----:|:-------:|:--------:|
|--aot|	false|	true|
|--environment|	dev|	prod|
|--output-hashing|	media|	all|
|--sourcemaps|	true|	false|
|--extract-css|	false|	true|
|--named-chunks  |	true|	false|
|--build-optimizer|	false|	true with AOT and Angular 5|

`--prod` also sets the following non-flaggable settings:

* Adds service worker if configured in `.angular-cli.json`.
* Replaces `process.env.NODE_ENV` in modules with the production value (this is needed for some libraries, like react).
* Runs UglifyJS on the code.

**--build-optimizer and --vendor-chunk**

When using Build Optimizer the vendor chunk will be disabled by default. You can override this with `--vendor-chunk=true`.

Total bundle sizes with Build Optimizer are smaller if there is no separate vendor chunk because having vendor code in the same chunk as app code makes it possible for Uglify to remove more unused code.

**CSS resources**

Resources in CSS, such as images and fonts, will be copied over automatically as part of a build. If a resource is less than 10kb it will also be inlined.

You'll see these resources be outputted and fingerprinted at the root of `dist/`.

**Options**
```
-aot
-app
-base-href
-deploy-url
-environment
-extract-css
-i18n-file
-i18n-format
-locale
-missing-translation
-output-hashing
-output-path
-delete-output-path
-poll
-progress
-sourcemap
-stats-json
-target
-vendor-chunk
-common-chunk
-verbose
-watch
-show-circular-dependencies
-build-optimizer
-named-chunks
-bundle-dependencies
-extract-licenses
```


**Configurations**

>Before building the application please set the application configurations located in  `./src/app/config/app.ts`;

there are several configuration options 
```
companies:Array<{name:string}> = --> // Name of the companies
apiEndPoint:string --> //Api Endponts
graphClientID:String --> //Graph ClientID
graphEndpoint: string -->//Graph Endpoint ('https://graph.microsoft.com/v1.0/me')
graphScopes: string[]-->//Graph Scopes('Files.Read User.Read Mail.send');
    
```