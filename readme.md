# Undefined Bot
Is a bot to help you managing private server. You can easily host this bot and play around.

# Installation
Installation is pretty straightforward. All you need to do is `yarn` and that's it.

# Serving Up
You can serve up this bot by `yarn start`. However, please note that you will need a Firebase with Firestore enabled.

Your Firestore Structure must as follow:

- channels <br /> fields: name, value
- logging <br /> fields: details, message
- roadmap <br /> fields: author_name, author_url, content, footer, image, title
- roles <br /> fields: name, value
- rules <br /> fields: name, value

After that you will also need to enable the authentication mode and fill any firebase related configuration in `.env` file.

# Building The Project
To build the bot simply run `yarn build` and you'll have `deploy.zip` file generated right away.

# Contributing Guide
If you would like to contribute, you can obviously visit [issues](https://github.com/albetnov/undefined-bot/issues) and help solving it. Alternatively, you can also opening a [Pull Request](https://github.com/albetnov/undefined-bot/pulls).

Before contributing, Is it highly recommended to visit [Wiki Page](https://github.com/albetnov/undefined-bot/wiki)

# Built with
- Typescript
- Discord.JS