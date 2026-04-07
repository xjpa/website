import type { Project } from './types';

const project: Project = {
  slug: 'osdev',
  title: 'operating system development',
  summary: 'built operating systems from scratch for university + fun',

  content: `
  <h2>An OS for my masters (2025)</h2>
    <p>Built an OS from scratch in C and Assembly for my Advanced Operating Systems and Networking class at De La Salle University Manila. I wrote almost every line of C-code (with some GPT/Grok help to help me debug gigantic error messages) with blood on my eyes and QEMU crashing in the background. Presented a live demo + codebase walkthrough in class to a group of senior software engineers and architects</p>
    <p>Reference: Professor Raquel T. Marasigan (<a href="raquel.marasigan@dlsu.edu.ph">email</a>) (<a href="https://www.linkedin.com/in/raqs-m/">linkedin</a>)
    <p>I designed it for pedagogical teaching similar to xv6, implementing recommendations based on this paper called <a href="https://events.roedu.net/event/7/contributions/236/contribution.pdf">Improving The Educational Value of Operating
Systems</a>. I may have to revisit this again to improve the system and write a worthy systems programming paper about it.</p>
    <h2>An OS for fun</h2>
    <p>This OS is simpler, just ring 0/kernel mode just simply for fun so I can play around and build GUI apps quick</p>
  `,
};

export default project;
