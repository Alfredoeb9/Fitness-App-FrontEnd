import '@testing-library/jest-dom';
import { TextEncoder } from 'util';

const Environment = require("jest-environment-jsdom").default;

module.exports = class CustomTestEnvironment extends Environment {
    async setup() {
        await super.setup();
        this.global.TextEncoder = TextEncoder;
        this.global.TextDecoder = TextDecoder;
        this.global.Response = Response;
        this.global.Request = Request;
        
    }
};

const { JSDOM } = require("jsdom");

const DEFAULT_HTML = `<html>
    <head><title>A1 Fitness Logger</title></head>
</html>`;

const DOM = new JSDOM(DEFAULT_HTML, {
    url: 'http://localhost:3002',
});
const { window } = DOM;


global.window = window;
global.document = window.document;
global.location = window.location;
global.navigator = {
    userAgent: 'node.js',
    platform: 'windows',
};
global.sessionStorage= window.sessionStorage;

global.TextEncoder = TextEncoder;
global.MutationObserver = window.MutationObserver;
global.HTMLElement = window.HTMLElement;
global.Node = window.Node;

global.IS_REACT_ACT_ENVIRONMENT = true;