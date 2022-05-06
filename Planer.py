#!/usr/bin/env python
# -*- coding: utf-8 -*-

from Cheese.cheese import CheeseBurger
from Cheese.resourceManager import ResMan

"""
File generated by Cheese Framework

main file of Cheese Application
"""

if __name__ == "__main__":
    CheeseBurger.init()

    print(ResMan.path)

    CheeseBurger.serveForever()