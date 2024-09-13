#!/usr/bin/env node
import FLAGS from "@/constants/flags.js";
import { handleCommand } from "@/utils/handleCommand.js";
import meow from "meow";

const cli = meow(
	`
  Usage
    $ gitmo [option] [command]
  Options
    --${FLAGS.COMMIT}, -c     Add commit using the gitmo
    --${FLAGS.VERSION}, -v    Print current installed version
    --${FLAGS.UPDATE}, -u     Update gitmo cli
  Examples
    $ gitmo -c
`,
	{
		importMeta: import.meta,
		flags: {
			[FLAGS.COMMIT]: { type: "boolean", shortFlag: "c" },
			[FLAGS.HELP]: { type: "boolean", shortFlag: "h" },
			[FLAGS.UPDATE]: { type: "boolean", shortFlag: "u" },
			[FLAGS.VERSION]: { type: "boolean", shortFlag: "v" },
		},
	},
);

handleCommand(cli);
