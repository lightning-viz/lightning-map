from lightning import Lightning
from numpy import random

lgn = Lightning()

states = ["NA", "AK", "AL", "AR", "AZ", "CA", "CO","CT","DC","DE"]
values = random.randn(len(states))

lgn.map(states, values, colormap="Blues")