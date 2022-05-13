#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import shutil

from Cheese.cheeseController import CheeseController as cc
from Cheese.resourceManager import ResMan
from Cheese.appSettings import Settings

#@controller /notes;
class HelloWorldController(cc):

    #@get /getAll;
    @staticmethod
    def getAll(server, path, auth):
        response = []

        for root, dirs, files in os.walk(os.path.join(ResMan.web(), "notes")):
            response.append(
                {
                    "DIRECTORY": ResMan.getRelativePathFrom(root, ResMan.web()),
                    "FILES": files
                }   
            )

        return cc.createResponse({"TREE": response}, 200)

    #@post /create;
    @staticmethod
    def create(server, path, auth):
        args = cc.readArgs(server)

        if (not cc.validateJson(["DIRECTORY"], args)):
            return cc.createResponse({"ERROR": "Wrong json structure"}, 400)

        directory = args["DIRECTORY"]

        fileName = "New note"
        i = 0
        while (os.path.exists(ResMan.joinPath(ResMan.web(), directory, fileName + ".md"))):
            i += 1
            fileName = f"New note ({i})"
        
        path = ResMan.joinPath(ResMan.web(), directory, fileName + ".md")

        with open(path, "w") as f:
            f.write(f"# {fileName}")

        return cc.createResponse({"FILENAME": ResMan.joinPath(directory, fileName + ".md")}, 200)

    #@post /remove;
    @staticmethod
    def remove(server, path, auth):
        args = cc.readArgs(server)

        if (not cc.validateJson(["DIRECTORY"], args)):
            return cc.createResponse({"ERROR": "Wrong json structure"}, 400)

        directory = args["DIRECTORY"]
        path = ResMan.joinPath(ResMan.web(), directory)

        if (os.path.isdir(path)):
            shutil.rmtree(path)
        else:
            os.remove(path)

        return cc.createResponse({"STATUS": "OK"}, 200)

    #@post /update;
    @staticmethod
    def update(server, path, auth):
        args = cc.readArgs(server)

        if (not cc.validateJson(["FILE", "CONTENT"], args)):
            return cc.createResponse({"ERROR": "Wrong json structure"}, 400)

        file = args["FILE"]
        content = args["CONTENT"]

        lines = content.split("\n")
        fileName = ""
        for line in lines:
            if (line.startswith("# ")):
                fileName = line.replace("# ", "") + ".md"
                
        os.remove(ResMan.joinPath(ResMan.web(), file))
        file = file.replace(ResMan.getFileName(file), fileName) 

        with open(ResMan.joinPath(ResMan.web(), file), "w") as f:
            f.write(content)

        return cc.createResponse({"FILENAME": file}, 200)
