#! /usr/bin/env node

import {program} from "commander";
import { create } from "../lib/create.js";
import figlet from "figlet"

program
  .command("config [value]")
  .description("inspect and modify the config")
  .option("-g, --get <path>", "get value from option")
  .option("-s, --set <path> <value>")
  .option("-d, --delete <path>", "delete option from config")
  .action((value, options) => {
    console.log(value, options);
  });

program.on("--help", () => {
  // 使用 figlet 绘制 Logo
  console.log(
    "\r\n" +
      figlet.textSync("tycli", {
        font: "Ghost",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
  );
});

// 配置 ui 命令
program
  .command("ui")
  .description("start add open roc-cli ui")
  .option("-p, --port <port>", "Port used for the UI Server")
  .action((option) => {
    console.log("猜猜看这个是什么 -v- ！")
    console.log(
      "\r\n" +
        figlet.textSync("tycli", {
          font: "Ghost",
          horizontalLayout: "default",
          verticalLayout: "default",
          width: 80,
          whitespaceBreak: true,
        })
    );
  });

program
  .command("create <app-name>")
  .description("create a new project")
  .option("-f, --force", "overwrite target directory if it exist") // 是否强制创建，当文件夹已经存在
  .action((name, options) => {
    // 在 create.js 中执行创建任务
    create(name, options);
  });

program
  // 配置版本号信息
  .version(`1.1.0`)
  .usage("<command> [option]");

// 解析用户执行命令传入参数
program.parse(process.argv);
