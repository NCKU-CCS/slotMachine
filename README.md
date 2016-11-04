# slot-machine

A slot machine demo

## Getting Started

#### Install package
```
npm install -i
```

#### Description

A cute slot machine.
Random draw a lucky guy with `phone` and `name` 


## Usage

build sass , js 
```
$ gulp
```

build hbs to html, and watch
```
$ ./bin/build -w
```

- Use `gulp` to construct it .
- `canner-core` is your main component which you also use in `handlebar.js`.

#### Usage of LED

[LED.md](./LED.md)


#### Data form
- [drawList.json](src/drawList.json)
```
[{
	"name":" xxx ",
	"phone":"091234567"
}...] 
```

## Developer

### gulp

build sass , js , then watch
```
$ gulp
``` 

minify css , js
```
$ gulp minify-css
$ gulp minify-js
```


concate all lib **js** or **css** file to one file ,  reduce request
```
$ gulp concate-css
$ gulp concate-js
```

compress img ( It's usually use on final in your project)
```
$ gulp image
```

### canner-core

build **hbs to html**
```
$ ./bin/build 
```

+ -w : watch
+ -m : minify code

## License
 © [NCKU-CCS]()

---
### About [GoGo Frontend ](GoGoFrontend.md)
It helps you to construct and orginize your static code , quickly minify html , css , js , img.  

Use [gulp](http://gulpjs.com) and [canner-core](https://www.npmjs.com/package/canner-core)
( The html's template is [hbs](http://handlebarsjs.com) )

+ gulp
+ gulp-compass
+ gulp-concat
+ gulp-imagemin
+ gulp-minify-css
+ gulp-plumber
+ gulp-rename
+ gulp-uglify
+ gulp-clean-css
+ canner-core
+ minist

