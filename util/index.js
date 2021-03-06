const fs = require('fs')
const path = require('path')

// 获取指定目录下的所有文件
const getFiles = basePath => {
    const arr = []
    const existpath = fs.existsSync(basePath) //是否存在目录
    if (existpath) {
        const readdirSync = fs.readdirSync(basePath) //获取目录下所有文件
        readdirSync.forEach(item => {
            const currentPath = path.join(basePath, item)
            const isFile = fs.statSync(currentPath).isFile() //判断是不是一个文件
            if (isFile) arr.push(currentPath)
        })
        return arr
    }
    return []
}
exports.getFiles = getFiles

// 获取指定文件的内容,主要用于json
const getFileContent = file => {
    const existpath = fs.existsSync(file) // 文件是否存在
    if (existpath) {
        let infoData = {}
        try {
            const infoJson = fs.readFileSync(file, 'utf-8') || '{}'
            infoData = JSON.parse(infoJson)
        } catch (err) {
            console.warn(err)
        }
        return infoData
    }
    return {}
}
exports.getFileContent = getFileContent

module.exports = { getFiles, getFileContent }
