# Werwapp

The unoffical App for the Game _Werwolf_. The app plays differnt songs for each day and night time.

![](screenshots/night.png)

Additional features:

- User selectable themes for day and night
- Counter of the current night
- And more is currently under work

## How can i use this great app?

If you just want to play a round, head over to the [website](https://werwapp.pages.dev/).
For local hosting / usage see the development section.

## I need more functionality

Just create a new issue and and describe the feature you wish. We will try our best to implement it.

## I found a bug!

Please create an issue and describe the bug with reproduction steps and a screenshot.

## Development

If you want to implement features, fix bugs or just host the site yourself, follow these instructions.

### Setup and launching the app

You will need the following toolchain:

- NodeJs (16.x)
- Yarn

With that provided, clone the repo and change the directory:

`git clone https://github.com/BjarneRentz/werwapp.git`

`cd werwapp`

Install the dependencies

`yarn`

and start the application

`yarn dev`

Thats it, now you should see the app on [localhost](http://localhost:5173)

## Hosting the songs

You need to prived the env variable `SECRET_SONG_BASE_PATH`. You can utilize the parametes `{STATE}`, `{ARTIST}` and `{TITLE}` in the url.
Theese are getting substitutet with the attributes of the song in upper case during the server side request.

## Contribute

Just fork the repo and start hacking. Please name your commits using [convetional commits](https://www.conventionalcommits.org/en/v1.0.0/).
