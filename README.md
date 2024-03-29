# rgroot-site

rgroot official website, developed by [hayabusa](https://github.com/h2yk).  
Master brunch build will be deployed to the link in the repo description.

## Those who want to edit members / publications

Just edit json in the `src/data/` directory, then PR to this repo.  
You don't have to learn and write HTML anymore :)

### Schema

#### `members.json`

faculties and students are all has same schema.

| key              | value                                                                                                |
| :--------------- | :--------------------------------------------------------------------------------------------------- |
| `list`           | `bool` - Show in members list or not                                                                 |
| `icon`           | `string` - Icon url of the member. If not specified, [gravatar](https://gravatar.com/) will be used. |
| `name`           | `string` - Name of the member, in Japanese                                                           |
| `name_en`        | `string` - Name of the member, in English                                                            |
| `url`            | `string` - If specified, link will be shown up in members list.                                      |
| `login`          | `string` - Login name                                                                                |
| `affiliation`    | `string` - Your affiliation, in Japanese                                                             |
| `affiliation_en` | `string` - Your affiliation, in English. It has to be either `EI`, `PM`, or `MAG`.                   |
| `grade`          | `string` - Your grade, in Japanese                                                                   |
| `grade_en`       | `string` - Your grade, in English. It has to be either `D3`-`D1`, `M2`-`M1`, or `B4`-`B1`            |

#### `publications.json`

Member highlighting will be automatically done by the script.

- `papers`: Publication(peer-reviewed)
- `presentations`: Public presentation
- `activities`: Activity

| key   | value                                                                        |
| :---- | :--------------------------------------------------------------------------- |
| `en`  | `string` - publications info, in English.                                    |
| `ja`  | `string` - publications info, in Japanese.                                   |
| `url` | `string` - If specified, link icon will be appear which can jump to the url. |

## Original README generated by create-react-app

This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br /> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br /> You will also see any lint errors
in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br /> See the section
about
[running tests](https://facebook.github.io/create-react-app/docs/running-tests)
for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br /> It correctly bundles
React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br /> Your app is
ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can
`eject` at any time. This command will remove the single build dependency from
your project.

Instead, it will copy all the configuration files and the transitive
dependencies (webpack, Babel, ESLint, etc) right into your project so you have
full control over them. All of the commands except `eject` will still work, but
they will point to the copied scripts so you can tweak them. At this point
you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for
small and middle deployments, and you shouldn’t feel obligated to use this
feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.

### Learn More

You can learn more in the
[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
