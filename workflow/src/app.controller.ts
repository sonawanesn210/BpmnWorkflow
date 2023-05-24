import { AppService } from './app.service';
import { Controller, Get, Post,Put, Body, Param, Res,Patch } from '@nestjs/common';
import { Response } from 'express';

@Controller('xml-js')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post(':filename')//newtesting11
  async createXmlFile(@Param('filename') filename: string, @Body() inputData: any) {
    return this.appService.createXmlFile_xmljs(filename, inputData);
  }
 
  
    @Get(':filename')
  async getXmlFile(@Param('filename') filename: string, @Res() res: Response) {
    const data = await this.appService.getXmlFile_xmljs(filename);
    res.setHeader('Content-Type', 'application/xml');
    res.send(data);
  }  

 

}

