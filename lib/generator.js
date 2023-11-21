import inquirer from "inquirer";
import ora from "ora";
import util from "util";
import downloadGitRepo from "download-git-repo"; // 不支持 Promise

// 添加加载动画
async function wrapLoading(fn, message, ...args) {
    // 使用 ora 初始化，传入提示信息 message
    const spinner = ora(message);
    // 开始加载动画
    spinner.start();

    try {
        // 执行传入方法 fn
        const result = await fn(...args);
        // 状态为修改为成功
        spinner.succeed();
        return result;
    } catch (error) {
        // 状态为修改为失败
        spinner.fail("Request failed, refetch ...");
    }
}

class Generator {
    constructor(name, targetDir) {
        // 目录名称
        this.name = name;
        // 创建位置
        this.targetDir = targetDir;
        this.downloadGitRepo = util.promisify(downloadGitRepo);
    }

    // 获取用户选择的模板
    // 1）模板列表
    // 2）return 用户选择的名称

    async getRepo() {
        // 模板列表
        const repos = ["pc", "mobile"];

        // 2）用户选择自己新下载的模板名称
        const { repo } = await inquirer.prompt({
            name: "repo",
            type: "list",
            choices: repos,
            message: "Please choose a template to create project",
        });
        // 3）return 用户选择的名称
        return repo;
    }

    // 下载远程模板
    // 1）拼接下载地址
    // 2）调用下载方法
    async download(repo) {
        // 1）拼接下载地址
        const requestUrl = `github:tycli/${repo}#main`
        // 2）调用下载方法
        await wrapLoading(
            this.downloadGitRepo, // 远程下载方法
            "waiting download template", // 加载提示信息
            requestUrl, // 参数1: 下载地址
            `${this.targetDir}`, //下载后问文件夹名字
            { clone: true }
            //   path.resolve(process.cwd(), this.targetDir)
        );
    }

    // 核心创建逻辑
    // 1）获取模板名称
    // 2）下载模板到模板目录
    async create() {
        // 1）获取模板名称  可以通过githubapi接口拉取一个组织下所有的仓库。但是按照现实场景来分析的话没必要，所以现在的仓库地址算是半写死的
        const repo = await this.getRepo();
        // 2）下载模板到模板目录
        await this.download(repo, "");
        console.log(`选择了${repo}模版，已为您下载对应模版`);
    }
}
export default Generator;
