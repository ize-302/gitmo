import { Command } from "commander";
import shell from "shelljs";

import hasStagedChanges from "oldsrc/utils/hasStagedChanges.js";
import isConventionalCommit from "oldsrc/utils/isConventionalCommit.js";
import onCancel from "oldsrc/utils/onCancel.js";
import promptContinue from "oldsrc/utils/promptContinue.js";
import showCommitMessagePrompt from "oldsrc/utils/showCommitMessagePrompt.js";
import packageJson from "../package.json";

shell.config.silent = false;

const program = new Command();

export const init = () => {
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
				if (!message) {
					if (hasStagedChanges()) {
						const modifiedMessage = await showCommitMessagePrompt();
						shell.exec(`git commit -m '${modifiedMessage}'`);
					}
				} else {
					const isValidCommit = await isConventionalCommit(message);
					if (isValidCommit) {
						shell.exec(`git commit -m '${message}'`);
					} else {
						const response = await promptContinue();
						if (response.continue === "yes") {
							shell.exec(`git commit -m '${message}'`);
						} else {
							onCancel();
						}
					}
				}
			});

		program
			.command("ac [message]")
			.description("Ament last commit")
			.action(async (message) => {
				if (!message) {
					const modifiedMessage = await showCommitMessagePrompt();
					shell.exec(`git commit -m '${modifiedMessage}'`);
				} else {
					const isValidCommit = await isConventionalCommit(message);
					if (isValidCommit) {
						shell.exec(`git commit --amend -m '${message}'`);
					} else {
						const response = await promptContinue();
						if (response.continue === "yes") {
							shell.exec(`git commit --amend -m '${message}'`);
						} else {
							onCancel();
						}
					}
				}
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
