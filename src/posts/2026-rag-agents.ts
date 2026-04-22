import type { BlogPost } from './types';

const post: BlogPost = {
    slug: '2026-rag-agents',
    title: 'From RAG to Agents',
    date: '2026-05-01',
    summary: 'My notes from studying systems design',
    tags: ['system-design'],
    //coverImage: portraitSrc,
    content:
        `
  <p>I will be continuously updating this and adding sections over the next month</p>
  <section>
    <h2>Scope of Designing Systems</h2>
    <p></p>
    <p>3 layers</p>
    <ol>
      <li>Architectural: how are macro components are designed</li>
      <li>Logical: business logic, abstractions, algorithmic design, extensibility</li>
      <li>Physical: storage, IOPS, RAM, CPU, backups/restore, scaling policies</li>
    </ol>
  </section>
  <section>
    <h2>Mindset</h2>
    <h3>Extensibility</h3>
    <p>About making it easy to create changes in your system. Is your low level implementation abstracted enough that the time to migrate to a new system is short? Payment gateway (e.g. Stripe) that your company is using is a good example. If your business pivots to a new area, how hard would it be to change layers in your software to accomodate it? How easy would it be to change your database from SQL to NoSQL? Are your services functioning like an independent business logic/domain like a microservice? How easy is it to break components in your codebase?</p>
    <h3>Business reality > engineering</h3>
    <p>Business prioritizes execution. You wont always have the time to do fancy optimization things to make the best software system like writing mutexes and playing with lock free algorithms, and its absolutely fine to write some spaghetti code when you donthave the luxury of time. Your job exists because of the business. </p>
    <h3>Cloud Architecture</h3>
    <p>Think about input and output, interfaces, storage (how would you store it), configure IOPS/how high. Over provisioned infra costs money and under provisioned could have a bad performance for the user. Capacity planning, how many servers to run, define autoscaling policies. Make design decisions based on response time, incoming traffic and expected response.</p>
    
    <h3>What to define</h3>
    <p>things that need to be defined</p>
    <ol>
      <li>Scope</li>
      <p>Think about the most important.</p>
      <li>Functional Requirements</li>
      <p>This is basically about the features for the user</p>
      <li>Non-functional requirements</li>
      <p>The engineering side of things, its basically how the sytem shoukld be implemented, like how should it scale and security.</p>
      <li>Critical Questions</li>
      <p>By critical I am not talking about questions like <i>"why X?"</i> but questions that shape the direction of the project, such as challenging the product design<p>
      <li>Clarifications</li>
      <p>Because theres lots of ambiguity like technology choices, e.g. noSQL vs SQL</p>
      <li>Bottom up or incremental build?</li>
      <p>Bottom up is building a set of components together, typically common in larger companies where there is a need for scale immediately. Incremental meanwhile is building an MVP then keep incrementing to improve it.</p>
    </ol>
  </section>
  <section>
    <h2>Start small</h2>
    <p></p>
    <ul>
      <li>What are the building blocks</li>
      <p>Like does it have an auth service</p>
      <li>Their relationships</li>
      <li>Like if the auth </p>
      <li>Communication layer</li>
      <p>Like do the services communicate via HTTP or a shared DB</p>
      <li>What are their botlenecks</li>
      <p>Like do I need to switch to NoSQL for X purpose</p>
    </ul>
  </section>
  <section>
    <h2>Analysing Systems</h2>
    <p>Each of these dimensions defines how a system performs and scales, thusthey become important to analyze</p>
    <ol>
      <li>Database</li>
      <p>The persistent layer, cos you'll need somewhere to store the data</p>
      <ol>
        <li>in-memory: usually caches</li>
        <li>blob storage: amazon s3, data is a binary long object, retrieved by key/path</li>
        <li>flat file storage: sort of blob storage but you can query them</li>
        <li>server database: MySQL servers</li>
        <li>embedded: DBs that run in the same app</li>
        <li>row based</li>
        <li>columnar</li>
        <li>disk based</li>
        <li>graphDB: to model graph relationships</li>
        <li>time-series: x-axis is time, y-axis is a metric</li>
        <li>relational DB: SQL</li>
        <li>non-relational DB: noSQL</li>
      </ol>
      <li>Caching</li>
      <p></p>
      <li>Scaling</li>
      <p>Horizontal/Vertical</p>
      <li>Delegation</li>
      <p>Basically about how you delegate work, the most underrated way to squeeze more performance for a system</p>
      <li>Concurrency</li>
      <p>How to handle many concurrent users</p>
      <li>Communication</li>
      <p>GRPC system? Raw TCP? UDP?</p>
    </ol>
  </section>
  <section>
    <h2>Basics</h2>
    <p></p>
  </section>
  <section>
    <h2>Databases</h2>
    <p></p>
  </section>
  <section>
    <h2>Caching</h2>
    <p></p>
  </section>
  <section>
    <h2>Async</h2>
    <p></p>
  </section>
  <section>
    <h2>Resiliency</h2>
    <p></p>
  </section>
  <section>
    <h2>Scaling</h2>
    <p></p>
  </section>
  `,
};

export default post;