import { Command } from "commander";
import shell from "shelljs";
import packageJson from "../package.json";

import transformMessage from "@/utils/transformMessage.js";
import hasStagedChanges from "@/utils/hasStagedChanges.js";

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
						console.log(transformedMessage); // commit this
					} else {
						console.log("prompt");
					}
				}
			});

		// Parse the command-line arguments
		program.parse(process.argv);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

export default gitmo;
