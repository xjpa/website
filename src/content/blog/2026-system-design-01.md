---
title: System Design 01
date: 2026-05-20
summary: The basics
tags:
  - system design
---

 
## Basics of System Design
    
### The "what"

Its about taking a set of requirements and breaking it down to solvable sub-problems, then decide the key components and responsibilities, decide the boundaries of each components, then the modules. Then think of how they interact. Consider all possible cases to give the user a good experience. Make the architecture fault tolerant and availabe and think about the challenges in scaling it

### Approach

Go things top down if you get a big problem statement

<ol>
    <li>Grok the problem statement: what youre supposed to do, the constraints</li>
    <li>Break problem statement to (essential) components: determine components or features big enough to be microservice</li>
    <ul>
        <li>noet: a component does not mean a microservice. it can just be a module inside a monolith, background worker, cache layer, DB table group, or just a separate service. think in terms of  of breaking it into a <b>responsiblity</b>
    </ul>
    <li>Dissect a component and go deeper: define clearer boundaries, sub-components, databases, servers, etc.</li>
    <li>For each sub-component dive deeper into the following dimensions: </li>
    <ol>
        <li>database and caching</li>
        <li>scaling and fault tolerance like what if the DB crashes</li>
        <li>async procssing/delegation like should we generate a feed asyncronously</li>
        <li>communication like how would these components/databases/services communicate to each other like are they using TCP/gRPC</li>
    </ol>
    <li>Split more components if needed: see if you can  split generic services as doing so will make you understand if you have any missing components</li>
</ol>

### Specificity

Ive mentioned sub-components to dive deeper into earlier, but be more specific, think in terms of

- data model
- API contracts
- read/write patterns
- consistency requirements
- security/auth
- observability
- capacity estimates
- cost and tradeoffs

## Requirements

<ol>
    <li>FUnctional requirements</li>
    <ul>
        <li>What the system does</li>
    </ul>
    <li>Non-functional</li>
    <ul>
        <li>Latency</li>
        <li>Throughput</li>
        <li>Availability</li>
        <li>Durability</li>
        <li>Consistency</li>
        <li>Security</li>
        <li>Cist</li>
    </ul>
    <li>Scale</li>
    <ul>
        <li>Users</li>
        <li>RPS</li>
        <li>Read/Write ratio</li>
        <li>Storage growth</li>
        <li>Geo notes</li>
    </ul>
</ol>

Cos simply just saying "build a social network" means a lot of things. Its much better if that also coame out with more specificity like the system will have 1M DAU (daily active users), that users should have features like reading message history or a profile, that it should tolerate crashes without losing messages

### Evaluation

<p>How do you know thata system is good enough and its time to stop wasting time on designing?</p>
<ol>
    <li>Youve broken down the system to components</li>
    <li>Each broken components have clear exclusive responsiblities: the responsiblity of one component shouldnt interfre with a different component</li>
    <li>Each component you have figured out a good amount of technical detail for the following:</li>
    <ol>
    <li>database and caching</li>
    <li>scaling and fault tolerance</li>
    <li>async procssing/delegationy</li>
    <li>communication</li>
    </ol>
    <li>There is no component that is a single point of failure  (SPOF) and there is a plan for recovery in case of failure</li>
</ol>

## SPOF

Criticial user journeys shouldnt depend on an unrecoverable SPOF. And if we have to (cos theres always SPOFs somewhere in real life systems), it needs to be explicitly accepted and made known.  Such as for a startup prototype, 1 postgres instance may be fine but for banks then youll need backups, failover, audit logs, alerting etc.


## Business > Product > Architecture > Ops

Force every design to the steps above. Basically think first in terms of what are we solving, promise to the user, where do some technical issues/bottlenecks happen, and what can the business tolerate. 

Like in the build a social network example above:

### Business

You must think of the business goal. Is the main business goal retention and daily engagement? Or speed to launch?  What sthe risks we have, marketing,etc.

### Product



### Architecture

Componetns, data models, APIs, and infra to make it work. Like think of the auth service, profile service, DBs, CDNs, queues, how to make notifications work

### Ops

How to recover, deploy, etc.

