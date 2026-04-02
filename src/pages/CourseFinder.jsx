import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Search, Youtube, Play, Clock, Star, ExternalLink, Filter, Sparkles, BookOpen } from "lucide-react";
import GlassCard from "../components/ui/GlassCard";

const CourseFinder = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Full Stack", "AI & ML", "Data Science", "Cybersecurity", "Cloud", "Languages"];

  const courses = [
    {
      title: "Full Stack Web Development Course 2024",
      channel: "freeCodeCamp.org",
      duration: "11h 45m",
      rating: "4.9",
      views: "5.2M",
      category: "Full Stack",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
      link: "https://www.youtube.com/watch?v=nu_pCVPKzTk"
    },
    {
      title: "Sigma Web Development Course - HTML, CSS, JS & More",
      channel: "CodeWithHarry",
      duration: "20h 30m",
      rating: "4.9",
      views: "8.4M",
      category: "Full Stack",
      thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=600",
      link: "https://www.youtube.com/playlist?list=PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w"
    },
    {
      title: "Python Tutorial For Beginners (With Notes)",
      channel: "CodeWithHarry",
      duration: "15h 12m",
      rating: "4.9",
      views: "12M",
      category: "Languages",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
      link: "https://www.youtube.com/watch?v=gfDE2a7MKjA"
    },
    {
      title: "Java Placement Full Course - Beginner to Advanced",
      channel: "CodeWithHarry",
      duration: "24h 00m",
      rating: "4.8",
      views: "6.7M",
      category: "Languages",
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600",
      link: "https://www.youtube.com/playlist?list=PLu0W_9lII9agS67Uits0UnJyrYiXhDS6q"
    },
    {
      title: "Complete Web Development Roadmap & Course",
      channel: "Apna College",
      duration: "10h 45m",
      rating: "4.9",
      views: "4.2M",
      category: "Full Stack",
      thumbnail: "https://images.unsplash.com/photo-1522252234503-e356532cafd5?auto=format&fit=crop&q=80&w=600",
      link: "https://www.youtube.com/watch?v=l1EssrLxt7E"
    },
    {
      title: "Complete C++ DSA Course | Data Structures & Algorithms",
      channel: "Apna College",
      duration: "35h 20m",
      rating: "4.9",
      views: "9.1M",
      category: "Languages",
      thumbnail: "https://images.unsplash.com/photo-1611649118171-1d689552627a?auto=format&fit=crop&q=80&w=600",
      link: "https://www.youtube.com/playlist?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt"
    },
    {
      title: "Java Full Course for Placement | 3.5M Students",
      channel: "Apna College",
      duration: "12h 15m",
      rating: "4.9",
      views: "15M",
      category: "Languages",
      thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600",
      link: "https://www.youtube.com/watch?v=yRpLlJmRo2w"
    },
    {
      title: "Machine Learning with Python & Scikit-Learn",
      channel: "freeCodeCamp.org",
      duration: "18h 10m",
      rating: "4.9",
      views: "3.4M",
      category: "AI & ML",
      thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=600",
      link: "https://www.youtube.com/watch?v=i_LwzRVP7bg"
    },
    {
       title: "Ethical Hacking Full Course In 10 Hours",
       channel: "Simplilearn",
       duration: "10h 05m",
       rating: "4.8",
       views: "3.1M",
       category: "Cybersecurity",
       thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
       link: "https://www.youtube.com/watch?v=EC_bKHXGmYs"
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.channel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || course.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-20 pb-24 px-6 relative overflow-hidden bg-transparent">
      {/* Analysis Atmospheric Pulse (Restored Green) */}
      <div className="absolute inset-0 z-0 text-brand-primary pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-brand-primary/5 blur-[200px] rounded-full animate-pulse opacity-40" />
         <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-brand-primary/5 to-transparent pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto space-y-8 relative z-10 text-center">
        {/* Header Section */}
        <div className="text-center space-y-3 mb-8">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[8px] font-black uppercase tracking-widest"
           >
             <Sparkles className="w-3 h-3" /> AI Resource Indexer
           </motion.div>
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white"
           >
             LEARNING <span className="neon-text">HUB</span>
           </motion.h1>
           <p className="text-white/40 text-md max-w-2xl mx-auto font-medium leading-relaxed">
             Deep-scanning the global knowledge matrix for high-impact educational video assets.
           </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-3 mb-8 px-2">
           <div className="flex-grow relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                 <Search className="w-4 h-4 text-white/20 group-focus-within:text-brand-primary transition-colors" />
              </div>
              <input 
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-xs focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/30 transition-all text-white placeholder:text-white/20"
              />
           </div>
           
           <div className="flex gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
                    activeCategory === cat 
                    ? "bg-brand-primary border-brand-primary text-black shadow-[0_0_15px_rgba(34,197,94,0.3)]" 
                    : "bg-white/5 border-white/5 text-white/40 hover:border-brand-primary/30 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2">
           <AnimatePresence mode="popLayout">
              {filteredCourses.map((course, i) => (
                <motion.div
                  key={course.title}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  layout
                >
                  <GlassCard className="h-full overflow-hidden flex flex-col group p-0 border-white/5 bg-black/40" glow>
                     <div className="relative aspect-[16/8] overflow-hidden">
                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/80 rounded-md border border-white/10 text-[7px] font-black uppercase tracking-widest text-brand-primary">{course.category}</div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><a href={course.link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.5)]"><Play className="w-5 h-5 text-black ml-0.5 fill-black" /></a></div>
                     </div>

                     <div className="p-4 flex-grow flex flex-col space-y-3 text-left">
                        <div className="flex items-center gap-2 text-white/30 text-[8px] font-black uppercase tracking-[0.1em]">
                           <span className="flex items-center gap-1"><Clock className="w-2.5 h-2.5 text-brand-primary" /> {course.duration}</span>
                           <span className="flex items-center gap-1 text-brand-primary"><Star className="w-2.5 h-2.5 fill-brand-primary" /> {course.rating}</span>
                        </div>
                        <h3 className="text-[14px] font-black leading-tight group-hover:text-brand-primary transition-colors line-clamp-2 uppercase tracking-tight">{course.title}</h3>
                        <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
                          <div className="flex items-center gap-2">
                             <div className="w-6 h-6 rounded-lg bg-brand-primary/20 flex items-center justify-center border border-brand-primary/30"><Youtube className="w-3 h-3 text-brand-primary" /></div>
                             <div className="flex flex-col"><span className="text-[8px] text-white/40 font-black uppercase tracking-widest leading-none">{course.channel}</span></div>
                          </div>
                          <a href={course.link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-brand-primary hover:text-black transition-all"><ExternalLink className="w-2.5 h-2.5" /></a>
                        </div>
                     </div>
                  </GlassCard>
                </motion.div>
              ))}
           </AnimatePresence>
        </div>

        {/* Footer Motivation */}
        <div className="mt-12 p-6 glass-card border-brand-primary/10 relative overflow-hidden text-center max-w-2xl mx-auto bg-black/40 rounded-2xl">
           <BookOpen className="w-8 h-8 text-brand-primary/10 mx-auto mb-3 animate-bounce" />
           <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter italic text-white/60 leading-tight">Master the fundamentals, and the <span className="text-brand-primary">Horizon</span> is yours.</h2>
        </div>
      </div>
    </div>
  );
};

export default CourseFinder;
