"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs/promises");
const xml_js_1 = require("xml-js");
let AppService = class AppService {
    async createXmlFile_xmljs(filename, inputData) {
        try {
            console.log("inputData====>", inputData);
            const xmlData = inputData.xmlData;
            console.log("Input XML data:", xmlData, typeof xmlData);
            const jsonObj = (0, xml_js_1.xml2json)(xmlData, { compact: true, spaces: 2 });
            console.log("Converted JSON:", jsonObj);
            const convertedXml = (0, xml_js_1.json2xml)(jsonObj, { compact: true, ignoreComment: true, spaces: 4 });
            console.log("Converted XML:", convertedXml);
            await fs.writeFile(`${filename}.xml`, convertedXml);
            console.log(`File ${filename}.xml created`);
            return { message: `File ${filename}.xml created`, data: convertedXml };
        }
        catch (error) {
            console.error(error);
            throw new Error("Could not create file");
        }
    }
    async getXmlFile_xmljs(filename) {
        try {
            const data = await fs.readFile(`${filename}.xml`);
            console.log(data);
            return data;
        }
        catch (error) {
            console.error(error);
            throw new Error('Could not read file');
        }
    }
    async updateXmlFile_xmljs(filename, inputData) {
        try {
            const xmlData = await fs.readFile(`${filename}.xml`, 'utf-8');
            const jsonData = (0, xml_js_1.xml2json)(xmlData, { compact: true, spaces: 2 });
            const jsonObj = JSON.parse(jsonData);
            const inputDataRootKeys = Object.keys(inputData.root);
            for (let i = 0; i < inputDataRootKeys.length; i++) {
                const key = inputDataRootKeys[i];
                const value = inputData.root[key];
                if (typeof jsonObj.root[key] !== 'undefined') {
                    if (typeof value === 'object') {
                        const valueKeys = Object.keys(value);
                        for (let i = 0; i < valueKeys.length; i++) {
                            const nestedKey = valueKeys[i];
                            const nestedValue = value[nestedKey];
                            jsonObj.root[key][nestedKey]._text = nestedValue;
                        }
                    }
                    else {
                        jsonObj.root[key]._text = value;
                    }
                }
            }
            const updatedXmlData = (0, xml_js_1.json2xml)(jsonObj, { compact: true, spaces: 4 });
            await fs.writeFile(`${filename}.xml`, updatedXmlData);
            console.log(`File ${filename}.xml updated with new element`);
            return { message: `File ${filename}.xml updated with new element`, data: updatedXmlData };
        }
        catch (error) {
            console.error(error);
            throw new Error('Could not update file');
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map