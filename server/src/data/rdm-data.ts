export interface PlaceFact {
  id: string;
  name: string;
  schedule?: string;
  category: string;
}

export const rdmData: { places: PlaceFact[] } = {
  places: [
    { id: "panteon-ingles", name: "Panteón Inglés", schedule: "09:00-18:00", category: "culture" },
    { id: "mina-acosta", name: "Mina de Acosta", schedule: "10:00-17:00", category: "site" },
    { id: "parroquia-asuncion", name: "Parroquia de la Asunción", schedule: "08:00-20:00", category: "culture" },
    { id: "plaza-constitucion", name: "Plaza de la Constitución", category: "public" },
  ],
};
