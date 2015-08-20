import org.viz.lightning._
import scala.util.Random

val lgn = Lightning()

val states = ["NA", "AK", "AL", "AR", "AZ", "CA", "CO","CT","DC","DE","FL","GA","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"]

val values = Array.fill(states.length)(Random.nextFloat())

lgn.map(states, values=values)
