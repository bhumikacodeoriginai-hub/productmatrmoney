export type ProfileCategory = "general" | "locomotor" | "hearing-speech" | "skin-condition";
export type Visibility = "public" | "accepted" | "request" | "private";
export type Membership = "Free" | "Premium" | "Premium Plus";
export type Profile = { id: string; name: string; age: number; city: string; profession: string; education: string; image: string; category: ProfileCategory; verified: boolean; active: boolean; compatibility: number; tags: string[]; about: string; };
export type Interest = { id: string; profileId: string; type: "received" | "sent" | "accepted" | "declined"; date: string; };
export type Notification = { id: string; title: string; description: string; time: string; unread: boolean; type: "interest" | "view" | "photo" | "system"; };
export const BRAND = { name: "Advaita Matrimony", tagline: "Meaningful connections. Built on trust." } as const;
