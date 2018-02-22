# 1,000,000th Customer Prize - another programming challenge #

##### This is a realisation using ```node.js``` of this [contest](http://geeks.redmart.com/2015/10/26/1000000th-customer-prize-another-programming-challenge/). #####

Main challenge: what products (out of 20000) to fit into a tote of 30-35-45cm(of dimensions) to maximize the total value.
One product can be taken only 1 time.

###### Result: ######
```bash
Maximum tote volume - 47250 cm3
Total value collected - 412.98 $
Collected tote volume - 47200 cm3
Collected tote item count - 23 items
Email should be 450166@redmart.com
```

###### Realisation: ######

[0/1 knapsack problem](https://en.wikipedia.org/wiki/Knapsack_problem#0/1_knapsack_problem) task.
To find the best possible combination of most valuable items I've created a matrix with all possible combinations of all items.
Matrix size ended up being ```20000 * 47250  = 945 000 000 so is O(945 000 000)``` of time and space.

Node.js programs ran aproximately ```2 hours``` to create such a matrix and in the end it gives you only the maximum value in the last of its cells (not selected items).

To find selected items I extended the algorithm to let him go backwards and recreate the path to the first element. At the end I received the indexes of all items, which combine the maximum value.

The last thing is to check whether we can reduce total weight going through all items and find those who have the same volume and price but lower weight.

After that we can print out the result. :)