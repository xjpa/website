import type { Project } from './types';

const project: Project = {
  slug: 'architecture',
  title: 'architecture',
  summary: 'various system design practice projects focused on single node and multi-node/distributed systems',
  links: [
    {
      label: 'Github repo',
      href: 'https://github.com/xjpa/distributed-systems',
    },
  ],

  content: `
  <p>note: master repo below contains nothing yet, will start adding soon</p>
  <p>python/golang: i will mainly do the projects in python/go</p>
  <section>
    <h2>design patterns</h2>
    <p>Code: <a href="">github.com/xjpa/distributed-systems</a></p>
    <p>Python implementation of the design patterns in <a href="https://www.amazon.com/gp/product/0201633612/">Gang of Four</a> including my notes</p>
  </section>
  <section>
    <h2>dependency injection</h2>
    <p>Code: <a href="">github.com/xjpa/distributed-systems</a></p>
    <p></p>
  </section>
  <section>
    <h2>TCP concurrency lab</h2>
    <p>Code: <a href="">github.com/xjpa/distributed-systems</a></p>
    <p>Web-based experiment platform that simulates and visualizes TCP/socket bottlenecks in distributed systems, like ephemeral port exhaustion, file descriptor limits, TIME_WAIT buildup, and the difference between short-lived versus persistent connections.</p>
  </section>
  <section>
    <h2>webapp: blog</h2>
    <p>a simple blog app in python</p>
  </section>
  <section>
    <h2>webapp: youtube clone</h2>
    <p>a simple blog app in python</p>
  </section>
  <section>
    <h2>webapp: image gallery</h2>
    <p>a photo gallery web application to learn golang</p>
  </section>
  <section>
    <h2>raft implementation</h2>
    <p>implementation of <a href="https://raft.github.io/">Raft consensus</a></p>
  </section>
  `,
};

export default project;
