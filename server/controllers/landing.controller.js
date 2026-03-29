import Landing from "../models/Landing.js";

/* GET landing content */
export const getLanding = async (req, res) => {
  try {
    let data = await Landing.findOne();
    if (!data) {
      data = {
        hero: { title: "Welcome to Blizzen Creations", subtitle: "Your IT Career Starts Here", cta: "Enroll Now" },
        about: { description: "Blizzen Creations is a premier IT training institute..." },
        courses: [
          { title: "Fullstack Development", duration: "3 Months", careerOpportunities: "Frontend Developer, Backend Developer, Fullstack Developer", technologies: ["React", "Node.js"], roles: ["Developer"] },
          { title: "Data Science", duration: "4 Months", careerOpportunities: "Data Analyst, Data Scientist", technologies: ["Python", "SQL"], roles: ["Analyst", "Scientist"] },
        ],
        features: [
          { title: "Industry-Focused", description: "Curriculum designed with current market demands" },
          { title: "Expert Mentorship", description: "Learn from working IT professionals" },
        ],
        stats: [
          { label: "Students Trained", value: "500+" },
          { label: "Courses", value: "10+" },
        ],
        testimonials: [
          { name: "John Doe", role: "Software Engineer", quote: "Best institute ever!", rating: 5 },
        ],
        contact: { phone: "+919198842648", email: "info@blizzencreations.in", address: "Chennai, India" },
      };
    }
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch landing data" });
  }
};

/* POST landing content */
export const saveLanding = async (req, res) => {
  try {
    let landing = await Landing.findOne();
    if (landing) {
      landing.set(req.body);
      await landing.save();
    } else {
      landing = await Landing.create(req.body);
    }
    res.json({ success: true, landing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save landing data" });
  }
};
