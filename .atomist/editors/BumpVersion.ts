import { EditProject } from '@atomist/rug/operations/ProjectEditor';
import { Project } from '@atomist/rug/model/Project';
import { Pattern } from '@atomist/rug/operations/RugOperation';
import { Editor, Parameter, Tags } from '@atomist/rug/operations/Decorators';

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
        required: false
    })
    component: string = "patch";

    edit(project: Project) {
        let versionRegex = /version: "?(\d+)\.(\d+)\.(\d+)"?/;
        let manifest = project.findFile(".atomist/manifest.yml");
        if (manifest == null) {
            // not a rug archive
            return;
        }
        let versionMatch = versionRegex.exec(manifest.content);
        if (!versionMatch) {
            throw "Unable to parse current version. I can only increment a nice simple 1.2.3 format. But I see: " + manifest.content
        }

        let major = parseInt(versionMatch[1]);
        let minor = parseInt(versionMatch[2]);
        let patch = parseInt(versionMatch[3]);
        if (this.component == "major") {
            major = major + 1;
            minor = 0;
            patch = 0;
        } else if (this.component == "minor") {
            minor = minor + 1;
            patch = 0;
        } else if (this.component == "patch") {
            patch = patch + 1;
        } else {
            throw `Unknown version component '${this.component}'. Should be major|minor|patch`;
        }

        let newContent = manifest.content.replace(versionRegex, `version: "${major}.${minor}.${patch}"`)
        manifest.setContent(newContent);
    }
}

export const bumpVersion = new BumpVersion();
