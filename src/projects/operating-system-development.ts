import type { Project } from './types';

const project: Project = {
  slug: 'osdev',
  title: 'operating system development',
  summary: 'building OSes for university + fun',

  content: `
  <h2>An OS for my masters (2025)</h2>
    <p>Built an OS from scratch in C and Assembly for my Advanced Operating Systems and Networking class at De La Salle University Manila. I wrote almost every line of C-code (with some GPT/Grok help to help me debug gigantic error messages) with blood on my eyes and QEMU crashing in the background. Presented a live demo + codebase walkthrough in class to a group of senior software engineers and architects</p>
    
    <p>I designed it for pedagogical teaching similar to xv6, implementing recommendations based on this paper called <a href="https://events.roedu.net/event/7/contributions/236/contribution.pdf">Improving The Educational Value of Operating
Systems</a>. I may have to revisit this again to improve the system and write a worthy systems programming paper about it.</p>
    <p>Link: <a href="https://github.com/xjpa/rootOS">Code</a>, <a href="https://drive.google.com/file/d/1V_rvrd5n2t9WbDaLY4xWfvkBC9ygw58N/view?usp=sharing">prof mentioning my work</a></p>
    <p>Reference: Professor Raquel T. Marasigan (<a href="mailto:raquel.marasigan@dlsu.edu.ph">email</a>) (<a href="https://www.linkedin.com/in/raqs-m/">linkedin</a>) (<a href="https://scholar.google.com/citations?user=FTaplP0AAAAJ&hl=en">scholar</a>)
    <h2>CookedOS - an OS for fun (2026)</h2>
    <img src="https://raw.githubusercontent.com/xjpa/cookedOS/main/screenshot3.jpg">
    <p>Link: <a href="https://github.com/xjpa/cookedOS">Code</a></p>
    <p>CookedOS is an ultra simpler OS I recently began just for fun. How simpler? Its just ring 0/kernel mode just so I can play around and build GUI apps quick</p>
    <p>Video Demo:</p>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/8XTX6AxdADA?si=bmds3Q3BCYwAeUy8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    <p>Screen recording above was recorded in 2026-04-15, see github repo and run it on your mac (I havent tested it on other OSes yet) or read the codebase to see the latest features/design</p>
  `,
};

export default project;
