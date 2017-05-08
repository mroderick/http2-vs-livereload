# HTTP/2 vs. live reload using self signed certificates

* To detect problems early and to discover opportunities for improvements, we need to be able to use HTTP/2 while developing locally
* We would like to have live reloading to ease development for mobile web, especially so for Safar/iOS, which is one of our most important browsers

## Problem

As far as I have been able to determine, Safari/iOS9 does not work with self signed certificates for the secure websockets protocol (wss://). Even trusted certificates that are otherwise accepted by Safari (i.e. no warnings) are ignored.

As far as I can tell, it will not be possible to use both self signed certificates and web sockets in the same project, when Safari/iOS is a requirement.

Our live reloading module ([node-livereload](https://github.com/napcs/node-livereload#readme)) uses web sockets. 

## Investigation in detail

When the page loads in Safari/iOS, this error is in the console

```
WebSocket network error: The operation couldn’t be completed. (OSStatus error -9807.)
```

As [described on OSStatus.com](https://www.osstatus.com/search/results?platform=all&framework=all&search=-9807), this is `Invalid certificate chain`, i.e. a problem with the otherwise trusted certificate.

### Potential solutions tried

* https://github.com/mattdesl/budo/blob/dcbc05866f583e172d6b46c898048436ab84ddae/docs/command-line-usage.md#ssl-on-ios
* I have [asked to changed the mechanism of node-livereload to EventSource](https://github.com/napcs/node-livereload/issues/98), but that would break existing integrations, and would not be feasible without forking and (mostly rewriting the project).


## How to verify problem

### Install dependencies

```shell
yarn
```

### Create certificates

Follow directions from https://github.com/mattdesl/budo/blob/dcbc05866f583e172d6b46c898048436ab84ddae/docs/command-line-usage.md#ssl-on-ios to create your certificate in the `certificates` folder

Make sure you follow the directions to the letter, including how to install the certificate on iOS.

### Start the server

```shell
make dev
```

### Add the certificate to the **system** keychain

1. Open Safari
1. Navigate to https://[your-ip-here]:4444
1. Trust the certificate forever
1. Restart browser(s) to load new certificates from system keychain

## To run the demos

```shell
make dev
```

Navigate to https://[your-ip-here]:4444

Now try the same in Safari/iOS.

## Preferred soluion, acceptance criteria

* Must work with self signed certificates in Safari/iOS
* Must be integratable as a node module in a dev server (i.e. not a standalone process)
* Polyfills are ok (EventSource needs polyfill for IE, Edge and Opera mini)

## Alternative live reloading solutions

* [budo][budo] (uses web sockets)
* https://github.com/tapio/live-server (uses web sockets)


[budo]: https://github.com/mattdesl/budo
