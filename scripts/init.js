const { prompt } = require('inquirer')
const chalk = require('chalk')
const download = require('download-git-repo')
const ora = require('ora')
const tplList = require(`${__dirname}/../templates`)

const question = [
    {
        type: 'list',
        name: 'template',
        message: '选择模板',
        choices: ['react单页应用', 'react多页应用'],
        filter: val => {
            return { react单页应用: 'react-spa', react多页应用: 'react-mpa' }[val]
        }
    }
]
const action = () =>
    prompt(question).then(({ template }) => {
        const gitPlace = tplList[template].href
        const gitBranch = tplList[template].branch
        const spinner = ora('正在安装...')
        spinner.start()

        download(`${gitPlace}#${gitBranch}`, './', { clone: true }, err => {
            if (err) {
                console.log(chalk.red(err))
                process.exit()
            }
            spinner.stop()
            console.log(chalk.green('项目安装成功开始工作吧!'))
        })
    })

module.exports = {
    command: 'init',
    description: '初始化',
    alias: 'i',
    action
}
