import { Project } from "@atomist/rug/model/Project";
import { Editor, Parameter, Tags } from "@atomist/rug/operations/Decorators";
import { EditProject } from "@atomist/rug/operations/ProjectEditor";
import { Pattern } from "@atomist/rug/operations/RugOperation";

/**
 * Increment the version in manifest.yml
 */
@Editor("BumpVersion", "bump the version of this rug archive")
@Tags("rug", "version")
export class BumpVersion implements EditProject {

    @Parameter({
        displayName: "version component",
        description: "how bumped is it? major/minor/patch",
        pattern: Pattern.any,
        validInput: "major | minor | patch",
        minLength: 1,
        maxLength: 5,
        required: false,
    })
    public component: string = "patch";

    public edit(project: Project) {
        const versionRegex = /version: "?(\d+)\.(\d+)\.(\d+)"?/;
        const manifest = project.findFile(".atomist/manifest.yml");
        if (manifest == null) {
            // not a rug archive
            return;
        }
        const versionMatch = versionRegex.exec(manifest.content);
        if (!versionMatch) {
            throw new Error(
               // tslint:disable-next-line:max-line-length
               `Unable to parse current version. I can only increment a nice simple 1.2.3 format. But I see: ${manifest.content}`);
        }

        let major = parseInt(versionMatch[1]);
        let minor = parseInt(versionMatch[2]);
        let patch = parseInt(versionMatch[3]);
        if (this.component === "major") {
            major = major + 1;
            minor = 0;
            patch = 0;
        } else if (this.component === "minor") {
            minor = minor + 1;
            patch = 0;
        } else if (this.component === "patch") {
            patch = patch + 1;
        } else {
            throw new Error(`Unknown version component '${this.component}'. Should be major|minor|patch`);
        }

        const newContent = manifest.content.replace(versionRegex, `version: "${major}.${minor}.${patch}"`);
        manifest.setContent(newContent);
    }
}

export const bumpVersion = new BumpVersion();
