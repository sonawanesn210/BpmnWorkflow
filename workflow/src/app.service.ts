import { Injectable } from '@nestjs/common';
const fs = require("fs/promises");
import { xml2json, json2xml } from 'xml-js';

interface XmlData {
    root: {
      [key: string]: any;
    };
  }
 /*  another option
  type XmlData = {
    root: {
      [key: string]: any;
    };
  }; */
  

@Injectable()
export class AppService {
  async createXmlFile_xmljs(filename: string, inputData: any) {
        try {
            console.log("inputData====>",inputData)
          // We are Extracting the XML string from the input object
          const xmlData = inputData.xmlData;
          console.log("Input XML data:", xmlData, typeof xmlData);
          
          // We are Converting the XML string to a JSON object
          const jsonObj =xml2json(xmlData, { compact: true, spaces: 2 });
          console.log("Converted JSON:", jsonObj);
          
      
          // We are Converting the JSON object back to XML
          const convertedXml = json2xml(jsonObj, { compact: true, ignoreComment: true, spaces: 4 });
      
          console.log("Converted XML:", convertedXml);
      
          // Write the XML to the file
          await fs.writeFile(`${filename}.xml`, convertedXml);
          console.log(`File ${filename}.xml created`);
      
          return { message: `File ${filename}.xml created`, data: convertedXml };
        } catch (error) {
          console.error(error);
          throw new Error("Could not create file");
        }
      }


// Get all data of file
      async getXmlFile_xmljs(filename: string) {
        try {
          const data = await fs.readFile(`${filename}.xml`);
          console.log(data)
          return data;
        } catch (error) {
          console.error(error);
          throw new Error('Could not read file');
        }
      }


     
      
    }