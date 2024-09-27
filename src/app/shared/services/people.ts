export interface People {
  _id: string;
  index: number;
  guid: string;
  is_online: boolean;
  budget: number;
  rating: number;
  picture: string;
  age: number;
  eyeColor: string;
  full_name: string;
  gender: string;
  target: number | number[];
  company: string;
  email: string;
  phone: string;
  address: string;
  job_title: string;
  registered: string | Date;
  latitude: number;
  longitude: number;
  tags: ['dolore', 'nisi', 'sunt', 'pariatur', 'commodo', 'laborum', 'qui'];
  friends: { id: number; name: string }[];
  img_id: number;
  country: 'BR' | 'DE' | 'ES' | 'FR' | 'GB' | 'US';
}
