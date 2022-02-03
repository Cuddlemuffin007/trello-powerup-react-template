# trello-powerup-react-template
A template for creating Trello PowerUps with React and Typescript
Built with [React](https://facebook.github.io/react/), [Semantic-UI React](https://react.semantic-ui.com), [React Router](https://reacttraining.com/react-router/).

**This version uses React 17, React Router v6, and Semantic-UI React v2, built with React Hooks and React Context**


## Quick Start

#### 1. Get the latest version

You may clone this repository on your local machine by running:

```shell
$ git clone https://github.com/Cuddlemuffin007/trello-powerup-react-template.git YourAppName
$ cd YourAppName
```

#### 2. Run `yarn install`
Installs both the run-time project dependencies and developer tools listed in [package.json](package.json).

#### 3. Run `yarn build`
Builds the app from production to the build folder (dist).
Make sure the following environment variables are set:

CONTEXT_PATH: this will be used as the basename for the React BrowserRouter component; a good default is "/" or if you're using Git(Hub|Lab) pages, use your project name.
POWERUP_APP_KEY: your Trello App Key. You can find this [here](https://trello.com/app-key).
POWERUP_NAME: your PowerUp name. This and POWERUP_APP_KEY are required when initializing the Trello PowerUp iframe where your app will be mounted.
TRELLO_TOKEN_EXPIRATION: If you're using Trello's REST API client and having user's authorize their account, this is the expiration period for the token.

#### 4. Deployment
You may deploy this build package from the hosting provider of your choice and view it in Trello. (Quickest is probably deploying to GitHub pages)

NOTE:
Trello requires that PowerUps be served over HTTPS or they will not load into your board. GitHub or GitLab pages is a quick and easy way to do this.
Be sure to update your Allowed Origins [here](https://trello.com/app-key).
For local development, you can use tools like [ngrock](https://ngrok.com/) to proxy your local dev server in a way that you can view the PowerUp in action
and get live updates as you code. I didn't take the time to sort this out, but support for this is more than welcome in a Pull Request :)
