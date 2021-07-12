# OTA Proxy

This is a very simple project that lets you OTA install iOS apps over HTTP. It is similar to [ota-me](https://github.com/SignTools/ota-me), but this project is a dynamic page (has to be self-hosted) that allows you to install an IPA from any URL, not just localhost.

It works by offering a [Cloudflare Worker](https://workers.cloudflare.com/) API endpoint, which returns a valid HTTPS OTA manifest that installs an app from any URL you provide as a query parameter. The URL can be localhost, LAN, or public internet, and it can be HTTP. This method works because Apple enforces the manifest to be served over HTTPS, but not the apps within the manifest.

## Usage

Deploy this script to [Cloudflare Workers](https://workers.cloudflare.com/). Then, call it as follows:

```
https://YOUR.PROJECT.workers.dev/v1?ipa=http://YOUR_URL.ipa&title=SOME_TITLE&id=com.THE_BUNDLE_ID
```
