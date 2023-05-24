interface XmlData {
    root: {
        [key: string]: any;
    };
}
export declare class AppService {
    createXmlFile_xmljs(filename: string, inputData: any): Promise<{
        message: string;
        data: string;
    }>;
    getXmlFile_xmljs(filename: string): Promise<any>;
    updateXmlFile_xmljs(filename: string, inputData: XmlData): Promise<{
        message: string;
        data: string;
    }>;
}
export {};
