import org.viz.lightning._
import scala.util.Random

val lgn = Lightning()

val states = ["NA", "AK", "AL", "AR", "AZ", "CA", "CO","CT","DC","DE"]

val values = Array.fill(states.length)(Random.nextFloat())

lgn.map(states, values, colormap="Blues")
