from lightning import Lightning
from numpy import random

lgn = Lightning()

states = ["NA", "AK", "AL", "AR", "AZ", "CA", "CO","CT","DC","DE","FL","GA","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"]
values = random.randn(len(states))

lgn.map(states, values, colormap="Blues")