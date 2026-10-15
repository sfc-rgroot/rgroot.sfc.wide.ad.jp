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
