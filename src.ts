addEventListener("fetch", (event) => {
    event.respondWith(
        handleRequest(event.request).catch(
            (err) => new Response(err.stack, { status: 500 })
        )
    );
});

let manifest = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
        <key>items</key>
        <array>
            <dict>
                <key>assets</key>
                <array>
                    <dict>
                        <key>kind</key>
                        <string>software-package</string>
                        <key>url</key>
                        <string>{{.DownloadUrl}}</string>
                    </dict>
                </array>
                <key>metadata</key>
                <dict>
                    <key>bundle-identifier</key>
                    <string>{{.BundleId}}</string>
                    <key>bundle-version</key>
                    <string>2.0</string>
                    <key>kind</key>
                    <string>software</string>
                    <key>title</key>
                    <string>{{.Title}}</string>
                </dict>
            </dict>
        </array>
    </dict>
</plist>`

function escapeXml(unsafe) {
    return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
}

async function handleRequest(request) {
    const { searchParams } = new URL(request.url);
    let ipa = searchParams.get("ipa");
    let title = searchParams.get("title");
    let id = searchParams.get("id");

    if (ipa === null || title === null || id == null) {
        return new Response(null, { status: 400 });
    }

    manifest = manifest.replace("{{.Title}}", escapeXml(title));
    manifest = manifest.replace("{{.DownloadUrl}}", escapeXml(ipa));
    manifest = manifest.replace("{{.BundleId}}", escapeXml(id));

    return new Response(manifest, {
        headers: { "Content-Type": "text/plain" },
    });
}
