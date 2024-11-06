Pseudorange is a term used in geolocation and positioning systems, particularly in GPS (Global Positioning System), to describe the apparent distance from a GPS satellite to a receiver. It is called "pseudorange" because it is not an exact range due to various factors that can introduce errors. Here are the key aspects:

### Key Points:

1. **Definition**: Pseudorange is the calculated distance between a GPS satellite and the receiver, based on the time it takes for the satellite's signal to reach the receiver. This time is multiplied by the speed of light to estimate the distance.

2. **Calculation**: The pseudorange is computed using the formula:
   \[
   \text{Pseudorange} = c \times t
   \]
   where \( c \) is the speed of light and \( t \) is the time delay of the satellite signal as measured by the receiver.

3. **Sources of Error**: Pseudorange measurements can be affected by several factors:
   - **Satellite Clock Errors**: The atomic clocks in satellites can have small discrepancies.
   - **Receiver Clock Errors**: The receiver typically uses a less accurate clock, introducing additional error.
   - **Atmospheric Delays**: Signals can be delayed by the ionosphere and troposphere.
   - **Multipath Effects**: Signals may bounce off surfaces before reaching the receiver, causing inaccuracies.

4. **Use in Positioning**: To determine a precise location, a GPS receiver typically uses pseudorange measurements from at least four satellites. The receiver calculates its position by solving the equations based on these pseudoranges, taking into account the errors to improve accuracy.

5. **Difference from True Range**: Unlike the true geometric range, which is the actual distance between the satellite and the receiver, the pseudorange includes various errors and approximations, making it a less precise but useful measurement for determining position.

In summary, pseudorange is a fundamental concept in GPS technology, enabling the estimation of distances to satellites, which is essential for accurate geolocation.