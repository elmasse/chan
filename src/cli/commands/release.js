export default function () {
    return {
        command: 'release [version]',
        describe: 'Groups all your new features and marks a new release on your CHANGELOG.md.',
        handler(parser, argv, write) {
            if ( !parser.exists() ) {
                throw new Error('CHANGELOG.md does not exists. You can run: chan init in order to create a fresh new one.');
            }

            const version = argv.version;

            if (!version) {
                throw new Error('Missing argument: version.');
            }

            // do nothing if unreleased is empty.
            if (parser.getMTREE().releases[0].nodes.length === 0) return;

            parser.release(version);

            write();
        }
    };
}
