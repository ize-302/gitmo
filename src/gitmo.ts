import { Command } from "commander";
import shell from "shelljs";
import packageJson from "../package.json";
import emojisData from "@/emojis-data.json";

import transformMessage from "@/utils/transformMessage.js";
import hasStagedChanges from "@/utils/hasStagedChanges.js";
import commitMessagePrompt from "@/utils/commitMessagePrompt.js";

shell.config.silent = false;

const program = new Command();

const gitmo = () => {
	try {
		program
			.name("gitmo")
			.description(
				"A cli tool that adds appropriate emoji to your commit message based on conventional commits specification",
			)
			.version(packageJson.version);

		program
			.command("cm [message]")
			.description("Submit commit")
			.action(async (message) => {
				const stagedChagesExists = await hasStagedChanges();
				if (stagedChagesExists) {
					if (message) {
						const transformedMessage = await transformMessage(message);
						shell.exec(`git commit -m '${transformedMessage}'`);
					} else {
						const response = await commitMessagePrompt();
						const transformedMessage = await transformMessage(response.commitMessage);
						shell.exec(`git commit -m '${transformedMessage}'`);
					}
				}
			});

		program
			.command("ac [message]")
			.description("Amend last commit")
			.action(async (message) => {
				if (message) {
					const transformedMessage = await transformMessage(message);
					shell.exec(`git commit --amend -m '${transformedMessage}'`);
				} else {
					const response = await commitMessagePrompt();
					const transformedMessage = await transformMessage(response.commitMessage);
					shell.exec(`git commit --amend -m '${transformedMessage}'`);
				}
			});

		program
			.command("list")
			.description("List available commit types")
			.action(async () => {
				console.log("\n COMMIT TYPES \n");
				for (let i = 0; i < emojisData.length; i++) {
					const { name, emoji, description } = emojisData[i];
					console.log(`${emoji} ${name.toString()}: ${description}`);
				}
				console.log("\n");
			});

		program
			.command("update")
			.description("Update gitmo cli")
			.action(() => {
				shell.exec("npm i -g gitmo");
			});

		// Parse the command-line arguments
		program.parse(process.argv);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

export default gitmo;
