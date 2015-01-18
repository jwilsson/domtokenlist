# DOMTokenList shim

A super strict shim/polyfill for [DOMTokenList](http://dom.spec.whatwg.org/#interface-domtokenlist), classList and relList.

## Usage
All you need to do is include the JavaScript file and everything will be ready to go.
If native DOMTokenList support is detected, nothing will be done.

```
<script src="DOMTokenList.js"></script>
```

## Browser support
* Android - 2.3+
* Google Chrome - Current version and one version earlier
* Internet Explorer - 8+
* iOS - 6.1+
* Mozilla Firefox - Current version and one version earlier
* Opera - Current version and one version earlier
* Safari - 5.1+

### Notes on browser support
* Android 4.0+, Internet Explorer 10+ and Safari 5.1-7 features native support for `classList` but doesn't support multiple arguments to `add()` and `remove()`. All arguments after the first one will be ignored.

## License
MIT license. See [LICENSE.md](LICENSE.md) for more information.
