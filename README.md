# 网站快速扩建模板
#### 这是一个基于laravel编写的网站快速扩建模板,已经集成了基本的文章管理,权限管理,和网站基础信息设置等,本模板具有良好的扩展性,及迁移性,可以轻松部署.代码风格准守RESTFul完成编写,本基础模板已完成搭建了几十个企业站丶产品官网站丶个人博客站等,通过了市场检验,在易用和稳定上获得了一致好评


# 安装方式
#### 下载
`git clone git@github.com:JueMeiAlg/qditCMF.git`

##### 安装依赖
`composer install`

##### 安装后台前端页面依赖
`npm install`

##### 复制一份新的环境配置文件
`copy .env.example .env`

##### 生成appKey
`php artisan key:generate `

##### 创建软连接
`php artisan storage:link`

# 修改配置域名
`1. .env:APP_URL 换成你的域名或者IP`

`2. public/static/UEditor/php/config:imageUrlPrefix 换成你的域名或者IP`

# 开启定时任务
   `crontab -e` 然后加入
   
  ` * * * * *  php /your/projectPath/artisan schedule:run >> /dev/null 2>&1`

# 运行数据迁移

##### 运行迁移文件
`php artisan migrate`

##### 执行数据填充
`php artisan db:seed`

##### 如果数据填充出错执行
`php artisan fast:truncate` 截断所有基础表{然后重新运行数据填充}

或者

`php artisan fast:truncate --drop` 删除所有基础表{需要先重新执行数据迁移,然后才能执行数据填充}


后台体验地址:http://47.98.203.198/manage  账号:13686840083 密码 123456






