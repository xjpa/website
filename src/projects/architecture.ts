import type { Project } from './types';

const project: Project = {
  slug: 'architecture',
  title: 'architecture',
  summary: 'various system design practice projects focused on single node and multi-node/distributed systems',
  /*links: [
    {
      label: 'Github repo',
      href: 'https://github.com/xjpa/distributed-systems',
    },
  ],
  */
  content: `
  <p>note: master repo below contains nothing yet, will start adding soon</p>
  <p>python/golang: i will mainly do the projects in python/go</p>
  <section>
    <h2>Program Design</h2>
    <p>Code: <a href="">link</a></p>
    <p>My solutions and notes to the exercises and lessons found from working through <a href="https://www.dabeaz.com/advprog.html">this course</a> and its accompanying repo that goes through a good depth of <a href="https://github.com/dabeaz-course/python-mastery/">python's internals</a></p>
  </section>
  <section>
    <h2>Design Patterns</h2>
    <p>Code: <a href="">github.com/xjpa/distributed-systems</a></p>
    <p>Python implementation of the design patterns found in the <a href="https://www.amazon.com/gp/product/0201633612/">Gang of Four</a> book including my notes</p>
  </section>
  <section>
    <h2></h2>
    <p>Code: <a href="">link</a></p>
    <p>Delivery Management</p>
  </section>
  <h2>Web Applications</h2>
    <section>
      <h3>logistics platform</h3>
      <p>fastAPI-based logistics backend for shipment creation, tracking, and delivery event management</p>
    </section>
  </section>
  `,
};

export default project;
