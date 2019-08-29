const download = require('download-git-repo')
const href = 'https://github.com:AngenalJuly/react-mpa#master'
console.log(href)
const action = () => {
    download(href, './aaa', { clone: true }, err => {
        console.log(err)
    })
}

module.exports = {
    command: 'test',
    description: '测试',
    alias: 't',
    action
}
