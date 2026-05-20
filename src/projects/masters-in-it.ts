import type { Project } from './types';

const project: Project = {
  slug: 'mit',
  title: 'masters in IT',
  summary: 'formal education on software systems design and engineering, business durability, and enterprise operations',
  content: `
  <section>
    <h2>coursework</h2>
    <p>The beauty of grad school is your coursework is based on your taste, you can decide to work on hard complex topics for fun as long as it'd surive the scrutiny of your professor, while fulfilling the criteria in your coursework </p>
    <ol>
      <li><b>IT Service Management</b>: ---</li>
      <li><b>Advanced Operating Systems and Networking</b>: developed an <a href="">Operating System from scratch</a> and presented it (live demo + codebase walkthrough) in class to a group of senior engineers and solution architects. My prof later highlighted it in her recommendation letter when I planned to shift my masters to Georgia Tech's OMSCS, <a href="https://drive.google.com/file/d/1V_rvrd5n2t9WbDaLY4xWfvkBC9ygw58N/view?usp=sharing">here was her rec letter</a>, though I eventually decided to defer as I felt that quitting my masters at DLSU felt like a waste. We also had fun tasks like designing an infrastructure for training AI (large langauge models) for a business</li>
      <li><b>Information Systems Architecture</b>: cool groupwork where we were tasked to present a lecture on service-oriented architectures (SOA), then review the microservice software architecture docs of a company's product, specifically <a href="https://www.cambridge.org/core/">Cambridge Core</a></li>
      <li><b>Advanced Systems Design</b>: we explored different stages of the design process in software engineering. For coursework, I did system design with AWS (amazon web services), focused on the design of a search engine deployed to AWS. Then for final project, I designed an e-commerce-like system</li>
      <li><b>Shared & Collaborative Systems</b>: research oriented class, mostly exploring various tech products from a human-computer interaction (HCI) and business perspective. My project was extending LLM-based misinformation simulations into a governance digital twin for shared collaborative systems, basically designing an AI agent governance platform</li>
      <li><b>Project Management</b>: loads of case studies, I didnt get much out of it because the class time coincided with my work hours. A massive shame as the course offered PMBOK certifications. FUCKKKKK</li>
      </ol>
  </section>
  <section>
    <h2>why masters in IT</h2>
    <p>Initially I chose to do a Masters in Computer Science</p>
    <p>A Masters in Information Technology (MIT) is usually about how to make tech work in an organization, covering system design, management, and enterprise transformation, a closer "executive track"</p>
    <p>Thats why I enrolled over an MS Computer Science, hedging on a bet that in the AI age, where anyone can now deepen their tech skillset without a formal masters degree, taking a masters in the following are better than nicheing yourself:</p>
    <ol>
      <li>busines/people-oriented masters</li> 
      <li>domain expansive masters</li>
    </ol>
    <p>With AI, skilling yourself technically isnt a big challenge, just do some projects or grind a book. There is no need to take an advanced algorithms class present in MS CS when I can just solve some algorithmic problems at leetcode or kattis. What you need is that <b>cross disciplinary thinking</b>, having a broad view.</p>
    <blockquote>Because the goal is not to become a code monkey</blockquote>
    <p>Silo-ing your expertise to a corner where you are competing with a machine or a human with better access compute/AI models, is a rat race thats only enticing if youre early in your career.  The only way to succeed in the industry is to move up the abstraction layer and be the one influencing the path of engineering, e.g.  system design, product thinking, cross-organizational influence, solutions engineering, roadmap and delivery planning</p>
    
    <p>Masters in IT covers a good enough broad view of the intersection between business and tech execution, and I can always just add electives later to deepen myself in the technical details.</p>
    <p>I'll just take a business oriented masters like an MBA as my 2nd masters later, or a domain expansive masters like computational finance or whatever interesting niche I'll come across later that I want to embed and apply my technical skills into.</p>
  </section>
  `,
};

export default project;
