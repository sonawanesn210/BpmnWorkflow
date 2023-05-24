import { AppService } from './app.service';
import { Response } from 'express';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    createXmlFile(filename: string, inputData: any): Promise<{
        message: string;
        data: string;
    }>;
    getXmlFile(filename: string, res: Response): Promise<void>;
    updateXmlFile(filename: string, inputData: any): Promise<{
        message: string;
        data: string;
    }>;
}
