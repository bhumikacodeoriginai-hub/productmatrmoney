export type Profile = {
  id: string; name: string; age: number; city: string; profession: string; education: string;
  image: string; category: string; verified: boolean; active: boolean; compatibility: number;
  tags: string[]; about: string;
};

export const profiles: Profile[] = [
  { id:"ananya", name:"Ananya Rao", age:29, city:"Bengaluru", profession:"Product Designer", education:"NID Ahmedabad", image:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=85", category:"General matrimony", verified:true, active:true, compatibility:92, tags:["Design", "Kannada", "Vegetarian"], about:"Curious, kind and quietly ambitious. I enjoy long walks, thoughtful conversations and making space for people to be themselves." },
  { id:"rhea", name:"Rhea Menon", age:31, city:"Mumbai", profession:"Architect", education:"CEPT University", image:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85", category:"General matrimony", verified:true, active:true, compatibility:88, tags:["Architecture", "Malayalam", "Travel"], about:"An architect with a soft spot for old cities, strong coffee and building a warm home filled with books." },
  { id:"kavya", name:"Kavya Iyer", age:28, city:"Chennai", profession:"Research Scientist", education:"IISc Bengaluru", image:"https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=800&q=85", category:"Hearing & Speech", verified:true, active:false, compatibility:84, tags:["Science", "Tamil", "Classical music"], about:"A patient learner who believes that the best relationships are built on everyday respect and shared wonder." },
  { id:"meera", name:"Meera Shah", age:30, city:"Pune", profession:"Financial Analyst", education:"Symbiosis International", image:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=85", category:"Locomotor disability", verified:true, active:true, compatibility:79, tags:["Finance", "Gujarati", "Reading"], about:"Independent, empathetic and always up for a good debate. Looking for a partner who values honesty and laughter." },
  { id:"isha", name:"Isha Kapoor", age:27, city:"New Delhi", profession:"Clinical Psychologist", education:"Christ University", image:"https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=85", category:"General matrimony", verified:true, active:true, compatibility:76, tags:["Psychology", "Hindi", "Mindfulness"], about:"Warm, grounded and passionate about making mental health conversations more human." },
  { id:"tara", name:"Tara Deshmukh", age:32, city:"Hyderabad", profession:"Product Manager", education:"BITS Pilani", image:"https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=85", category:"Vitiligo / Skin condition", verified:true, active:true, compatibility:73, tags:["Technology", "Marathi", "Cooking"], about:"A product person by day and a home chef by evening. I value openness, humour and showing up for one another." },
];

export const notifications = [
  { id:"n1", title:"New interest from Arjun", description:"Arjun liked your profile and would like to connect.", time:"12 min ago", unread:true, type:"interest" },
  { id:"n2", title:"Your profile was viewed", description:"Someone from Bengaluru viewed your profile.", time:"2 hrs ago", unread:true, type:"view" },
  { id:"n3", title:"Photo access approved", description:"Rhea approved your request to view private photos.", time:"Yesterday", unread:false, type:"photo" },
  { id:"n4", title:"Your profile is 86% complete", description:"Add family preferences to improve your recommendations.", time:"2 days ago", unread:false, type:"system" },
];

export const conversations = [
  { id:"c1", name:"Rhea Menon", preview:"That sounds like a lovely plan!", time:"10:42 AM", unread:2, image:profiles[1].image, online:true, messages:[{from:"them",text:"Hi Ananya, I enjoyed reading your profile. What are you currently reading?",time:"10:36 AM"},{from:"me",text:"Hello Rhea! Thank you — I just started a book on urban design.",time:"10:39 AM"},{from:"them",text:"That sounds like a lovely plan!",time:"10:42 AM"}] },
  { id:"c2", name:"Arjun Nair", preview:"Would love to hear more about your work.", time:"Yesterday", unread:0, image:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80", online:false, messages:[{from:"them",text:"Would love to hear more about your work.",time:"Yesterday"}] },
  { id:"c3", name:"Devika Krishnan", preview:"Thank you for connecting.", time:"Mon", unread:0, image:"https://images.unsplash.com/photo-1546961342-ea5f68f2f7dc?auto=format&fit=crop&w=200&q=80", online:true, messages:[{from:"them",text:"Thank you for connecting.",time:"Mon"}] },
];

export const adminMembers = profiles.map((profile, index) => ({ ...profile, memberId:`ADV-240${index + 18}`, membership:index < 2 ? "Premium" : "Free", status:index === 4 ? "Pending" : "Active", joined:`${12 + index} Jun 2026` }));
