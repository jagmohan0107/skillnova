import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "../components/ui/GlassCard";
import { Link } from "react-router-dom";
import { Award, Briefcase, Code, Star, ChevronRight, Sparkles } from "lucide-react";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('skillnova_profile') || '{}');
    const analysis = JSON.parse(localStorage.getItem('skillnova_analysis') || '{}');
    
    // Fallbacks just in case the AI didn't catch anything
    const domain = profile.careerInterest || "Software Engineering";
    const missing = analysis?.skill_gap?.missing_skills || ["Cloud Architecture", "System Design", "Data Modeling"];
    
    const s1 = missing[0] || "Frontend Architecture";
    const s2 = missing[1] || "Cloud Deployment";
    const s3 = missing[2] || "Docker Containerization";

    const fetchRealWorldTech = (skill, type) => {
        const str = skill.toLowerCase();
        
        const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];
        
        if (str.includes("react") || str.includes("front") || str.includes("html") || str.includes("css")) {
            if (type === "cert") return randomChoice(["Meta Front-End Developer Professional", "Frontend Web UI Frameworks", "Advanced React Architecture Certification"]);
            if (type === "proj") return randomChoice(["Real-time React Portal with WebSockets", "High-Performance Ecommerce Storefront", "Framer Motion AI Dashboard"]);
            return randomChoice(["Frontend React.js Intern", "UI/UX Developer Extern", "Creative Frontend Intern"]);
        }
        if (str.includes("cloud") || str.includes("aws") || str.includes("deploy")) {
            if (type === "cert") return randomChoice(["AWS Certified Solutions Architect – Associate", "Google Cloud Associate Engineer", "Azure Fundamentals Certification"]);
            if (type === "proj") return randomChoice(["Serverless AWS Lambda Architecture Server", "Multi-Cloud Load Balancer", "GCP Data Ingestion Pipeline"]);
            return randomChoice(["Cloud DevOps Junior Extern", "Cloud Infrastructure Intern", "AWS Tech Intern"]);
        }
        if (str.includes("docker") || str.includes("contain") || str.includes("kube")) {
            if (type === "cert") return randomChoice(["Docker Certified Associate (DCA)", "Certified Kubernetes Administrator", "CNCF Container Security"]);
            if (type === "proj") return randomChoice(["Kubernetes Distributed Microservices Web-App", "Dockerized Node Cluster", "Automated CI/CD Container Image Pipeline"]);
            return randomChoice(["Site Reliability Engineering (SRE) Intern", "DevOps & Container Intern", "Platform Engineering Intern"]);
        }
        if (str.includes("java") || str.includes("oop")) {
            if (type === "cert") return randomChoice(["Oracle Certified Professional: Java Developer", "Spring Boot Professional Architect", "Advanced Java Microservices Certification"]);
            if (type === "proj") return randomChoice(["Java Spring Boot High-Concurrency Engine", "Java Financial Transaction Simulator", "Object-Oriented Web API"]);
            return randomChoice(["Enterprise Backend Java Intern", "Software Engineering Intern - Java", "Backend JVM Engineer Extern"]);
        }
        if (str.includes("node") || str.includes("back") || str.includes("api")) {
            if (type === "cert") return randomChoice(["IBM Backend Development Certificate", "OpenJS Node.js Application Developer", "REST API Design Certification"]);
            if (type === "proj") return randomChoice(["Secure Node.js Express REST API Subsystem", "Express & Redis Caching Service", "GraphQL Backend Aggregator"]);
            return randomChoice(["Backend App Engineering Intern", "Node.js & Database Intern", "API Systems Engineer Intern"]);
        }
        if (str.includes("data") || str.includes("sql") || str.includes("base") || str.includes("python")) {
            if (type === "cert") return randomChoice(["Google Data Analytics Professional Certificate", "IBM Data Science Professional", "DeepLearning.AI TensorFlow Developer"]);
            if (type === "proj") return randomChoice(["PostgreSQL Data Pipeline Analyzer Platform", "Python Machine Learning Visualizer", "Real-Time Big Data Dashboard"]);
            return randomChoice(["Data Science & Database Intern", "Machine Learning Analytics Intern", "Python Data Engineer Extern"]);
        }
        
        if (type === "cert") return randomChoice([`Certified ${skill} Specialist`, `Advanced ${skill} Professional`, `Global ${skill} Certification`]);
        if (type === "proj") return randomChoice([`Enterprise ${skill} Software System`, `Scalable ${skill} Microservice`, `Open Source ${skill} Module`]);
        return randomChoice([`Junior ${skill} Developer`, `${skill} Engineering Intern`, `Apprentice ${skill} Programmer`]);
    };

    setRecommendations([
      {
        type: "Certification",
        title: fetchRealWorldTech(s1, "cert"),
        desc: `Acquire elite industry validation for your missing ${s1} vector. Recognized globally.`,
        benefits: `${s1}, System Architecture, Compliance`,
        difficulty: "Intermediate",
        icon: Award,
        color: "text-blue-400",
      },
      {
        type: "Project",
        title: fetchRealWorldTech(s2, "proj"),
        desc: `Build a highly scalable enterprise-grade application utilizing ${s2} as its core foundation.`,
        benefits: `${s2}, Data Modeling, Full-Stack Output`,
        difficulty: "Advanced",
        icon: Code,
        color: "text-brand-primary",
      },
      {
        type: "Internship",
        title: fetchRealWorldTech(s3, "intern"),
        desc: `Accelerate your workflow by applying ${s3} inside a high-growth collaborative production team.`,
        benefits: `${s3}, Version Control, Team Scaling`,
        difficulty: "Beginner",
        icon: Briefcase,
        color: "text-amber-400",
      },
      {
        type: "Certification",
        title: fetchRealWorldTech(s2, "cert"),
        desc: `Obtain verified credentials demonstrating your proficiency tracking complex ${s2} algorithms.`,
        benefits: `${s2}, Industry Standards, Execution`,
        difficulty: "Advanced",
        icon: Award,
        color: "text-blue-400",
      },
      {
        type: "Project",
        title: fetchRealWorldTech(s3, "proj"),
        desc: `Construct an end-to-end continuous integration pipeline focused on automated ${s3} testing.`,
        benefits: `${s3}, CI/CD, Quality Assurance`,
        difficulty: "Intermediate",
        icon: Code,
        color: "text-brand-primary",
      },
      {
        type: "Internship",
        title: fetchRealWorldTech(s1, "intern"),
        desc: `Bridge the technical gap by working directly under senior mechanics integrating advanced ${s1}.`,
        benefits: `${s1}, Live Production, Mentorship`,
        difficulty: "Intermediate",
        icon: Briefcase,
        color: "text-amber-400",
      }
    ]);
  }, []);

  if (recommendations.length === 0) return <div className="min-h-screen bg-[#020617]" />;

  return (
    <div className="min-h-screen pt-24 pb-32 px-6 relative overflow-hidden bg-transparent uppercase">
      {/* Analysis Atmospheric Pulse */}
      <div className="absolute inset-0 z-0 text-brand-primary">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-brand-primary/10 blur-[200px] rounded-full animate-pulse opacity-20" />
         <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:40px_40px] opacity-10" />
      </div>

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-black uppercase tracking-widest"
          >
            <Sparkles className="w-3 h-3" /> Predictive Vector Matrix
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none"><span className="text-brand-primary">AI</span> RECOMMENDATIONS</h2>
          <p className="text-white/40 text-lg font-medium tracking-tight">Personalized trajectories to master the missing fragments of your technical profile.</p>
        </div>

        <div className="space-y-16">
          {[{title:"Certifications Target", icon:Award, key:"Certification"}, {title:"Recommended Projects", icon:Code, key:"Project"}, {title:"Internship Opportunities", icon:Briefcase, key:"Internship"}].map(section => (
            <div key={section.title} className="space-y-8">
              <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                <div className="p-3 rounded-xl bg-brand-primary/10 border border-brand-primary/20">
                  <section.icon className="w-6 h-6 text-brand-primary" />
                </div>
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">{section.title}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {recommendations.filter(r => r.type === section.key).map((rec, i) => (
                  <GlassCard key={i} className="group relative border-emerald-500/10 hover:border-emerald-500/40 bg-black/40 p-8" glow>
                    <div className={`p-3 rounded-xl bg-black/50 border border-emerald-500/10 w-fit mb-6 ${rec.color} group-hover:scale-110 transition-transform`}>
                      <rec.icon className="w-6 h-6" />
                    </div>
                    
                    <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 mb-2">TARGET_{rec.type}</div>
                    <h3 className="text-2xl font-black mb-3 group-hover:text-brand-primary transition-colors uppercase tracking-tight leading-tight">{rec.title}</h3>
                    <p className="text-white/40 text-xs mb-8 leading-relaxed font-medium">{rec.desc}</p>
                    
                    <div className="space-y-6 pt-6 border-t border-white/5 mt-auto">
                      <div className="flex flex-wrap gap-2">
                        {rec.benefits.split(", ").map(b => (
                           <span key={b} className="text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-emerald-500/5 text-emerald-400 border border-emerald-500/10">
                             {b}
                           </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500 animate-pulse" />
                          <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">{rec.difficulty}</span>
                        </div>
                        <button className="text-brand-primary text-[9px] font-black uppercase tracking-widest flex items-center gap-2 group/btn border border-brand-primary/10 px-4 py-2 rounded-xl hover:bg-brand-primary hover:text-black transition-all">
                          Initiate <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-8">
          <Link to="/roadmap">
            <motion.button 
              whileHover={{ scale: 1.05, letterSpacing: "0.5em" }}
              className="px-16 py-6 bg-brand-primary text-black font-black uppercase tracking-[0.3em] text-[10px] rounded-[3rem] shadow-[0_0_60px_rgba(34,197,94,0.3)]"
            >
              Open Roadmap
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
