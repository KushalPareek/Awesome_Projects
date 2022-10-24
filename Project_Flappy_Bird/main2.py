import random
import sys
import pygame
import pygame.locals
from pygame import *


FPS = 60
SCREENWIDTH = 289
SCREENHIGHT = 511
SCREEN = pygame.display.set_mode((SCREENWIDTH,SCREENHIGHT))
GROUNDY = SCREENHIGHT * 0.8
GAME_SPRITES