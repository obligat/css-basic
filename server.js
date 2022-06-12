const readline = require('node:readline')
const https = require('https')

// 批量删除github仓库
// https://docs.github.com/en/rest/repos/repos#delete-a-repository

// 1. 创建 具有删除权限的 token
// settings->Developer settings->Personal access tokens->Generate new token
// 选择delete_repo
// 2. 终端node运行这个js文件

const options = {
  hostname: 'api.github.com',
  port: 443,
  path: '/repos/obligat/${repo}',
  method: 'DELETE',
  headers: {
    'User-Agent': 'node',
    Accept: 'application/vnd.github.v3+json',
    Authorization: 'token {/** my delete token*/}',
  },
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'OHAI> ',
})

console.log('====请输入仓库名====')
rl.prompt()

rl.on('line', (line) => {
  const repo = line.trim()

  options.path = `/repos/obligat/${repo}`
  console.log('即将删除 repo: ', options.path)

  const req = https.request(options, (res) => {
    console.log(repo, '删除成功')
    rl.prompt()
  })

  req.on('error', (error) => {
    console.log('error', error)
  })
  req.end()
}).on('close', () => {
  process.exit(0)
})
