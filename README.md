# visnetwork-layout

## Overview
A brief example repository to show a few ways to cluster nodes in a vis.js network.

## Findings
* It is not possible to load data into the visualizer pre-clustered, instead we need to tell the visualizer to create each cluster after the data has been fed into its data set. It is claimed that this process is relatively quick and lightweight, but we will need to do further testing to confirm this.
* The way that data is clustered (i.e. the order in which the calls to cluster the nodes is made) actually matters a lot and we will need to logically do this in order to get our desired outcome.
* Clustering by group is a good first-cut, however we are able to put whatever properties we want on the objects so we can cluster by anything we want.
* When a cluster is selected we can determine whether or not we want to open it, however the cluster node that gets passed through is very different to our normal nodes as it's dynamically created. We do however have a lot of control over this node such as choosing the ID etc. 
* Adding a new node to an existing cluster still needs to be tested.
* Hierarchical layout provides us with some difficulties when expanding clustered nodes as each 'level' of the hierarch is not movable, so we cannot move the nodes wherever we want. I'm still not sure how these levels are determined and if we can manually put a node in a certain level.
