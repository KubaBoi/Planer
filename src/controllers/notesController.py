#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os

from Cheese.cheeseController import CheeseController as cc
from Cheese.resourceManager import ResMan

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

        if (not cc.validateJson(["DIRECTORY", "FILENAME"], args)):
            return cc.createResponse({"ERROR": "Wrong json structure"}, 400)

        directory = args["DIRECTORY"]
        fileName = args["FILENAME"]
        
        path = os.path.join(ResMan.web(), directory, fileName)

        if (os.path.exists(path)):
            return cc.createResponse({"ERROR": "File already exists"}, 409)

        with open(path, "w") as f:
            f.write("")

        return cc.createResponse({"STATUS": "OK"}, 200)
