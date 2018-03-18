![wall](wall.jpg)

# Ohho

> Efficiently run Mac OSX Applications from the terminal


## Install

```
$ npm install --global ohho
```
Supported platform :  <b>Mac</b> Only


## Usage

Just write the application name after `ohho` and it will take care of the rest!

```
$ ohho --help

    Usage
      $ ohho <app_name>
 
    Options
      --help    	View help docs
      --version 	For current version
 
    Examples
      $ ohho google chrome
      $ ohho chrome
      $ ohho google
      $ ohho Google Chrome
      $ ohho "google chrome"
      $ ohho sublime
      $ ohho subl
    
    Run without arguments to use the interactive interface.
    The application name is case insensitive.

```

## Interactive UI

Run `ohho` without arguments to launch the interactive UI.

## How it works ?
Basically it search for the string that you just entered after `ohho` inside all the applications present in `/Applications/`. Whatever matches that string will executed. If there are more than 1 matched results, then it simply prompt all the results and asks user.

## Created by

- [Gaurav Mehla](https://mehla.in)


## License

MIT © [Gaurav Mehla](https://mehla.in)
<div>Icon made by <a href="https://www.flaticon.com/authors/roundicons-freebies" title="Roundicons Freebies">Roundicons Freebies</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
